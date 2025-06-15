import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ChevronDown } from "lucide-react";

export default function OrdersTable({ orders }) {
  const [orderStatus, setOrderStatus] = useState(
    orders.reduce((acc, order) => {
      acc[order._id] = order.isDelivered ? "delivered" : "not delivered";
      return acc;
    }, {})
  );
  
  console.log("Orders",orders);
  
  const [paymentStatus, setPaymentStatus] = useState(
    orders.reduce((acc, order) => {
      acc[order._id] = order.isPaid ? "paid" : "not paid";
      return acc;
    }, {})
  );

  const [isUpdating, setIsUpdating] = useState({});

  const handleStatusChange = async (orderId) => {
    setOrderStatus((prev) => ({
      ...prev,
      [orderId]:
        prev[orderId] === "not delivered" ? "delivered" : "not delivered",
    }));

    setIsUpdating((prev) => ({ ...prev, [orderId]: true }));

    try {
      await axios.patch(
        `https://www.tryon-store.xyz/api/v1/orders/${orderId}/deliver`,
        // `https://api.tryon-store.xyz/api/v1/orders/${orderId}/deliver`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
    } catch (error) {
      console.error("Delivery status update failed", error);
      setOrderStatus((prev) => ({
        ...prev,
        [orderId]:
          prev[orderId] === "delivered" ? "not delivered" : "delivered",
      }));
    } finally {
      setIsUpdating((prev) => ({ ...prev, [orderId]: false }));
    }
  };

  // todo   PAYMENT
  const handlePaymentChange = async (orderId) => {
    setPaymentStatus((prev) => ({
      ...prev,
      [orderId]: "paid",
    }));

    setIsUpdating((prev) => ({ ...prev, [orderId]: true }));

    try {
      await axios.patch(
        `https://www.tryon-store.xyz/api/v1/orders/${orderId}/pay`,
        // `https://api.tryon-store.xyz/api/v1/orders/${orderId}/pay`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
    } catch (error) {
      console.error("Payment status update failed", error);
      setPaymentStatus((prev) => ({
        ...prev,
        [orderId]: "not paid",
      }));
    } finally {
      setIsUpdating((prev) => ({ ...prev, [orderId]: false }));
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded-2xl">
      
      <div className="overflow-x-auto">
        <table className="w-full py-10 text-sm text-left border-collapse">
          <thead>
            <tr className="text-gray-400 font-heading">
              <th className="p-2">Order ID</th>
              <th className="p-2">Customer</th>
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>
              <th className="p-2">Total</th>
              <th className="p-2">Payment</th>
              <th className="p-2">Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr
                key={idx}
                className="border-t border-gray-700 hover:bg-gray-700 font-body"
              >
                <td className="p-2 font-medium text-white">
                  {order._id.slice(0, 5)}
                </td>
                <td className="p-2">{order.user.name}</td>
                <td className="p-2">
                  {new Date(order.createdAt).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </td>

                {/* التوصيل */}
                <td className="relative p-2">
                  <span
                    className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium w-fit ${
                      order.isDelivered 
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.isDelivered 
                      ? "Delivered"
                      : "Not Delivered"}
                    {/* {orderStatus[order._id] === "delivered" ? "Delivered" : "Not Delivered"} */}

                    {order.isDelivered === false && (
                      <div className=" group">
                        <ChevronDown className="cursor-pointer" size={15} />
                        <div className="absolute top-0 z-10 hidden rounded shadow-md mborder group-hover:block">
                          <button
                            className="px-4 py-1 text-sm text-green-700 bg-green-100 rounded"
                            onClick={() => handleStatusChange(order._id)}
                          >
                            Delivered
                          </button>
                        </div>
                      </div>
                    )}
                  </span>
                </td>

                <td className="p-2">£E{order.totalOrderPrice}</td>
                {/* الدفع */}
                <td className="relative p-2">
                  <span
                    className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium w-fit ${
                      order.isPaid 
                        ? "bg-green-700 text-white"
                        : "bg-red-700 "
                    }`}
                  >
                    {order.isPaid  ? "Paid" : "Not Paid"}
                    {/* {paymentStatus[order._id] === "not paid" && ( */}
                    {order.isPaid === false && (
                      <div className=" group">
                        <ChevronDown className="cursor-pointer" size={15} />
                        <div className="absolute top-0 z-10 hidden rounded shadow-md mborder group-hover:block">
                          <button
                            className="px-4 py-1 text-sm bg-green-700 rounded"
                            onClick={() => handlePaymentChange(order._id)}
                          >
                            Paid
                          </button>
                        </div>
                      </div>
                    )}
                  </span>
                </td>
                
                <td className="p-2 font-medium text-white">
                  {order.paymentMethodType
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}