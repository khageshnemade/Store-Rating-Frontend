import React, { useState } from "react";
import { toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { publicRequest } from "../axios";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const { name, email, address, password } = formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,16}$/;

    if (name.length < 20) {
      toast.error("Name must be at least 20 characters long.");
      return false;
    }

    if (name.length > 60) {
      toast.error("Name must be at most 60 characters.");
      return false;
    }

    if (address.length > 400) {
      toast.error("Address must be at most 400 characters.");
      return false;
    }

    if (!emailRegex.test(email)) {
      toast.error("Invalid email format.");
      return false;
    }

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be 8-16 characters, include at least one uppercase letter and one special character."
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await publicRequest.post("auth/register", formData);
      toast.success("Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      const errorMsg =
        err.response?.data?.message || "Registration failed. Please try again.";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-4xl flex flex-col md:flex-row h-auto md:h-[80vh]">
        {/* Left Side Image */}
        <div className="md:w-1/2 hidden md:block">
          <img
            src="/images/register.jpeg"
            alt="Register Illustration"
            className="w-full h-full object-cover rounded-l-xl"
          />
        </div>

        {/* Right Side Form */}
        <div className="md:w-1/2 w-full p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 text-center text-red-600">
            Register
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label htmlFor="password" className="block text-gray-700 mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 pr-10"
                required
              />
              <div
                className="absolute inset-y-0 right-3 top-6 flex items-center cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <AiFillEyeInvisible className="text-gray-600 w-5 h-5" />
                ) : (
                  <AiFillEye className="text-gray-600 w-5 h-5" />
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 focus:ring-4 focus:ring-red-600 transition"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
