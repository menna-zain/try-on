import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";

import { Heart } from "lucide-react";
import { Star } from "lucide-react";
import { MoreVertical } from "lucide-react";
import { Rating } from "@mui/material";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { Bounce, toast } from "react-toastify";

import LoadingScreen from "../../Components/LoadingScreen/Loading.Screen";
import RelatedProducts from "../../Components/RelatedProducts/RelatedProducts";
import { addProductToCart } from "../../Services/cartServices";
import Footer from "../../Components/Footer/Footer";
import { Button } from "@heroui/react";

export default function ProductDetails() {
  let { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [barReviews, setBarReviews] = useState([]);
  const [commentReviews, setCommentReviews] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState();

  const totalReviews = barReviews.reduce((sum, r) => sum + r.count, 0);

  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // ! USER ID
  const token = Cookies.get("token");
  let currentUserId = null;
  if (token) {
    const decoded = jwtDecode(token);
    currentUserId = decoded?.id;
    console.log("decoded", decoded);
    console.log("userId:", currentUserId);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getProductDetails();
  }, [id]);

  async function getProductDetails() {
    setIsLoading(true);
    const { data } = await axios.get(
      "https://api.tryon-store.xyz/api/v1/products/" + id
    );
    console.log("bar ",data.data.ratingsBreakdown);
    console.log("comment ",data.data.product.reviews);
    
    setProductDetails(data.data.product);
    setColors(data.data.product.colors);
    setSizes(data.data.product.sizes);
    setCommentReviews(data.data.product.reviews);
    setBarReviews(data.data.ratingsBreakdown);
    getProductByCategory(data.data.product.category.id);
    setIsLoading(false);
  }

  async function getProductByCategory(categoryId) {
    setIsLoading(true);
    const { data } = await axios.get(
      `https://api.tryon-store.xyz/api/v1/products?category[in]=${categoryId}`
    );
    setRelatedProducts(data.data);
    setIsLoading(false);
  }

  async function addProductWishList(productId) {
    const { data } = await axios.post(
      `https://api.tryon-store.xyz/api/v1/wishlist`,
      {
        productId,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
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
  }

  const [newReview, setNewReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);

  async function handleSubmitReview(productId) {
    if (rating === 0)
      return toast.warning("Please write a review and provide a rating!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
      });
    try {
      setLoading(true);
      const { data } = await axios.post(
        `https://api.tryon-store.xyz/api/v1/products/${productId}/reviews`,
        {
          review: newReview,
          rating: rating,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setNewReview("");
      setRating(0);
      toast.success("Review added successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
      });
      setCommentReviews((prev) => [...prev, data.data.review]);
      await getProductDetails();
    } catch (error) {
      toast.error("Failed to add review", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  }

  const handleDeleteReview = async (reviewId) => {
    // todo confirm
    const toastId = toast(
      <div>
        <h3 className="mb-2">Are you sure you want to delete this review?</h3>
        <button
          onClick={async () => {
            await axios.delete(
              `https://api.tryon-store.xyz/api/v1/reviews/${reviewId}`,
              {
                headers: {
                  Authorization: `Bearer ${Cookies.get("token")}`,
                },
              }
            );
            setCommentReviews((prev) =>
              prev.filter((review) => review._id !== reviewId)
            );

            await getProductDetails();
            toast.success("Review deleted successfully.", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              transition: Bounce,
            });
            toast.dismiss(toastId); // Close the confirmation toast
          }}
          className="px-2 py-1 text-green-500 bg-transparent border border-green-500 rounded-full me-4"
        >
          Yes
        </button>
        <button
          onClick={() => {
            toast.info("Deletion canceled", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              transition: Bounce,
            });
            toast.dismiss(toastId); // Close the confirmation toast
          }}
          className="px-3 py-1 text-red-500 bg-transparent border border-red-500 rounded-full"
        >
          No
        </button>
      </div>,
      {
        position: "top-center",
        autoClose: false, // Don't auto-close
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
      }
    );
  };
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className=" bg-[#F8F9FA] ">
      {/* //! product details */}
      <section>
        {/* <!-- component --> */}
        <div className="p-20 mx-auto ">
          <div className="flex flex-col items-center gap-10 md:flex-row">
            {/* <!-- Product Image --> */}
            <div className="relative p-4 md:w-1/3">
              <div className="px-10">
                <Slider {...settings}>
                  <img
                    src={productDetails?.imgCover}
                    alt={productDetails?.name}
                    className="object-cover w-full h-auto rounded-lg"
                  />
                  {productDetails?.images.map((img, index) => {
                    return (
                      <img
                        key={index}
                        src={img}
                        alt={productDetails?.name}
                        className="object-cover w-full h-auto rounded-lg"
                      />
                    );
                  })}
                </Slider>
              </div>
            </div>

            {/* <!-- Product Details --> */}
            <div className="px-20 md:w-2/3">
              <div className="">
                <h1 className="mb-2 text-2xl font-bold text-gray-800 capitalize font-heading">
                  {productDetails?.name}
                </h1>

                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    {productDetails?.productDiscount > 0 ? (
                      <>
                        <p className="mr-2 text-lg font-semibold text-gray-700 font-body">
                          £E{productDetails?.productDiscount}
                        </p>

                        <p className="text-sm font-medium text-red-500 line-through font-body">
                         £E{productDetails?.price}
                        </p>
                      </>
                    ) : (
                      <p className="text-lg font-semibold text-gray-700 font-body">
                        £E{productDetails?.price}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center ">
                    <span className="text-xs text-gray-400 me-3 font-heading">
                      {productDetails?.sold} Sold
                    </span>
                    <Rating
                      max={1}
                      name="half-rating-read"
                      value={parseFloat(productDetails?.ratingsAverage)}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                    <span className="text-sm font-semibold font-body">
                      {" "}
                      {productDetails?.ratingsAverage}{" "}
                    </span>
                  </div>
                </div>
                <div className="py-4 border-t-2">
                  {/* <h6 className="font-semibold capitalize">description:</h6> */}
                  <p className="mb-4 text-sm text-gray-700 font-body">
                    {productDetails?.description}
                  </p>
                </div>

                {/* Color Options */}
                <div>
                  <h2 className="font-semibold font-heading">Color</h2>
                  <div className="flex mt-2 space-x-2">
                    {colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded border-2 ${
                          selectedColor === color
                            ? "border-black"
                            : "border-gray-300"
                        }`}
                        style={{ backgroundColor: color }}
                      ></button>
                    ))}
                  </div>
                </div>

                {/* Size Options */}
                <div className="my-4">
                  <h2 className="font-semibold font-heading">
                    Size: <span className="font-normal capitalize">{selectedSize}</span>
                  </h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-auto p-2 flex items-center justify-center rounded border text-sm font-medium  uppercase font-body ${
                          selectedSize === size
                            ? "bg-black text-white"
                            : "bg-white text-black border-gray-300"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* botton */}
                <div className="flex mt-4 space-x-10 font-body">
                  <Button
                    isLoading={cartLoading}
                    onPress={() => {
                      if (!selectedColor || !selectedSize) {
                        toast.error(
                          "Please select both color and size before adding to cart.",
                          {
                            position: "top-center",
                            autoClose: false, // يعطل إغلاق التوست تلقائيًا
                            hideProgressBar: false,
                            closeOnClick: false, // يعطل الإغلاق عند الضغط
                            pauseOnHover: true,
                            draggable: true,
                            transition: Bounce,
                            closeButton: true, // يضيف زر الإغلاق
                          }
                        );
                        return;
                      }

                      addProductToCart({
                        productId: productDetails?._id,
                        color: selectedColor,
                        size: selectedSize,
                        quantity: 1,
                        setSelectedColor,
                        setSelectedSize,
                        setCartLoading
                      });
                    }}
                    className="flex-1 px-4 py-3 text-base font-semibold text-white transition duration-300 rounded bg-primary hover:bg-primary-hover focus:outline-none focus:shadow-outline"
                  >
                    Add to Cart
                  </Button>
                  <Button
                    onPress={() => addProductWishList(productDetails?._id)}
                    className="flex items-center justify-center flex-1 px-4 py-2 text-base font-semibold text-center bg-transparent border-2 rounded gap-x-2 text-primary border-primary focus:shadow-outline"
                  >
                    Wish List
                    <Heart size={20} color="#570091 " strokeWidth={2} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* //! RelatedProducts */}
          <div className="mt-40 ">
            <h6 className="mb-4 text-xl font-bold capitalize font-heading">
              related products
            </h6>
            <RelatedProducts relatedProducts={relatedProducts} />
          </div>
        </div>
      </section>
      {/* //!__________________________________ */}

      {/* //! PRODUCT REVIEW */}

      <section className=" bg-[#F8F9FA] py-20 px-32 ">
        <h2 className="mb-4 text-xl font-bold font-heading">Product Reviews</h2>
        <div className="flex gap-5 p-10 mx-auto border rounded-md">
          
          <div className="flex items-start w-1/4 gap-10 mb-4">
            <div className="text-4xl font-bold font-body">
              {productDetails?.ratingsAverage}
            </div>
            <div>
              <div className="flex text-orange-400">
                {Array(Math.floor(productDetails?.ratingsAverage || 0))
                  .fill(0)
                  .map((_, i) => (
                    <Star key={i} fill="orange" className="w-5 h-5" />
                  ))}
                {productDetails?.ratingsAverage % 1 >= 0.5 && (
                  <Star
                    fill="url(#halfGradient)"
                    stroke="orange"
                    className="w-5 h-5"
                  />
                )}
                {Array(5 - Math.ceil(productDetails?.ratingsAverage || 0))
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={`empty-${i}`}
                      fill="none"
                      stroke="orange"
                      className="w-5 h-5"
                    />
                  ))}
                <svg width="0" height="0">
                  <defs>
                    <linearGradient id="halfGradient">
                      <stop offset="50%" stopColor="orange" />
                      <stop offset="50%" stopColor="white" stopOpacity="1" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className="text-sm text-gray-500 font-body">
                from {productDetails?.ratingsQuantity} reviews
              </div>
            </div>
          </div>
          {/*  */}
          <div className="w-3/4 space-y-2">
            {barReviews.map((r) => {
              const width = (r.count / totalReviews) * 100;
              return (
                <div key={r.rating} className="flex items-center gap-4">
                  <div className="w-6 text-sm font-semibold font-body">{r.rating}.0</div>
                  <Star fill="orange" className="w-4 h-4 text-orange-400" />
                  <div className="flex-1 h-2 overflow-hidden bg-gray-200 rounded">
                    <div
                      className="h-full bg-black"
                      style={{ width: `${width}%` }}
                    ></div>
                  </div>
                  <div className="w-10 text-sm text-right font-body">{r.count}</div>
                </div>
              );
            })}
          </div>
          {/*  */}
        </div>
      </section>
      {/* //!______________________________________ */}

      {/* //!كومنتات  */}
      <section className=" bg-[#F8F9FA] py-20 px-32 ">
        <h2 className="mb-4 text-xl font-bold font-heading">Review Lists</h2>

        {/* كتابة ريفيو*/}

        <div className="mb-10">
          <textarea
            className="w-full p-4 border rounded-md resize-none font-body"
            rows="4"
            placeholder="Add your review..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          ></textarea>

          {/* تقييم النجوم */}
          <div className="flex items-center gap-2 mt-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                onClick={() => setRating(star)}
                className={`w-6 h-6 cursor-pointer ${
                  rating >= star ? "text-orange-500" : "text-gray-300"
                }`}
                fill={rating >= star ? "orange" : "none"}
                stroke="orange"
              />
            ))}
            <span className="text-sm text-gray-600 font-body">{rating} / 5</span>
          </div>

          <button
            onClick={() => handleSubmitReview(productDetails?._id)}
            className="px-4 py-2 mt-4 font-medium text-white rounded bg-primary hover:bg-primary-hover font-body"
            disabled={loading}
          >
            {loading ? "loading..." : "Add Review"}
          </button>
        </div>

        {commentReviews.length > 0 ? (
          [...commentReviews].reverse().map((review) => (
            <div
              key={review._id}
              className="flex justify-between p-10 mx-auto border-b-2 rounded-md"
            >
              <div className="space-y-2">
                {/* عرض النجوم بناءً على التقييم */}
                <div className="flex text-orange-400">
                  {/* نجوم كاملة */}
                  {Array(Math.floor(review.rating))
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} fill="orange" className="w-5 h-5" />
                    ))}

                  {/* نص نجمة لو موجود */}
                  {review.rating % 1 >= 0.5 && (
                    <Star
                      fill="url(#halfGradient)"
                      stroke="orange"
                      className="w-5 h-5"
                    />
                  )}

                  {/* نجوم فارغة */}
                  {Array(5 - Math.ceil(review.rating))
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={`empty-${i}`}
                        fill="none"
                        stroke="orange"
                        className="w-5 h-5"
                      />
                    ))}

                  {/* تعريف التدرج النصفي */}
                  <svg width="0" height="0">
                    <defs>
                      <linearGradient id="halfGradient">
                        <stop offset="50%" stopColor="orange" />
                        <stop offset="50%" stopColor="white" stopOpacity="1" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* نص المراجعة */}
                <div className="text-lg font-semibold">{review.review}</div>

                {/* تاريخ المراجعة */}
                <div className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString("en-GB")}
                </div>

                {/* معلومات المستخدم */}
                <div className="flex items-center gap-3 mt-4">
                  {review.user.photo && (
                    <img
                      src={review.user.photo}
                      alt={review.user.name}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <span className="font-medium">{review.user.name}</span>
                </div>
              </div>

              {currentUserId === review.user._id && (
                <div className="relative group">
                  <MoreVertical className="cursor-pointer" />

                  {/* القائمة تظهر عند المرور أو الضغط */}
                  <div className="absolute right-0 z-10 hidden p-2 mt-2 bg-white border rounded shadow-md group-hover:block">
                    <button
                      className="px-4 py-1 text-sm text-red-500 rounded hover:bg-red-100"
                      onClick={() => handleDeleteReview(review._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div> <h4 className="py-6 text-base font-medium text-gray-700 capitalize border-y-1 ms-4 ps-2 font-body">No reviews yet</h4> </div>
        )}
      </section>

      {/* //!_______________________________________ */}
      <Footer />
    </div>
  );
}
