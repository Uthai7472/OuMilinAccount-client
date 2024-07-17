// import React from 'react'

// const NavSideBar = () => {
//   return (
//     <div className="h-screen flex flex-col md:flex-row">
//       {/* Sidebar for md and lg screens */}
//       <div className="hidden md:block md:w-1/4 lg:w-1/5 bg-gray-800 text-white">
//         <div className="p-4">Sidebar Content</div>
//       </div>

//       {/* Main content area */}
//       <div className="flex-1">
//         {/* Navbar for sm screens */}
//         <div className="block md:hidden bg-gray-800 text-white p-4">
//           Navbar Content
//         </div>
        
//         {/* Main content */}
//         <div className="p-4">
//           Main Content
//         </div>
//       </div>
//     </div>
//   )
// }

// export default NavSideBar

import React, { useState } from 'react'
import Menu from './Menu';
import { FaBars  } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const NavSideBar = () => {
    const navigate = useNavigate();
    const [isDropdown, setIsDropdown] = useState(false);
    const [isDropdownProfile, setIsDropdownProfile] = useState(false);

    const handleLogout = (e) => {
        e.preventDefault();

        navigate('/');
    }

    const handleDropdown = () => {
        setIsDropdown(!isDropdown);
        setIsDropdownProfile(false);
    }
    const handleDropdownProfile = () => {
        setIsDropdownProfile(!isDropdownProfile);
        setIsDropdown(false);
    }


  return (
    <div className=''>
        {/* Sidebar */}
        <div className='hidden md:flex flex-col w-[12rem] h-full bg-pink-600 text-white shadow-2xl'>
            {/* Sidebar Topic */}
             <div className='w-full h-auto flex justify-center items-start text-white text-xl font-bold py-3 px-3 border-white border-b-2
                hover:cursor-pointer
             ' onClick={handleDropdownProfile}>
                OuMilin บัญชีรายรับ-รายจ่าย
             </div>
             {isDropdownProfile ? (
                    <div className='w-full'>
                        <ul className='flex flex-col justify-center items-center w-full bg-pink-500 text-sm text-white font-bold            '>
                            <li className='w-full hover:cursor-pointer hover:bg-pink-400'>
                                <button className='w-full py-2' onClick={handleLogout}>ลงชื่อออก</button>
                            </li>
                        </ul>
                    </div>
                ) : null}
             {/* Sidebar Menu */}
             <div>
                <Menu />
             </div>

        </div>


        {/* ----------------------------------------------------- */}

        {/* Navbar */} 
        <div className='md:hidden flex justify-between w-full h-[100%] bg-pink-600 text-white'>
            {/* Navbar Topic */}
            <div className='w-full h-full flex items-center text-white text-xl font-bold py-3 px-3 hover:cursor-pointer' onClick={handleDropdownProfile}>
                OuMilin บัญชีรายรับ-รายจ่าย
            </div>
            <div className='flex items-center px-3'>
                {/* Menu icon dropdown */}
                <button onClick={handleDropdown}>
                    <FaBars size={24}/>
                </button>
            </div>
        </div>

        {/* Dropdown Profile */}
        {isDropdownProfile ? (
            <div className='w-full'>
                <ul className='flex flex-col justify-center items-center w-full bg-pink-500 text-md text-white font-bold            '>
                    <li className='w-full hover:cursor-pointer hover:bg-pink-400'>
                        <button className='w-full py-2' onClick={handleLogout}>ลงชื่อออก</button>
                    </li>
                </ul>
            </div>
        ) : null}

        {/* Dropdwn Menu */}
        {isDropdown ? (
            <div className={`md:hidden flex justify-center text-white bg-pink-500`} >
                <Menu />
            </div>
        ) : null}
    </div>
  )
}

export default NavSideBar