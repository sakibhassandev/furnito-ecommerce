import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 Not Found",
  description: "The page you are looking for does not exist.",
};

const NotFound = () => {
  return (
    <div className="mb-5 min-h-screen max-w-screen-2xl w-full mx-auto flex items-center justify-center">
      <div className="w-full flex-col md:flex-row flex justify-center items-center">
        <div className="w-full max-w-2xl md:max-w-4xl">
          <Image
            className="w-full"
            src="/assets/404.svg"
            alt="404"
            width={1920}
            height={1080}
          />
        </div>
        <div className="max-md:text-center texts mx-6 md:order-first max-w-lg w-full">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold my-7">
            Whoops!
          </h1>
          <p className="text-sm md:text-base lg:text-lg">
            The page you are looking for does not exist.
          </p>
          <Link href="/">
            <button className="mt-10 text-sm md:text-base lg:text-lg bg-blue-500 hover:bg-blue-600 duration-300 ease-linear text-white px-4 py-2 md:px-6 md:py-3 rounded-full">
              Go back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
