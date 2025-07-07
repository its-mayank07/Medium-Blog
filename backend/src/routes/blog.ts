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
    const userId = c.get("userId");

    const {success} = updateBlogInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({message : "Inputs not correct"})
    }

    // First check if the blog exists and user is the author
    const existingBlog = await prisma.post.findFirst({
      where: {
        id: body.id,
        authorId: userId,
      },
    });

    if (!existingBlog) {
      c.status(403);
      return c.json({ error: "You can only update your own blogs" });
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
    console.error("Update blog error:", err);
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
        publishedAt : true,
        author : {
          select : {
            name : true,
            id : true
          }
        }
      },
      orderBy: {
        publishedAt: "desc"
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

blogRouter.get("/us", async (c) => {
  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const userId = c.get("userId");


     const blog = await prisma.post.findMany({
      where : {
        authorId : userId
      },
      select : {
        title : true,
        id : true,
        content : true,
        publishedAt : true,
        author : {
          select : {
            name : true,
            id : true
          }
        }
      },
      orderBy: {
        publishedAt: "desc"
      }
     });

    return c.json({ blog });
  } catch (error) {
    c.status(500);
    return c.json({
      error: "Error while fetching the blogs of the user",
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
        publishedAt : true,
        author: {
          select : {
            name : true,
            id : true
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

blogRouter.delete("/:id", async (c) => {
  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const blogId = c.req.param("id");
    const userId = c.get("userId");

    // First check if the blog exists and user is the author
    const existingBlog = await prisma.post.findFirst({
      where: {
        id: blogId,
        authorId: userId,
      },
    });

    if (!existingBlog) {
      c.status(403);
      return c.json({ error: "You can only delete your own blogs" });
    }

    // Delete the blog (comments will be automatically deleted due to cascade)
    await prisma.post.delete({
      where: {
        id: blogId,
      },
    });

    return c.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Delete blog error:", error);
    c.status(500);
    return c.json({
      error: "Error while deleting the blog",
    });
  }
});

// POST /:id/comment - Create a comment on a blog post
blogRouter.post("/:id/comment", async (c) => {
  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const blogId = c.req.param("id");
    const userId = c.get("userId");
    const body = await c.req.json();
    
    // Validate input
    if (!body.content || typeof body.content !== "string" || body.content.trim().length === 0) {
      c.status(400);
      return c.json({ error: "Comment content is required" });
    }

    const comment = await prisma.comment.create({
      data: {
        content: body.content.trim(),
        authorId: userId,
        postId: blogId,
      },
      include: {
        author: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });

    return c.json({ comment });
  } catch (error) {
    c.status(500);
    return c.json({
      error: "Error while creating comment",
    });
  }
});

// GET /:id/comments - Get all comments for a blog post
blogRouter.get("/:id/comments", async (c) => {
  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const blogId = c.req.param("id");

    const comments = await prisma.comment.findMany({
      where: {
        postId: blogId,
      },
      include: {
        author: {
          select: {
            name: true,
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return c.json({ comments });
  } catch (error) {
    c.status(500);
    return c.json({
      error: "Error while fetching comments",
    });
  }
});

// PUT /:id/comment/:commentId - Update a comment
blogRouter.put("/:id/comment/:commentId", async (c) => {
  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const commentId = c.req.param("commentId");
    const userId = c.get("userId");
    const body = await c.req.json();
    
    // Validate input
    if (!body.content || typeof body.content !== "string" || body.content.trim().length === 0) {
      c.status(400);
      return c.json({ error: "Comment content is required" });
    }

    // Check if comment exists and user is the author
    const existingComment = await prisma.comment.findFirst({
      where: {
        id: commentId,
        authorId: userId,
      },
    });

    if (!existingComment) {
      c.status(403);
      return c.json({ error: "You can only edit your own comments" });
    }

    const comment = await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        content: body.content.trim(),
      },
      include: {
        author: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });

    return c.json({ comment });
  } catch (error) {
    c.status(500);
    return c.json({
      error: "Error while updating comment",
    });
  }
});

// DELETE /:id/comment/:commentId - Delete a comment
blogRouter.delete("/:id/comment/:commentId", async (c) => {
  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const commentId = c.req.param("commentId");
    const userId = c.get("userId");

    // Check if comment exists and user is the author
    const existingComment = await prisma.comment.findFirst({
      where: {
        id: commentId,
        authorId: userId,
      },
    });

    if (!existingComment) {
      c.status(403);
      return c.json({ error: "You can only delete your own comments" });
    }

    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    return c.json({ message: "Comment deleted successfully" });
  } catch (error) {
    c.status(500);
    return c.json({
      error: "Error while deleting comment",
    });
  }
});

export default blogRouter;
