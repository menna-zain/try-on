import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Sidebar from "../../Components/Sidebar/Sidebar";

export default function CreateUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    role: "user", // default role
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://api.tryon-store.xyz/api/v1/users", form);
      toast.success("User registered successfully!");
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="flex min-h-screen ml-64 text-white bg-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold font-heading">Create User Account</h2>
        </div>

        <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-900">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-xl p-8 space-y-5 bg-white shadow-md dark:bg-gray-800 rounded-xl font-body"
          >
            {["name", "email", "password", "passwordConfirm"].map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block mb-1 text-sm font-medium text-gray-700 capitalize dark:text-gray-300"
                >
                  {field === "passwordConfirm" ? "Confirm Password" : field}
                </label>
                <input
                  type={field.includes("password") ? "password" : "text"}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            ))}

            {/* Role Radio Buttons */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Role
              </label>
              <div className="flex gap-6 mt-1">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={form.role === "user"}
                    onChange={handleChange}
                    className="text-blue-600"
                  />
                  <span className="text-gray-700 dark:text-gray-300">User</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={form.role === "admin"}
                    onChange={handleChange}
                    className="text-blue-600"
                  />
                  <span className="text-gray-700 dark:text-gray-300">Admin</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white transition rounded-md bg-primary-dark hover:bg-primary-hoverdark"
            >
              Create
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
