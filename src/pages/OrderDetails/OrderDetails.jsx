import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import LoadingScreen from "../../Components/LoadingScreen/Loading.Screen";
import Footer from "../../Components/Footer/Footer";

export default function OrderDetails() {
  const [orders, setOrders] = useState();
  const [cartItems, setCartItems] = useState([]);

  let { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getLoggedUserOrders(id);
  }, []);
  async function getLoggedUserOrders(orderId) {
    setIsLoading(true);
    const { data } = await axios.get(
      `https://www.tryon-store.xyz/api/v1/orders/${orderId}`,
      // `https://api.tryon-store.xyz/api/v1/orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    setIsLoading(false);
    setOrders(data.data.data);
    setCartItems(data.data.cartItems);
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      {/* //!  2l-details */}
      <>
        {/* //! order-details */}
        <div className="flex justify-end w-full min-h-screen gap-20 py-10">
          <React.Fragment key={orders._id}>
            <div className="w-1/2 px-20">
              {/* عنوان الصفحة */}
              <div className="flex items-center gap-4 py-2 mb-4 border-b-1">
                <Link to={"/orders"}>
                  <FaArrowLeft size={20} />
                </Link>
                <h2 className="text-2xl font-bold capitalize font-heading">
                  order details
                </h2>
              </div>

              {/* معلومات الطلب */}
              <div className="flex items-center justify-between w-full my-2">
                <h3 className="text-2xl font-medium capitalize font-heading">
                  order ID:{" "}
                  <span className="font-body"> {orders._id.slice(0, 9)} </span>
                </h3>
              </div>

              <div className="flex items-center justify-between w-full my-2">
                {/* <p className="text-gray-600 capitalize">tracking number:</p> */}
                <p className="text-gray-600 font-body">
                  <span className="text-gray-500"> Order date:</span>{" "}
                  {new Date(orders.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <h3
                  className={`capitalize pb-3 font-body ${
                    orders.isDelivered ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {orders.isDelivered ? "delivered" : "soon to arrive"}
                </h3>
              </div>

              <div className="space-y-4">
                {orders.cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex p-4 transition-all duration-300 bg-white rounded-lg shadow-md hover:shadow-lg"
                  >
                    <img
                      src={item.product.imgCover}
                      alt={item.product.name}
                      className="object-cover w-24 h-24 mx-auto rounded-xl me-3"
                    />
                    {/* </div> */}
                    <div className="flex flex-col w-full">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col my-3">
                          <h3 className="text-base font-bold capitalize font-heading">
                            {
                              item.product.name
                              // .split(" ")
                              // .slice(0, 3)
                              // .join(" ") + "..."
                            }
                          </h3>
                          <div className="flex items-center w-full gap-1 mt-2">
                            <p className="text-gray-600 capitalize font-heading">
                              color: {item.color || "n/a"}
                            </p>
                            <span className="mx-2 text-gray-600">|</span>
                            <p className="text-gray-600 capitalize font-heading">
                              size: {item.size || "n/a"}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end my-3">
                          <h6 className="font-bold text-black capitalize font-heading">
                            price:{" "}
                            <span className="text-sm font-medium font-body">
                              {" "}
                              E£{item.price}
                            </span>
                          </h6>
                          <h6 className="text-gray-500 capitalize font-heading">
                            Qty: {item.quantity}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* orders information */}
            <div className="sticky self-start w-1/4 pt-10 top-10">
              <div className="flex flex-col gap-4 p-10 py-3 mt-4 bg-white border rounded-lg w-fit border-primary">
                <h6 className="text-xl font-semibold capitalize font-heading">
                  orders information
                </h6>
                <ul className="mb-6 text-sm text-gray-700 font-body">
                  <li className="flex items-center mb-1 capitalize">
                    <svg
                      className="w-4 h-4 mr-2 text-[#570091]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="font-semibold"> payment method:</span>
                    &nbsp; {orders.paymentMethodType || "n/a"}
                  </li>
                  <li className="flex items-center mb-1 capitalize">
                    <svg
                      className="w-4 h-4 mr-2 text-[#570091]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="font-semibold"> shipping price:</span>
                    &nbsp; £E{orders.shippingPrice || "0"}
                  </li>
                  <li className="flex items-center mb-1 capitalize">
                    <svg
                      className="w-4 h-4 mr-2 text-[#570091]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="font-semibold"> tax price:</span>&nbsp; £E
                    {orders.taxPrice || "0"}
                  </li>
                  <li className="flex items-center mb-1 capitalize">
                    <svg
                      className="w-4 h-4 mr-2 text-[#570091]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="font-semibold">Payment Status:</span>&nbsp;
                    <span
                      className={`capitalize ${
                        orders.isPaid ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {orders.isPaid ? "paid" : "not paid"}
                    </span>
                  </li>
                  <li className="flex items-center mb-1 capitalize">
                    <svg
                      className="w-4 h-4 mr-2 text-[#570091]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="font-semibold">total amount:</span>&nbsp;
                    £E{orders.totalOrderPrice}
                  </li>
                </ul>
              </div>
            </div>
          </React.Fragment>
        </div>
        <Footer />
      </>

      {/* //!____________________________________________________________ */}
    </>
  );
}
