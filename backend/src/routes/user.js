import { Hono } from "hono";
import { sign } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { hashPassword } from "../assets/functions";
import { signUp, signIn } from "@pavithran_codes/medium-validation";
export const userRouter = new Hono();
userRouter.post("/signup", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    let body = await c.req.json();
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
        let user = await prisma.user.create({
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
    }
    catch (error) {
        if (error instanceof Error) {
            return c.json({
                status: false,
                message: "User already exist or invalid body!",
            });
        }
        else {
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
        let body = await c.req.json();
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
    }
    catch (error) {
        if (error instanceof Error) {
            return c.json({ status: false, message: error.message });
        }
        else {
            return c.json({
                status: false,
                message: "An unknown error occurred while signin",
            });
        }
    }
});
