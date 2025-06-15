import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { toast } from "react-hot-toast";

export default function UpdateSubCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [originalData, setOriginalData] = useState({
    name: "",
    categoryId: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [subRes, catRes] = await Promise.all([
          axios.get(`https://www.tryon-store.xyz/api/v1/subcategories/${id}`),
          // axios.get(`https://api.tryon-store.xyz/api/v1/subcategories/${id}`),
          axios.get("https://www.tryon-store.xyz/api/v1/categories", {
          // axios.get("https://api.tryon-store.xyz/api/v1/categories", {
            params: { sort: "createdAt", fields: "name,slug" },
          }),
        ]);
        const sub = subRes.data.data.data;
        setName(sub.name);
        setCategoryName(sub.category.name);
        setCategoryId(sub.category._id);
        setPreviewUrl(sub.image);
        setCategories(catRes.data.data);

        // خزني الداتا الأصلية للمقارنة بعدين
        setOriginalData({
          name: sub.name,
          categoryId: sub.category._id,
        });
      } catch (error) {
        toast.error("Error loading data");
      }
    }
    fetchData();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name.trim() || !categoryId) {
      toast.error("All fields are required");
      return;
    }

    const token = Cookies.get("token");
    const formData = new FormData();

    if (name !== originalData.name) {
      formData.append("name", name);
    }

    if (categoryId !== originalData.categoryId) {
      formData.append("category", categoryId);
    }

    if (selectedImageFile) {
      formData.append("image", selectedImageFile);
    }

    if ([...formData.keys()].length === 0) {
      toast("No changes to update");
      return;
    }

    try {
      setIsLoading(true);
      await axios.patch(
        `https://www.tryon-store.xyz/api/v1/subcategories/${id}`,
        // `https://api.tryon-store.xyz/api/v1/subcategories/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Subcategory updated");
      navigate("/dashboard/categories");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex min-h-screen ml-64 text-white bg-gray-900">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <h2 className="mb-6 text-2xl font-bold font-heading">Edit Subcategory</h2>
        <form onSubmit={handleUpdate} className="p-5 space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded font-body"
            placeholder="Subcategory Name"
          />
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded font-body"
          >
            {categoryName && <option value={categoryId} disabled>{categoryName}</option>}
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          <div>
            <label className="block mb-2 text-sm">Image</label>
            <label
              htmlFor="edit-upload"
              className="inline-block px-4 py-2 text-white bg-[#7E3AF2] rounded cursor-pointer hover:bg-[#6a30ce] font-body"
            >
              Choose Image
            </label>
            <input
              id="edit-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-32 mt-4 border border-gray-600 rounded"
              />
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-2 text-white rounded ${
              isLoading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Updating..." : "Update Subcategory"}
          </button>
        </form>
      </main>
    </div>
  );
}
