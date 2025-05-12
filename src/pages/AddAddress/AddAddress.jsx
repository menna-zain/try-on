import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Footer from "../../Components/Footer/Footer";

export default function AddAddress() {
  // ! فاليديشن
  const [aliasError, setAliasError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [alias, setAlias] = useState("");
  const [details, setDetails] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function AddUserAddresses() {
    if (!alias || !details || !phone || !city) {
      alert(" All data is required !");
      return;
    }

    if (!/^(010|011|012|015)\d{8}$/.test(phone)) {
      setPhoneError("Please enter a valid Egyptian phone number");
      return;
    } else {
      setPhoneError(""); // امسح الرسالة إذا الرقم صحيح
    }

    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "https://api.tryon-store.xyz/api/v1/addresses",
        { alias, details, phone, city },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Address saved:", data);
      navigate("/addresses");
    } catch (error) {
      console.error("Error adding address:", error);
      alert("There is a problem");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-bold font-heading">
            Add New Address
          </h2>

          <div className="mb-2">
            <label className="block mb-1 font-semibold font-body">Address' Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={alias}
              onChange={(e) => {
                const value = e.target.value;
                setAlias(value);

                // تحقق من الحد الأقصى للطول
                if (value.length > 30) {
                  setAliasError("Address name must not exceed 30 characters");
                } else {
                  setAliasError("");
                }
              }}
              placeholder="Enter Name"
            />
            {aliasError && (
              <p className="mt-1 text-sm text-red-500">{aliasError}</p>
            )}
          </div>

          <div className="mb-2">
            <label className="block mb-1 font-semibold font-body">Address' Details</label>
            <textarea
              className="w-full p-2 border rounded-md"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Enter Details"
            ></textarea>
          </div>

          <div className="mb-2">
            <label className="block mb-1 font-semibold font-body">City</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter City"
            ></input>
          </div>

          <div className="mb-2">
            <label className="block mb-1 font-semibold font-body">Phone</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\s/g, ""); // إزالة المسافات
                setPhone(value);

                // تحقق لحظي
                if (!/^(010|011|012|015)\d{0,8}$/.test(value)) {
                  setPhoneError(
                    "Phone must start with 010, 011, 012, or 015 and be up to 11 digits"
                  );
                } else if (
                  value.length === 11 &&
                  !/^(010|011|012|015)\d{8}$/.test(value)
                ) {
                  setPhoneError(
                    "Please enter a valid 11-digit Egyptian phone number"
                  );
                } else {
                  setPhoneError("");
                }
              }}
              placeholder="Enter phone number"
            />
            {phoneError && (
              <p className="mt-1 text-sm text-red-500">{phoneError}</p>
            )}
          </div>
          <button
            onClick={AddUserAddresses}
            disabled={isLoading}
            className="w-full p-3 text-white rounded-md bg-primary hover:bg-primary-hover"
          >
            {isLoading ? "Saving..." : "Save Address"}
          </button>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
