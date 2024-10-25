"use client";

import { useState } from "react";
import { toast } from "react-toastify";

const ContactForm = () => {
  // Form & Error State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  // Validation Config Obj
  const validationConfig = {
    name: [{ required: true, message: "Name is a required field" }],
    email: [
      { required: true, message: "Email is a required field" },
      {
        pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        message: "Email must be a valid email",
      },
    ],
    number: [
      { required: true, message: "Phone number is a required field" },
      { minLength: 11, message: "Number must be at least 11 characters" },
    ],
    subject: [{ required: true, message: "Subject is a required field" }],
    message: [
      { required: true, message: "Message is a required field" },
      { minLength: 20, message: "Message must be at least 20 characters" },
    ],
  };

  // Validation Function
  const validate = (data) => {
    const errorsData = {};
    Object.entries(data).forEach(([key, value]) => {
      validationConfig[key].some((rule) => {
        if (rule.required && !value) {
          errorsData[key] = rule.message;
          return true;
        }

        if (rule.minLength && value.length < rule.minLength) {
          errorsData[key] = rule.message;
          return true;
        }

        if (rule.pattern && !rule.pattern.test(value)) {
          errorsData[key] = rule.message;
          return true;
        }
      });
    });

    setErrors(errorsData);
    return errorsData;
  };

  //   Handle Change Eventlistener
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    validate(formData);
  };

  // Handle Submit Eventlistener
  const handleSubmit = (e) => {
    e.preventDefault();
    validate(formData);
  };

  return (
    <div className="pt-24 mx-auto b-container p-[73px_30px_55px] sm:p-[73px_100px_95px] border-2 border-[#eaeaef]">
      <h3 className="mb-8 text-3xl font-medium">Contact with us</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
          <div className="name-input">
            <input
              value={formData.name}
              onChange={handleChange}
              type="text"
              name="name"
              id="name"
              className="w-full focus:border-[#f50963] focus:bg-white ease-linear duration-300 h-[60px] text-sm border border-[#f5f5f8] outline-none text-[#03041c] px-6 bg-[#f5f5f8] rounded"
              placeholder="Enter your name"
            />
            <p className={`mt-1 text-sm text-red-500 error`}>{errors?.name}</p>
          </div>
          <div className="email-input">
            <input
              value={formData.email}
              onChange={handleChange}
              type="email"
              name="email"
              id="email"
              className="w-full h-[60px] focus:border-[#f50963] focus:bg-white ease-linear duration-300 text-sm border border-[#f5f5f8] outline-none text-[#03041c] px-6 bg-[#f5f5f8] rounded"
              placeholder="Enter your email"
            />
            <p className="mt-1 text-sm text-red-500 error">{errors?.email}</p>
          </div>
          <div className="number-input">
            <input
              value={formData.number}
              onChange={handleChange}
              type="number"
              name="number"
              id="number"
              className="w-full h-[60px] focus:border-[#f50963] focus:bg-white ease-linear duration-300 text-sm border border-[#f5f5f8] outline-none text-[#03041c] px-6 bg-[#f5f5f8] rounded"
              placeholder="Enter your phone number"
            />
            <p className="mt-1 text-sm text-red-500 error">{errors?.number}</p>
          </div>
          <div className="subject-input">
            <input
              value={formData.subject}
              onChange={handleChange}
              type="text"
              name="subject"
              id="subject"
              className="w-full h-[60px] focus:border-[#f50963] focus:bg-white ease-linear duration-300 text-sm border border-[#f5f5f8] outline-none text-[#03041c] px-6 bg-[#f5f5f8] rounded"
              placeholder="Subject"
            />
            <p className="mt-1 text-sm text-red-500 error">{errors?.subject}</p>
          </div>
          <div className="md:col-span-2">
            <div className="message-input">
              <textarea
                value={formData.message}
                onChange={handleChange}
                name="message"
                id="message"
                className="resize-none focus:border-[#f50963] focus:bg-white ease-linear duration-300 p-[23px_25px] h-40 w-full bg-[#f5f5f8] border border-[#f5f5f8] outline-none text-[#03041c]"
                placeholder="Your message"
              ></textarea>
            </div>
            <p className="mt-1 text-sm text-red-500 error">{errors?.message}</p>
          </div>
          <div className="button-input">
            <button
              onClick={() => {
                // Showing a small toast on submit if every field is filled
                const errorsData = validate(formData);
                const lengthOfErrors = Object.values(errorsData);
                if (!lengthOfErrors.length) {
                  toast.success(
                    `Hey there, ${formData.name}. Your mail has been received.`,
                    {
                      position: "top-center",
                      autoClose: 3000,
                      theme: "light",
                    }
                  );
                }
              }}
              type="submit"
              className="p-[12px_35px] sm:p-[14px_47px] bg-[#f50963] cursor-pointer text-base text-white rounded hover:bg-[#03041c] ease-linear duration-300"
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
