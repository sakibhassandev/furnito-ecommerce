import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json(
        new ApiError(400, false, "All fields are required"),
        {
          status: 400,
        }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        isVerified: true,
      },
    });

    if (!user) {
      return Response.json(
        new ApiError(404, false, "User does not exist with this email"),
        { status: 440 }
      );
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return Response.json(new ApiError(400, false, "Invalid password"), {
        status: 400,
      });
    }

    if (!user.isVerified) {
      return Response.json(
        new ApiError(400, false, "Please verify your account first to login"),
        {
          status: 400,
        }
      );
    }

    if (!process.env.JWT_SECRET) {
      return Response.json(new ApiError(500, false, "JWT secret not set"), {
        status: 500,
      });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: "3h",
      }
    );

    (await cookies()).set("token", token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 3),
      httpOnly: true,
    });

    user.password = "";
    return Response.json(
      new ApiResponse(200, true, user, "Your are logged in")
    );
  } catch (error) {
    console.log("Error login user", error);
    return Response.json(new ApiError(500, false, "Error login user"), {
      status: 500,
    });
  }
}
