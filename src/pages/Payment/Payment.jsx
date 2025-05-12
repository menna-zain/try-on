import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingScreen from "../../Components/LoadingScreen/Loading.Screen";
import axios from "axios";
import Cookies from "js-cookie";
import Footer from "../../Components/Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Payment() {
  const [isLoading, setIsLoading] = useState(true);
  
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  
  const [paymentMethod, setPaymentMethod] = useState("visa");
  const [isSubmitting, setIsSubmitting] = useState(false);
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getUserAddresses();
  }, []);

  async function getUserAddresses() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        "https://api.tryon-store.xyz/api/v1/addresses",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      console.log(data);
      console.log("Address data.data", data.data);
      setAddresses(data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load addresses.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCheckout() {
    if (!selectedAddress) {
      toast.warn("Please select a delivery address.");
      return;
    }

    setIsSubmitting(true);
    const orderData = {
      shippingAddress: {
        alias: selectedAddress.alias,
        details: selectedAddress.details,
        city: selectedAddress.city,
        phone: selectedAddress.phone,
      },
      paymentMethod: paymentMethod,
    };

    try {
      if (paymentMethod === "visa") {
        const { data } = await axios.get(
          `https://api.tryon-store.xyz/api/v1/orders/checkout-session/${id}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        if (data.session.url) {
          toast.success("Redirecting to payment gateway...");
          setTimeout(() => {
            window.location.href = data.session.url;
          }, 1500);
        }
      } else {
        await axios.post(
          `https://api.tryon-store.xyz/api/v1/orders/${id}`,
          orderData,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        toast.success("Order placed successfully with Cash on Delivery.");
        setTimeout(() => {
          navigate("/thanks"); // make sure this route exists
        }, 2000);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Something went wrong during checkout.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <section className="min-h-screen px-6 py-10 bg-gray-50">
        <div className="max-w-4xl p-6 mx-auto bg-white rounded shadow">
          <h2 className="mb-6 text-2xl font-bold">Choose Delivery Address</h2>

          <div className="space-y-4">
            {addresses.length === 0 && (
              <p className="text-gray-600">
                No saved addresses found. Please add one from your profile.
              </p>
            )}

            {addresses.map((address) => (
              <label
                key={address._id}
                className="flex items-center p-4 mb-4 border rounded cursor-pointer hover:border-[#570091]"
              >
                <input
                  type="radio"
                  name="address"
                  value={address._id}
                  checked={selectedAddress?.alias === address.alias}
                  onChange={() => setSelectedAddress(address)}
                  className="w-5 h-5 mr-4"
                  style={{ accentColor: "#570091" }}
                />

                <div>
                  <p className="font-semibold text-gray-800">
                    {address.alias}, {address.details}, {address.city}
                  </p>
                  {address.phone && (
                    <p className="mt-1 text-gray-500">Phone: {address.phone}</p>
                  )}
                </div>
              </label>
            ))}
          </div>

          <div className="mt-10">
            <h2 className="mb-4 text-2xl font-bold">Payment Method</h2>

            <div className="space-y-4">
              {["visa", "cash"].map((method) => (
                <label
                  key={method}
                  className={`flex items-center p-4 border rounded cursor-pointer hover:border-[#570091] ${
                    paymentMethod === method ? "bg-[#5700911b]" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method)}
                    className="mr-2"
                    style={{ accentColor: "#570091" }}
                  />
                  {method === "visa" ? "Visa / Card" : "Cash on Delivery"}
                </label>
              ))}
            </div>

            <button
              onClick={handleCheckout}
              disabled={isSubmitting}
              className="w-full py-3 mt-6 font-semibold text-white transition bg-[#570091] rounded hover:bg-[#4a196b] disabled:opacity-50"
            >
              {isSubmitting ? "Processing..." : "Confirm Now"}
            </button>
          </div>
        </div>
      </section>
      <ToastContainer />
      <Footer />
    </>
  );
}

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Cookies from "js-cookie";

// export default function Payment() {
//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   let { id } = useParams();

//   const { alias, ...addressWithoutAlias } = selectedAddress || {}; // استخدام {} كـ fallback في حال كانت selectedAddress فارغة

// const orderData = {
//   shippingAddress: addressWithoutAlias,
//   // ... باقي بيانات الطلب
// };

//   useEffect(() => {
//     getAddresses();
//   }, []);

//   async function getAddresses() {
//     try {
//       const { data } = await axios.get(
//         "https://api.tryon-store.xyz/api/v1/addresses",
//         {
//           headers: {
//             Authorization: `Bearer ${Cookies.get("token")}`,
//           },
//         }
//       );
//       console.log("User addresses:", data.data);
//       setAddresses(data.data);
//     } catch (error) {
//       console.error("Error fetching addresses:", error);
//     }
//   }

//   async function handleCheckout() {
//     try {
//       const { data } = await axios.get(
//         `https://api.tryon-store.xyz/api/v1/orders/checkout-session/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${Cookies.get("token")}`,
//           },
//         }
//       );
//       console.log("payment data:", data);
//       if (data.session.url) {
//                 window.location.href = data.session.url;
//               }

//     } catch (error) {
//       console.error("Error fetching addresses:", error);
//     }
//   }

//   return (
//     <section className="min-h-screen px-6 py-10 bg-gray-50">
//       <div className="max-w-4xl p-6 mx-auto bg-white rounded shadow">
//         <h2 className="mb-6 text-2xl font-bold">Choose Delivery Address</h2>

//         <div className="space-y-4">
//           {addresses.map((address) => (
//             <label
//               key={address._id}
//               className="flex items-center p-4 mb-4 border rounded cursor-pointer hover:border-blue-500"
//             >
//               {/* الدائرة */}
//               <input
//                 type="radio"
//                 name="address"
//                 value={address._id}
//                 checked={selectedAddress?.alias === address.alias}
//                 onChange={() => setSelectedAddress(address)}
//                 className="w-5 h-5 mr-4 accent-blue-600"
//               />

//               {/* تفاصيل العنوان */}
//               <div>
//                 <p className="font-semibold text-gray-800">
//                   {address.alias}, {address.details}, {address.city}
//                 </p>
//                 {address.phone && (
//                   <p className="mt-1 text-gray-500">Phone: {address.phone}</p>
//                 )}
//               </div>
//             </label>
//           ))}
//         </div>

//         <div className="mt-10">
//           <h2 className="mb-4 text-2xl font-bold">Payment Method</h2>
//           <div className="p-4 mb-6 border rounded bg-blue-50">
//             <input
//               type="radio"
//               name="payment"
//               checked
//               readOnly
//               className="mr-2"
//             />
//             Visa / Card
//           </div>

//           <button
//             // onClick={handleCheckout}
//             onClick={handleCheckout}
//             disabled={isSubmitting}
//             className="w-full py-3 font-semibold text-white transition bg-blue-600 rounded hover:bg-blue-700"
//           >
//             {isSubmitting ? "Processing..." : "Pay Now"}
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }
