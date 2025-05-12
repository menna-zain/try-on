import React from "react";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const discountPercentage = product.productDiscount
    ? Math.round(
        ((product.price - product.productDiscount) / product.price) * 100
      )
    : 0;

  return (
    <div className="p-2">
      <div className="flex flex-col justify-between w-full mx-auto rounded-lg shadow-md cursor-pointer ">
        <Link to={"/product/" + product._id} className="">
          <div className="px-1 pt-1">
            <img
              className="object-contain object-center w-full rounded-t-lg "
              src={product.imgCover}
              loading="lazy"
              alt="Product Image"
            />
          </div>

          <div className="p-2">
            <div className="flex items-center ">
              <span className="text-sm font-semibold font-body">
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
            {/* //! */}
            <h2 className="font-semibold capitalize text- line-clamp-1 font-heading">{product.name}</h2>
            <p className="mb-2 text-base text-gray-500 line-clamp-2 font-body">
              {product.summary}
            </p>
            <div className="flex items-center">
              {product.productDiscount > 0 ? (
                <>
                  <p className="mr-2 text-base font-semibold text-gray-900 font-body">
                    £E{product.productDiscount}
                  </p>

                  <p className="text-sm font-medium text-gray-500 line-through font-body">
                    £E{product.price}
                  </p>
                </>
              ) : (
                <p className="text-base font-medium text-gray-900 font-body">
                  £E{product.price}
                </p>
              )}

              {product.productDiscount > 0 && (
                <p className="ml-auto text-base font-medium text-green-500 font-body">
                  {discountPercentage}%
                </p>
              )}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
