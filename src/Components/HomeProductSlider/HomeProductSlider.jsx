// src/Components/ProductSliderSection/ProductSliderSection.jsx

import React from "react";
import Slider from "react-slick";
import ProductCard from "../ProductCard/ProductCard";
import { Link } from "react-router-dom";
import BtnViewAll from "../BtnViewAll/BtnViewAll";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// الأسهم المخصصة
const CustomPrevArrow = ({ onClick }) => (
  <button className="absolute left-0 z-10 text-primary top-1/2" onClick={onClick}>
    <FaChevronLeft size={15} />
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button className="absolute right-0 z-10 text-primary top-1/2" onClick={onClick}>
    <FaChevronRight size={15} />
  </button>
);

// إعدادات السلايدر
const sliderSettings = {
  dots: false,
  arrows: true,
  infinite: false,
  slidesToShow: 6,
  slidesToScroll: 1,
  mobileFirst: true,
  nextArrow: <CustomNextArrow />,
  prevArrow: <CustomPrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 4 },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 3 },
    },
    {
      breakpoint: 690,
      settings: { slidesToShow: 1 },
    },
  ],
};

export default function ProductSliderSection({ title, linkTo, products }) {
  if (!products?.length) return null;

  return (
    <section className="mx-2 my-20">
      <Link to={linkTo}>
        <div className="flex items-center justify-between w-full">
          <h2 className="text-2xl font-bold capitalize font-heading">{title}</h2>
          <BtnViewAll />
        </div>
      </Link>

      <Slider {...sliderSettings} className="w-full p-5">
        {products.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </Slider>
    </section>
  );
}
