import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import { Button } from "@heroui/react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import ProductCategorySelector from "../../Components/SelectedCategory/SelectedCategory";
import { ImagePlus } from "lucide-react";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    summary: "",
    description: "",
    price: "",
    quantity: "",
    productDiscount: "",
    category: "",
    subcategories: [],
    colors: [],
    sizes: [],
  });

  const [originalProduct, setOriginalProduct] = useState(null); // نسخة للمقارنة
  const [imgCover, setImgCover] = useState(null);
  const [images, setImages] = useState([]);
  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await axios.get(
          `https://api.tryon-store.xyz/api/v1/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        console.log(data.data.product);
        
        setProduct(data.data.product);
        setOriginalProduct(data.data.product);
        setImgCover(data.data.product.imgCover);
        setImages(data.data.product.images || []);
      } catch (error) {
        toast.error("Error fetching product data.");
      }
    }

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (e, key) => {
    const values = e.target.value.split(",").map((v) => v.trim());
    setProduct({ ...product, [key]: values || [] });
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.name || !product.price || !imgCover) {
      toast.error("Please fill all required fields and upload a main image.");
      return;
    }

    const formData = new FormData();

    // نضيف فقط الحقول التي تغيرت
    Object.keys(product).forEach((key) => {
      const currentValue = product[key];
      const originalValue = originalProduct?.[key];

      const isChanged = Array.isArray(currentValue)
        ? JSON.stringify(currentValue) !== JSON.stringify(originalValue)
        : currentValue !== originalValue;

      if (isChanged) {
        if (Array.isArray(currentValue)) {
          currentValue.forEach((item) => formData.append(key, item));
        } else {
          formData.append(key, currentValue);
        }
      }
    });

    // فقط إذا تغيرت صورة الغلاف
    if (imgCover && imgCover !== originalProduct?.imgCover) {
      formData.append("imgCover", imgCover);
    }

    // فقط الصور الجديدة (File objects)
    if (images.length > 0) {
      images.forEach((img) => {
        if (typeof img !== "string") {
          formData.append("images", img);
        }
      });
    }

    setIsLoading(true);
    try {
      const { data } = await axios.patch(
        `https://api.tryon-store.xyz/api/v1/products/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      console.log(data);
      
      toast.success("Product updated successfully!");
      navigate("/dashboard/products");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (!originalProduct) return;

    let changed = false;

    for (const key of Object.keys(product)) {
      const currentValue = product[key];
      const originalValue = originalProduct[key];

      const valueChanged = Array.isArray(currentValue)
        ? JSON.stringify(currentValue) !== JSON.stringify(originalValue)
        : currentValue !== originalValue;

      if (valueChanged) {
        changed = true;
        break;
      }
    }

    // تحقق من تغيّر صورة الغلاف
    const imgCoverChanged = imgCover && imgCover !== originalProduct.imgCover;

    // تحقق من وجود صور جديدة
    const hasNewImages = images.some((img) => typeof img !== "string");

    setIsChanged(changed || imgCoverChanged || hasNewImages);
  }, [product, imgCover, images, originalProduct]);

  return (
    <div className="flex min-h-screen ml-64 text-white bg-gray-900">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold font-heading2">Update Product</h2>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-28">
          <div className="space-y-4 font-body">
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

            <ProductCategorySelector
              product={product}
              setProduct={setProduct}
            />

            <input
              type="text"
              name="colors"
              value={
                Array.isArray(product.colors) ? product.colors.join(", ") : ""
              }
              onChange={(e) => handleArrayChange(e, "colors")}
              className="w-full p-2 bg-gray-800 rounded"
              placeholder="Colors (comma separated)"
            />

            <input
              type="text"
              name="sizes"
              value={
                Array.isArray(product.sizes) ? product.sizes.join(", ") : ""
              }
              onChange={(e) => handleArrayChange(e, "sizes")}
              className="w-full p-2 bg-gray-800 rounded"
              placeholder="Sizes (comma separated)"
            />

            <button
              type="submit"
              className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isChanged || isLoading}
            >
              {isLoading ? "Updating..." : "Update Now"}
            </button>
          </div>

          {/* Upload Images */}
          <div className="space-y-4">
            <div className="mt-5">
              <label className="block mb-2 text-sm">Main Image</label>
              {imgCover && (
                <div className="mt-2">
                  <img
                    src={
                      typeof imgCover === "string"
                        ? imgCover.startsWith("http")
                          ? imgCover
                          : `https://api.tryon-store.xyz/${imgCover}`
                        : URL.createObjectURL(imgCover)
                    }
                    alt="Cover"
                    className="w-32 rounded"
                  />
                  <p className="text-sm text-gray-400">
                    {typeof imgCover === "string"
                      ? "Current Cover Image"
                      : "New Cover Preview"}
                  </p>
                </div>
              )}

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
                className="hidden"
              />
            </div>

            {/* Images */}
            <div>
              <label className="block mb-2 text-sm font-medium">Pictures</label>
              <div className="flex flex-wrap gap-4">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="relative w-20 overflow-hidden bg-gray-700 rounded"
                  >
                    <div
                      className="absolute top-0 right-0 w-4 h-4 text-xs text-center bg-red-600 rounded-full cursor-pointer"
                      onClick={() => handleRemoveImage(index)}
                    >
                      ×
                    </div>
                    {typeof img === "string" ? (
                      <img
                        src={
                          img.startsWith("http")
                            ? img
                            : `https://api.tryon-store.xyz/${img}`
                        }
                        alt="Old"
                        className="w-full "
                      />
                    ) : (
                      <img
                        src={URL.createObjectURL(img)}
                        alt="New"
                        className="w-full "
                      />
                    )}
                  </div>
                ))}

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
          </div>
        </form>
      </main>
    </div>
  );
};

export default UpdateProduct;
