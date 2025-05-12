import React from 'react'
import background from "../../assets/images/404 Error Page not Found with people connecting a plug-amico.png";
import Footer from '../../Components/Footer/Footer';

export default function NotFound() {
  return (
    <>
        <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden text-lg text-center text-gray-500 ">
          <img
            src={background}
            className="object-cover w-1/3 h-full my-10 opacity-90"
            alt="background"
          />
        </div>
        <Footer />
      </>
  )
}
