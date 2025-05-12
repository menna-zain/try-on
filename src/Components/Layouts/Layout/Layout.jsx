import React, { useContext } from "react";
import NavbarUi from "../../Navbar/Navbar";
// import Footer from "../../Footer/Footer";
import { Outlet } from "react-router-dom";
import { authContext } from "../../../Contexts/AuthContext";
import LoadingScreen from "../../LoadingScreen/Loading.Screen";

export default function Layout() {
  const { isLoading } = useContext(authContext);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
        <div className="relative  z-[9999]"> {/* ← أضف relative هنا */}
          <NavbarUi />
        </div>

          <div className="bg-[#F8F9FA] ">
            <Outlet />
          </div>
        </>
      )}
      {/* <Footer /> */}
    </>
  );
}
