import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import { PrismaClient, User } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { hashPassword } from "../assets/functions";
import { signUp, signIn, SignUp } from "@pavithran_codes/medium-validation";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  let body: { email: string; password: string; name: string } =
    await c.req.json();

  const { success } = signUp.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      status: false,
      message: "User inputs are not correct!",
    });
  }

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

    let jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
      status: true,
      message: "User created successfully!",
      token: jwt,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return c.json({
        status: false,
        message: "User already exist or invalid body!",
      });
    } else {
      return c.json({
        status: false,
        message: "An unknown error occurred signup",
      });
    }
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    let body: { email: string; password: string; name: string } =
      await c.req.json();

    const { success } = signIn.safeParse(body);

    if (!success) {
      c.status(411);
      return c.json({
        status: false,
        message: "User inputs are not correct!",
      });
    }

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

userRouter.get(
  "/me",
  async (c, next) => {
    const token = c.req.header("authorization")?.split(" ")[1] || "";

    try {
      const user = (await verify(token, c.env.JWT_SECRET)) as {
        id: string;
      };
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
  },
  async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
      const userId = c.get("userId");
      const user = await prisma.user.findFirst({
        where: { id: userId },
      });

      if (user) {
        c.status(200);
        return c.json({
          status: true,
          data: { name: user?.name, id: user?.id, email: user?.email },
          message: "User details fetched!",
        });
      } else {
        c.status(404);
        return c.json({
          status: false,
          message: "User doesn't exist!",
        });
      }
    } catch (error) {
      c.status(500);
      return c.json({
        status: false,
        message: "Error while trying to get user details",
      });
    }
  }
);
