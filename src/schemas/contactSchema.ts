import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  number: z
    .string()
    .nonempty("Number is required")
    .min(10, "Number must be at least 10 characters"),
  subject: z.string().nonempty("Subject is required"),
  message: z
    .string()
    .nonempty("Message is required")
    .min(20, "Message must be at least 20 characters"),
});
