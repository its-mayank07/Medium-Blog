import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@its.mayank7/medium-common";

// Helper function for Prisma client with Accelerate
const getPrisma = (url: string) =>
  new PrismaClient({ datasourceUrl: url }).$extends(withAccelerate());

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET_KEY: string;
  };
  Variables: {
    userId: string;
  };
}>();

// Middleware: verify token (no Bearer required)
blogRouter.use("/*", async (c, next) => {
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

// POST / - Create blog post
blogRouter.post("/", async (c) => {
  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json({ message: "Inputs not correct" });
    }
    const userId = c.get("userId");

    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });

    return c.json({ blog });
  } catch (err) {
    c.status(500);
    return c.json({ error: "Failed to create blog post" });
  }
});

// PUT / - Update blog post
blogRouter.put("/", async (c) => {
  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const body = await c.req.json();

     const {success} = updateBlogInput.safeParse(body);
        if(!success){
          c.status(411);
          return c.json({message : "Inputs not correct"})
        }

    const blog = await prisma.post.update({
      where: { id: body.id },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return c.json({ id: blog.id });
  } catch (err) {
    c.status(500);
    return c.json({ error: "Failed to update blog post" });
  }
});

// GET /bulk - Fetch all blogs by the user
blogRouter.get("/bulk", async (c) => {
  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    // const userId = c.get("userId");

    // const blog = await prisma.post.findMany({
    //   where: { authorId: userId },
    // });

     const blog = await prisma.post.findMany({
      select : {
        title : true,
        id : true,
        content : true,
        author : {
          select : {
            name : true
          }
        }
      }
     });

    return c.json({ blog });
  } catch (error) {
    c.status(500);
    return c.json({
      error: "Error while fetching the blogs",
    });
  }
});

// GET /:id - Fetch single blog by ID
blogRouter.get("/:id", async (c) => {
  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const blogId = c.req.param("id");

    const blog = await prisma.post.findFirst({
      where: { id: blogId },
      select : {
        id : true,
        title : true,
        content : true,
        author: {
          select : {
            name : true,
          }
        }
      }
    });

    return c.json({ blog });
  } catch (error) {
    c.status(500);
    return c.json({
      error: "Error while fetching the blog",
    });
  }
});

export default blogRouter;
