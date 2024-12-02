import { z } from "zod";

export const ResetPasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .nonempty("Current password is required")
      .min(8, "Current password must be at least 8 characters"),
    newPassword: z.string().nonempty("New password is required"),
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password cannot be the same as the current password",
    path: ["newPassword"],
  });
