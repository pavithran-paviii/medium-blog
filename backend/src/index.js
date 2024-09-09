import { Hono } from "hono";
import blogRouter from "./routes/blog";
import { userRouter } from "./routes/user";
const app = new Hono();
import { cors } from "hono/cors";

app.use("*", cors());

app.route("/api/v1/blog", blogRouter);
app.route("/api/v1/", userRouter);
app.get("/", (c) => {
  return c.text("Welcome to medium blog!");
});
export default app;
