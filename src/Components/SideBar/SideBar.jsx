import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

export default function SideBar({ filters, onFilterChange, categoryId }) {
  const [subCategories, setSubCategories] = useState([]);
  const selectedSubs = filters.subs;
  const selectedSizes = filters.sizes;
  const selectedColors = filters.colors;

  const colorOptions = [
    "black",
    "red",
    // "#141414", // Black
    "#1E233A", //
    "#001F3F", // NavyS
    "#8B0000", // Blue
    "#F4C2C2", // Blue
    "#FFFFFF", // White
  ];

  const handleSubChange = (sub) => {
    const updatedSubs = selectedSubs.includes(sub)
      ? selectedSubs.filter((sb) => sb !== sub)
      : [...selectedSubs, sub];

    onFilterChange({
      sizes: selectedSizes,
      colors: selectedColors,
      subs: updatedSubs,
    });
  };

  const handleSizeChange = (size) => {
    const updatedSizes = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];

    onFilterChange({
      sizes: updatedSizes,
      colors: selectedColors,
      subs: selectedSubs,
    });
  };

  const handleColorChange = (color) => {
    const updatedColors = selectedColors.includes(color)
      ? selectedColors.filter((c) => c !== color)
      : [...selectedColors, color];

    onFilterChange({
      sizes: selectedSizes,
      colors: updatedColors,
      subs: selectedSubs,
    });
  };

  const handleClearFilters = () => {
    onFilterChange({ sizes: [], colors: [], subs: [] });
  };

  useEffect(() => {
    fetchSubCategories(categoryId);
  }, [categoryId]);

  async function fetchSubCategories(categoryId) {
    try {
      const res = await axios.get(
        `https://api.tryon-store.xyz/api/v1/categories/${categoryId}/subcategories`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setSubCategories(res.data.data);
      console.log("subcategories", res.data.data);
      res.data;
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  return (
    <div className="min-h-screen p-4 w-52 border-e-2">
      <div className="mt-5 space-y-1">
        <h2 className="mt-6 mb-2 text-lg font-semibold capitalize font-heading">Subcategories</h2>
        {subCategories?.map((subCategory) => (
          <h3
            key={subCategory._id}
            className={`text-base font-semibold capitalize cursor-pointer font-body ${
              selectedSubs.includes(subCategory._id)
                ? "text-blue-500"
                : "text-gray-600"
            }`}
            onClick={() => handleSubChange(subCategory._id)}
          >
            {subCategory.name}
          </h3>
        ))}
      </div>
      <h2 className="mt-6 mb-2 text-lg font-semibold capitalize font-heading">Sizes</h2>
      <div className="space-y-1 font-body">
        {["S", "M", "L", "XL", "2XL"].map((size) => (
          <label className="flex items-center" key={size}>
            <input
              type="checkbox"
              className="mr-2 "
              checked={selectedSizes.includes(size)}
              onChange={() => handleSizeChange(size)}
            />
            {size}
          </label>
        ))}
      </div>

      <h2 className="mt-6 mb-2 text-lg font-semibold capitalize font-heading">Colors</h2>
      <div className="space-y-1">
        {colorOptions.map((color) => (
          <label className="flex items-center gap-2" key={color}>
            <input
              type="checkbox"
              className="mr-1"
              checked={selectedColors.includes(color)}
              onChange={() => handleColorChange(color)}
            />
            <span
              className="w-5 h-5 border rounded-full"
              style={{ backgroundColor: color }}
            />
          </label>
        ))}
      </div>

      <button
        onClick={handleClearFilters}
        className="mt-6 text-sm text-red-500 underline font-heading"
      >
        Clear Filters
      </button>
    </div>
  );
}
