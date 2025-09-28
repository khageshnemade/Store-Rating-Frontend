import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/features/authSlice";
import { toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { publicRequest } from "../axios";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await publicRequest.post("auth/login/", formData);

      const { token, user } = res.data;
      const { role } = user;

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify({ token, user }));

      // Dispatch login success
      dispatch(loginSuccess({ token, user }));

      // Show toast and navigate
      toast.success("Login successful!");

      // Navigate based on role
      if (role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (role === "OWNER") {
        navigate("/owner/dashboard");
      } else if (role === "USER") {
        navigate("/user/dashboard");
      } else {
        toast.warning("Unknown role. Redirecting to home.");
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-4xl flex flex-col md:flex-row h-auto md:h-[80vh]">
        {/* Left Side Image */}
        <div className="md:w-1/2 hidden md:block">
          <img
            src="/images/employer_login.jpeg"
            alt="Login Illustration"
            className="w-full h-full object-cover rounded-l-xl"
          />
        </div>

        {/* Right Side Form */}
        <div className="md:w-1/2 w-full p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 text-center text-red-600">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
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

            {/* Password Input */}
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
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
