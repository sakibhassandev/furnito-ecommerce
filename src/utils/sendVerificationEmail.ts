import VerificationEmail from "@/emails/VerificationEmail";
import { ApiResponse } from "@/utils/ApiResponse";
import { sendEmail } from "@/lib/brevo";
import { render } from "@react-email/render";

export async function sendVerificationEmail(
  email: string,
  name: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const emailHtml = await render(
      VerificationEmail({ email, name, otp: verifyCode })
    );
    sendEmail({
      to: email,
      subject: "Furnito | Verification Code",
      content: emailHtml,
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
