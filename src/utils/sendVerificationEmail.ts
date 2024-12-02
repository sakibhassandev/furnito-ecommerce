import { resend } from "@/lib/resend";
import VerificationEmail from "@/emails/VerificationEmail";
import { ApiResponse } from "@/utils/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  name: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Furnito | Verification Code",
      react: VerificationEmail({ email, name, otp: verifyCode }),
    });

    return {
      success: true,
      message: "verification email sent successfully",
      status: 200,
    };
  } catch (emailErr) {
    console.log("Error sending verification email: ", emailErr);
    return {
      success: false,
      message: "Error sending verification email",
      status: 500,
    };
  }
}
