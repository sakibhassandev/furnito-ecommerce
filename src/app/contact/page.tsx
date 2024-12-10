import type { Metadata } from "next";
import Image from "next/image";
import { SectionCommonHeader } from "@/ui/common/SectionCommonHeader";
import { InfoHighlights } from "@/ui/common/InfoHighlights";
import ContactForm from "@/ui/contact/ContactForm";

// Social Media Icons
import { Facebook, Linkedin, Twitter, Youtube } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact US",
};

const Contact = () => {
  return (
    <main>
      <section className="contact-container">
        <SectionCommonHeader name="Contact" prev="Home" curr="Contact" />
        <div className="max-w-screen-2xl 2xl:mx-auto">
          {/* Text Container */}
          <div className="max-w-screen-sm mx-auto my-24 text-center texts">
            <h3 className="mb-2 text-4xl font-semibold">
              Get In Touch With Us
            </h3>
            <p className="text-[#9F9F9F]">
              For More Information About Our Product & Services. Please Feel
              Free To Drop Us An Email. Our Staff Always Be There To Help You
              Out. Do Not Hesitate!
            </p>
          </div>
          {/* Contact items */}
          <div className="mx-3 sm:mx-auto b-container">
            <div className="flex flex-wrap justify-between mb-8 contact-items">
              <div className="w-full p-3 md:w-2/4 lg:w-1/3">
                <div className="item p-[60px_40px_58px] shadow-[0_0px_30px_rgba(3,4,28,.06)] bg-white">
                  <div className="icon mb-9 min-h-20">
                    <Image
                      src="/assets/images/contact-page/message-icon.webp"
                      alt="messageIcon"
                      className="mx-auto"
                      width={91}
                      height={80}
                    />
                  </div>
                  <div className="text-center content">
                    <span className="underline text-[#96969c] mb-4 inline-block">
                      Contact
                    </span>
                    <p className="mb-1 text-xl font-medium hover:text-[#f50963] ease-out duration-300">
                      <a href="mailto:location@website.com">furnito@mail.com</a>
                    </p>
                    <p className="text-xl font-medium hover:text-[#f50963] ease-out duration-300">
                      <a href="tel:+1-123-456-7899">+1 (123) 456-7899</a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full p-3 md:w-2/4 lg:w-1/3">
                <div className="item p-[60px_40px_58px] shadow-[0_0px_30px_rgba(3,4,28,.06)] bg-white">
                  <div className="icon mb-9 min-h-20">
                    <Image
                      src="/assets/images/contact-page/location-icon.webp"
                      alt="locationIcon"
                      className="mx-auto"
                      width={50}
                      height={80}
                    />
                  </div>
                  <div className="text-center content">
                    <span className="underline text-[#96969c] text-lg mb-3 inline-block">
                      Location
                    </span>
                    <p className="mb-1 text-xl font-medium hover:text-[#f50963] ease-out duration-300">
                      <a
                        href="https://maps.app.goo.gl/fXtCnmAtXWR3QgZU7"
                        target="_blank"
                      >
                        8462+F8 Kanata, Ottawa, Ontario K2K 1L9, Canada
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full p-3 md:w-2/4 lg:w-1/3">
                <div className="item p-[60px_40px_58px] shadow-[0_0px_30px_rgba(3,4,28,.06)] bg-white">
                  <div className="icon mb-9 min-h-20">
                    <Image
                      src="/assets/images/contact-page/social-icon.webp"
                      alt="socialIcon"
                      className="mx-auto"
                      width={100}
                      height={75}
                    />
                  </div>
                  <div className="text-center content">
                    <span className="underline text-[#96969c] mb-4 inline-block">
                      Social Media
                    </span>
                    <p className="mb-1 text-xl font-medium">
                      Follow on social media
                    </p>
                    <ul className="flex justify-center gap-4 mt-2 text-lg text-[#b9b9bf]">
                      <li>
                        <a href="#">
                          <Facebook className="w-5 h-5 hover:text-[#f50963] ease-linear duration-300" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <Twitter className="w-5 h-5 hover:text-[#f50963] ease-linear duration-300" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <Linkedin className="w-5 h-5 hover:text-[#f50963] ease-linear duration-300" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <Youtube className="w-5 h-5 hover:text-[#f50963] ease-linear duration-300" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Contact Form */}
          <ContactForm />
          {/* Contact Location Area */}
          <div className="pt-32 mx-auto pb-28 b-container">
            {/* Texts */}
            <div className="flex ml-8 text-container mb-9">
              <div className="max-w-md">
                <span className="subtitle mb-2 inline-block text-[#03041c] text-sm font-medium">
                  LOCATIONS
                </span>
                <h3 className="text-4xl font-semibold text-[#03041c] mb-6">
                  Come and visit our offices around the world
                </h3>
              </div>
            </div>
            <div className="grid ml-8 office-locations">
              {/* Australia Office */}
              <div className="grid border-b grid-cols-1 border-[#eaeaef] py-8 items-center md:grid-cols-3">
                <h3 className="w-[300px] max-sm:mb-6 max-md:mb-4 text-xl font-medium">
                  Australia Office
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <div className="flex-shrink-0 icons mr-11">
                    <Image
                      src="/assets/images/contact-page/australia-office.webp"
                      alt="australiaOfficeIcon"
                      width={52}
                      height={56}
                    />
                  </div>
                  <div className="contact__location-content">
                    <p className="text-sm max-sm:mt-4 text-[#525258] break-words hover:text-[#f50963] ease-out duration-300">
                      <a href="mailto:contact.location@website.com">
                        furnito.australia@mail.com
                      </a>
                    </p>
                    <p className="text-sm text-[#525258] break-words hover:text-[#f50963] ease-out duration-300">
                      <a href="tel:+1-123-456-7899">+1 (123) 456-7899</a>
                    </p>
                  </div>
                </div>
                <div className="xsm:justify-self-end max-xsm:mt-8 max-md:-mt-14 view-location-button">
                  <a
                    href="https://maps.app.goo.gl/deeDhdMEapEQAqyD9"
                    target="_blank"
                    className="p-[12px_31px] rounded ease-out duration-300 text-sm capitalize font-medium border hover:bg-[#f50963] hover:text-white hover:border-[#f50963] border-[#eaeaef] text-[#03041c]"
                  >
                    View Location
                  </a>
                </div>
              </div>

              {/* San Francisco Office */}
              <div className="grid border-b border-[#eaeaef] py-8 items-center grid-cols-1 md:grid-cols-3">
                <h3 className="w-[300px] max-sm:mb-6 max-md:mb-4 text-xl font-medium">
                  San Francisco Office
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <div className="flex-shrink-0 icons mr-11">
                    <Image
                      src="/assets/images/contact-page/san-francisco-office.webp"
                      alt="sanFranciscoOfficeIcon"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="contact__location-content">
                    <p className="text-sm max-sm:mt-4 text-[#525258] break-words hover:text-[#f50963] ease-out duration-300">
                      <a href="mailto:contact.location@website.com">
                        furnito.francisco@mail.com
                      </a>
                    </p>
                    <p className="text-sm text-[#525258] break-words hover:text-[#f50963] ease-out duration-300">
                      <a href="tel:+1-123-456-7890">+1 (123) 456-7899</a>
                    </p>
                  </div>
                </div>
                <div className="xsm:justify-self-end max-xsm:mt-8 max-md:-mt-14 view-location-button">
                  <a
                    href="https://maps.app.goo.gl/Eiw5zyZ24pr5C6e76"
                    target="_blank"
                    className="p-[12px_31px] rounded ease-out duration-300 text-sm capitalize font-medium border hover:bg-[#f50963] hover:text-white hover:border-[#f50963] border-[#eaeaef] text-[#03041c]"
                  >
                    View Location
                  </a>
                </div>
              </div>

              {/* Egypt Office*/}
              <div className="grid items-center grid-cols-1 py-8 md:grid-cols-3">
                <h3 className="w-[300px] max-sm:mb-6 max-md:mb-4 text-xl font-medium">
                  Egypt Office
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <div className="flex-shrink-0 icons mr-11">
                    <Image
                      src="/assets/images/contact-page/egypt-office.webp"
                      alt="egyptOfficeIcon"
                      width={54}
                      height={54}
                    />
                  </div>
                  <div className="contact__location-content">
                    <p className="text-sm max-sm:mt-4 text-[#525258] break-words hover:text-[#f50963] ease-out duration-300">
                      <a href="mailto:contact.location@website.com">
                        furnito.egypt@mail.com
                      </a>
                    </p>
                    <p className="text-sm text-[#525258] break-words hover:text-[#f50963] ease-out duration-300">
                      <a href="tel:+1-789-123-4567">+1 (789) 123-4567</a>
                    </p>
                  </div>
                </div>
                <div className="xsm:justify-self-end max-xsm:mt-8 max-md:-mt-14 view-location-button">
                  <a
                    href="https://maps.app.goo.gl/9wVe28JkV9ZxoDECA"
                    target="_blank"
                    className="p-[12px_31px] rounded ease-out duration-300 text-sm capitalize font-medium border hover:bg-[#f50963] hover:text-white hover:border-[#f50963] border-[#eaeaef] text-[#03041c]"
                  >
                    View Location
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <InfoHighlights />
      </section>
    </main>
  );
};

export default Contact;
