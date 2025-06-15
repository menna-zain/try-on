import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import CartProduct from "../../Components/CartProduct/CartProduct";
import LoadingScreen from "../../Components/LoadingScreen/Loading.Screen";
import Footer from "../../Components/Footer/Footer";

import background from "../../assets/images/Ecommerce campaign-amico.png";

export default function Cart() {
  const [cartId, setCartId] = useState(null);
  const [cartData, setCartData] = useState([]);
  const [numOfCartItems, setNumOfCartItems] = useState(null);
  const [totalCartPrice, setTotalCartPrice] = useState(null);
  const [requestTimeOut, setRequestTimeOut] = useState(null);

  const [couponCode, setCouponCode] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(null);

  const totalQuantity = Array.isArray(cartData)
    ? cartData.reduce((total, item) => total + item.quantity, 0)
    : 0;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  async function getLoggedUserCart() {
    setIsLoading(true);
    const { data } = await axios.get(
      "https://www.tryon-store.xyz/api/v1/cart",
      // "https://api.tryon-store.xyz/api/v1/cart",
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    setIsLoading(false);
    setCartId(data.data._id);
    setCartData(data.data.cartItems);
    setTotalCartPrice(data.data.totalCartPrice);
    setNumOfCartItems(data.numOfCartItems);
  }

  function updateProductCart(productId, quantity) {
    clearTimeout(requestTimeOut);
    setRequestTimeOut(
      setTimeout(() => {
        axios
          .patch(
            `https://api.tryon-store.xyz/api/v1/cart/${productId}`,
            {
              quantity,
            },
            {
              headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
              },
            }
          )
          .then(({ data }) => {
            console.log("update cart data:", data);
            console.log("update cart TOKEN:", Cookies.get("token"));
            setCartData(data.data.cartItems);
            // setNumOfCartItems(data.numOfCartItems);
            setTotalCartPrice(data.data.totalCartPrice);
          });
      }, 500)
    );
  }

  async function deleteProductCart(productId) {
    const { data } = await axios.delete(
      `https://api.tryon-store.xyz/api/v1/cart/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    console.log(data);

    setCartData(data.data.cartItems);
    setNumOfCartItems(data.numOfCartItems);
    setTotalCartPrice(data.data.totalCartPrice);
  }

  async function clearCart() {
    const { data } = await axios.delete(
      `https://api.tryon-store.xyz/api/v1/cart`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    console.log(data);

    setCartData(null);
    setNumOfCartItems(0);
    setTotalCartPrice(0);

    // console.log(data.cartId)
    // console.log(data.data)
    // console.log(data.data.products)
    // console.log(data.numOfCartItems)
    // console.log(data.data.totalCartPrice)
  }

  async function handleApplyCoupon() {
    if (!couponCode.trim()) {
      alert("Please enter a coupon code.");
      return;
    }

    try {
      const { data } = await axios.patch(
        `https://api.tryon-store.xyz/api/v1/cart/applyCoupon`,
        { code: couponCode },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      console.log("Coupon applied successfully:", data);
      setDiscountedPrice(data.data.totalPriceAfterDiscount); // حفظ السعر بعد الخصم
    } catch (error) {
      console.error("Error applying coupon:", error);
      alert("Invalid or expired coupon.");
    }
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!cartData?.length) {
    return (
      <>
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen overflow-hidden text-lg text-center text-gray-500">
          <img
            src={background}
            className="absolute right-0 z-0 object-cover w-1/2 h-full -bottom-4 opacity-20"
            alt="background"
          />

          <div className="relative z-10">
            <p className="text-2xl capitalize font-body">no product in your cart</p>
            <Link to="/">
              <button className="px-4 py-2 mt-1 text-sm underline rounded-lg text-primary font-body">
                Start Shopping
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  //! hena design page el-cart & 2l-logic , design 2l-item 2l-wa7da fy componant <cartproduct/>
  return (
    <>
      <section className=" relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0">
        <div className="relative z-10 w-full px-4 mx-auto max-w-7xl md:px-5 lg-6">
          <div className="grid grid-cols-12">
            <div className="w-full col-span-12 pb-8 xl:col-span-8 lg:pr-8 pt-14 lg:py-24 max-xl:max-w-3xl max-xl:mx-auto">
              <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                <h2 className="text-3xl font-bold leading-10 text-black font-manrope">
                  Shopping Cart
                </h2>
                <button
                  onClick={clearCart}
                  className="text-lg font-semibold leading-8 text-red-500 transition-all duration-500 border-none rounded-full shadow-sm pe-5 outline-0 group shadow-transparent hover:text-red-700"
                >
                  Clear Cart
                </button>
              </div>

              {/* sheret 2l-tafasel */}
              <div className="grid grid-cols-12 pb-6 mt-8 border-b border-gray-200 max-md:hidden">
                <div className="col-span-12 md:col-span-7">
                  <p className="text-lg font-normal leading-8 text-gray-400">
                    Product Details
                  </p>
                </div>
                <div className="col-span-12 md:col-span-5">
                  <div className="grid grid-cols-5">
                    <div className="col-span-3">
                      <p className="text-lg font-normal leading-8 text-center text-gray-400">
                        Quantity
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-lg font-normal leading-8 text-center text-gray-400">
                        Total
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* //! CART PRODUCT */}
              {cartData?.map((product) => {
                return (
                  <CartProduct
                    product={product}
                    key={product._id}
                    deleteProductCart={deleteProductCart}
                    updateProductCart={updateProductCart}
                    isLoading={isLoading}
                  />
                );
              })}
            </div>
            {/* //!===================================== */}
            {/*  order summary */}
            <div className="w-full max-w-3xl col-span-12 px-10 py-24 mx-auto bg-gray-100 xl:col-span-4 max-xl:px-6 xl:max-w-lg lg:pl-8">
              <div className="sticky top-32">
                <div className="w-full max-w-sm mx-auto mt-6">
                  <label
                    htmlFor="coupon"
                    className="block mb-2 text-base font-medium text-gray-700"
                  >
                    Have a discount code?
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="coupon"
                      value={couponCode}
                      onChange={(e) =>
                        setCouponCode(e.target.value.toUpperCase())
                      }
                      placeholder="Enter your coupon"
                      className="flex-1 px-4 py-2 border border-gray-300 outline-none rounded-l-md focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 font-semibold text-white transition bg-blue-600 rounded-r-md hover:bg-blue-700"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                <h2 className="py-5 mt-8 text-3xl font-bold leading-10 text-black border-b border-gray-300 font-manrope">
                  Order Summary
                </h2>
                <div className="mt-5">
                  <div>
                    <div className="flex items-center justify-between py-8">
                      <p className="text-xl font-medium leading-8 text-black">
                        {totalQuantity} Items
                      </p>
                      <p className="text-xl font-semibold leading-8 ">
                        {discountedPrice ? (
                          <>
                            <h6 className="text-gray-500 line-through me-2">
                              E£ {totalCartPrice.toFixed(2)}
                            </h6>
                            <h6 className="text-green-600">
                              E£ {discountedPrice.toFixed(2)}
                            </h6>
                          </>
                        ) : (
                          <>E£ {totalCartPrice.toFixed(2)}</>
                        )}
                      </p>
                    </div>
                    <Link to={"/payment/" + cartId}>
                      <button className="w-full px-6 py-3 text-lg font-semibold text-center text-white transition-all duration-500 bg-[#570091] rounded-xl hover:bg-[#4a196b]">
                        Checkout
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}
