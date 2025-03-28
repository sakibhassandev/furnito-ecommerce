"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import axios from "axios";
import { SessionProvider, useSession } from "next-auth/react";
import { AddressType, FormAddressType } from "@/lib/definitions";
import CheckoutSummary from "./OrderSummary";
import StoreProvider from "@/store/StoreProvider";

export default function Checkout() {
  const session = useSession();
  const [isEditing, setIsEditing] = useState(true);
  const [savedAddress, setSavedAddress] = useState<AddressType>(
    {} as AddressType
  );
  const [selectedCountry, setSelectedCountry] = useState(
    {} as { value: string; label: string }
  );

  const getAddress = useCallback(async () => {
    if (!session.data?.user?.id) return null;
    const response = await axios.post("/api/get-user-address", {
      userId: session.data.user.id,
    });
    if (response.data) return response.data;
    return null;
  }, [session.data?.user?.id]);

  const saveAddress = async (address: FormAddressType) => {
    if (!session.data?.user?.id) return null;
    const response = await axios.post("/api/set-user-address", {
      address: {
        userId: session.data.user.id,
        firstName: address.firstName,
        lastName: address.lastName,
        companyName: address.companyName,
        country: address.country.label,
        street: address.street,
        state: address.state.label,
        city: address.city.label,
        zip: address.zip,
        phone: address.phone,
        email: address.email,
        additionalInfo: address.additionalInfo,
      },
    });
    if (response.data) return response.data;
    return null;
  };

  useEffect(() => {
    if (session.status === "authenticated") {
      getAddress();
    }
  }, [session.status, getAddress]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormAddressType>();

  const watchCountry = watch("country");

  useEffect(() => {
    if (watchCountry) {
      setSelectedCountry(watchCountry);
    }
  }, [watchCountry]);

  useEffect(() => {
    async function loadAddress() {
      const fetchAddress = await getAddress();
      const address = fetchAddress?.data?.address[0];
      if (address) {
        setSavedAddress(address);
        setIsEditing(false);
        reset(address);
        setSelectedCountry(address.country);
      }
    }
    if (session.status === "authenticated") {
      loadAddress();
    }
  }, [reset, session.status, getAddress]);

  const onSubmit = async (data: FormAddressType) => {
    const address = await saveAddress(data);
    if (address) {
      setSavedAddress(address.data);
      setIsEditing(false);
    }
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
    option: (
      provided: any,
      state: { isSelected: boolean; isFocused: boolean }
    ) => ({
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
          <div className="bg-white rounded-xl shadow-lg p-8 h-max">
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
                <p>{savedAddress.street}</p>
                <p>
                  {savedAddress.city}, {savedAddress.state} {savedAddress.zip}
                </p>
                <p>
                  {
                    countries.find((c) => c.label === savedAddress.country)
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
                    {...register("street", {
                      required: "Street address is required",
                    })}
                    defaultValue={savedAddress?.street}
                    className="w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-[#B88E2F] transition duration-150 ease-in-out"
                  />
                  {errors.street && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.street.message as string}
                    </p>
                  )}
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-1">
                      State / Province
                    </label>
                    <Controller
                      name="state"
                      control={control}
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
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-1">
                      Town / City
                    </label>
                    <Controller
                      name="city"
                      control={control}
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
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-1">
                    ZIP / Postal code
                  </label>
                  <input
                    {...register("zip", {
                      required: "ZIP/Postal code is required",
                    })}
                    defaultValue={savedAddress?.zip}
                    className="w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-[#B88E2F] transition duration-150 ease-in-out"
                  />
                  {errors.zip && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.zip.message as string}
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
          <StoreProvider>
            <SessionProvider>
              <CheckoutSummary userAddress={savedAddress} />
            </SessionProvider>
          </StoreProvider>
        </div>
      </div>
    </section>
  );
}
