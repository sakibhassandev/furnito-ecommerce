"use client";

import { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { AuthParticles } from "./AuthParticles";
import { toast } from "react-toastify";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { verificationSchema } from "@/schemas/verificationSchema";
import axios, { AxiosError } from "axios";
import { ApiError } from "@/utils/ApiError";
import { useRouter, useSearchParams } from "next/navigation";

export const Verify = () => {
  const router = useRouter();
  const params = useSearchParams();

  // Form & Error States
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<z.infer<typeof verificationSchema>>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      code: ["", "", "", "", "", ""],
    },
  });

  const [activeInput, setActiveInput] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const code = watch("code");

  const onSubmit = async (data: z.infer<typeof verificationSchema>) => {
    const submittedCode = data.code.join("");
    try {
      const response = await axios.post(
        `/api/verify?email=${params.get("email")}`,
        { otp: submittedCode }
      );
      toast.success(
        `Hey, ${response.data.data.name}. your account has been verified!`,
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
  };

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      // If pasting multiple digits, distribute them across inputs
      const digits = value.split("").slice(0, 6 - index);
      digits.forEach((digit, i) => {
        if (index + i < 6) {
          setValue(`code.${index + i}`, digit);
        }
      });
      const newIndex = Math.min(index + digits.length, 5);
      setActiveInput(newIndex);
      inputRefs.current[newIndex]?.focus();
    } else {
      // Single digit input
      setValue(`code.${index}`, value);
      if (value && index < 5) {
        setActiveInput(index + 1);
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (code[index]) {
        setValue(`code.${index}`, "");
      } else if (index > 0) {
        setActiveInput(index - 1);
        inputRefs.current[index - 1]?.focus();
        setValue(`code.${index - 1}`, "");
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      setActiveInput(index - 1);
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      e.preventDefault();
      setActiveInput(index + 1);
      inputRefs.current[index + 1]?.focus();
    } else if (/^\d$/.test(e.key)) {
      e.preventDefault();
      handleChange(index, e.key);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const digits = pastedData.split("").filter((char) => /^\d$/.test(char));
    digits.forEach((digit, i) => {
      if (i < 6) {
        setValue(`code.${i}`, digit);
      }
    });
    const newIndex = Math.min(digits.length, 5);
    setActiveInput(newIndex);
    inputRefs.current[newIndex]?.focus();
  };

  const resendVerificationCode = async () => {
    try {
      const response = await axios.post(
        `/api/resend-verification-code?email=${params.get("email")}`
      );
      toast.success(
        `Hey, ${response.data.data.name}. new verification has been sent to you email!`,
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
  };

  return (
    <section className="login py-28">
      <div className="mx-auto b-container">
        <div className="relative z-10 verify_container">
          {<AuthParticles />}
          <div className="flex justify-center">
            <div className="w-full max-w-full mx-5 xl:w-1/2 lg:w-2/3 md:w-10/12">
              <div className="max-xl:p-[50px_45px_55px] xl:p-[50px_60px_55px] max-2xl:p-[50px_85px_55px] bg-white shadow-[0_30px_60px_rgba(3,4,28,.1)]">
                <div className="mb-8 text-center text">
                  <h3 className="mb-3 text-3xl font-semibold login__title">
                    Verify your account.
                  </h3>
                  <p className="text-[#525258] max-sm:text-sm">
                    Hey there, Sakib Hassan enter the verification code to
                    verify your account.
                  </p>
                </div>
                <div className="form">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex gap-2 mb-4 justify-center">
                      <Controller
                        name="code"
                        control={control}
                        render={({ field }) => (
                          <>
                            {[0, 1, 2, 3, 4, 5].map((index) => (
                              <input
                                key={index}
                                ref={(el) => {
                                  inputRefs.current[index] = el;
                                }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                pattern="\d"
                                className={`w-12 h-12 text-center text-2xl font-semibold border rounded-md
                        focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500
                        ${
                          index === activeInput
                            ? "ring-2 ring-pink-500 border-pink-500"
                            : ""
                        }
                        ${errors.code ? "border-red-500" : ""}
                        placeholder:text-gray-300`}
                                value={field.value[index]}
                                onChange={(e) =>
                                  handleChange(index, e.target.value)
                                }
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onFocus={() => setActiveInput(index)}
                                onPaste={handlePaste}
                              />
                            ))}
                          </>
                        )}
                      />
                    </div>

                    {errors.code && (
                      <p className="text-red-500 text-sm mb-5 text-center">
                        {errors.code.message ||
                          "Verification code must be 6 digits"}
                      </p>
                    )}

                    <div className="verify_btn">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="relative disabled:opacity-50 text-lg mb-5 cursor-pointer inline-block text-white rounded-sm ease-linear duration-300 hover:bg-[#03041c] font-semibold bg-[#f50963] text-center p-[17px_30px]  w-full"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="animate-spin absolute left-[32%] top-1/4 w-7 h-7" />{" "}
                            Verifying
                          </>
                        ) : (
                          "Verify Account"
                        )}
                      </button>
                    </div>
                  </form>

                  <div className="text-center flex gap-2 justify-center">
                    <p className="text-[#525258] text-sm">
                      Didn&apos;t receive code?
                    </p>
                    <button
                      onClick={resendVerificationCode}
                      type="button"
                      className="text-[#f50963] text-sm hover:text-[#03041c] ease-out duration-300 font-semibold"
                    >
                      Resend
                    </button>
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
