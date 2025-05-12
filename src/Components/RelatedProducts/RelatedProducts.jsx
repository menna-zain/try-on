import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import Slider from "react-slick";
import { Link } from "react-router-dom";

export default function RelatedProducts({ relatedProducts }) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
  };

  return (
    <div className="py-10 my-5 border-t-2 border-b-2">
      <Slider {...settings}>
        {relatedProducts.map((product, index) => {
          return (
            <div className="" key={product._id || index} >
              <ProductCard product={product} />{" "}
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
