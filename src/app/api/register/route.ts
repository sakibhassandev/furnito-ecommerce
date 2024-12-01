import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/utils/sendVerificationEmail";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";

export async function POST(request: Request) {
  try {
    const { name, email, password, confirmPassword } = await request.json();

    if (!name || !email || !password || !confirmPassword) {
      return Response.json(
        new ApiError(400, false, "All fields are required"),
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return Response.json(new ApiError(400, false, "Passwords do not match"), {
        status: 400,
      });
    }

    const existingUserByEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUserByEmail) {
      return Response.json(
        new ApiError(400, false, "User already exists with this email"),
        { status: 400 }
      );
    }

    const verifyCode = Math.floor(100000 + Math.random() * 900000);

    const bcryptSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, bcryptSalt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExp: new Date(Date.now() + 1000 * 60 * 60 * 3),
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

    await sendVerificationEmail(user.email, name, verifyCode);

    return Response.json(new ApiResponse(201, true, user, "User registered"), {
      status: 201,
    });
  } catch (error) {
    console.log("Error registering new user", error);
    return Response.json(
      new ApiError(500, false, "Error registering new user"),
      { status: 500 }
    );
  }
}
