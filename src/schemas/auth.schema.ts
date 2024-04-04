import * as z from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "username harus diisi"),
  password: z.string().min(6, "minimal 6 karakter"),
});
