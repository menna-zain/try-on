import React from "react";
import { Link } from "react-router-dom";

export default function SubCategoriesCard({ product }) {
  // console.log('product link',product);
  
  return (
    <>
      <div className="p-3 ">
        <Link to={"categories/"+product.category}>
        <div className="relative flex flex-col justify-between w-full mx-auto overflow-hidden rounded-lg shadow-md cursor-pointer group">
          {/* overlay */}
          <div className="absolute inset-0 z-10 flex items-center justify-center text-sm text-white transition-opacity duration-500 opacity-0 bg-primary bg-opacity-60 group-hover:opacity-100">
            <h2 className="font-semibold capitalize text-medium font-heading">
              {product.name.slice(0, 15)}
            </h2>
          </div>

          {/* image */}
          <div className="z-0">
            <img
              className="w-full h-56 transition-transform duration-500 group-hover:scale-105"
              src={product.image}
              alt="Product Image"
            />
          </div>
        </div>
        </Link>
      </div>
    </>
  );
}
