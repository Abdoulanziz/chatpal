import React, { useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import toast from "react-hot-toast";
import { Link } from "react-router-dom"
import { MessageSquare, MailIcon, User, LockKeyhole, Loader2 } from "lucide-react";
import AuthImagePattern from "../components/AuthImagePattern";

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { isSigningUp,signup } = useAuthStore();
  console.log(isSigningUp)
  // Debugging the state
  console.log(formData);

  // Form validation logic
  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Full Name should not be empty.");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email should not be empty.");
      return false;
    }
    if (!formData.password.trim()) {
      toast.error("Password should not be empty.");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be atleast 6 character.");
      return false;
    }
    return true;
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = validateForm();
    if(valid===true) signup(formData)
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center">
      {/* Toaster for notifications */}
    


      {/* Header */}
      <div className="flex flex-col items-center px-[3rem] gap-3">
        <div className="w-[3rem] h-[3rem] rounded-md bg-slate-500 flex items-center justify-center">
          <MessageSquare />
        </div>
        <h1 className="text-white text-xl font-bold">Create Account</h1>
        <p className="text-gray-400">Get started with your free account</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 my-6 px-6 py-4 w-[22rem]">
        {/* Full Name Input */}
        <label htmlFor="fullName" className="text-gray-400">
          Full Name
        </label>
        <div className="flex items-center gap-2 p-2 border-2 border-gray-600 rounded-md">
          <User className="text-gray-400" />
          <input
            id="fullName"
            name="fullName"
            className="w-full border-none bg-transparent focus:outline-none text-white"
            type="text"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={handleInputChange}
          />
        </div>

        {/* Email Input */}
        <label htmlFor="email" className="text-gray-400">
          Email
        </label>
        <div className="flex items-center gap-2 p-2 border-2 border-gray-600 rounded-md">
          <MailIcon className="text-gray-400" />
          <input
            id="email"
            name="email"
            className="w-full border-none bg-transparent focus:outline-none text-white"
            type="email"
            placeholder="john@gmail.com"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        {/* Password Input */}
        <label htmlFor="password" className="text-gray-400">
          Password
        </label>
        <div className="flex items-center gap-2 p-2 border-2 border-gray-600 rounded-md">
          <LockKeyhole className="text-gray-400" />
          <input
            id="password"
            name="password"
            className="w-full border-none bg-transparent focus:outline-none text-white"
            type={showPassword ? "text" : "password"}
            placeholder="***********"
            value={formData.password}
            onChange={handleInputChange}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-gray-400"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 inline-flex items-center justify-center cursor-pointer hover:bg-blue-600 text-white py-2 px-4 rounded-md font-medium"
          disabled={isSigningUp}
        >
          {isSigningUp ? (<>
            <Loader2 className="size-5 animate-spin" /></>) : "Create Account"}
        </button>
      </form>

      <div>

        <p className=" text-white">
          Already have an account?{" "}
          <Link to="/login" className="link link-primary">
            Sign in
          </Link>
        </p>
      </div>

      <AuthImagePattern title="Join Our Community" subtitle="Connect with friends,share moments and stay in touch with your loved ones" />
    </div>
  );
}

export default SignUpPage;
