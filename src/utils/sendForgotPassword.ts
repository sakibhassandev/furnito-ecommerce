import { resend } from "@/lib/resend";
import ForgotPasswordEmail from "@/emails/ForgotPasswordEmail";
import { ApiResponse } from "@/utils/ApiResponse";

export async function sendForgotPasswordEmail(
  email: string,
  token: string,
  name: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Furnito | Reset Your Password",
      react: ForgotPasswordEmail({ token, name }),
    });

    return {
      success: true,
      message: "Forgot password email sent successfully",
      status: 200,
    };
  } catch (emailErr) {
    console.log("Error sending forgot password email: ", emailErr);
    return {
      success: false,
      message: "Error sending forgot password email",
      status: 500,
    };
  }
}
