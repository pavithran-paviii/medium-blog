import { Hono } from "hono";
import { sign } from "hono/jwt";
import { PrismaClient, User } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { hashPassword } from "./assets/functions";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.post("/api/v1/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  let body: { email: string; password: string; name: string } =
    await c.req.json();

  let hashedPassword = await hashPassword(body.password);
  try {
    let user: User = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        name: body.name,
      },
    });

    if (!user) {
      return c.json({ status: false, message: "Error while creating user!" });
    }

    return c.json({ status: true, message: "User created successfully!" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return c.json({ status: false, message: error.message });
    } else {
      return c.json({
        status: false,
        message: "An unknown error occurred signup",
      });
    }
  }
});

app.post("/api/v1/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    let body: { email: string; password: string; name: string } =
      await c.req.json();

    let hashedPassword = await hashPassword(body.password);

    let user = await prisma.user.findUnique({
      where: { email: body.email, password: hashedPassword },
    });

    console.log(user, "user");

    if (!user) {
      return c.json({
        status: false,
        message: "Unable to sign in the user. Invalid email or password",
      });
    }

    let jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
      status: true,
      message: "User sign in successful!",
      token: jwt,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return c.json({ status: false, message: error.message });
    } else {
      return c.json({
        status: false,
        message: "An unknown error occurred while signin",
      });
    }
  }
});

app.post("/api/v1/blog", (c) => {
  return c.text("create blog");
});

app.put("/api/v1/blog", (c) => {
  return c.text("update blog");
});

app.get("/api/v1/blog/:id", (c) => {
  return c.text("Get blog");
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
