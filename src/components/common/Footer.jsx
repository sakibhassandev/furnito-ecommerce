export const Footer = () => {
  return (
    <footer>
      <hr className="border-1 border-[#D9D9D9] mx-auto max-w-[1920px]" />
      <div className="flex justify-between gap-6 mx-16 max-sm:mx-5 max-md:flex-col max-lg:flex-wrap 2xl:mx-auto max-w-screen-2xl">
        <div className="my-10">
          <h2 className="mb-12 text-2xl font-bold">Furnito.</h2>
          <div className="max-w-[300px]">
            <p className="text-[#9F9F9F]">
              400 University Drive Suite 200 Coral
            </p>
            <p className="text-[#9F9F9F]">Gables,</p>
            <p className="text-[#9F9F9F]">FL 33134 USA</p>
          </div>
        </div>

        <div className="my-10">
          <h2 className="mb-12 text-[#9F9F9F] font-medium">Links</h2>
          <ul className="space-y-11">
            <li>
              <a
                href="/"
                className="font-medium relative before:content-[''] before:bottom-0 before:absolute before:w-0 hover:before:w-full  before:ease-in-out before:transition-all before:duration-300 before:bg-[#B88E2F] before:h-[2px]"
              >
                Home
              </a>
            </li>

            <li>
              <a
                href="/"
                className="font-medium relative before:content-[''] before:bottom-0 before:absolute before:w-0 hover:before:w-full  before:ease-in-out before:transition-all before:duration-300 before:bg-[#B88E2F] before:h-[2px]"
              >
                Shop
              </a>
            </li>

            <li>
              <a
                href="/"
                className="font-medium relative before:content-[''] before:bottom-0 before:absolute before:w-0 hover:before:w-full  before:ease-in-out before:transition-all before:duration-300 before:bg-[#B88E2F] before:h-[2px]"
              >
                About
              </a>
            </li>

            <li>
              <a
                href="/"
                className="font-medium relative before:content-[''] before:bottom-0 before:absolute before:w-0 hover:before:w-full  before:ease-in-out before:transition-all before:duration-300 before:bg-[#B88E2F] before:h-[2px]"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div className="my-10">
          <h2 className="mb-12 text-[#9F9F9F] font-medium">Help</h2>
          <ul className="space-y-11">
            <li>
              <a
                href="/"
                className="font-medium relative before:content-[''] before:bottom-0 before:absolute before:w-0 hover:before:w-full  before:ease-in-out before:transition-all before:duration-300 before:bg-[#B88E2F] before:h-[2px]"
              >
                Payment Options
              </a>
            </li>

            <li>
              <a
                href="/"
                className="font-medium relative before:content-[''] before:bottom-0 before:absolute before:w-0 hover:before:w-full  before:ease-in-out before:transition-all before:duration-300 before:bg-[#B88E2F] before:h-[2px]"
              >
                Returns
              </a>
            </li>

            <li>
              <a
                href="/"
                className="font-medium relative before:content-[''] before:bottom-0 before:absolute before:w-0 hover:before:w-full  before:ease-in-out before:transition-all before:duration-300 before:bg-[#B88E2F] before:h-[2px]"
              >
                Privacy Policies
              </a>
            </li>
          </ul>
        </div>

        <div className="my-10">
          <h2 className="mb-12 text-[#9F9F9F] font-medium">Newsletter</h2>
          <div className="flex gap-4 max-lg:items-start max-lg:flex-col">
            <input
              type="text"
              placeholder="Enter Your Email Address"
              className="pr-2 text-sm w-full border-b focus:border-[#B88E2F] border-black outline-none"
            />
            <button className="font-medium border-b hover:border-[#B88E2F] ease-linear duration-200 hover:text-[#B88E2F] border-black">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
