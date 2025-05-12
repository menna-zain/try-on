import { HeroUIProvider } from "@heroui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Layout from "./Components/Layouts/Layout/Layout";
import NotFound from "./pages/NotFound/NotFound";

import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import AllProducts from "./pages/AllProducts/AllProducts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ProtectedRoute from "./Auth/ProtectedRoute/ProtectedRoute";
import ProtectedAuthRoute from "./Auth/ProtectedAuthRoute";

import AuthContextProvider from "./Contexts/AuthContext";

import { SearchProvider } from "./Contexts/SearchContext";
import { CategoryProvider } from "./Contexts/CategoryContext";
import PrivacySetting from "./pages/PrivacySetting/PrivacySetting";
import WishList from "./pages/WishList/WishList";
import Addresses from "./pages/Addresses/Addresses";
import AddAddress from "./pages/AddAddress/AddAddress";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import Orders from "./pages/Orders/Orders";
import OrderDetails from "./pages/OrderDetails/OrderDetails";
import Payment from "./pages/Payment/Payment";

import DashboardLayout from "./Components/DashboardLayout/DashboardLayout";
import Dashboard from "./Dashboard/DashPages/DashHome/DashHome";
import Products from "./Dashboard/DashPages/Products/Products";
import AddProduct from "./Dashboard/DashPages/AddProduct/AddProduct";
import UpdateProduct from "./Dashboard/DashPages/UpdateProduct/UpdateProduct";
import OrdersDash from "./Dashboard/DashPages/Orders/Orders";
import AddCategory from "./Dashboard/DashPages/AddCategory/AddCategory";
import CategoriesAndSubcategories from "./Dashboard/DashPages/CategresAndSubcategories/CategoriesAbdSubcategories";
import UpdateCategory from "./Dashboard/DashPages/UpdateCategory/UpdateCategory";
import UpdateSubcategory from "./Dashboard/DashPages/UpdateSubcategory/UpdateSubcategory";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import NewPassword from "./pages/NewPassword/NewPassword";
import DashProfile from "./Dashboard/DashPages/DashProfile/DashProfile";
import CreateUser from "./Dashboard/DashPages/CreateUsers/CreateUsers";
import ThanksPage from "./pages/ThanksPage/ThanksPage";

const queryClient = new QueryClient();

export default function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute allowedRoles={["user"]}>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "login",
          element: (
            <ProtectedAuthRoute>
              <Login />
            </ProtectedAuthRoute>
          ),
        },
        {
          path: "forgetpassword",
          element: (
            <ProtectedAuthRoute>
              <ForgetPassword />
            </ProtectedAuthRoute>
          ),
        },
        {
          path: "newpassword",
          element: (
            <ProtectedAuthRoute>
              <NewPassword />
            </ProtectedAuthRoute>
          ),
        },
        {
          path: "register",
          element: (
            <ProtectedAuthRoute>
              <Register />
            </ProtectedAuthRoute>
          ),
        },
        {
          path: "Products/:type",
          element: (
            <ProtectedRoute allowedRoles={["user"]}>
              <AllProducts />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories/:type",
          element: (
            <ProtectedRoute allowedRoles={["user"]}>
              <AllProducts />
            </ProtectedRoute>
          ),
        },
        {
          path: "product/:id",
          element: (
            <ProtectedRoute allowedRoles={["user"]}>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute allowedRoles={["user"]}>
              <WishList />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute allowedRoles={["user"]}>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "orders",
          element: (
            <ProtectedRoute allowedRoles={["user"]}>
              <Orders />
            </ProtectedRoute>
          ),
        },
        {
          path: "thanks",
          element: (
            <ProtectedRoute allowedRoles={["user"]}>
              <ThanksPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "me",
          element: (
            <ProtectedRoute allowedRoles={["user"]}>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "privacySettings",
          element: (
            <ProtectedRoute allowedRoles={["user"]}>
              <PrivacySetting />
            </ProtectedRoute>
          ),
        },
        {
          path: "addresses",
          element: (
            <ProtectedRoute allowedRoles={["user"]}>
              <Addresses />
            </ProtectedRoute>
          ),
        },
        {
          path: "addAddress",
          element: (
            <ProtectedRoute allowedRoles={["user"]}>
              <AddAddress />
            </ProtectedRoute>
          ),
        },
        {
          path: "orderDetails/:id",
          element: (
            <ProtectedRoute allowedRoles={["user"]}>
              <OrderDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "payment/:id",
          element: (
            <ProtectedRoute allowedRoles={["user"]}>
              <Payment />
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute allowedRoles={["admin"]}>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute allowedRoles={["admin"]}>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute allowedRoles={["admin"]}>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute allowedRoles={["admin"]}>
              <CategoriesAndSubcategories />
            </ProtectedRoute>
          ),
        },
        {
          path: "add-product",
          element: (
            <ProtectedRoute allowedRoles={["admin"]}>
              <AddProduct />
            </ProtectedRoute>
          ),
        },
        {
          path: "update-product/:id",
          element: (
            <ProtectedRoute allowedRoles={["admin"]}>
              <UpdateProduct />
            </ProtectedRoute>
          ),
        },
        {
          path: "update-category/:id",
          element: (
            <ProtectedRoute allowedRoles={["admin"]}>
              <UpdateCategory />
            </ProtectedRoute>
          ),
        },
        {
          path: "update-subcategory/:id",
          element: (
            <ProtectedRoute allowedRoles={["admin"]}>
              <UpdateSubcategory />
            </ProtectedRoute>
          ),
        },
        {
          path: "orders",
          element: (
            <ProtectedRoute allowedRoles={["admin"]}>
              <OrdersDash />
            </ProtectedRoute>
          ),
        },
        {
          path: "add-category",
          element: (
            <ProtectedRoute allowedRoles={["admin"]}>
              <AddCategory />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute allowedRoles={["admin"]}>
              <DashProfile />
            </ProtectedRoute>
          ),
        },
        {
          path: "users",
          element: (
            <ProtectedRoute allowedRoles={["admin"]}>
              <CreateUser />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <SearchProvider>
            <CategoryProvider>
              <HeroUIProvider>
                <RouterProvider router={router} />
                <ToastContainer />
              </HeroUIProvider>
            </CategoryProvider>
          </SearchProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}


