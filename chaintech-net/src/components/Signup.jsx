import React, { useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdHomeFilled } from "react-icons/md";
const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://assignment-e4rs.onrender.com/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        localStorage.setItem('username', formData.username);
        toast.success('Sign-up successful');

        setTimeout(() => {
          navigate(`/user/${formData.username}`); // Dynamic navigation to Userpage
        }, 2000);
      } else {
        toast.error('Sign-up failed. Please try again');
      }
    } catch (error) {
      toast.error('Sign-up failed. Internal server error');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center align-middle h-[100vh] bg-[#1b2533]">
      <div className="flex flex-col justify-center items-center text-center shadow-xl rounded-xl mt-5 bg-[#1f2937]">
      <form onSubmit={handleSubmit} className="h-[500px] ">
        <div className="flex justify-center items-center mt-10 flex-col">
        <Link to='/'>
        <MdHomeFilled className="text-2xl hover:text-blue-500 transition ease-in-out duration-200 cursor-pointer text-white"/>
        </Link>
          <h1 className="text-xl font-bold text-white mt-2">New user? Sign up</h1>
          <div className="flex flex-col justify-center items-center   m-5 px-4 rounded-lg w-[600px] text-sm">
            <input type="text" name="name" value={formData.name} placeholder="Enter your name"
                   className="border border-gray-700 px-[70px] py-2 mt-2 m-3 rounded-lg text-center"
                   onChange={handleInputChange} />
            <input type="email" name="email" value={formData.email} placeholder="Enter your email"
                   className="border border-gray-700 px-[70px] py-2 m-3 rounded-lg text-center"
                   onChange={handleInputChange} />
            <input type="text" name="username" value={formData.username} placeholder="Enter your username"
                   className="border border-gray-700 px-[70px] py-2 m-3 rounded-lg text-center"
                   onChange={handleInputChange} />
            <div className="relative w-full">
              <input type={showPassword ? "text" : "password"} name="password" value={formData.password}
                     placeholder="Enter your password" className="border border-gray-700 px-[70px] py-2 m-3 rounded-lg text-center"
                     onChange={handleInputChange} />
              <button type="button" onClick={togglePasswordVisibility} className="absolute right-[150px] top-1/2 transform -translate-y-1/2 text-gray-600">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
           
              <button type="submit" className="bg-blue-500 text-white px-[100px] py-2 rounded-md mb-2 mt-2">Register</button>
              <NavLink to="/login">
                <p className="mt-2 ml-6 text-blue-500">Already have an account? Login</p>
              </NavLink>
            
          </div>
        </div>
      </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
