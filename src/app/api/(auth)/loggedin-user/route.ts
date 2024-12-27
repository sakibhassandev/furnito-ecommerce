import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { cookies } from "next/headers";

type JWT = {
  id: string;
  name: string;
  iat: number;
  exp: number;
};

export async function GET() {
  try {
    const token = (await cookies()).get("token");
    if (!token) {
      return Response.json(new ApiError(401, false, "You are not logged in"), {
        status: 401,
      });
    }

    if (!process.env.JWT_SECRET) {
      return Response.json(new ApiError(500, false, "Internal server error"), {
        status: 500,
      });
    }

    const decoded = jwt.verify(token.value, process.env.JWT_SECRET) as JWT;

    const user = await prisma.user.findUnique({
      where: { id: decoded?.id },
      select: {
        id: true,
        name: true,
        email: true,
        isVerified: true,
      },
    });

    return Response.json(
      new ApiResponse(200, true, user, "Current logged in user")
    );
  } catch (error) {
    console.log("Error login user", error);
    return Response.json(new ApiError(500, false, "Error login user"), {
      status: 500,
    });
  }
}
