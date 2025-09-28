import React, { useState } from "react";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import makeRequest from "../../axios";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { oldPassword, newPassword } = formData;

    if (!oldPassword || !newPassword) {
      toast.error("Please fill in both fields");
      return;
    }

    try {
      setLoading(true);
      await makeRequest.post("auth/change-password", {
        oldPassword,
        newPassword,
      });

      toast.success("Password changed successfully!");
      setFormData({ oldPassword: "", newPassword: "" });
      navigate("/login");
    } catch (err) {
      toast.error(
        "Password must be 8-16 characters, include one uppercase and one special character"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left image */}
        <div className="hidden md:block">
          <img
            src="/images/pass.jpg"
            alt="Change Password"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="p-8 sm:p-10">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800 flex justify-center items-center gap-2">
              <FiLock className="text-blue-600" size={28} />
              Change Password
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Update your credentials securely
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Old Password Field */}
            <div className="relative">
              <label
                htmlFor="oldPassword"
                className="text-sm font-medium text-gray-700"
              >
                Old Password
              </label>
              <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                placeholder="Enter your current password"
                className="mt-1 w-full px-4 py-2 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute inset-y-0 right-4 top-7 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
              >
                {showOldPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </span>
            </div>

            {/* New Password Field */}
            <div className="relative">
              <label
                htmlFor="newPassword"
                className="text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter your new password"
                className="mt-1 w-full px-4 py-2 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute inset-y-0 right-4 top-7 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
              >
                {showNewPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              {loading ? "Updating..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
