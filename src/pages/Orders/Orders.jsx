import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import LoadingScreen from "../../Components/LoadingScreen/Loading.Screen";
import Footer from "../../Components/Footer/Footer";
import background from "../../assets/images/Empty-amico.png"

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getLoggedUserOrders();
  }, []);

  async function getLoggedUserOrders() {
    setIsLoading(true);
    const { data } = await axios.get(
      "https://api.tryon-store.xyz/api/v1/orders",
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    setIsLoading(false);
    setOrders(data.data);
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
  <>
    <div className="">
      {orders.length === 0 ? (
        <>
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen overflow-hidden text-lg text-center text-gray-500">
  <img
    src={background}
    // className="absolute z-0 object-cover w-1/2 opacity-25 -inset-0"
    className="absolute right-0 z-0 object-cover w-1/2 h-full -bottom-12 opacity-20"
    alt="background"
  />

  <div className="relative z-10">
    <p className="text-2xl">You haven't placed any orders yet</p>
    <Link to="/">
      <button className="px-4 py-2 mt-1 text-sm underline rounded-lg text-primary">
        Start Shopping
      </button>
    </Link>
  </div>
</div>

<Footer/>
</>
      ) : (
        <div className="h-screen max-w-2xl pt-10 mx-auto">
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="flex flex-col items-center p-4 transition-all duration-300 bg-white rounded-lg shadow-md hover:shadow-lg"
            >
              <div className="flex items-center justify-between w-full ">
                <h3 className="text-2xl font-semibold capitalize font-heading">
                  Order ID: <span className="font-body"> {order._id.slice(0, 9)} </span>
                </h3>
                <Link to={"/orderDetails/" + order._id}>
                  <button className="px-3 py-2 capitalize border bg-[#570091] rounded-lg text-white text-sm font-body">
                    view details
                  </button>
                </Link>
              </div>

              <div className="flex items-center w-full my-3">
                <p className="text-gray-600 font-body ">
                  <span className="text-gray-500 font-heading">Order date:</span>{" "}
                  {new Date(order.createdAt).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                <span className="mx-2 text-gray-600">|</span>

                <h6
                  className={`capitalize font-body ${
                    order.isDelivered ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {order.isDelivered ? "delivered" : "soon to arrive"}
                </h6>
              </div>
            </div>
          ))}
        </div>
        </div>
      )}
    </div>
  </>
);
}