import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";

interface OrderItem {
  id: string;
  paymentMethod: string;
  total: number;
  quantity: number;
  color: string;
  size: string;
}

export async function POST(request: Request) {
  const { userId, orderItems, paymentMethod, total, status, deliveryCharge } =
    await request.json();

  if (
    !userId ||
    !orderItems ||
    !paymentMethod ||
    !total ||
    !status ||
    !deliveryCharge
  ) {
    return Response.json(
      new ApiError(404, false, "Missing required fields!."),
      {
        status: 404,
      }
    );
  }

  //   generating tracking number
  const trackingNumber = `TRACK${Math.floor(Math.random() * 1000000000)}`;

  try {
    const order = await prisma.order.create({
      data: {
        userId,
        orderItems: {
          create: orderItems.map((item: OrderItem) => ({
            productId: item.id,
            quantity: item.quantity,
            color: item.color,
            size: item.size,
          })),
        },
        trackingNumber,
        paymentMethod,
        total,
        status,
        deliveryCharge,
      },
      select: {
        orderItems: {
          select: {
            orderId: true,
            product: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        paymentMethod: true,
        total: true,
        status: true,
        orderDate: true,
      },
    });

    if (!order) {
      return Response.json(new ApiError(404, false, "Order not created!"), {
        status: 404,
      });
    }

    return Response.json(
      new ApiResponse(201, true, order, "Order has been placed."),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
    return Response.json(new ApiError(500, false, "Internal Server Error"), {
      status: 500,
    });
  }
}
