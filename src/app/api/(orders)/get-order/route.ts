import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";

export async function POST(request: Request) {
  const { orderId } = await request.json();

  if (!orderId) {
    return Response.json(new ApiError(404, false, "Order Id Not Found."), {
      status: 404,
    });
  }

  try {
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
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
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            address: {
              select: {
                street: true,
                city: true,
                state: true,
                country: true,
                zip: true,
              },
            },
          },
        },
        paymentMethod: true,
        total: true,
        status: true,
        trackingNumber: true,
        orderDate: true,
        deliveryCharge: true,
      },
    });

    if (!order) {
      return Response.json(new ApiError(404, false, "Order not found"), {
        status: 404,
      });
    }

    return Response.json(
      new ApiResponse(200, true, order, "Order fetched successfully!"),
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
