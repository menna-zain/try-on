import React from "react";
import logo from "../../assets/images/logo.png";

export default function Footer() {
  return (
    <>
      <footer className="bg-white border-t-1">
        <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 ">
          <div className="lg:flex lg:items-start lg:gap-8">
            <div className="grid grid-cols-2 gap-8 mt-8 lg:mt-0 lg:grid-cols-5 lg:gap-y-16">
              {/* logo */}
              <div className="col-span-2">
                <div>
                  <div className="">
                    <img src={logo} className="w-20 " />
                  </div>

                  <p className="mt-1 text-gray-500">
                  Experience shopping like never before
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* //!_________ */}
          <div className="pt-8 mt-8 border-t border-gray-100">
            <div className="sm:flex sm:justify-between">
              <p className="text-xs text-gray-500">
                &copy; 2025. Try On. All rights reserved.
              </p>

              <ul className="flex flex-wrap justify-start gap-4 mt-8 text-xs sm:mt-0 lg:justify-end">
                <li>
                  <a
                    href="#"
                    className="text-gray-500 transition hover:opacity-75"
                  >
                    {" "}
                    Terms & Conditions{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-gray-500 transition hover:opacity-75"
                  >
                    {" "}
                    Privacy Policy{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-gray-500 transition hover:opacity-75"
                  >
                    {" "}
                    Cookies{" "}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
