import React from "react";
import { Trash2 } from "lucide-react";
import { Button, Rating } from "@mui/material";

// import axios from "axios";

//!product is destract from products

export default function WishListCard({ product, deleteWishProduct }) {
  return (
    <>
      <div className="flex min-[500px]:flex-row min-[500px]:items-center gap-5 py-4  border-b border-gray-200 group relative">
        <div className="w-full md:max-w-[126px]">
          <img
            src={product.imgCover}
            alt={product.name}
            className="object-cover w-full h-auto mx-auto rounded-xl"
          />
        </div>

        <div className="flex flex-col w-full">
          <h6 className="text-lg font-semibold leading-7 text-gray-900 ">
            {product.name.split(" ").slice(0, 5).join(" ") + "..."}
          </h6>

          {/* //!  rating */}
          <div className="flex items-center ">
            <span className="text-sm font-semibold">
              {" "}
              {product.ratingsAverage}{" "}
            </span>
            <Rating
              max={1}
              name="half-rating-read"
              value={parseFloat(product.ratingsAverage)}
              precision={0.5}
              readOnly
              size="small"
            />
            <span className="text-xs text-gray-400 ms-1">
              {" "}
              {`( ${product.ratingsQuantity} )`}{" "}
            </span>
          </div>

          <h6 className="text-base font-normal leading-7 text-gray-500 line-clamp-2">
            {/* {product.product.category.name} */}
            {product.summary}
          </h6>

          <h6 className="text-base font-medium leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600">
          E£ {product.price.toFixed(2)}
          </h6>
          <button
            onClick={() => deleteWishProduct(product._id)}
            className="p-1.5 text-white bg-red-500 hover:bg-red-600 rounded-md text-lg absolute top-2 right-2"
          >
            <Trash2 size={22} />
          </button>
        </div>
      </div>
    </>
  );
}
