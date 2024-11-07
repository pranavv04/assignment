import React from 'react'
import {Link} from 'react-router-dom'
const Home = () => {
  return (
    <div className='flex flex-col justify-center items-center  bg-[#1b2533] h-[100vh] text-white'>
      <div className=' flex flex-col justify-center items-center align-middle h-[400px] w-[400px] rounded-xl shadow-lg bg-[#1f2937]'>
      <h1 className='text-3xl font-bold'>Welcome! </h1>
      <p className='text-wrap text-sm m-2'>Please login or register to access your account</p>
      
        <Link to='/login'> 
        <button className='text-sm bg-blue-500 text-white font-sm px-[80px] py-3 m-2 rounded-md'>Login</button>

        </Link>
        <Link to='/signup'>
        <button className='text-sm bg-gray-500 text-white font-sm px-[80px] py-3 m-2 rounded-md'>SignUp</button>
        
        </Link>
    
      </div>
    
    </div>
  )
}

export default Home
