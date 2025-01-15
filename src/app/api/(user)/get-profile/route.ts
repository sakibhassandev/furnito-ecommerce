import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return Response.json(
        new ApiError(
          401,
          false,
          "You are not authorized to access this route."
        ),
        {
          status: 401,
        }
      );
    }
    const user = await prisma.user.findUnique({
      where: {
        id: session?.user?.id,
      },
      select: {
        name: true,
        email: true,
        address: true,
        reviews: true,
        orders: true,
        createdAt: true,
      },
    });

    if (!user) {
      return Response.json(new ApiError(404, false, "User not found!."), {
        status: 404,
      });
    }

    return Response.json(
      new ApiResponse(200, true, user, "User profile fetched successfully.")
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      new ApiError(500, false, "Error while fetching user profile.")
    );
  }
}
