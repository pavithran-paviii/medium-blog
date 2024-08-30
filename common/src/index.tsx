import z from "zod";

export const signIn = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const signUp = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string(),
});

export const createBlog = z.object({
  title: z.string(),
  content: z.string(),
});

export const updateBlog = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  published: z.boolean().optional(),
  id: z.string(),
});

//type inference for frontend
export type SignIn = z.infer<typeof signIn>;
export type SignUp = z.infer<typeof signUp>;
export type CreateBlog = z.infer<typeof createBlog>;
export type UpdateBlog = z.infer<typeof updateBlog>;
