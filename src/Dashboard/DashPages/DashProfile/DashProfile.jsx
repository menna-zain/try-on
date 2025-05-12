import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PencilIcon } from "@heroicons/react/24/outline";
import DashLoading from "../../Components/DashLoading/DashLoading";
import Sidebar from "../../Components/Sidebar/Sidebar";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

export default function DashProfile() {
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [originalData, setOriginalData] = useState({});
  const [isChanged, setIsChanged] = useState(false);

  const navigate = useNavigate();

  async function getMe() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        "https://api.tryon-store.xyz/api/v1/users/Me",
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
        toast.error("Failed to fetch profile data.");
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
        "https://api.tryon-store.xyz/api/v1/users/updateMe",
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
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while updating the profile.");
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return<>
      <div className="relative flex min-h-screen ml-64 text-white bg-gray-900">
      <Sidebar />

      <main className="flex-1 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold font-heading">Your Profile</h2>
      </div>
        <DashLoading />

      </main>
    </div>
    
     </>
  }


  
  return (
    <div className="flex min-h-screen ml-64 text-white bg-gray-900">
    {/* Sidebar */}
    <Sidebar />

    {/* Main Content */}
    <main className="flex-1 p-6 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold font-heading">Your Profile</h2>
      </div>

      <div className="flex items-center justify-center h-full px-4 text-white bg-gray-900">
      <div className="w-full max-w-xl p-8 bg-gray-800 shadow-lg rounded-xl">
      

        <div className="flex items-center gap-4 mb-6">
          <img
            src={
              profileImage
                ? URL.createObjectURL(profileImage)
                : originalData.profileImage ||
                  "https://i.pravatar.cc/150?u=a042581f4e29026704d"
            }
            alt="Profile"
            className="object-cover w-16 h-16 border-2 border-gray-600 rounded-full"
          />

          <label className="flex items-center gap-1 px-3 py-2 text-sm font-medium bg-gray-700 border border-gray-600 rounded-lg cursor-pointer hover:bg-gray-600 font-body">
            <PencilIcon className="w-4 h-4" /> Change
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

        <div className="space-y-5 font-body">
          <div>
            <label className="block mb-1 text-sm text-gray-300">First Name</label>
            <input
              type="text"
              className="w-full p-2 text-white bg-gray-700 border border-gray-600 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">Email</label>
            <input
              type="email"
              className="w-full p-2 text-white bg-gray-700 border border-gray-600 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            className={`px-5 py-2 rounded transition font-body ${
              isChanged
                ? "bg-primary-dark hover:bg-primary-hoverdark text-white"
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!isChanged}
            onClick={updateProfile}
          >
            Save
          </button>
        </div>
      </div>
    </div>
    </main>
  </div>
  );
}
