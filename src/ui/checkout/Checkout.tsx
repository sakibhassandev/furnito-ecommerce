"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { Country, State, City } from "country-state-city";

// Simulated database functions
const saveAddress = async (data: any) => {
  localStorage.setItem("savedAddress", JSON.stringify(data));
  return { success: true };
};

const getAddress = async () => {
  const saved = localStorage.getItem("savedAddress");
  return saved ? JSON.parse(saved) : null;
};

export default function Checkout() {
  const [isEditing, setIsEditing] = useState(true);
  const [savedAddress, setSavedAddress] = useState<any>(null);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const watchCountry = watch("country");

  useEffect(() => {
    if (watchCountry) {
      setSelectedCountry(watchCountry);
    }
  }, [watchCountry]);

  useEffect(() => {
    async function loadAddress() {
      const address = await getAddress();
      if (address) {
        setSavedAddress(address);
        setIsEditing(false);
        reset(address);
        setSelectedCountry(address.country);
      }
    }
    loadAddress();
  }, [reset]);

  const onSubmit = async (data: any) => {
    await saveAddress(data);
    setSavedAddress(data);
    setIsEditing(false);
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      borderColor: "#E5E7EB",
      borderRadius: "0.375rem",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#B88E2F",
      },
    }),
    option: (provided: any, state: { isSelected: any; isFocused: any }) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#B88E2F"
        : state.isFocused
        ? "#F0E6D3"
        : null,
      color: state.isSelected ? "white" : "#111827",
    }),
  };

  const countries = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  const states = selectedCountry
    ? State.getStatesOfCountry(selectedCountry.value).map((state) => ({
        value: state.isoCode,
        label: state.name,
      }))
    : [];

  const cities =
    selectedCountry && watch("state")
      ? City.getCitiesOfState(selectedCountry.value, watch("state").value).map(
          (city) => ({
            value: city.name,
            label: city.name,
          })
        )
      : [];

  return (
    <section className="checkout-container bg-[#F9F1E7]">
      <div className="container mx-auto p-6 py-24 min-h-screen">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Billing Details Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-[#333333]">
                Billing details
              </h2>
              {savedAddress && !isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 hover:bg-[#F0E6D3] rounded-full transition duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#B88E2F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                  </svg>
                </button>
              )}
            </div>

            {!isEditing && savedAddress ? (
              <div className="space-y-4 text-[#333333]">
                <p className="font-semibold text-xl">
                  {savedAddress.firstName} {savedAddress.lastName}
                </p>
                {savedAddress.companyName && <p>{savedAddress.companyName}</p>}
                <p>{savedAddress.streetAddress}</p>
                <p>
                  {savedAddress.city?.label}, {savedAddress.state?.label}{" "}
                  {savedAddress.zipCode}
                </p>
                <p>
                  {
                    countries.find((c) => c.value === savedAddress.country)
                      ?.label
                  }
                </p>
                <p>{savedAddress.phone}</p>
                <p>{savedAddress.email}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-1">
                      First Name
                    </label>
                    <input
                      {...register("firstName", {
                        required: "First name is required",
                      })}
                      className="w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-[#B88E2F] transition duration-150 ease-in-out"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.firstName.message as string}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-1">
                      Last Name
                    </label>
                    <input
                      {...register("lastName", {
                        required: "Last name is required",
                      })}
                      className="w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-[#B88E2F] transition duration-150 ease-in-out"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.lastName.message as string}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-1">
                    Company Name (Optional)
                  </label>
                  <input
                    {...register("companyName")}
                    className="w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-[#B88E2F] transition duration-150 ease-in-out"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-1">
                    Country / Region
                  </label>
                  <Controller
                    name="country"
                    control={control}
                    rules={{ required: "Country is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={countries}
                        styles={customStyles}
                        placeholder="Select country"
                        className="react-select-container"
                        classNamePrefix="react-select"
                      />
                    )}
                  />
                  {errors.country && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.country.message as string}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-1">
                    Street address
                  </label>
                  <input
                    {...register("streetAddress", {
                      required: "Street address is required",
                    })}
                    className="w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-[#B88E2F] transition duration-150 ease-in-out"
                  />
                  {errors.streetAddress && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.streetAddress.message as string}
                    </p>
                  )}
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-1">
                      Town / City
                    </label>
                    <Controller
                      name="city"
                      control={control}
                      rules={{ required: "City is required" }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={cities}
                          styles={customStyles}
                          placeholder="Select city"
                          isDisabled={!watch("state")}
                          className="react-select-container"
                          classNamePrefix="react-select"
                        />
                      )}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.city.message as string}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-1">
                      State / Province
                    </label>
                    <Controller
                      name="state"
                      control={control}
                      rules={{ required: "State/Province is required" }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={states}
                          styles={customStyles}
                          placeholder="Select state/province"
                          isDisabled={!selectedCountry}
                          className="react-select-container"
                          classNamePrefix="react-select"
                        />
                      )}
                    />
                    {errors.state && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.state.message as string}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-1">
                    ZIP / Postal code
                  </label>
                  <input
                    {...register("zipCode", {
                      required: "ZIP/Postal code is required",
                    })}
                    className="w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-[#B88E2F] transition duration-150 ease-in-out"
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.zipCode.message as string}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-1">
                    Phone
                  </label>
                  <input
                    {...register("phone", { required: "Phone is required" })}
                    type="tel"
                    className="w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-[#B88E2F] transition duration-150 ease-in-out"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phone.message as string}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-1">
                    Email address
                  </label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    type="email"
                    className="w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-[#B88E2F] transition duration-150 ease-in-out"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message as string}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-1">
                    Additional information
                  </label>
                  <textarea
                    {...register("additionalInfo")}
                    rows={4}
                    className="w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-[#B88E2F] transition duration-150 ease-in-out"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#B88E2F] text-white py-2 px-4 rounded-md hover:bg-[#A17C1A] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B88E2F]"
                >
                  Save and Continue
                </button>
              </form>
            )}
          </div>

          {/* Order Summary Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-[#333333] mb-8">
              Your order
            </h2>
            <div className="space-y-6">
              <div className="flex justify-between pb-4 border-b border-gray-200">
                <div>
                  <p className="font-medium">Asgaard sofa</p>
                  <p className="text-sm text-gray-600">Quantity: 1</p>
                </div>
                <p className="font-medium">Rs. 250,000.00</p>
              </div>

              <div className="flex justify-between pb-4 border-b border-gray-200">
                <p className="font-medium">Subtotal</p>
                <p className="font-medium">Rs. 250,000.00</p>
              </div>

              <div className="flex justify-between font-semibold text-lg">
                <p>Total</p>
                <p className="text-[#B88E2F]">Rs. 250,000.00</p>
              </div>

              <div className="space-y-4 pt-4">
                <div className="space-y-2 opacity-50">
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      disabled
                      value="bank"
                      className="form-radio border-gray-300 text-gray-400"
                    />
                    <span className="font-medium text-gray-500">
                      Direct Bank Transfer
                    </span>
                  </label>
                  <p className="text-sm text-gray-500 ml-6">
                    Make your payment directly into our bank account. Please use
                    your Order ID as the payment reference. Your order will not
                    be shipped until the funds have cleared in our account.
                  </p>
                </div>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    {...register("paymentMethod")}
                    value="cod"
                    defaultChecked
                    className="form-radio text-[#B88E2F] focus:ring-[#B88E2F]"
                  />
                  <span className="font-medium">Cash On Delivery</span>
                </label>
              </div>

              <p className="text-sm text-gray-600">
                Your personal data will be used to support your experience
                throughout this website, to manage access to your account, and
                for other purposes described in our{" "}
                <a href="#" className="text-[#B88E2F] hover:underline">
                  privacy policy
                </a>
                .
              </p>

              <div className="flex justify-center">
                <button
                  onClick={handleSubmit(onSubmit)}
                  className="rounded-lg w-2/3 border-2 border-[#B88E2F] text-[#B88E2F] py-3 px-4 hover:bg-[#B88E2F] hover:text-white transition-colors duration-200 font-medium mt-6"
                >
                  Place order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
