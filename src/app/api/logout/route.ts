import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const token = (await cookies()).get("token");
    if (!token) {
      return Response.json(
        new ApiError(401, false, "Unauthorized not logged in"),
        { status: 401 }
      );
    }

    (await cookies()).delete("token");

    return Response.json(
      new ApiResponse(200, true, "User logged out successfully"),
      { status: 200 }
    );
  } catch (error) {
    console.log("Error logging out user", error);
    throw new ApiError(500, false, "Error logging out user");
  }
}
