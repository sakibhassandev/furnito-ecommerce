"use server";

import { registerSchema } from "@/schemas/registerSchema";
import { ApiError } from "@/utils/ApiError";
import axios, { AxiosError } from "axios";
import { z } from "zod";

export const signUp = async (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
): Promise<z.infer<typeof registerSchema>> => {
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  try {
    const response = await axios.post("/api/auth/signup", {
      name,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    const AxiosError = error as AxiosError<ApiError>;
    throw new Error(AxiosError.message);
  }
};
