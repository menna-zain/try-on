import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import { CategoryContext } from "../../Contexts/CategoryContext";
import { authContext } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { BiShoppingBag } from "react-icons/bi";
import { FiHeart } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import Cookies from "js-cookie";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import axios from "axios";
import Search from "../Search/Search";

export default function NavbarUi() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(authContext);
  const navigate = useNavigate();

  const { setCategoryID } = useContext(CategoryContext);
  const [categories, setCategories] = useState([]);

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
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);

  function logOut() {
    localStorage.removeItem("token");
    Cookies.remove("token");
    setIsLoggedIn(false);
    navigate("/login");
  }

  return (
    <>
      <Navbar
        position="sticky"
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="2xl"
        className="drop-shadow-[0px_4px_6px_rgba(0,0,0,0.1)]"
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <span
              onClick={() => navigate("/")}
              className="cursor-pointer font-extralightbold"
            >
              <img src={logo} className="w-20 ms-6" />
            </span>
          </NavbarBrand>
        </NavbarContent>

        {isLoggedIn && (
          <NavbarContent className="hidden gap-4 sm:flex" justify="center">
            {categories?.map((category) => (
              <NavbarItem key={category._id}>
                <span
                  onClick={() => {
                    setCategoryID(category._id);
                    navigate(`categories/${category._id}`);
                  }}
                  className="flex flex-row-reverse text-xl font-medium capitalize cursor-pointer me-5 font-heading"
                >
                  {category.name}
                </span>
              </NavbarItem>
            ))}
          </NavbarContent>
        )}

        {isLoggedIn && (
          <NavbarContent as="div" className="items-center " justify="end">
            <Search />

            <BiShoppingBag
              className="cursor-pointer h-7 w-7"
              onClick={() => navigate("/cart")}
            />
            <FiHeart
              className="w-6 h-6 cursor-pointer"
              onClick={() => navigate("/wishlist")}
            />

            <div>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <AiOutlineUser className="cursor-pointer h-7 w-7" />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem
                    key="profile"
                    className="cursor-pointer font-heading"
                    onPress={() => navigate("me")}
                  >
                    Profile
                  </DropdownItem>
                  <DropdownItem
                    key="privacy"
                    className="cursor-pointer font-heading"
                    onPress={() => navigate("privacySettings")}
                  >
                    Privacy Settings
                  </DropdownItem>
                  <DropdownItem
                    key="addresses"
                    className="cursor-pointer font-heading"
                    onPress={() => navigate("addresses")}
                  >
                    Addresses
                  </DropdownItem>
                  <DropdownItem
                    key="orders"
                    className="cursor-pointer font-heading"
                    onPress={() => navigate("orders")}
                  >
                    Orders
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    color="danger"
                    className="cursor-pointer font-heading"
                    onPress={logOut}
                  >
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </NavbarContent>
        )}

        {isLoggedIn && (
          <NavbarMenu>
            {categories?.map((category) => (
              <NavbarMenuItem key={category._id}>
                <span
                  onClick={() => {
                    setCategoryID(category._id);
                    navigate(`categories/${category._id}`);
                  }}
                  className="w-full capitalize cursor-pointer"
                >
                  {category.name}
                </span>
              </NavbarMenuItem>
            ))}
          </NavbarMenu>
        )}
      </Navbar>
    </>
  );
}