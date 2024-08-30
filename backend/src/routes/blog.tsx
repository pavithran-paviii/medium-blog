import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createBlog, updateBlog } from "../../../common/src/index";

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const token = c.req.header("authorization")?.split(" ")[1] || "";
  try {
    const user = (await verify(token, c.env.JWT_SECRET)) as { id: string };
    if (user) {
      c.set("userId", user.id);
      await next();
    } else {
      c.status(403);
      return c.json({
        status: false,
        message: "Authentication issue, please logout & try again!",
      });
    }
  } catch (error) {
    c.status(403);
    return c.json({
      status: false,
      message: "Invalid token, please logout & try again!",
    });
  }
});

blogRouter.post("", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body: { title: string; content: string } = await c.req.json();

  const { success } = createBlog.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      status: false,
      message: "User inputs are not correct!",
    });
  }

  const authorId = c.get("userId");

  try {
    const blog = await prisma.post.create({
      data: {
        title: body?.title,
        content: body?.content,
        authorId,
      },
    });

    if (!blog) {
      return c.json({
        status: false,
        message: "Error while trying to create blog!",
      });
    }

    return c.json({
      status: true,
      message: "Blog created successfully!",
    });
  } catch (error) {
    return c.json({
      status: false,
      message: "Server error while creating blog!",
    });
  }
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  });

  try {
    const body: {
      title: string;
      content: string;
      published: boolean;
      id: string;
    } = await c.req.json();
    const authorId = c.get("userId");

    const { success } = updateBlog.safeParse(body);

    if (!success) {
      c.status(411);
      return c.json({
        status: false,
        message: "User inputs are not correct!",
      });
    }

    const blog = await prisma.post.update({
      where: {
        id: body?.id,
        authorId,
      },
      data: {
        title: body?.title,
        content: body?.content,
        published: body?.published,
      },
    });

    c.status(200);
    return c.json({
      status: true,
      data: blog,
      message: "Blog updated successfully!",
    });
  } catch (error) {
    c.status(500);
    return c.json({
      status: false,
      message: "Error while trying to edit blog",
    });
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const allBlogs = await prisma.post.findMany();

    if (allBlogs?.length > 0) {
      c.status(200);
      return c.json({
        status: true,
        data: allBlogs,
        message: "All blogs fetched!",
      });
    } else {
      c.status(200);
      return c.json({
        status: true,
        message: "No blogs found!",
      });
    }
  } catch (error) {
    c.status(500);
    return c.json({
      status: false,
      message: "Error while trying to get bulk articles",
    });
  }
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const id = c.req.param("id");
    const blog = await prisma.post.findFirst({
      where: {
        id: id,
      },
    });

    if (blog) {
      c.status(200);
      return c.json({
        status: true,
        data: blog,
        message: "All blogs fetched!",
      });
    } else {
      c.status(404);
      return c.json({
        status: false,
        message: "Blogs doesn't exist!",
      });
    }
  } catch (error) {
    c.status(500);
    return c.json({
      status: false,
      message: "Error while trying to get single blog",
    });
  }
});

export default blogRouter;
