import { prisma } from "@/lib/prisma";
import { sendForgotPasswordEmail } from "@/utils/sendForgotPassword";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return Response.json(new ApiError(400, false, "Email is required"), {
        status: 400,
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      return Response.json(
        new ApiError(400, false, "User with this email does not exist"),
        { status: 400 }
      );
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetExp = new Date(Date.now() + 1000 * 60 * 60 * 3);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        forgotPasswordToken: resetToken,
        forgotPasswordExp: resetExp,
      },
    });

    await sendForgotPasswordEmail(user.email, resetToken, user.name);

    return Response.json(
      new ApiResponse(
        200,
        true,
        user,
        "Forgot password email sent successfully"
      ),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log("Error sending forgot password email.", error);
    return Response.json(
      new ApiError(500, false, "Error sending forgot password email."),
      { status: 500 }
    );
  }
}
