import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const { otp } = await request.json();

    if (!email) {
      return Response.json(new ApiError(400, false, "Invalid Request."), {
        status: 400,
      });
    }

    if (!otp) {
      return Response.json(new ApiError(400, false, "Otp is required."), {
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

    console.log(user.verifyCode, otp);

    if (user.isVerified) {
      return Response.json(new ApiError(400, false, "User already verified."), {
        status: 400,
      });
    }

    if (!user.verifyCodeExp || user.verifyCodeExp < new Date(Date.now())) {
      return Response.json(
        new ApiError(
          400,
          false,
          "Verification code expired, Resend verification email."
        ),
        { status: 400 }
      );
    }

    if (user.verifyCode !== otp) {
      return Response.json(
        new ApiError(400, false, "Invalid verification code."),
        { status: 400 }
      );
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isVerified: true,
        verifyCode: null,
        verifyCodeExp: null,
      },
    });

    return Response.json(
      new ApiResponse(200, true, user, "User verified Successfully."),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error verifying user.", error);
    return Response.json(new ApiError(500, false, "Error verifying user."), {
      status: 500,
    });
  }
}
