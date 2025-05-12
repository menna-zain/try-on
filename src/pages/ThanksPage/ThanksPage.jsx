import React from "react";
import { CheckCircle } from "lucide-react";
import Footer from "../../Components/Footer/Footer";

export default function ThanksPage() {
  return (
    <>
    <div className="flex items-center justify-center p-4 my-36">
      <div className="w-full max-w-md p-8 border shadow-md rounded-2xl">
        <div className="flex items-center gap-2">
        <h2 className="mb-2 text-3xl font-bold font-heading">Success</h2>
         <CheckCircle size={50} strokeWidth={1.5} className=" text-[#570091] mb-4" />
        </div>
        <h2 className="mb-2 text-2xl font-bold font-heading">Thank you for<br /> your order!</h2>
        <p className="mb-6 text-lg text-gray-600"> your order has been confirmed and will be delivered soon.</p>
      </div>
    </div>
    <Footer/>
    </>
  );
}