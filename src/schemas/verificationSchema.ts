import { z } from "zod";

export const verificationSchema = z.object({
  code: z
    .array(z.string().length(1).regex(/^\d$/))
    .length(6, "Verification code must be 6 digits"),
});
