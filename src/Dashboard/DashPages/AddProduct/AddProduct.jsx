import React, { useState } from "react";
import { ImagePlus } from "lucide-react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import axios from "axios";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import ProductCategorySelector from "../../Components/SelectedCategory/SelectedCategory";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    summary: "",
    description: "",
    price: "",
    quantity: "",
    productDiscount: "0",
    category: "",
    subcategories: "",
    colors: [],
    sizes: [],
  });
  const [imgCover, setImgCover] = useState(null);
  const [images, setImages] = useState([]);
  
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (e, key) => {
    const values = e.target.value.split(",").map((v) => v.trim());
    setProduct({ ...product, [key]: values });
  };

  // todo
  const isFormValid = product.name && product.price && imgCover && product.category && product.subcategories;


  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      toast.error("Please fill all required fields and upload a main image.");
      
      return;
    }
    console.log("Selected subcategories:", product.subcategories);

    setIsLoading(true);

    const formData = new FormData();
    Object.keys(product).forEach((key) => {
      if (Array.isArray(product[key])) {
        product[key].forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, product[key]);
      }
    });

    if (imgCover) formData.append("imgCover", imgCover);
    if (images.length > 0)
      images.forEach((img) => formData.append("images", img));

    try {
      const { data } = await axios.post(
        "https://api.tryon-store.xyz/api/v1/products",
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      toast.success("Product added successfully!");
      console.log(data);
    } catch (error) {
      const errors = error?.response?.data?.errors;
      if (Array.isArray(errors)) {
        errors.forEach((err) => {
          toast.error(err.msg); 
        });
      } else {
        toast.error("Something went wrong");
      }
      console.error("Error adding product:", error);
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen ml-64 text-white bg-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold font-heading">Add New Product</h2>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Left Form */}
          <form onSubmit={handleSubmit} className="space-y-4 font-body">
            <div>
              <label className="block mb-2 text-sm">Name</label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 rounded"
                placeholder="Product's Name"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm">Description</label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 rounded"
                placeholder="Product's Description"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm">The Summary</label>
              <textarea
                name="summary"
                value={product.summary}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 rounded"
                placeholder="Short Description"
                required
              />
            </div>

            <div className="flex gap-4">
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 rounded"
                placeholder="Price"
                required
              />
              <input
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 rounded"
                placeholder="Quantity"
                required
              />
            </div>

            <input
              type="number"
              name="productDiscount"
              value={product.productDiscount}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 rounded"
              placeholder="Discount"
            />
            {/* الكومبوننت بتاع الكاتيجوري و الصبكاتيجوري */}
            <ProductCategorySelector
              product={product}
              setProduct={setProduct}
            />
            {/* COLORS */}
            <input
              type="text"
              name="colors"
              onChange={(e) => handleArrayChange(e, "colors")}
              className="w-full p-2 bg-gray-800 rounded"
              placeholder="Colors (comma separated)"
            />

            <input
              type="text"
              name="sizes"
              onChange={(e) => handleArrayChange(e, "sizes")}
              className="w-full p-2 bg-gray-800 rounded"
              placeholder="Sizes (comma separated)"
            />
            {/* Upload Images */}
            <div>
              <label className="block mb-2 text-sm">Main Image</label>

              <label
                htmlFor="cover-upload"
                className="inline-block px-4 py-2 text-white transition bg-[#7E3AF2] rounded cursor-pointer hover:bg-[#6a30ce]"
              >
                Choose Cover Image
              </label>

              <input
                id="cover-upload"
                type="file"
                accept="image/*"
                onChange={(e) => setImgCover(e.target.files[0])}
                className="hidden" // نخفي الانبت العادي
              />
            </div>

            {/* Images */}
            <div>
              <label className="block mb-2 text-sm font-medium ">Pictures</label>
              <div className="flex gap-4">
                {/* Current images preview */}
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="relative w-20 overflow-hidden bg-gray-700 rounded"
                  >
                    <div
                      className="absolute top-0 right-0 bg-red-600 rounded-full cursor-pointer"
                      onClick={() => handleRemoveImage(index)}
                    >
                      ×
                    </div>
                    <img
                      src={URL.createObjectURL(img)}
                      alt="Preview"
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}

                {/* Upload button */}
                <label
                  htmlFor="upload-images"
                  className="flex items-center justify-center w-20 bg-gray-700 border-2 border-gray-500 border-dashed rounded cursor-pointer min-h-20"
                >
                  <ImagePlus size={24} />
                </label>

                <input
                  id="upload-images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImagesChange}
                  className="hidden"
                />
              </div>
            </div>
            <button
              type="submit"
              className={`px-6 py-2 rounded text-white transition 
    ${
      !isFormValid || isLoading
        ? "bg-gray-500 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700"
    }`}
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? "Publishing..." : "Publish Now"}
            </button>
          </form>

          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-12 m-6 bg-gray-800 rounded-lg shadow-lg"
          >
            {/* IMG COVER */}
          <h2 className="mb-4 text-2xl font-bold font-heading">preview</h2>
            <div className="relative w-full mb-6 overflow-hidden bg-gray-700 rounded-lg ">
              {imgCover ? (
                <img
                  src={URL.createObjectURL(imgCover)}
                  alt="Preview"
                  className="w-full "
                />
              ) : (
                <div className="flex items-center justify-center w-full h-64 text-gray-400 font-body">
                  No Image Selected
                </div>
              )}
            </div>

            <div className="flex items-center justify-between font-body ">
              <h3 className="mb-2 text-lg font-semibold">
                {product.name || "Product Name"}
              </h3>
              <p className="mb-4 text-gray-400 me-3">£E{product.price || 0}</p>
            </div>

            <p className="mb-4 text-sm text-gray-400">
              {product.summary || "Short description..."}
            </p>

            <div className="flex items-center gap-2 mb-4">
              {product.sizes.map((size, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 text-xs capitalize bg-gray-700 rounded font-body"
                >
                  {size}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 mb-4">
              {product.colors.map((color, idx) => (
                <div
                  key={idx}
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
            <button className="w-full p-3 mb-4 bg-blue-600 rounded font-body">
              Add To Cart
            </button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AddProduct;
