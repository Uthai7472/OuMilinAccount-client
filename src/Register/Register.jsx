import React from 'react'
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className='bg-[#FFE5EC] w-full min-h-screen flex justify-center items-center'>
        {/* Login Main */}
        <div className='bg-[#FF8FAB77] w-[22rem] h-[22.5rem] rounded-[2rem] flex flex-col'>
            {/* Login Topic */}
            <div className='text-2xl font-bold text-[#FB6F92] flex justify-center items-center
                mt-5
            '>
                <span>OuMilin Account|</span>
                <span className='text-white'>Register </span>
            </div>
            {/* Login Input */}
            <div className='flex flex-col justify-center w-[90%] mt-3 pl-10'>
                <p className='font-bold mb-2 text-[#FB6F92]'>Username</p>
                <input type="text" placeholder='username' 
                    className='p-1 rounded-md text-[#fb6f92] bg-[#ffe5ec] mb-4' 
                />
                <p className='font-bold mb-2 text-[#FB6F92]'>Password</p>
                <input type="password" placeholder='password' 
                    className='p-1 rounded-md text-[#fb6f92] bg-[#ffe5ec] mb-4'
                />
            </div>

            {/* Register */}
            <div className='flex justify-center items-center text-white hover:text-[#FB6F92]'>
                <Link to={'/'}>You have account?</Link>
            </div>
            {/* Login Button */}
            <div className='flex justify-center items-center mt-6'>
                <button className='w-[60%] h-10 bg-[#FB6F92] text-xl font-bold text-white rounded-lg hover:bg-[#FB6F9266]'>Login</button>
            </div>
        </div>
    </div>
  )
}

export default Register