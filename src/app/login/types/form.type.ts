import z from "zod";

export const loginFormSchema = z.object({
  email: z.email({
    error: (issue) => (issue.input === "" ? "Email is required" : "Invalid Email"),
  }),
  password: z.string().min(6, "Your password must be at least 6 characters long"),
});

export type FormValues = z.infer<typeof loginFormSchema>;
