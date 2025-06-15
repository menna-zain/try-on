import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PencilIcon } from "@heroicons/react/24/outline";
import LoadingScreen from "../../Components/LoadingScreen/Loading.Screen";
import axios from "axios";
import Cookies from "js-cookie";

export default function ProfileForm() {
    const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [originalData, setOriginalData] = useState({});
  const [isChanged, setIsChanged] = useState(false);

  const navigate = useNavigate();
 console.log("token",Cookies.get("token"));
 
  async function getMe() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        "https://www.tryon-store.xyz/api/v1/users/Me",
        // "https://api.tryon-store.xyz/api/v1/users/Me",
        {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        }
      );
      setName(data.data.data.name);
      setEmail(data.data.data.email);
      setOriginalData({
        name: data.data.data.name,
        email: data.data.data.email,
        profileImage: data.data.data.photo,
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else {
        console.error("Error fetching user:", error);
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getMe();
  }, []);

  useEffect(() => {
    setIsChanged(
      name !== originalData.name ||
        email !== originalData.email ||
        profileImage !== null
    );
  }, [name, email, profileImage, originalData]);

  async function updateProfile() {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (profileImage) {
      formData.append("photo", profileImage);
    }
    setIsLoading(true);
    try {
      const response = await axios.patch(
        "https://www.tryon-store.xyz/api/v1/users/updateMe",
        // "https://api.tryon-store.xyz/api/v1/users/updateMe",
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      if (response.data.data.photo) {
        setOriginalData((prevData) => ({
          ...prevData,
          profileImage: response.data.data.photo, 
        }));
      }

      setProfileImage(null);
      setIsChanged(false);
    } catch (error) {
      console.error(error);
      // alert("حدث خطأ أثناء تحديث الملف الشخصي.");
    }finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
      return <LoadingScreen />;
    }

  return (
    <>
     <div className="flex flex-col items-center justify-center ">
     <div className="flex items-center justify-center w-full max-w-2xl py-8 space-y-6 text-black md:flex-row md:space-y-0 md:space-x-10">
     <div className="w-3/4 px-5 py-3 my-24 bg-white shadow-lg rounded-xl md:text-left" >
    
    {/* <div className="max-w-lg p-6 mx-auto mt-20 bg-white rounded-lg shadow-md "> */}
      <h2 className="text-xl font-bold font-heading">Your Profile</h2>

      <div className="flex items-center gap-4 mt-4">
        <img
          src={
            profileImage
              ? URL.createObjectURL(profileImage)
              : originalData.profileImage || "https://i.pravatar.cc/150?u=a042581f4e29026704d"
          }
          alt="Profile"
          className="w-16 h-16 border rounded-full"
        />

        <label className="flex items-center gap-1 px-3 py-2 text-sm font-medium border rounded-lg cursor-pointer hover:bg-gray-100 font-body">
          <PencilIcon className="w-4 h-4 " /> Change
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setProfileImage(file);
                setOriginalData((prev) => ({
                  ...prev,
                  profileImage: URL.createObjectURL(file), 
                }));
              }
            }}
          />
        </label>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 font-body">First Name</label>
          <input
            type="text"
            className="w-full p-2 mt-1 border rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 font-body">Email</label>
          <input
            type="email"
            className="w-full p-2 mt-1 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-6 font-body">
        <button
          className={`px-4 py-2 rounded-lg ${
            isChanged
              ? "bg-primary text-white hover:bg-primary-hover "
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!isChanged}
          onClick={updateProfile}
        >
          Save
        </button>
      </div>
    </div>
    </div>
    </div>
    </>
  );
}