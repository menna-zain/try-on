import axios from "axios";
import Cookies from "js-cookie";
import { Bounce, toast } from "react-toastify";

// دالة لإضافة المنتج إلى السلة
export async function addProductToCart({
  productId,
  color,
  size,
  quantity,
  setCartLoading,
  setSelectedColor,
  setSelectedSize,
}) {
  try {
    setCartLoading(true); // تشغيل حالة التحميل

    const { data } = await axios.post(
      "https://www.tryon-store.xyz/api/v1/cart",
      // "https://api.tryon-store.xyz/api/v1/cart",
      {
        productId,
        color,
        size,
        quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    console.log("add to cart", data);

    // إظهار رسالة نجاح
    toast.success(data.message, {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

    // مسح اللون والمقاس بعد إضافة المنتج للسلة
    setSelectedColor(null);
    setSelectedSize(null);

  } catch (error) {
    console.error("Error adding to cart:", error);
    toast.error("Something went wrong while adding the product to cart.");
  } finally {
    setCartLoading(false); // إيقاف حالة التحميل
  }
}
