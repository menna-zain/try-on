import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

export default function AddCategory() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const [subCategoryName, setSubCategoryName] = useState("");
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(
          "https://api.tryon-store.xyz/api/v1/categories",
          {
            params: {
              sort: "createdAt",
              fields: "name,slug",
            },
          }
        );
        setCategories(response.data.data);
        console.log("Categories:", response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      toast.error("Category name is required");
      return;
    }

    const token = Cookies.get("token");
    if (!token) {
      toast.error("Unauthorized. Please login.");
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "https://api.tryon-store.xyz/api/v1/categories",
        { name: categoryName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("add category", data);
      
      setCategories((prevCategories) => [...prevCategories, data.data.data]);
      
      toast.success("Category added successfully!");
      setCategoryName("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  //! AddSubCategory
  const handleAddSubCategory = async (e) => {
    e.preventDefault();
    if (!subCategoryName.trim() || !selectedCategoryId || !selectedImageFile) {
      toast.error("All fields are required");
      return;
    }

    const token = Cookies.get("token");
    if (!token) {
      toast.error("Unauthorized. Please login.");
      return;
    }

    const formData = new FormData();
    formData.append("name", subCategoryName);
    formData.append("category", selectedCategoryId);
    formData.append("image", selectedImageFile);

    setIsLoading(true);
    try {
      await axios.post(
        "https://api.tryon-store.xyz/api/v1/subcategories",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Subcategory added successfully!");
      setSubCategoryName("");
      setSelectedCategoryId("");
      setSelectedImageFile(null);
      setImagePreviewUrl(null);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to add subcategory"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleImageRemove = () => {
    setSelectedImageFile(null);
    setImagePreviewUrl(null);
  };

  return (
    <div className="flex min-h-screen ml-64 text-white bg-gray-900">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold font-heading">Add Category & Subcategory</h2>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Add Category */}
          <form
            onSubmit={handleAddCategory}
            className="p-5 space-y-4 border-gray-600 border-e-2"
          >
            <h3 className="mb-2 text-xl font-semibold font-heading">Add Category</h3>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded font-body"
              placeholder="Category Name"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-2 text-white rounded font-body ${
                isLoading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isLoading ? "Publishing..." : "Add Category"}
            </button>
          </form>

          {/* Add SubCategory */}
          <form onSubmit={handleAddSubCategory} className="p-5 space-y-4 font-body">
            <h3 className="mb-2 text-xl font-semibold font-heading">Add Subcategory</h3>
            <input
              type="text"
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
              placeholder="Subcategory Name"
              required
            />
            <select
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              className={`w-full p-2 bg-gray-800 rounded font-body ${
                selectedCategoryId === "" ? "text-gray-400" : "text-white"
              }`}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <div>
              <label className="block mb-2 text-sm font-body">The Image</label>
              <label
                htmlFor="cover-upload"
                className={`inline-block px-4 py-2 text-white transition font-body${
                  selectedImageFile ? "bg-gray-500" : "bg-[#7E3AF2]"
                } rounded cursor-pointer hover:${
                  selectedImageFile ? "bg-gray-500" : "bg-[#6a30ce]"
                }`}
                disabled={selectedImageFile}
              >
                {selectedImageFile ? "Image Selected" : "Choose Cover Image"}
              </label>
              <input
                id="cover-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                disabled={selectedImageFile}
              />
              {imagePreviewUrl && (
                <div className="flex flex-col mt-4 ">
                  <img
                    src={imagePreviewUrl}
                    alt="Preview"
                    className="w-32 border border-gray-600 rounded "
                  />
                  <button
                    type="button"
                    onClick={handleImageRemove}
                    className="ml-4 text-red-600 w-fit font-body"
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-2 text-white rounded ${
                isLoading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isLoading ? "Publishing..." : "Add Subcategory"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
