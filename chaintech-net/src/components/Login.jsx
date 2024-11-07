import React, { useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdHomeFilled } from "react-icons/md";
const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        localStorage.setItem('username', formData.username); // Store username
        toast.success('Login successful');
        setTimeout(() => {
          navigate(`/user/${formData.username}`);
        }, 2000);
      } else {
        toast.error('Login failed. Please try again');
      }
    } catch (error) {
      toast.error('Login failed. Internal server error');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center align-middle h-[100vh] bg-[#1b2533]">
      <div className=" h-[400px] w-[400px] flex flex-col justify-center items-center align-middle shadow-xl rounded-xl bg-[#1f2937] text-center">
      <form onSubmit={handleSubmit} className="h-[88.5vh] flex  ">
        
        <div className="flex justify-center items-center mt-10 flex-col">
        <Link to='/'>
        <MdHomeFilled className="text-2xl hover:text-blue-500 transition ease-in-out duration-200 cursor-pointer text-white"/>
        </Link>
       
          <h1 className="text-xl font-bold text-white">Login</h1>
          <div className="flex flex-col justify-center items-center m-5 px-4 rounded-lg w-[600px] text-sm">
            
            <input
              type="text"
              value={formData.username}
              name="username"
              placeholder="Enter your username"
              className="border border-gray-700 px-[50px] py-2 m-3 rounded-lg text-center"
              onChange={handleInputChange}
            />
            <div className="flex flex-row">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                name="password"
                placeholder="Enter your password"
                className="border border-gray-700 px-[50px] py-2 m-3 rounded-lg text-center  "
                onChange={handleInputChange}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className=" text-white  "
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
           
              <button type="submit" className="bg-blue-500 text-white px-[100px] py-2 rounded-md mb-2 mt-2  ">
                Submit
              </button>
              <NavLink to="/signup">
                <p className="mt-1 ml-2 text-blue-500">Don't have an account? Signup</p>
              </NavLink>
            
          </div>
        </div>
      </form>
      </div>
     
      <ToastContainer />
    </div>
  );
};

export default Login;
