import { Hono } from "hono";
import { sign } from "hono/jwt";
import { verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signinInput, signupInput } from "@its.mayank7/medium-common";
import bcrypt from "bcryptjs";

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET_KEY: string;
  };
  Variables: {
    userId: string;
  };
}>();

// Signup a user
userRouter.post("/signup", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);

    if (!success) {
      c.status(411);
      return c.json({ message: "Inputs not correct" });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (existingUser) {
      c.status(409);
      return c.json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        name : body.name,
      },
    });

    const token = await sign(
      {
        id: user.id,
        exp: Math.floor(Date.now() / 1000) + 3 * 24 * 60 * 60, // expires in 3 days
      },
      c.env.JWT_SECRET_KEY
    );

    return c.json({ jwt: token, id: user.id });
  } catch (e: any) {
    c.status(500);
    return c.json({ error: e.message });
  }
});

// Signin a user
userRouter.post("/signin", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);

    if (!success) {
      c.status(411);
      return c.json({ message: "Inputs not correct" });
    }

    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      c.status(403);
      return c.json({ error: "Invalid password" });
    }

    const token = await sign(
      {
        id: user.id,
        exp: Math.floor(Date.now() / 1000) + 3 * 24 * 60 * 60, // expires in 3 days
      },
      c.env.JWT_SECRET_KEY
    );

    return c.json({ jwt: token, id: user.id });
  } catch (e: any) {
    c.status(500);
    return c.json({ error: "Error while signing in" });
  }
});

// Middleware: verify token (no Bearer required)
userRouter.use("/:id/*", async (c, next) => {
  const token = c.req.header("authorization");
  if (!token) {
    c.status(401);
    return c.json({ error: "Unauthorized - Token missing" });
  }
  try {
    const decoded = await verify(token, c.env.JWT_SECRET_KEY);
    if (decoded && typeof decoded.id === "string") {
      c.set("userId", decoded.id);
      await next();
    } else {
      c.status(401);
      return c.json({ error: "Unauthorized - Invalid token" });
    }
  } catch (err) {
    c.status(401);
    return c.json({ error: "Unauthorized - Token verification failed" });
  }
});

// Get profile of a user
userRouter.get("/:id/profile", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const userId = c.req.param("id");
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  return c.json({ name: user?.name, email: user?.email, id: user?.id });
});

// Follow a user
userRouter.post("/:id/follow", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const followerId = c.get("userId"); 
  const followingId = c.req.param("id"); // User to follow

  if (followerId === followingId) {
    c.status(400);
    return c.json({ error: "You cannot follow yourself." });
  }

  // Check if already following
  const existing = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId,
        followingId,
      },
    },
  });
  if (existing) {
    c.status(409);
    return c.json({ error: "Already following this user." });
  }

  // Check if the user to follow exists
  const userToFollow = await prisma.user.findUnique({
    where: { id: followingId },
  });
  if (!userToFollow) {
    c.status(404);
    return c.json({ error: "User to follow not found." });
  }

  // Create follow
  await prisma.follow.create({
    data: {
      followerId,
      followingId,
    },
  });

  return c.json({ message: "Successfully followed the user." });
});

// Unfollow a user
userRouter.delete("/:id/unfollow", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const followerId = c.get("userId"); 
  const followingId = c.req.param("id"); // User to follow

  if (followerId === followingId) {
    c.status(400);
    return c.json({ error: "You cannot follow yourself." });
  }

  // Check if already following
    const existing = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });
    if (!existing) {
      c.status(409);
      return c.json({ error: "you are not following this user." });
    }

  // Delete follow
  await prisma.follow.delete({
    where: {
      followerId_followingId: {
        followerId,
        followingId,
      },
    },
  });

  return c.json({ message: "Successfully unfollowed the user." });
});

// Get followers of a user
userRouter.get("/:id/followers", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.req.param("id");
  const followers = await prisma.follow.findMany({
    where: {
      followingId: userId,
    },
    select: {
      follower: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
  const followersData = followers.map((follower) => ({
    id: follower.follower.id,
    name: follower.follower.name,
    email: follower.follower.email,
  }));
  return c.json({ followers: followersData });
});

// Get following of a user
userRouter.get("/:id/following", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.req.param("id");
  const following = await prisma.follow.findMany({
    where: {
      followerId: userId,
    },
    select: {
      following: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
  const followingData = following.map((follower) => ({
    id: follower.following.id,
    name: follower.following.name,
    email: follower.following.email,
  }));
  return c.json({ following: followingData });
});

// Check if current user is following another user
userRouter.get("/:id/is-following", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const followerId = c.get("userId");
  const followingId = c.req.param("id");

  if (followerId === followingId) {
    return c.json({ isFollowing: false });
  }

  const existing = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId,
        followingId,
      },
    },
  });

  return c.json({ isFollowing: !!existing });
});

// Get all users
userRouter.get("/allusers", async (c) => {
  // Check for authentication token
  const token = c.req.header("authorization");
  if (!token) {
    c.status(401);
    return c.json({ error: "Unauthorized - Token missing" });
  }
  
  try {
    // Verify the token
    const decoded = await verify(token, c.env.JWT_SECRET_KEY);
    if (!decoded || typeof decoded.id !== "string") {
      c.status(401);
      return c.json({ error: "Unauthorized - Invalid token" });
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    // Get counts for each user
    const usersWithCounts = await Promise.all(
      users.map(async (user) => {
        const [postsCount, followersCount, followingCount] = await Promise.all([
          prisma.post.count({ where: { authorId: user.id } }),
          prisma.follow.count({ where: { followingId: user.id } }),
          prisma.follow.count({ where: { followerId: user.id } }),
        ]);

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          postsCount,
          followersCount,
          followingCount,
        };
      })
    );

    return c.json({ users: usersWithCounts });
  } catch (error) {
    if (error instanceof Error && error.message.includes("jwt")) {
      c.status(401);
      return c.json({ error: "Unauthorized - Token verification failed" });
    }
    c.status(500);
    return c.json({ error: "Error while fetching users" });
  }
});

export default userRouter;
