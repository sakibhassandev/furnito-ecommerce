import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";

type colorType = {
  name: string;
  images?: { url: string; publicId: string }[];
  colorImage?: { url: string; publicId: string };
};

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
            publicId: true,
          },
        },
        colors: {
          select: {
            name: true,
            image: true,
            publicId: true,
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
            data: productData.colors.map((color: colorType) => ({
              name: color.name,
              image: color.colorImage?.url,
              publicId: color.colorImage?.publicId,
            })),
          },
        },
        images: {
          createMany: {
            data: productData.colors.map((color: colorType) => ({
              url: color.images?.map((image) => image.url),
              publicId: color.images?.map((image) => image.publicId),
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

export async function PUT(request: Request) {
  const { productData } = await request.json();
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");

  try {
    if (!productData || !productId) {
      return Response.json(
        new ApiError(400, false, "Product Data or ID not found!."),
        {
          status: 400,
        }
      );
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id: productId,
      },
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
          deleteMany: {},
          createMany: {
            data: productData.colors.map((color: colorType) => ({
              name: color.name,
              image: color.colorImage?.url,
              publicId: color.colorImage?.publicId,
            })),
          },
        },
        images: {
          deleteMany: {},
          createMany: {
            data: productData.colors.map((color: colorType) => ({
              url: color.images?.map((image) => image.url),
              publicId: color.images?.map((image) => image.publicId),
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

    if (!updatedProduct) {
      return Response.json(new ApiError(404, false, "Product not created"), {
        status: 404,
      });
    }

    return Response.json(
      new ApiResponse(
        200,
        true,
        updatedProduct,
        "Products updated successfully."
      ),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error updating products.", error);
    return Response.json(new ApiError(500, false, "Error updating products."), {
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
    const deletedImagesData = await prisma.productImages.findMany({
      where: {
        productId: productId,
      },
    });

    const deletedColorsData = await prisma.colors.findMany({
      where: {
        productId: productId,
      },
    });

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

    await prisma.order.deleteMany({
      where: {
        orderItems: {
          none: {},
        },
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
      include: {
        images: true,
        colors: true,
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
        { deletedProduct, deletedImagesData, deletedColorsData },
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
