"use client";

import { useState } from "react";
import { Play, X, Sofa, Truck, Shield } from "lucide-react";
import Image from "next/image";

const GetInTouchVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleClose = () => {
    setIsPlaying(false);
  };

  return (
    <div className="space-y-8">
      <div className="relative rounded-2xl overflow-hidden group bg-gradient-to-br from-amber-50 to-orange-50 p-1">
        <div className="aspect-video relative rounded-xl overflow-hidden">
          {!isPlaying ? (
            <>
              <Image
                src="/assets/images/about-page/getintouchvideo.jpeg"
                alt="Luxury living room furniture"
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                width={1920}
                height={1080}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-center justify-center">
                <button onClick={handlePlay} className="group/btn relative">
                  <div className="absolute inset-0 bg-white/30 rounded-full blur-xl group-hover/btn:bg-white/40 transition-all duration-300"></div>
                  <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover/btn:scale-110">
                    <Play className="w-8 h-8 text-amber-600 ml-1" />
                  </div>
                </button>
              </div>
            </>
          ) : (
            <div className="relative w-full h-full">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Furniture Craftsmanship"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <div className="h-1 w-10 bg-amber-600 rounded"></div>
          <span className="text-amber-600 font-medium">Craftsmanship</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900">
          Experience the Art of Fine Furniture
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Each piece in our collection is thoughtfully crafted with premium
          materials and meticulous attention to detail. Discover how we blend
          traditional craftsmanship with modern design to create furniture that
          lasts generations.
        </p>

        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="flex flex-col items-center text-center space-y-2 p-3 rounded-lg bg-amber-50">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <Sofa className="w-6 h-6 text-amber-600" />
            </div>
            <span className="text-sm font-medium text-gray-900">
              Premium Quality
            </span>
          </div>
          <div className="flex flex-col items-center text-center space-y-2 p-3 rounded-lg bg-amber-50">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <Truck className="w-6 h-6 text-amber-600" />
            </div>
            <span className="text-sm font-medium text-gray-900">
              Free Delivery
            </span>
          </div>
          <div className="flex flex-col items-center text-center space-y-2 p-3 rounded-lg bg-amber-50">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-amber-600" />
            </div>
            <span className="text-sm font-medium text-gray-900">
              10 Year Warranty
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4 pt-4">
          <div className="flex -space-x-2">
            {[...Array(4)].map((_, i) => (
              <Image
                key={i}
                src={`https://i.pravatar.cc/40?img=${i + 1}`}
                alt={`Happy customer ${i + 1}`}
                className="w-10 h-10 rounded-full border-2 border-white"
                width={100}
                height={100}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600">
            Join <span className="font-semibold">10,000+</span> happy customers
          </p>
        </div>
      </div>
    </div>
  );
};

export default GetInTouchVideo;
