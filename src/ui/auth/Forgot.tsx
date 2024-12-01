"use client";

import Link from "next/link";
import { AuthParticles } from "./AuthParticles";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const Forgot = () => {
  // Form & Error States
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();

  // Submit Handler
  const onSubmit = async (data: FieldValues) => {
    // TODO: Send data to backend also make this server client
    // ...
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success(
      `Hey there, ${getValues(
        "email"
      )}. A reset link has been sent to your email.`,
      {
        position: "top-center",
        autoClose: 2000,
        theme: "light",
      }
    );
    console.log(data);
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
                            {...register("email", {
                              required: "Email is required",
                              pattern: {
                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message: "Email must be a valid email",
                              },
                            })}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            className="bg-white focus:border-[#f50963] rounded ease-out duration-300 outline-none border w-full text-sm border-[#eaeaef] pl-14 pr-12 h-14"
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
                        className="disabled:opacity-50 text-lg mb-5 cursor-pointer inline-block text-white rounded-sm ease-linear duration-300 hover:bg-[#03041c] font-semibold bg-[#f50963] text-center p-[17px_30px]  w-full"
                      >
                        {isSubmitting ? "Sending Request..." : "Send Request"}
                      </button>
                    </div>
                  </form>
                  <div className="text-center">
                    <p className="text-[#525258] text-sm">
                      Remember your password? &nbsp;
                      <Link
                        href="/login"
                        className="text-[#f50963] hover:text-[#03041c] ease-out duration-300 font-semibold"
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
