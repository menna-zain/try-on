import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Sidebar from "../../Components/Sidebar/Sidebar";
import OrdersTable from "../../Components/OrdersTable/OrdersTables";

export default function Orders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
      getLoggedUserOrders();
    }, []);

  async function getLoggedUserOrders() {
    // setIsLoading(true);
    const { data } = await axios.get(
      "https://www.tryon-store.xyz/api/v1/orders",
      // "https://api.tryon-store.xyz/api/v1/orders",
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    // setIsLoading(false);
    console.log("order data:", data);
    console.log("order data.data:", data.data);
    setOrders(data.data);
  }
  
  return (
    <>
      <div className="flex min-h-screen ml-64 text-white bg-gray-900">
  
          {/* SIDEBAR */}
          <Sidebar />
       

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold font-heading">Orders</h2>
          </div>

          {/* ORDERS */}
          <OrdersTable orders={orders} />
        </main>
      </div>
    </>
  );
}
