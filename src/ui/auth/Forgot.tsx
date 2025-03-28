"use client";

import Link from "next/link";
import { AuthParticles } from "./AuthParticles";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { forgotPasswordSchema } from "@/schemas/forgotPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios, { AxiosError } from "axios";
import { ApiError } from "@/utils/ApiError";
import { Loader2 } from "lucide-react";

export const Forgot = () => {
  // Form & Error States
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  // Submit Handler
  const onSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
    try {
      const response = await axios.post("/api/forgot-password", {
        email: data.email,
      });
      toast.success(
        `Hey, ${response.data.data.name}. Check your email for password reset link!`,
        {
          position: "top-center",
          autoClose: 2000,
          theme: "light",
        }
      );
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      toast.error(axiosError.response?.data.message || "Something went wrong", {
        position: "top-center",
        autoClose: 2000,
        theme: "light",
      });
    }
    reset();
  };

  return (
    <section className="forgot py-28">
      <div className="mx-auto b-container">
        <div className="relative z-10 forgot_container">
          {<AuthParticles />}
          <div className="flex justify-center">
            <div className="w-full max-w-full mx-5 xl:w-1/2 lg:w-2/3 md:w-10/12">
              <div className="max-xl:p-[50px_45px_55px] xl:p-[50px_60px_55px] max-2xl:p-[50px_85px_55px] bg-white shadow-[0_30px_60px_rgba(3,4,28,.1)]">
                <div className="mb-8 text-center text">
                  <h3 className="mb-3 text-3xl font-semibold forgot__title">
                    Forgot Password?
                  </h3>
                  <p className="text-[#525258] max-sm:text-sm">
                    Enter your email address to request password reset.
                  </p>
                </div>
                <div className="form">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input_wrappers">
                      <div className="relative mb-5 input_item">
                        <div className="relative input">
                          <input
                            {...register("email")}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            className="bg-white focus:border-[#B88E2F] rounded ease-out duration-300 outline-none border w-full text-sm border-[#eaeaef] pl-14 pr-12 h-14"
                          />
                          <span className="absolute -translate-y-1/2 top-1/2 left-7">
                            <svg
                              width={16}
                              height={14}
                              viewBox="0 0 16 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11.5 12.9H4.5C2.4 12.9 1 11.85 1 9.4V4.5C1 2.05 2.4 1 4.5 1H11.5C13.6 1 15 2.05 15 4.5V9.4C15 11.85 13.6 12.9 11.5 12.9Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeMiterlimit={10}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M11.5 4.85059L9.309 6.60059C8.588 7.17459 7.405 7.17459 6.684 6.60059L4.5 4.85059"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeMiterlimit={10}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-red-500 error">
                          {errors.email?.message as string}
                        </p>
                      </div>
                    </div>
                    <div className="send-request__btn">
                      <button
                        disabled={isSubmitting}
                        type="submit"
                        className="relative disabled:opacity-50 text-lg mb-5 cursor-pointer inline-block text-white rounded-sm ease-linear duration-300 hover:bg-[#96732B] font-semibold bg-[#B88E2F] text-center p-[17px_30px]  w-full"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="animate-spin absolute left-[28%] top-1/4 w-7 h-7" />{" "}
                            Sending Request
                          </>
                        ) : (
                          "Send Request"
                        )}
                      </button>
                    </div>
                  </form>
                  <div className="text-center">
                    <p className="text-[#525258] text-sm">
                      Remember your password? &nbsp;
                      <Link
                        href="/login"
                        className="text-[#B88E2F] hover:text-[#96732B] ease-out duration-300 font-semibold"
                      >
                        Login
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
