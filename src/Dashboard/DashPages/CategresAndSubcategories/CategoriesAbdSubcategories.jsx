import React, { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import DashLoading from "../../Components/DashLoading/DashLoading";
import axios from "axios";
import Cookies from "js-cookie";

const CategoriesAndSubcategories = () => {

 
  const [categories, setCategories] = useState([]);
  const [SubCategories, setSubCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  async function getAllcategories() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        "https://api.tryon-store.xyz/api/v1/categories",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setCategories(data.data);
    } catch (error) {
      console.error("Error fetching Categories:", error);
    } finally {
      setIsLoading(false);
    }
  }
  
  async function getAllSubCategories() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        "https://api.tryon-store.xyz/api/v1/subcategories",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setSubCategories(data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  }

    useEffect(() => {
      getAllcategories();
      getAllSubCategories()
    }, []);
    
// CATERGORY
async function deleteCategory(categoryId) {
  console.log("Deleting category with ID:", categoryId);
  try {
    const { data } = await axios.delete(
      `https://api.tryon-store.xyz/api/v1/categories/${categoryId}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    console.log(data);
    
    // تحديث الحالة بعد الحذف
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.id !== categoryId)
    );
  } catch (error) {
    console.error("Error deleting category:", error);
  }
}
  

// SUB CATERGORY
async function deleteSubCategory(SubCategoryId) {
  console.log("Deleting subcategory with ID:", SubCategoryId);
  try {
    const { data } = await axios.delete(
      `https://api.tryon-store.xyz/api/v1/subcategories/${SubCategoryId}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    console.log(data);

    // تحديث الحالة بعد الحذف
    setSubCategories((prevSubCategories) =>
      prevSubCategories.filter((subCategory) => subCategory.id !== SubCategoryId)
    );
  } catch (error) {
    console.error("Error deleting subcategory:", error);
  }
}

if(isLoading){
  return (
    <div className="relative flex min-h-screen ml-64 text-white bg-gray-900">

    <Sidebar />

  {/* Main Content */}
  <main className="flex-1 p-6">
    {/* Header */}
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold font-heading">Categories & Subcategories</h2>
    </div>
    <div className="mt-32">
    <DashLoading/>
    </div>
  </main>
</div>
  )  
}


  return (
    <div className="relative flex min-h-screen ml-64 text-white bg-gray-900">

        <Sidebar />
    
      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold font-heading">Categories & Subcategories</h2>
         
        </div>

       <div className="flex items-center justify-between mt-10 mb-4">
          <h1 className="text-2xl font-semibold text-white">Categories</h1>
          <Link to="/dashboard/add-category">
            <Button className="flex gap-2 font-body">
              <Plus size={18} />
              Add Category
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full overflow-hidden text-white bg-gray-800 rounded-lg">
            <thead className="bg-gray-700 font-heading">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-10 py-3 text-left">Action</th>
              </tr>
            </thead>
             <tbody>
              {categories.map((category) => (
                <tr
                  key={category.id}
                  className="border-b border-gray-700 hover:bg-gray-700 font-body"
                >
                <td className="px-4 py-3">{category._id}</td>
                  <td className="px-4 py-3">{category.name}</td>
                   <td className="px-4 py-3">{category.status}</td> 
                   <td className="flex gap-2 px-4 py-3">
                    <Link to={`/dashboard/update-category/${category._id}`}>
                    <Button
                      variant="outline"
                      className="text-blue-400 border-blue-400 hover:bg-blue-500/10"
                    >
                      <Pencil size={16} />
                    </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="text-red-400 border-red-400 hover:bg-red-500/10"
                      onPress={() =>deleteCategory(category._id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </td>
                </tr> 
               ))} 
             </tbody>  
          </table>
        </div> 

        {/* SUB TABle */}
        <div className="flex items-center justify-between mt-16 mb-4">
          <h1 className="text-2xl font-semibold text-white font-heading">Subcategories</h1>
          <Link to="/dashboard/add-category">
            <Button className="flex gap-2 font-body">
              <Plus size={18} />
              Add Subcategory
            </Button>
          </Link>
        </div>
        {/* SubCategory */}
          <div className="overflow-x-auto ">
                  <table className="min-w-full overflow-hidden text-white bg-gray-800 rounded-lg">
                    <thead className="bg-gray-700 font-heading">
                      <tr>
                        <th className="px-4 py-3 text-left">Image</th>
                        <th className="px-4 py-3 text-left">Name</th>
                        <th className="px-4 py-3 text-left">Category ID</th>
                        <th className="px-10 py-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SubCategories.map((SubCategory) => (
                        <tr
                          key={SubCategory._id}
                          className="border-b border-gray-700 hover:bg-gray-700 font-body"
                        >
                          <td className="px-4 py-3">
                            <img
                              src={SubCategory.image}
                              alt={SubCategory.name}
                              className="w-16 h-16 rounded"
                            />
                          </td>
                          <td className="px-4 py-3">{SubCategory.name}</td>
                          <td className="px-4 py-3">{SubCategory.category}</td>
                          <td className="flex gap-2 px-4 py-3">
                          <Link to={`/dashboard/update-subcategory/${SubCategory._id}`}>
                            <Button
                              variant="outline"
                              className="text-blue-400 border-blue-400 hover:bg-blue-500/10"
                            >
                              <Pencil size={16} />
                            </Button>
                            </Link>
                            <Button
                              variant="outline"
                              className="text-red-400 border-red-400 hover:bg-red-500/10"
                              onPress={() =>deleteSubCategory(SubCategory._id)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div> 
      </main>
    </div>
  );
};

export default CategoriesAndSubcategories;
