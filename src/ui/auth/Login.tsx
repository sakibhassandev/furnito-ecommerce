"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { AuthParticles } from "./AuthParticles";
import { toast } from "react-toastify";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/loginSchema";
import axios, { AxiosError } from "axios";
import { ApiError } from "@/utils/ApiError";
import { useRouter } from "next/navigation";
import { Eye, Loader2 } from "lucide-react";

export const Login = () => {
  const router = useRouter();
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isRememberMe, setIsRememberMe] = useState(false);

  // Form & Error States
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues:
      typeof window !== "undefined" &&
      window.localStorage &&
      JSON.parse(localStorage.getItem("rememberMe") || "{}"),
  });

  // Submit Handler
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const response = await axios.post("/api/login", data);
      toast.success(`Hey, ${response.data.data.name}. Welcome back!`, {
        position: "top-center",
        autoClose: 2000,
        theme: "light",
      });
      router.push("/");
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

  // Remember Me
  const rememberMe = () => {
    const formData = getValues();
    setIsRememberMe(!isRememberMe);
    if (typeof window !== "undefined" && window.localStorage) {
      if (isRememberMe) {
        localStorage.setItem("rememberMe", JSON.stringify(formData));
      } else {
        localStorage.removeItem("rememberMe");
      }
    }
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
                    Hello Again
                  </h3>
                  <p className="text-[#525258] max-sm:text-sm">
                    Enter your credentials to access your account.
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
                            className="bg-white focus:border-[#f50963] rounded ease-out duration-300 outline-none border w-full text-sm border-[#eaeaef] pl-14 pr-12 h-14"
                          />
                          <span className="absolute -translate-y-1/2 top-1/2 left-7">
                            <svg
                              width={17}
                              height={19}
                              viewBox="0 0 17 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9 9C11.2091 9 13 7.20914 13 5C13 2.79086 11.2091 1 9 1C6.79086 1 5 2.79086 5 5C5 7.20914 6.79086 9 9 9Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M15.5 17.6C15.5 14.504 12.3626 12 8.5 12C4.63737 12 1.5 14.504 1.5 17.6"
                                stroke="currentColor"
                                strokeWidth="1.5"
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
                      <div className="relative mb-5 input_item">
                        <div className="relative input">
                          <input
                            {...register("password")}
                            type={isPasswordShow ? "text" : "password"}
                            name="password"
                            id="password"
                            placeholder="Password"
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
                            className={` ${
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
                          <Eye
                            onClick={() => setIsPasswordShow(!isPasswordShow)}
                            className={`${
                              isPasswordShow ? "" : "hidden"
                            } absolute text-xl -translate-y-1/2 cursor-pointer right-6 login-input-eye top-1/2`}
                          />
                        </div>
                        <p className="mt-1 text-sm text-red-500 error">
                          {errors.password?.message as string}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between gap-2 text-sm max-xsm:flex-col mb-7 login-options">
                      <div className="inline-flex items-center lp-remember">
                        <label
                          className="relative flex items-center cursor-pointer"
                          htmlFor="lp-remember"
                        >
                          <input
                            checked={
                              typeof window !== "undefined" &&
                              window.localStorage &&
                              localStorage.getItem("rememberMe")
                                ? true
                                : false
                            }
                            onChange={rememberMe}
                            type="checkbox"
                            className="w-5 h-5 transition-all border rounded shadow appearance-none cursor-pointer peer hover:shadow-md border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                            id="lp-remember"
                          />
                          <span className="absolute text-white transform -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 top-1/2 left-1/2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3.5 w-3.5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              stroke="currentColor"
                              strokeWidth={1}
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </label>
                        <label
                          className="ml-2 text-sm cursor-pointer text-slate-600"
                          htmlFor="lp-remember"
                        >
                          Remember Me
                        </label>
                      </div>
                      <div className="login__forgot ">
                        <Link
                          href="/forgot"
                          className="capitalize hover:text-[#f50963] ease-out duration-300"
                        >
                          forgot password?
                        </Link>
                      </div>
                    </div>
                    <div className="login__btn">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="relative disabled:opacity-50 text-lg mb-5 cursor-pointer inline-block text-white rounded-sm ease-linear duration-300 hover:bg-[#03041c] font-semibold bg-[#f50963] text-center p-[17px_30px]  w-full"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="animate-spin absolute left-[35%] top-1/4 w-7 h-7" />{" "}
                            Signing In
                          </>
                        ) : (
                          "Sign In"
                        )}
                      </button>
                    </div>
                  </form>
                  <div className="text-center login__register-now">
                    <p className="text-[#525258] text-sm">
                      Don’t have an account? &nbsp;
                      <Link
                        href="/register"
                        className="text-[#f50963] hover:text-[#03041c] ease-out duration-300 font-semibold"
                      >
                        Register Now
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
