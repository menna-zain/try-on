import React, { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import axios from "axios";
import Cookies from "js-cookie";
import Pagination from "../../Components/DashPaginition/DashPaginition";
import DashLoading from "../../Components/DashLoading/DashLoading";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isloading, setIsLoading] = useState(false);

  async function getAllProducts(page = 1) {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://api.tryon-store.xyz/api/v1/products?limit=5&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setProducts(data.data);
      setTotalPages(data.metadata.totalPages); 
      console.log("total pages", data.metadata.totalPages); 
      setCurrentPage(data.metadata.currentPage); 
      console.log("current Page", data.metadata.currentPage);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllProducts(currentPage);
  }, [currentPage]);

  async function deleteProduct(productId) {
    try {
      const res = await axios.delete(
        `https://api.tryon-store.xyz/api/v1/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  // دالة للانتقال إلى الصفحة التالية
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // دالة للانتقال إلى الصفحة السابقة
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      // setCurrentPage(page - 1);
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isloading) {
    return<>
      <div className="relative flex min-h-screen ml-64 text-white bg-gray-900">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Products</h2>
        </div>

        <div className="flex items-center justify-end mt-10 mb-4">
          <Link to="/dashboard/add-product">
            <Button className="flex gap-2">
              <Plus size={18} />
              Add Product
            </Button>
          </Link>
        </div>

        <DashLoading />
        
        <div className="mt-4">
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
          />
        </div>
      </main>
    </div>
    
     </>
  }

  return (
    <div className="relative flex min-h-screen ml-64 text-white bg-gray-900">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold font-heading">Products</h2>
      
        </div>

        <div className="flex items-center justify-end mt-10 mb-4">
          <Link to="/dashboard/add-product">
            <Button className="flex gap-2 font-body">
              <Plus size={18} />
              Add Product
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full overflow-hidden text-white bg-gray-800 rounded-lg">
            <thead className="bg-gray-700 font-heading">
              <tr>
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Stock</th>
                <th className="px-4 py-3 text-left">Sold</th>
                <th className="py-3 text-left px-14">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b border-gray-700 hover:bg-gray-700 font-body"
                >
                  <td className="px-4 py-3">
                    <img
                      src={product.imgCover}
                      alt={product.name}
                      className="w-16 rounded "
                    />
                  </td>
                  <td className="px-4 py-3">
                    {product.name.split(" ").slice(0, 3).join(" ") + "..."}
                  </td>
                  <td className="px-4 py-3">£E{product.price}</td>
                  <td
                    className={`py-3 px-4 ${
                      product.stock === 0 ? "text-red-400" : ""
                    }`}
                  >
                    {product.quantity}
                  </td>
                  <td className="px-4 py-3">{product.sold}</td>
                  <td className="px-4 py-3">
                    <Link to={`/dashboard/update-product/${product._id}`}>
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
                      onPress={() => deleteProduct(product._id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
          />
        </div>
      </main>
    </div>
  );
};

export default Products;
