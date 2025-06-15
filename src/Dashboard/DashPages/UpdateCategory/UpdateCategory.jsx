// EditCategory.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

export default function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCategory() {
      try {
        const { data } = await axios.get(
          `https://www.tryon-store.xyz/api/v1/categories/${id}`,
          // `https://api.tryon-store.xyz/api/v1/categories/${id}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        setCategoryName(data.data.data.name
          
        );
        console.log("get category: ",data.data.data.name);
      } catch (err) {
        toast.error("Failed to fetch category");
      }
    }

    fetchCategory();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const token = Cookies.get("token");

    try {
      await axios.patch(
        `https://www.tryon-store.xyz/api/v1/categories/${id}`,
        // `https://api.tryon-store.xyz/api/v1/categories/${id}`,
        {
          name: categoryName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Category updated!");
      navigate("/dashboard/categories"); 
    } catch (err) {
      toast.error("Failed to update");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen ml-64 text-white bg-gray-900">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <h2 className="mb-4 text-2xl font-bold font-body">Edit Category</h2>
        <form onSubmit={handleUpdate} className="flex flex-col gap-5 p-10 font-body">
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-1/2 p-2 bg-gray-800 border border-gray-700 rounded"
            placeholder="Category Name"
          />
          <button
            type="submit"
            className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 w-fit font-body"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Category"}
          </button>
        </form>
      </main>
    </div>
  );
}
