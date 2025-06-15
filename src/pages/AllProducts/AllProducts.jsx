import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import HeaderProducts from "../../Components/HeaderProducts/HeaderProducts";
import Product from "../../Components/ProductCard/ProductCard";
import Footer from "../../Components/Footer/Footer";
import SideBar from "../../Components/SideBar/SideBar";
import LoadingScreen from "../../Components/LoadingScreen/Loading.Screen";
import Pagination from "../../Components/Pagination/Pagination";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({ sizes: [], colors: [], subs: [] });
  const [sort, setSort] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { type } = useParams();
  const fetchFilteredProducts = useCallback(
    async (page = 1) => {
      setIsLoading(true);

      let baseUrl = "";
      if (type === "sales") {
        baseUrl = `https://www.tryon-store.xyz/v1/products/onSaleProducts?page=${page}`;
        // baseUrl = `https://api.tryon-store.xyz/api/v1/products/onSaleProducts?page=${page}`;
      } else if (type === "new") {
        baseUrl = `https://www.tryon-store.xyz/api/v1/products/newProducts?page=${page}`;
        // baseUrl = `https://api.tryon-store.xyz/api/v1/products/newProducts?page=${page}`;
      } else {
        baseUrl = `https://www.tryon-store.xyz/api/v1/categories/${type}/products?limit=5&page=${page}`;
        // baseUrl = `https://api.tryon-store.xyz/api/v1/categories/${type}/products?limit=5&page=${page}`;
      }

      const params = new URLSearchParams();

      if (filters.colors.length > 0) {
        params.append("colors", filters.colors.join(","));
      }
      if (filters.sizes.length > 0) {
        params.append("sizes", filters.sizes.join(","));
      }
      if (filters.subs.length > 0) {
        params.append("subcategories[in]", filters.subs.join(","));
      }

      if (sort) {
        params.append("sort", sort);
      }
      const finalUrl = `${baseUrl}${
        params.toString() ? `&${params.toString()}` : ""
      }`;
      try {
        const { data } = await axios.get(finalUrl, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        const productsData = data?.data?.products || data?.data || [];
        setProducts(productsData);
        setTotalPages(data.metadata.totalPages); 
        setCurrentPage(data.metadata.currentPage);
      } catch (error) {
        console.error("Error fetching filtered products:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [type, filters, sort]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchFilteredProducts(currentPage);
  }, [fetchFilteredProducts, filters, currentPage]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // إعادة تعيين الصفحة للأولى عند تغيير الفلاتر
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <div className="flex py-5 gap-x-4">
        <SideBar
          filters={filters}
          onFilterChange={handleFilterChange}
          categoryId={type}
        />
        <div className="flex-1">
          <HeaderProducts
            sort={sort}
            onSortChange={(value) => {
              setSort(value);
              setCurrentPage(1); 
            }}
          />

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
            {products.map((product, index) => (
              <Product product={product} key={index} />
            ))}
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
        </div>
      </div>
      <Footer />
    </div>
  );
}
