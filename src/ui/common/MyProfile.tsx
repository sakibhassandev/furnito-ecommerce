"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  Heart,
  User,
  Briefcase,
} from "lucide-react";
import axios from "axios";
import Link from "next/link";
import { ProfileData } from "@/lib/definitions";

// Get user initials
const getInitials = (name: string) => {
  const names = name.split(" ");
  if (names.length >= 2) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

export default function MyProfile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("/api/get-profile");
        setProfile(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="my-10 max-md:mx-4 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className={`w-full md:w-64 bg-white shadow-lg block`}>
        <div className="">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <div className="text-5xl bg-black flex items-center justify-center w-32 h-32 rounded-full bg-primary text-white">
              {profile?.name ? getInitials(profile?.name) : "GU"}
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
            {profile?.name}
          </h1>
        </div>
        <nav className="mt-6">
          <Link
            href="/my-orders"
            className="block py-3 px-6 text-gray-600 hover:bg-gray-100 hover:text-[#B88E2F] transition-colors duration-200"
          >
            <ShoppingBag className="w-5 h-5 inline-block mr-2" />
            Orders
          </Link>
          <Link
            href="/wishlist"
            className="block py-3 px-6 text-gray-600 hover:bg-gray-100 hover:text-[#B88E2F] transition-colors duration-200"
          >
            <Heart className="w-5 h-5 inline-block mr-2" />
            Wishlist
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:pl-10 overflow-auto py-1">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Profile Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-4">
                <User className="w-6 h-6 text-[#B88E2F] flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="text-gray-900">{profile?.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Briefcase className="w-6 h-6 text-[#B88E2F] flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Company</p>
                  <p className="text-gray-900">
                    {profile?.address[0]?.companyName}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="w-6 h-6 text-[#B88E2F] flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-gray-900 break-all">{profile?.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="w-6 h-6 text-[#B88E2F] flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="text-gray-900">{profile?.address[0]?.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="w-6 h-6 text-[#B88E2F] flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Address</p>
                  <p className="text-gray-900">{profile?.address[0]?.street}</p>
                  <p className="text-gray-900">
                    {profile?.address?.[0]
                      ? `${profile?.address[0]?.city}, ${profile?.address[0]?.state} ${profile?.address[0]?.zip}`
                      : ""}
                  </p>
                  <p className="text-gray-900">
                    {profile?.address[0]?.country}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Calendar className="w-6 h-6 text-[#B88E2F] flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Joined</p>
                  <p className="text-gray-900">
                    {new Date(profile?.createdAt || "").toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
