import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import LoadingScreen from "../../Components/LoadingScreen/Loading.Screen";
import WishListCard from "../../Components/WishListCard/WishListCard";
import background from "../../assets/images/Questions-amico.png";
import Footer from "../../Components/Footer/Footer";

export default function WishList() {
  const [isLoading, setIsLoading] = useState(true);
  const [wishListProducts, setWishListProducts] = useState([]);

  useEffect(() => {
    getWishList();
  }, []);

  async function getWishList() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        "https://www.tryon-store.xyz/api/v1/wishlist",
        // "https://api.tryon-store.xyz/api/v1/wishlist",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setWishListProducts(data.data.categories);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteWishProduct(productId) {
    const { data } = await axios.delete(
      `https://www.tryon-store.xyz/api/v1/wishlist/${productId}`,
      // `https://api.tryon-store.xyz/api/v1/wishlist/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );


    setWishListProducts(prev =>
      prev.filter(product => product._id !== productId)
    );

    // setWishListProducts(data.data);
    // console.log("delete wish data.data",data);
    // setTimeout(() => {
      // await getWishList();
    // }, 1000);


    // console.log(data.cartId)
    // console.log(data.data)
    // console.log(data.data.products)
    // console.log(data.numOfCartItems)
    // console.log(data.data.totalCartPrice)
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!wishListProducts?.length) {
    return (
        <>
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen overflow-hidden text-lg text-center text-gray-500">
          <img
            src={background}
            className="absolute right-0 z-0 object-cover w-1/2 h-full -bottom-4 opacity-20"
            alt="background"
          />

          <div className="relative z-10">
            <p className="text-2xl capitalize font-body">no product in your wish list</p>
       
          </div>
        </div>
        <Footer />
      </>    
    );
  }

  return (
    <>
      <section className=" bg-[#F8F9FA]">
        <div className="w-1/2 px-4 mx-auto max-w-7xl md:px-5 lg-6">
          <div className="w-full col-span-12 pt-8 pb-8 xl:col-span-8 lg:pr-8 lg:py-24 max-xl:max-w-3xl max-xl:mx-auto">
            <div className="flex items-center justify-between border-b border-gray-300">
              <h2 className="pb-8 text-3xl font-bold leading-10 text-black font-manrope font-heading">
                wish List
              </h2>
            </div>

            {/* //! WISH CARD */}

            {wishListProducts?.map((product, index) => {
              return (
                <WishListCard
                  product={product}
                  deleteWishProduct={deleteWishProduct}
                  key={index}
                  isLoading={isLoading}
                />
              );
            })}

            {/* //!===================================== */}
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}
