import { Hono } from "hono";
import blogRouter from "./routes/blog";
import { userRouter } from "./routes/user";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.route("/api/v1/blog", blogRouter);
app.route("/api/v1/", userRouter);

app.get("/", (c) => {
  return c.text("Welcome to medium blog!");
});

export default app;
