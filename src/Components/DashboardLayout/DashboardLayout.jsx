import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { authContext } from "../../../src/Contexts/AuthContext";
import LoadingScreen from "../../Components/LoadingScreen/Loading.Screen";


export default function DashboardLayout() {
      const { isLoading } = useContext(authContext);



    
  return (
    <>
       {isLoading ? (
            <LoadingScreen />
          ) : (
            <>
      {/* <div className="min-h-screen bg-gray-100"> */}
      <div className="bg-gray-800">
        {/* <h1 className="mb-4 text-2xl font-bold">Dashboard</h1> */}
        {/* هنا يظهر محتوى الصفحات الفرعية */}
        <Outlet />
      </div>
      </>
        )}
    </>
  );
}
