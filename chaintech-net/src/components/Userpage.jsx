import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdHomeFilled } from "react-icons/md";

const Userpage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);  // Store the user's ID
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: ''
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`https://assignment-e4rs.onrender.com/user/${username}`);
        
        if (!response.ok) throw new Error('Failed to fetch user details');
        
        const data = await response.json();
        console.log('Fetched data:', data); // Confirm data structure

        if (data) {
          setFormData({
            name: data.name || '',
            email: data.email || '',
            username: data.username || '',
            password: '' // Leave password empty for security
          });
        
          setUserId(data._id);  // Save the user ID for future operations
        } else {
          toast.error('User not found');
        }
      } catch (error) {
        console.error(error);
        toast.error('An error occurred while fetching user details.');
      }
    };

    fetchUserDetails();
  }, [username]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://assignment-e4rs.onrender.com/user/${userId}`, {  // Use userId for updating
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to update user details');

      toast.success('User details updated successfully');
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while updating user details.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        const response = await fetch(`https://assignment-e4rs.onrender.com/user/${userId}`, { method: 'DELETE' }); 
        if (!response.ok) throw new Error('Failed to delete account');

        toast.success('Account deleted successfully');
        setTimeout(() => navigate('/signup'), 2000);
      } catch (error) {
        console.error(error);
        toast.error('An error occurred while deleting account');
      }
    }
  };

  return (
    <div className='flex justify-center items-center text-center h-[100vh] bg-[#1b2533]'>
 <div className="flex flex-col items-center mt-10 shadow-xl h-[500px] w-[700px] bg-[#1f2937]">
      <Link to='/'>
        <MdHomeFilled className="text-2xl hover:text-blue-500 transition ease-in-out duration-200 cursor-pointer text-white mt-5" />
        </Link>
      <h1 className="text-2xl font-bold mb-5 text-white">Update Your Details</h1>
      <form onSubmit={handleUpdate} className="flex flex-col items-center w-[400px]">
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Enter your name"
          onChange={handleInputChange}
          className="border border-gray-700 px-4 py-2 mt-3 w-full rounded-lg text-center"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Enter your email"
          onChange={handleInputChange}
          className="border border-gray-700 px-4 py-2 mt-3 w-full rounded-lg text-center"
        />
        <input
          type="text"
          name="username"
          value={formData.username}
          placeholder="Enter your username"
          onChange={handleInputChange}
          className="border border-gray-700 px-4 py-2 mt-3 w-full rounded-lg text-center"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="Enter your password"
          onChange={handleInputChange}
          className="border border-gray-700 px-4 py-2 mt-3 w-full rounded-lg text-center"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-5 rounded-md w-full">
          Save Changes
        </button>
      </form>
      <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 mt-5 rounded-md w-[400px]">
        Delete Account
      </button>
      <ToastContainer />
    </div>
    </div>
   
  );
};

export default Userpage;
