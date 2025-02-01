import { Eye, EyeOff, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const {login,isLoginIn}=useAuthStore()
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);

    
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        className="my-12 w-[350px] px-6 py-8 bg-white rounded-md shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center flex-col mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your Chat Dashboard</p>
        </div>

        <div className="flex flex-col gap-4">
          {/* Email Input */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleFormData}
              className="border-2 px-4 py-2 rounded-md bg-gray-50 focus:bg-transparent text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your Email"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-700">
              Password
            </label>
            <div className="flex items-center border-2 rounded-md px-2">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleFormData}
                className="flex-grow bg-transparent px-2 py-2 text-gray-700 outline-none"
                placeholder="Enter your Password"
              />
              <button
                type="button"
                onClick={handleShowPassword}
                className="text-gray-500"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            {isLoginIn?<div className='flex flex-col justify-center items-center'> <Loader2 className='size-5 animate-spin'/></div>:"Login"}

          </button>

          {/* Link to Signup */}
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
