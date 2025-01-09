import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";

export async function POST(request: Request) {
  const { userId } = await request.json();
  if (!userId) {
    return Response.json(new ApiError(404, false, "User ID not found!."), {
      status: 404,
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        address: true,
      },
    });

    if (!user) {
      return Response.json(new ApiError(404, false, "User not found!."), {
        status: 404,
      });
    }

    return Response.json(
      new ApiResponse(200, true, user, "User address fetched successfully."),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      new ApiError(500, false, "Error while creating address."),
      {
        status: 500,
      }
    );
  }
}
