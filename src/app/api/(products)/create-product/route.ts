import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";

export async function POST(request: Request) {
  const { productData } = await request.json();

  try {
    if (!productData) {
      return Response.json(
        new ApiError(400, false, "Product Data not found!."),
        {
          status: 400,
        }
      );
    }

    const createdProduct = await prisma.product.create({
      data: {
        name: productData.name,
        sku: productData.sku,
        description: productData.description,
        price: productData.price,
        hasDiscount: productData.discount,
        categories: {
          set: productData.categories,
        },
        tags: {
          set: productData.tags,
        },
        sizes: {
          set: productData.sizes,
        },
      },
    });

    if (!createdProduct) {
      return Response.json(new ApiError(404, false, "Product not created"), {
        status: 404,
      });
    }

    return Response.json(
      new ApiResponse(
        200,
        true,
        createdProduct,
        "Products created successfully."
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
