import { Hono } from "hono";
import { sign } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signinInput, signupInput } from "@its.mayank7/medium-common";
import bcrypt from "bcryptjs";

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET_KEY: string;
  };
}>();

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

    return c.json({ jwt: token });
  } catch (e: any) {
    c.status(500);
    return c.json({ error: e.message });
  }
});

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

    return c.json({ jwt: token });
  } catch (e: any) {
    c.status(500);
    return c.json({ error: "Error while signing in" });
  }
});

export default userRouter;
