import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cookies from "js-cookie";

import SubCategoriesCard from "../../Components/SubCategoriesCard/SubCategoriesCard";
import LoadingScreen from "../../Components/LoadingScreen/Loading.Screen";

import banarkids from "../../assets/images/banarkids1.jpg";
import banarskincare from "../../assets/images/banarkids2.jpg";
import ramadanblack from "../../assets/images/banarwomen1.jpg";
import ramadanblue from "../../assets/images/banarwomen2.jpg";
import ramadanpink from "../../assets/images/banarmen1.jpg";
import mothereid from "../../assets/images/banarmen2.jpg";
// import banarkids from "../../assets/images/banarkids.jpg";
// import banarskincare from "../../assets/images/banarskincare.jpg";
// import ramadanblack from "../../assets/images/ramadanblack.jpg";
// import ramadanblue from "../../assets/images/ramadanblue.jpg";
// import ramadanpink from "../../assets/images/ramadanbink.jpg";
// import mothereid from "../../assets/images/mothereid.jpg";
import Footer from "../../Components/Footer/Footer";
import ProductSliderSection from "../../Components/HomeProductSlider/HomeProductSlider";

export default function Home() {
  window.scroll(0, 0);

  const [loadingCount, setLoadingCount] = useState(0);
  const isLoading = loadingCount > 0;

  function startLoading() {
    setLoadingCount((prev) => prev + 1);
  }

  function stopLoading() {
    setLoadingCount((prev) => Math.max(prev - 1, 0));
  }

  //THE ARROWS
  const CustomPrevArrow = ({ onClick }) => (
    <button
      className="absolute left-0 text-primary top-1/2 "
      onClick={onClick}
      style={{ zIndex: 10 }}
    >
      <FaChevronLeft size={15} />
    </button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <button
      className="absolute right-0 text-primary top-1/2 "
      onClick={onClick}
      style={{ zIndex: 10 }}
    >
      <FaChevronRight size={15} />
    </button>
  );
  //_____________________________________________________________
  // banar
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const banarTwoSettings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  //_____________________________________________________________

  //! SUB CATEGORIES LOGIC
  const productSettings = {
    dots: false,
    arrows: true,
    infinite: false,
    slidesToShow: 7,
    slidesToScroll: 1,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 1024, // عندما يكون عرض الشاشة أقل من 1024px
        settings: {
          slidesToShow: 4, // عرض 3 عناصر
        },
      },
      {
        breakpoint: 768, // عندما يكون عرض الشاشة أقل من 768px (تابلت)
        settings: {
          slidesToShow: 3, // عرض عنصرين فقط
        },
      },
      {
        breakpoint: 690, // عندما يكون عرض الشاشة أقل من 480px (موبايل)
        settings: {
          slidesToShow: 1, // عرض عنصر واحد فقط
        },
      },
    ],
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  const [subCategories, setsubCategories] = useState([]);
  async function getAllSubCategories() {
    startLoading();
    try {
      const { data } = await axios.get(
        "https://api.tryon-store.xyz/api/v1/subcategories",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setsubCategories(data.data);
      console.log("data.data.subCategories", data.data);
      console.log("data.data:", data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      stopLoading();
    }
  }

  //!___________________________________________________________

  //! SALES
  const [sales, setSales] = useState([]);
  async function fetchSalesProducts() {
    startLoading();
    try {
      const { data } = await axios.get(
        "https://api.tryon-store.xyz/api/v1/products/onSaleProducts?limit=12",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setSales(data.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      stopLoading();
    }
  }
  //!_________________________________________________________

  //! NEW PRODUCT
  const [newProducts, setNewProduct] = useState([]);
  async function fetchNewProducts() {
    startLoading();
    try {
      const { data } = await axios.get(
        "https://api.tryon-store.xyz/api/v1/products/newProducts",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      if (data?.data?.products) {
        setNewProduct(data.data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      stopLoading();
    }
  }
  //!===============================================

  //!     CATEGORIES
  const [categoriesIdMen, setCategoriesIdMen] = useState([null]);
  const [categoriesIdWomen, setCategoriesIdWomen] = useState([null]);
  const [categoriesIdKids, setCategoriesIdKids] = useState([null]);

  const [menProducts, setMenProduct] = useState([]);
  const [womenProducts, setWomenProduct] = useState([]);
  const [kidsProducts, setKidsProduct] = useState([]);

  //! fetchCategories for Store ID
  async function fetchCategories() {
    startLoading();
    try {
      const { data } = await axios.get(
        "https://api.tryon-store.xyz/api/v1/categories",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const menCategory = data.data.find((el) => el.name === "men");
      if (menCategory) {
        setCategoriesIdMen(menCategory._id);
        console.log("men id ",menCategory._id);
      }

      const womenCategory = data.data.find((el) => el.name === "women");
      if (womenCategory) {
        setCategoriesIdWomen(womenCategory._id);
        console.log("womenCategory._id",womenCategory._id);
      }

      const kidsCategory = data.data.find((el) => el.name === "kids");
      if (kidsCategory) {
        setCategoriesIdKids(kidsCategory._id);
        console.log("kidsCategory._id",kidsCategory._id);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      stopLoading();
    }
  }

  //! for Get PRODUCTS
  async function fetchProductsByCategory(categoryId, setter, limit = 10) {
    startLoading();
    try {
      const { data } = await axios.get(
        `https://api.tryon-store.xyz/api/v1/categories/${categoryId}/products?limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      if (data?.data) setter(data.data);
      console.log("categories products",data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      stopLoading();
    }
  }

  useEffect(() => {
    getAllSubCategories();
    fetchSalesProducts();
    fetchNewProducts();
    fetchCategories();
  }, []);

  //! catergory
  useEffect(() => {
    // if (
    //   typeof categoriesIdMen === "string" &&
    //   typeof categoriesIdWomen === "string" &&
    //   typeof categoriesIdKids === "string"
    // ) {
      fetchProductsByCategory(categoriesIdMen, setMenProduct);
      fetchProductsByCategory(categoriesIdWomen, setWomenProduct);
      fetchProductsByCategory(categoriesIdKids, setKidsProduct);
    // }
  }, [categoriesIdMen, categoriesIdWomen, categoriesIdKids]);
  
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="bg-[#F8F9FA] px-10">
        {/* banar1 */}
        <section className="p-5 my-10 mt-20 ">
          <Slider {...settings} className="w-full p-5 mx-auto">
            <div className="w-full">
              <img src={banarkids} alt="1" className="w-full" />
            </div>
            <div className="w-full">
              <img src={banarskincare} alt="2" className="w-full" />
            </div>
            <div className="w-full">
              <img src={ramadanblack} alt="3" className="w-full" />
            </div>
            <div className="w-full">
              <img src={ramadanblue} alt="4" className="w-full" />
            </div>
            <div className="w-full">
              <img src={ramadanpink} alt="5" className="w-full" />
            </div>
            <div className="w-full">
              <img src={mothereid} alt="6" className="w-full" />
            </div>
          </Slider>
        </section>
        <section className="mx-2 my-10 ">
          <div className="px-2">
            <Slider {...productSettings} className="w-full p-5 ">
              {subCategories?.map((product, index) => {
                return <SubCategoriesCard product={product} key={index} />;
              })}
            </Slider>
          </div>
        </section>
        {/* //!========================================== */}

        {/* //!SALES */}
        <ProductSliderSection
          title="sales"
          linkTo="/products/sales"
          products={sales}
        />

        {/* //!NEW PRODUCT */}
        <ProductSliderSection
          title="new product"
          linkTo="/products/new"
          products={newProducts}
        />

        {/* //! BANAR 2 */}
        <section className="p-5 my-10 ">
          <Slider {...banarTwoSettings} className="p-5">
            <div className="w-full">
              <img src={mothereid} alt="6" className="w-full" />
            </div>
          </Slider>
        </section>

        {/* //! ALL CATEGORIES */}
        {/* <section className="mx-auto my-20"> */}
          {/* //!WOMEN */}
          <ProductSliderSection
            title="women's fashion"
            linkTo={`/categories/${categoriesIdWomen}`}
            products={womenProducts}
          />

          {/* //!MEN */}
          <ProductSliderSection
            title="men's fashion"
            linkTo={`/categories/${categoriesIdMen}`}
            products={menProducts}
          />

          {/* //! KIDS */}
          <ProductSliderSection
            title="kids' fashion"
            linkTo={`/categories/${categoriesIdKids}`}
            products={kidsProducts}
          />
        {/* </section> */}
        {/* //! ================================  */}
      </div>
      <Footer />
    </>
  );
}
