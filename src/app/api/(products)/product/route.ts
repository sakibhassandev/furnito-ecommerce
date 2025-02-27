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
            updatedAt: true,
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
        colors: {
          createMany: {
            data: productData.colors.map((color) => ({
              name: color.name,
              image: color.colorImage.url,
            })),
          },
        },
        images: {
          createMany: {
            data: productData.colors.map((color) => ({
              url: color.images.map((image) => image.url),
              color: color.name,
            })),
          },
        },
      },
      include: {
        images: true,
        colors: true,
      },
    });

    console.log(createdProduct);

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

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");

  try {
    if (!productId) {
      return Response.json(new ApiError(400, false, "Product ID not found!."), {
        status: 400,
      });
    }

    // Delete associated images, colors, orderItem and reviews
    await prisma.productImages.deleteMany({
      where: {
        productId: productId,
      },
    });

    await prisma.colors.deleteMany({
      where: {
        productId: productId,
      },
    });

    await prisma.orderItem.deleteMany({
      where: {
        productId: productId,
      },
    });

    await prisma.review.deleteMany({
      where: {
        productId: productId,
      },
    });

    const deletedProduct = await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    if (!deletedProduct) {
      return Response.json(new ApiError(404, false, "Product not found."), {
        status: 404,
      });
    }

    return Response.json(
      new ApiResponse(
        200,
        true,
        deletedProduct,
        "Product deleted successfully."
      ),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error deleting products.", error);
    return Response.json(new ApiError(500, false, "Error deleting products."), {
      status: 500,
    });
  }
}
