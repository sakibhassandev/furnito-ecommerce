import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";

export async function POST(request: Request) {
  try {
    const { page = 1 } = await request.json();
    const take = 12;
    const skip = (page - 1) * take;

    const products = await prisma.product.findMany({
      take,
      skip,
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
      },
    });

    if (products.length === 0) {
      return Response.json(new ApiError(404, false, "Products not found."), {
        status: 404,
      });
    }

    if (!products) {
      return Response.json(new ApiError(404, false, "Products not found."), {
        status: 404,
      });
    }

    return Response.json(
      new ApiResponse(200, true, products, "Products found successfully."),
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
