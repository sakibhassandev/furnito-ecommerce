import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");

  try {
    if (!productId) {
      return Response.json(new ApiError(400, false, "Product ID not found!."), {
        status: 400,
      });
    }

    const product = await prisma.product.findFirst({
      where: {
        id: productId,
      },
      include: {
        images: {
          select: {
            url: true,
            color: true,
          },
        },
        colors: {
          select: {
            name: true,
            image: true,
          },
        },
        reviews: {
          select: {
            name: true,
            rating: true,
            message: true,
          },
        },
      },
    });

    if (!product) {
      return Response.json(new ApiError(404, false, "Products not found."), {
        status: 404,
      });
    }

    return Response.json(
      new ApiResponse(200, true, product, "Products found successfully."),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error getting products.", error);
    return Response.json(new ApiError(500, false, "Error getting products."), {
      status: 500,
    });
  }
}
