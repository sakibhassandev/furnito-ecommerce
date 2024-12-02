import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { sendVerificationEmail } from "@/utils/sendVerificationEmail";

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return Response.json(new ApiError(400, false, "Invalid Request."), {
        status: 400,
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        verifyCode: true,
        verifyCodeExp: true,
        isVerified: true,
      },
    });

    if (!user) {
      return Response.json(
        new ApiError(400, false, "User not found with this email, try again."),
        {
          status: 400,
        }
      );
    }

    if (user.isVerified) {
      return Response.json(new ApiError(400, false, "User already verified."), {
        status: 400,
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExp = new Date(Date.now() + 1000 * 60 * 60 * 3);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        verifyCode: otp,
        verifyCodeExp: otpExp,
      },
    });

    await sendVerificationEmail(user.email, user.name, otp);

    return Response.json(
      new ApiResponse(
        200,
        true,
        {},
        "New verification code sent successfully to your email."
      ),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error resending verification email user.", error);
    return Response.json(
      new ApiError(500, false, "Error resending verification email user."),
      {
        status: 500,
      }
    );
  }
}
