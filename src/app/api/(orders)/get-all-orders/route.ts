import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";

export async function POST(request: Request) {
  const { userId } = await request.json();
  console.log(userId);

  if (!userId) {
    return Response.json(
      new ApiError(404, false, "User Id Not Found Or User Not Logged In."),
      {
        status: 404,
      }
    );
  }

  try {
    const orders = await prisma.order.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        orderItems: {
          select: {
            product: {
              include: {
                images: true,
              },
            },
            quantity: true,
          },
        },
        paymentMethod: true,
        total: true,
        status: true,
        orderDate: true,
      },
    });

    if (!orders) {
      return Response.json(new ApiError(404, false, "Orders not found"), {
        status: 404,
      });
    }

    return Response.json(
      new ApiResponse(200, true, orders, "Orders fetched successfully!"),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return Response.json(new ApiError(500, false, "Internal Server Error"), {
      status: 500,
    });
  }
}
