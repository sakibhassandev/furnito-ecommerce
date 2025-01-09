import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";

export async function POST(request: Request) {
  const { address } = await request.json();
  if (!address) {
    return Response.json(new ApiError(404, false, "Address not found!."), {
      status: 404,
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: address.userId,
      },
      select: {
        id: true,
        address: true,
      },
    });

    if (!user) {
      return Response.json(new ApiError(404, false, "User not found!."), {
        status: 404,
      });
    }

    if (user.address.length === 1) {
      const updatedAddress = await prisma.address.update({
        where: {
          id: user.address[0].id,
        },
        data: {
          firstName: address.firstName,
          lastName: address.lastName,
          companyName: address.companyName,
          country: address.country,
          street: address.street,
          state: address.state,
          city: address.city,
          zip: address.zip,
          phone: address.phone,
          email: address.email,
          additionalInfo: address.additionalInfo,
        },
      });

      if (!updatedAddress) {
        return Response.json(new ApiError(400, false, "Address not updated!"), {
          status: 400,
        });
      }

      return Response.json(
        new ApiResponse(
          200,
          true,
          updatedAddress,
          "Address updated successfully."
        ),
        {
          status: 200,
        }
      );
    }

    const createdAddress = await prisma.address.create({
      data: {
        userId: address.userId,
        firstName: address.firstName,
        lastName: address.lastName,
        companyName: address.companyName,
        country: address.country,
        street: address.street,
        state: address.state,
        city: address.city,
        zip: address.zip,
        phone: address.phone,
        email: address.email,
        additionalInfo: address.additionalInfo,
      },
    });

    if (!createdAddress) {
      return Response.json(new ApiError(400, false, "Address not created."), {
        status: 400,
      });
    }

    return Response.json(
      new ApiResponse(
        201,
        true,
        createdAddress,
        "Address created successfully."
      ),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      new ApiError(500, false, "Error while creating address."),
      {
        status: 500,
      }
    );
  }
}
