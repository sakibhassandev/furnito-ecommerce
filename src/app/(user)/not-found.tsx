import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "404 Not Found",
  description: "The page you are looking for does not exist.",
};

const NotFound = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-screen mx-auto mb-5 max-w-screen-2xl">
      <div className="flex flex-col items-center justify-center w-full md:flex-row">
        <div className="w-full max-w-2xl md:max-w-4xl">
          <Image
            className="w-full"
            src="/assets/404.svg"
            alt="404"
            width={1920}
            height={1080}
          />
        </div>
        <div className="w-full max-w-lg mx-6 max-md:text-center texts md:order-first">
          <h1 className="text-4xl font-bold md:text-6xl lg:text-7xl my-7">
            Whoops!
          </h1>
          <p className="text-sm md:text-base lg:text-lg">
            The page you are looking for does not exist.
          </p>
          <Link href="/">
            <button className="px-4 py-2 mt-10 text-sm text-white duration-300 ease-linear bg-blue-500 rounded-full md:text-base lg:text-lg hover:bg-blue-600 md:px-6 md:py-3">
              Go back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
