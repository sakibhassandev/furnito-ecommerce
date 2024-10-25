"use client";

import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ContactForm = () => {
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
      `Hey there, ${getValues("name")}. Your mail has been received.`,
      {
        position: "top-center",
        autoClose: 2000,
        theme: "light",
      }
    );
    reset();
    console.log(data);
  };

  return (
    <div className="pt-24 mx-auto b-container p-[73px_30px_55px] sm:p-[73px_100px_95px] border-2 border-[#eaeaef]">
      <h3 className="mb-8 text-3xl font-medium">Contact with us</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
          <div className="name-input">
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              name="name"
              id="name"
              className="w-full focus:border-[#f50963] focus:bg-white ease-linear duration-300 h-[60px] text-sm border border-[#f5f5f8] outline-none text-[#03041c] px-6 bg-[#f5f5f8] rounded"
              placeholder="Enter your name"
            />
            <p className={`mt-1 text-sm text-red-500 error`}>
              {errors.name?.message as string}
            </p>
          </div>
          <div className="email-input">
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Email must be a valid email",
                },
              })}
              type="email"
              name="email"
              id="email"
              className="w-full h-[60px] focus:border-[#f50963] focus:bg-white ease-linear duration-300 text-sm border border-[#f5f5f8] outline-none text-[#03041c] px-6 bg-[#f5f5f8] rounded"
              placeholder="Enter your email"
            />
            <p className="mt-1 text-sm text-red-500 error">
              {errors.email?.message as string}
            </p>
          </div>
          <div className="number-input">
            <input
              {...register("number", {
                required: "Number is required",
                minLength: {
                  value: 11,
                  message: "Number must be at least 11 characters",
                },
              })}
              type="number"
              name="number"
              id="number"
              className="w-full h-[60px] focus:border-[#f50963] focus:bg-white ease-linear duration-300 text-sm border border-[#f5f5f8] outline-none text-[#03041c] px-6 bg-[#f5f5f8] rounded"
              placeholder="Enter your phone number"
            />
            <p className="mt-1 text-sm text-red-500 error">
              {errors.number?.message as string}
            </p>
          </div>
          <div className="subject-input">
            <input
              {...register("subject", { required: "Subject is required" })}
              type="text"
              name="subject"
              id="subject"
              className="w-full h-[60px] focus:border-[#f50963] focus:bg-white ease-linear duration-300 text-sm border border-[#f5f5f8] outline-none text-[#03041c] px-6 bg-[#f5f5f8] rounded"
              placeholder="Subject"
            />
            <p className="mt-1 text-sm text-red-500 error">
              {errors.subject?.message as string}
            </p>
          </div>
          <div className="md:col-span-2">
            <div className="message-input">
              <textarea
                {...register("message", {
                  required: "Message is required",
                  minLength: {
                    value: 20,
                    message: "Message must be at least 20 characters",
                  },
                })}
                name="message"
                id="message"
                className="resize-none focus:border-[#f50963] focus:bg-white ease-linear duration-300 p-[23px_25px] h-40 w-full bg-[#f5f5f8] border border-[#f5f5f8] outline-none text-[#03041c]"
                placeholder="Your message"
              ></textarea>
            </div>
            <p className="mt-1 text-sm text-red-500 error">
              {errors.message?.message as string}
            </p>
          </div>
          <div className="button-input">
            <button
              disabled={isSubmitting}
              type="submit"
              className="disabled:opacity-50 p-[12px_35px] sm:p-[14px_47px] bg-[#f50963] cursor-pointer text-base text-white rounded hover:bg-[#03041c] ease-linear duration-300"
            >
              Send Message
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
