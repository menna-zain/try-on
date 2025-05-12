import React, { useEffect, useState } from "react";
import { X } from 'lucide-react';
import { Button } from "@heroui/react";

//!product is destract from products

export default function CartProduct({
  product,
  deleteProductCart,
  updateProductCart,
}) {
  const [productCount, setProductCount] = useState(product.quantity);

  useEffect(() => {
    setProductCount(product.quantity);
    console.log("cart product._id",product._id)
  }, [product.quantity]);

  // handle buttons
  function increment() {
    setProductCount(productCount + 1);
    updateProductCart(product._id, productCount + 1);
  }
  function decrement() {
    setProductCount(productCount - 1);
    updateProductCart(product._id, productCount - 1);
  }

  return (
    <>
      <div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-b border-gray-200 group relative">
        <div className="w-full md:max-w-[126px]">
          <img
            src={product.product.imgCover}
            alt=""
            className="object-contain object-center w-full mx-auto rounded-xl"
          />
        </div>

        <div className="grid w-full grid-cols-1 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex flex-col max-[500px]:items-center gap-3">
              <h6 className="text-sm font-semibold leading-7 text-black me-3">
                {product.product.name}
                name
              </h6>
             
              <h6 className="text-base font-medium leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600">
              E£ {product.price.toFixed(2)}
              </h6>
            </div>
          </div>

          <div className="flex">
            <div className="flex items-center h-full max-md:mt-3 me-2 ">
              <div className="flex items-center ">
                {/* //! - */}
                <Button
                  isDisabled={product.quantity === 1}
                  onPress={decrement}
                  className="border border-gray-200 outline-none  w-full max-w-[70px] min-w-[60px] py-[29px]  text-center bg-transparent rounded-none rounded-e text-3xl"
                >
                  <svg
                    className="transition-all duration-500 stroke-gray-900 group-hover:stroke-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      d="M16.5 11H5.5"
                      stroke=""
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M16.5 11H5.5"
                      stroke=""
                      strokeOpacity="0.2"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M16.5 11H5.5"
                      stroke=""
                      strokeOpacity="0.2"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </Button>

                <input
                  value={productCount}
                  onChange={(e) => {e.target.value * 1 > 0 && setProductCount(e.target.value * 1)}}
                  onBlur={() =>  
                    product.quantity != productCount &&  
                    updateProductCart(product._id, productCount)
                  }
                  type="number"
                  className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[15px]  text-center bg-transparent"
                  // placeholder="1"
                />
                
                {/* //! + */}
                <Button
                  onPress={increment}
                  className="border border-gray-200 outline-none  w-full max-w-[70px] min-w-[60px] py-[29px]  text-center bg-transparent rounded-none rounded-e"
                >
                  <svg
                    className="transition-all duration-500 stroke-gray-900 group-hover:stroke-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      d="M11 5.5V16.5M16.5 11H5.5"
                      stroke=""
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M11 5.5V16.5M16.5 11H5.5"
                      stroke=""
                      strokeOpacity="0.2"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M11 5.5V16.5M16.5 11H5.5"
                      stroke=""
                      strokeOpacity="0.2"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </Button>
                <h6 className="flex items-center gap-1 text-base font-bold leading-8 text-gray-500 ms-4">
  E£ <span>{(productCount * product.price).toFixed(2)}</span>
</h6>
              </div>
            </div>

            <div className="flex items-center justify-center h-full md:justify-end max-md:mt-3 ms-3">
              <button
                    onClick={() => deleteProductCart(product._id)}
                    className="absolute top-2 right-2"
                  >
                    <X size={24} className="text-black hover:text-red-500" />
                  </button>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
