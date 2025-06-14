import "./loadingScreen.css";
import React from "react";
import Footer from "../Footer/Footer";

export default function LoadingScreen() {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="spinner">
          <div className="dot1"></div>
          <div className="dot2"></div>
        </div>
      </div>
      <Footer />
    </>
  );
}
