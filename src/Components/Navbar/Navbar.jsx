import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import { CategoryContext } from "../../Contexts/CategoryContext";
import { authContext } from "../../Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
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
  Input,
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


  // todo search
  // const handleSearchChange = (e) => {
  //   setSearchQuery(e.target.value);
  // };


  //!        USE EFFECT
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
        console.log("Categories response.data.data:", response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories(); // استدعاء الدالة عند تحميل الكومبوننت
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
        position="static"
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="2xl"
        className="drop-shadow-[0px_4px_6px_rgba(0,0,0,0.1)]"
      >
        {/* the logo */}
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <Link color="foreground" to={"/"} className="font-extralightbold">
              <img src={logo} className="w-20 ms-6" />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        {isLoggedIn && (
          <NavbarContent className="hidden gap-4 sm:flex" justify="center">
            {categories?.map((category) => (
              <NavbarItem key={category._id}>
                <Link
                  onClick={() => {
                    setCategoryID(category._id);
                  }}
                  category-id={category._id}
                  color="foreground"
                  to={`categories/${category._id}`}
                  className="flex flex-row-reverse text-xl capitalize font-mediam me-5 font-heading"
                >
                  {category.name}
                </Link>
              </NavbarItem>
            ))}
          </NavbarContent>
        )}

        {isLoggedIn && (
          <NavbarContent as="div" className="items-center " justify="end">
            {/* //! SEARCH */}
            <Search/>
 
            <Link to={"/cart"}>
              <BiShoppingBag className="h-7 w-7" />
            </Link>
            <Link to={"/wishlist"}>
              <FiHeart className="w-6 h-6 " />
            </Link>
              <div>
            <Dropdown placement="bottom-end" >
              <DropdownTrigger>
                <AiOutlineUser className="cursor-pointer h-7 w-7" />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="settings">
                  <Link to={"me"} className="cursor-pointer font-heading">Profile</Link>
                </DropdownItem>
                <DropdownItem key="settings">
                  <Link to={"privacySettings"} className="cursor-pointer font-heading">Privacy Settings</Link>
                </DropdownItem>
                <DropdownItem key="team_settings">
                  <Link to={"addresses"} className="cursor-pointer font-heading"> Addresses </Link>
                </DropdownItem>
                <DropdownItem key="configurations">
                  <Link to={"orders"} className="cursor-pointer font-heading"> Orders </Link>
                </DropdownItem>
                <DropdownItem key="logout" color="danger" onPress={logOut} className="cursor-pointer font-heading">
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
                <Link
                  onClick={() => setCategoryID(category._id)}
                  category-id={category._id}
                  color={"foreground"}
                  to={`categories/${category._id}`}
                  className="w-full capitalize"
                  size="lg"
                >
                  {category.name}
                </Link>
              </NavbarMenuItem>
            ))}
          </NavbarMenu>
        )}
      </Navbar>
    </>
  );
}
