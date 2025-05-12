import Cookies from "js-cookie";
import LoadingScreen from "../../Components/LoadingScreen/Loading.Screen";
import React, { useEffect, useState } from "react";
import { PlusCircle, Trash, X } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";

export default function Addresses() {
  const [isLoading, setIsLoading] = useState(true);

  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    getUserAddresses();
  }, []);

  async function getUserAddresses() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        "https://api.tryon-store.xyz/api/v1/addresses",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setAddresses(data.data);
      console.log("data address", data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://api.tryon-store.xyz/api/v1/addresses/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      setAddresses(addresses.filter((address) => address._id !== id));
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="max-w-2xl min-h-screen pt-10 mx-auto ">
        <h2 className="mb-6 text-2xl font-bold text-start font-heading">User Addresses</h2>
        <Link to={"/addAddress"} className="flex justify-end">
          <button className="flex items-center justify-center w-1/4 p-3 mb-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
            <PlusCircle size={20} className="mr-2" /> Add Address
          </button>
        </Link>
        <div className="relative space-y-4">
          {addresses.map((address) => (
            <div
              key={address._id}
              className="relative p-4 transition-all duration-300 bg-white rounded-lg shadow-md hover:shadow-lg"
            >
              <div>
                <h3 className="text-lg font-semibold">{address.alias}</h3>
                <p className="text-gray-600">{address.city}, {address.details}</p>
                {/* <p className="text-gray-800"></p> */}
                <p className="text-gray-800">Phone: {address.phone}</p>
              </div>
              <button
                onClick={() => {
                   console.log( Cookies.get("token"));
                   
                  console.log("address id ", address._id);
                  handleDelete(address._id)}}
                className="absolute top-0 right-0 p-2 mt-2 transition-all rounded-lg text-red hover:text-red-600 me-2"
              >
                <Trash size={20} />
              </button>
              
            </div>
          ))}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
