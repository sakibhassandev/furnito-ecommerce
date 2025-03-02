import ForgotPasswordEmail from "@/emails/ForgotPasswordEmail";
import { ApiResponse } from "@/utils/ApiResponse";
import { sendEmail } from "@/lib/brevo";
import { render } from "@react-email/render";

export async function sendForgotPasswordEmail(
  email: string,
  token: string,
  name: string
): Promise<ApiResponse> {
  try {
    const emailHtml = await render(ForgotPasswordEmail({ token, name }));
    sendEmail({
      to: email,
      subject: "Furnito | Reset Your Password",
      content: emailHtml,
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
