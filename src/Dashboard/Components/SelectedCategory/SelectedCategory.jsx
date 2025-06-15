import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductCategorySelector = ({ product, setProduct }) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(product.category || null);
  const [loadingSubcategories, setLoadingSubcategories] = useState(false);

  // Fetch all categories on mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(
          "https://www.tryon-store.xyz/api/v1/categories",
          // "https://api.tryon-store.xyz/api/v1/categories",
          {
            params: {
              sort: "createdAt",
              fields: "name,slug",
            },
          }
        );
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);

  // Fetch subcategories when selectedCategoryId changes
  useEffect(() => {
    async function fetchSubCategories() {
      if (!selectedCategoryId) return;
      setLoadingSubcategories(true);
      try {
        const response = await axios.get(
          `https://www.tryon-store.xyz/api/v1/categories/${selectedCategoryId}/subcategories`
          // `https://api.tryon-store.xyz/api/v1/categories/${selectedCategoryId}/subcategories`
        );
        setSubcategories(response.data.data);
        console.log("subcategories:",response.data.data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      } finally {
        setLoadingSubcategories(false);
      }
    }

    fetchSubCategories();
  }, [selectedCategoryId]);

  // When category changes
  const handleChangeCategory = (e) => {
    const newCategoryId = e.target.value;
    setSelectedCategoryId(newCategoryId);
    setSubcategories([]);

    setProduct((prev) => ({
      ...prev,
      category: newCategoryId,
      subcategories: "", // Reset subcategory
    }));
  };

  // When subcategory changes
  const handleChangeSubcategory = (e) => {
    const newSubcategoryId = e.target.value;

    setProduct((prev) => ({
      ...prev,
      subcategories: newSubcategoryId,
    }));
  };

  return (
    <div className="space-y-4">
      {/* Category Selector */}
      <div>
        <label className="block mb-1 text-sm text-gray-300">Category</label>
        <select
          name="category"
          value={product.category}
          onChange={handleChangeCategory}
          className={`w-full p-2 bg-gray-800 rounded ${
            product.category === "" ? "text-gray-400" : "text-white"
          }`}
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Subcategory Selector */}
      <div>
        <label className="block mb-1 text-sm text-gray-300">Subcategory</label>
        <select
          name="subcategory"
          value={product.subcategories}
          onChange ={ (e) => {
            console.log(e.target.value) ,
            handleChangeSubcategory(e)}}
          className={`w-full p-2 bg-gray-800 rounded ${
            product.subcategories === "" ? "text-gray-400" : "text-white"
          }`}
          disabled={!product.category || loadingSubcategories}
          required
        >
          <option value="">Select a subcategory</option>
          {loadingSubcategories ? (
            <option value="" disabled>Loading...</option>
          ) : subcategories.length > 0 ? (
            subcategories.map((subcategory) => (
              <option key={subcategory._id} value={subcategory._id}>
                {subcategory.name}
              </option>
            ))
          ) : (
            <option value="" disabled>No subcategories available</option>
          )}
        </select>
      </div>
    </div>
  );
};

export default ProductCategorySelector;
