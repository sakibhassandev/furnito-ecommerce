import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";

export async function POST(request: Request) {
  const { orderId, rating, message } = await request.json();

  try {
    if (!orderId || !rating || !message) {
      return Response.json(new ApiError(400, false, "All fields required"), {
        status: 400,
      });
    }

    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
      select: {
        isReviewed: true,
        userId: true,
        user: { select: { name: true } },
        orderItems: true,
      },
    });

    if (!order) {
      return Response.json(new ApiError(404, false, "Order not found"), {
        status: 404,
      });
    }

    if (order.isReviewed) {
      return Response.json(new ApiError(400, false, "Order already reviewed"), {
        status: 400,
      });
    }

    const createdReviews = await Promise.all(
      order.orderItems.map(async (item) => {
        return await prisma.review.create({
          data: {
            productId: item.productId,
            authorId: order.userId,
            name: order.user.name,
            message,
            rating,
          },
        });
      })
    );

    if (createdReviews.length === 0) {
      return Response.json(new ApiError(404, false, "Reviews not created"), {
        status: 404,
      });
    } else {
      await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          isReviewed: true,
        },
      });
    }

    return Response.json(
      new ApiResponse(
        200,
        true,
        createdReviews,
        "Reviews created successfully."
      ),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error creating products.", error);
    return Response.json(new ApiError(500, false, "Error creating products."), {
      status: 500,
    });
  }
}
