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
            size: true,
            color: true,
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

export async function PUT(request: Request) {
  const { orderId, status } = await request.json();

  if (!orderId || !status) {
    return Response.json(
      new ApiError(404, false, "Order Id or Status Not Found."),
      {
        status: 404,
      }
    );
  }

  try {
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status,
      },
    });

    return Response.json(
      new ApiResponse(200, true, order, "Order updated successfully!"),
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

export async function DELETE(request: Request) {
  const { orderId } = await request.json();

  if (!orderId) {
    return Response.json(new ApiError(404, false, "Order Id Not Found."), {
      status: 404,
    });
  }

  try {
    await prisma.orderItem.deleteMany({
      where: {
        orderId: orderId,
      },
    });

    const order = await prisma.order.delete({
      where: {
        id: orderId,
      },
    });

    return Response.json(
      new ApiResponse(200, true, order, "Order deleted successfully!"),
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
