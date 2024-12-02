"use client";

import { useState } from "react";
import Link from "next/link";
import { LuEye, LuLoader2 } from "react-icons/lu";
import { AuthParticles } from "./AuthParticles";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { ApiError } from "@/utils/ApiError";
import { useRouter, useSearchParams } from "next/navigation";
import { ResetPasswordSchema } from "@/schemas/ResetPasswordSchema";

export const ResetPassword = () => {
  const router = useRouter();
  const params = useSearchParams();

  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isConfirmPasswordShow, setIsConfirmPasswordShow] = useState(false);

  // Form & Error States
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  // Submit Handler
  const onSubmit = async (data: z.infer<typeof ResetPasswordSchema>) => {
    console.log(data); // TODO: REMOVE
    try {
      const response = await axios.post(
        `/api/reset-password?token=${params.get("token")}`,
        data
      );
      console.log(response);
      toast.success(
        `Hey, ${response.data.data.name}. Your password has been reset successfully!`,
        {
          position: "top-center",
          autoClose: 2000,
          theme: "light",
        }
      );
      router.push("/login");
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
    <section className="login py-28">
      <div className="mx-auto b-container">
        <div className="relative z-10 login_container">
          {<AuthParticles />}
          <div className="flex justify-center">
            <div className="w-full max-w-full mx-5 xl:w-1/2 lg:w-2/3 md:w-10/12">
              <div className="max-xl:p-[50px_45px_55px] xl:p-[50px_60px_55px] max-2xl:p-[50px_85px_55px] bg-white shadow-[0_30px_60px_rgba(3,4,28,.1)]">
                <div className="mb-8 text-center text">
                  <h3 className="mb-3 text-3xl font-semibold login__title">
                    Reset your password!
                  </h3>
                  <p className="text-[#525258] max-sm:text-sm">
                    Enter the current and new password to reset your password.
                  </p>
                </div>
                <div className="form">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input_wrappers">
                      <div className="relative mb-5 input_item">
                        <div className="relative input">
                          <input
                            {...register("currentPassword")}
                            type={isPasswordShow ? "text" : "password"}
                            name="currentPassword"
                            id="currentPassword"
                            placeholder="Current Password"
                            className="bg-white focus:border-[#f50963] rounded ease-out duration-300 outline-none border w-full text-sm border-[#eaeaef] pl-14 pr-12 h-14"
                          />
                          <span className="absolute -translate-y-1/2 top-1/2 left-7">
                            <svg
                              width={18}
                              height={18}
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.20312 7.4V5.8C4.20312 3.152 5.00312 1 9.00312 1C13.0031 1 13.8031 3.152 13.8031 5.8V7.4"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M9 14.2C10.1046 14.2 11 13.3045 11 12.2C11 11.0954 10.1046 10.2 9 10.2C7.89543 10.2 7 11.0954 7 12.2C7 13.3045 7.89543 14.2 9 14.2Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M13 17H5C1.8 17 1 16.2 1 13V11.4C1 8.20002 1.8 7.40002 5 7.40002H13C16.2 7.40002 17 8.20002 17 11.4V13C17 16.2 16.2 17 13 17Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span
                            onClick={() => setIsPasswordShow(!isPasswordShow)}
                            className={`${
                              isPasswordShow ? "hidden" : ""
                            } absolute -translate-y-1/2 cursor-pointer right-6 login-input-eye top-1/2`}
                          >
                            <svg
                              width={17}
                              height={18}
                              viewBox="0 0 17 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.4028 7.1025L6.60781 10.8975C6.12031 10.41 5.82031 9.7425 5.82031 9C5.82031 7.515 7.02031 6.315 8.50531 6.315C9.24781 6.315 9.91531 6.615 10.4028 7.1025Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M12.86 4.32748C11.5475 3.33748 10.0475 2.79749 8.495 2.79749C5.8475 2.79749 3.38 4.35748 1.6625 7.05748C0.9875 8.11498 0.9875 9.89248 1.6625 10.95C2.255 11.88 2.945 12.6825 3.695 13.3275"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M5.82031 14.6475C6.67531 15.0075 7.58281 15.2025 8.50531 15.2025C11.1528 15.2025 13.6203 13.6425 15.3378 10.9425C16.0128 9.88504 16.0128 8.10754 15.3378 7.05004C15.0903 6.66004 14.8203 6.29254 14.5428 5.94754"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M11.1306 9.52505C10.9356 10.5826 10.0731 11.4451 9.01562 11.6401"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M6.6025 10.8975L1 16.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M16.0009 1.5L10.3984 7.1025"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <LuEye
                            onClick={() => setIsPasswordShow(!isPasswordShow)}
                            className={`${
                              isPasswordShow ? "" : "hidden"
                            } absolute text-xl -translate-y-1/2 cursor-pointer right-6 login-input-eye top-1/2`}
                          />
                        </div>
                        <p className="mt-1 text-sm text-red-500 error">
                          {errors.currentPassword?.message as string}
                        </p>
                      </div>
                      <div className="relative mb-5 input_item">
                        <div className="relative input">
                          <input
                            {...register("newPassword")}
                            type={isConfirmPasswordShow ? "text" : "password"}
                            name="newPassword"
                            id="newPassword"
                            placeholder="New Password"
                            className="bg-white focus:border-[#f50963] rounded ease-out duration-300 outline-none border w-full text-sm border-[#eaeaef] pl-14 pr-12 h-14"
                          />
                          <span className="absolute -translate-y-1/2 top-1/2 left-7">
                            <svg
                              width={18}
                              height={18}
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.20312 7.4V5.8C4.20312 3.152 5.00312 1 9.00312 1C13.0031 1 13.8031 3.152 13.8031 5.8V7.4"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M9 14.2C10.1046 14.2 11 13.3045 11 12.2C11 11.0954 10.1046 10.2 9 10.2C7.89543 10.2 7 11.0954 7 12.2C7 13.3045 7.89543 14.2 9 14.2Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M13 17H5C1.8 17 1 16.2 1 13V11.4C1 8.20002 1.8 7.40002 5 7.40002H13C16.2 7.40002 17 8.20002 17 11.4V13C17 16.2 16.2 17 13 17Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span
                            onClick={() =>
                              setIsConfirmPasswordShow(!isConfirmPasswordShow)
                            }
                            className={`${
                              isConfirmPasswordShow ? "hidden" : ""
                            } absolute -translate-y-1/2 cursor-pointer right-6 login-input-eye top-1/2`}
                          >
                            <svg
                              width={17}
                              height={18}
                              viewBox="0 0 17 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.4028 7.1025L6.60781 10.8975C6.12031 10.41 5.82031 9.7425 5.82031 9C5.82031 7.515 7.02031 6.315 8.50531 6.315C9.24781 6.315 9.91531 6.615 10.4028 7.1025Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M12.86 4.32748C11.5475 3.33748 10.0475 2.79749 8.495 2.79749C5.8475 2.79749 3.38 4.35748 1.6625 7.05748C0.9875 8.11498 0.9875 9.89248 1.6625 10.95C2.255 11.88 2.945 12.6825 3.695 13.3275"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M5.82031 14.6475C6.67531 15.0075 7.58281 15.2025 8.50531 15.2025C11.1528 15.2025 13.6203 13.6425 15.3378 10.9425C16.0128 9.88504 16.0128 8.10754 15.3378 7.05004C15.0903 6.66004 14.8203 6.29254 14.5428 5.94754"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M11.1306 9.52505C10.9356 10.5826 10.0731 11.4451 9.01562 11.6401"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M6.6025 10.8975L1 16.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M16.0009 1.5L10.3984 7.1025"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <LuEye
                            onClick={() =>
                              setIsConfirmPasswordShow(!isConfirmPasswordShow)
                            }
                            className={`${
                              isConfirmPasswordShow ? "" : "hidden"
                            } absolute text-xl -translate-y-1/2 cursor-pointer right-6 login-input-eye top-1/2`}
                          />
                        </div>
                        <p className="mt-1 text-sm text-red-500 error">
                          {errors.newPassword?.message as string}
                        </p>
                      </div>
                    </div>
                    <div className="register__btn">
                      <button
                        disabled={isSubmitting}
                        type="submit"
                        className="relative disabled:opacity-50 text-lg mb-5 cursor-pointer inline-block text-white rounded-sm ease-linear duration-300 hover:bg-[#03041c] font-semibold bg-[#f50963] text-center p-[17px_30px]  w-full"
                      >
                        {isSubmitting ? (
                          <>
                            <LuLoader2 className="animate-spin absolute left-[26%] top-1/4 w-7 h-7" />{" "}
                            Resetting Password
                          </>
                        ) : (
                          "Reset Password"
                        )}
                      </button>
                    </div>
                  </form>
                  <div className="text-center login__register-now">
                    <p className="text-[#525258] text-sm">
                      Remember password? &nbsp;
                      <Link
                        href="/login"
                        className="text-[#f50963] hover:text-[#03041c] ease-out duration-300 font-semibold"
                      >
                        Log in
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
