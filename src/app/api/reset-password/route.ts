import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return Response.json(
        new ApiError(400, false, "Please provide current and new password."),
        { status: 400 }
      );
    }

    if (currentPassword === newPassword) {
      return Response.json(
        new ApiError(400, false, "Current and new password cannot be same."),
        { status: 400 }
      );
    }

    if (!token) {
      return Response.json(
        new ApiError(400, false, "No token found try again."),
        {
          status: 400,
        }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        forgotPasswordToken: token,
      },
      select: {
        id: true,
        email: true,
        forgotPasswordToken: true,
        forgotPasswordExp: true,
        isVerified: true,
      },
    });

    if (!user) {
      return Response.json(
        new ApiError(400, false, "Invalid token or expired, try again."),
        {
          status: 400,
        }
      );
    }

    if (
      !user.forgotPasswordExp ||
      user.forgotPasswordExp < new Date(Date.now())
    ) {
      return Response.json(
        new ApiError(400, false, "Token expired, try again."),
        { status: 400 }
      );
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
        forgotPasswordToken: null,
        forgotPasswordExp: null,
      },
    });

    return Response.json(
      new ApiResponse(200, true, {}, "Password reset successfully."),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error resetting password.", error);
    return Response.json(
      new ApiError(500, false, "Error resetting password."),
      { status: 500 }
    );
  }
}
