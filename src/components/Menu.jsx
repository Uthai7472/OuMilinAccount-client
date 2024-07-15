import React from 'react'
import { Link } from 'react-router-dom';
import { FaChartLine, FaMoneyBillWave, FaMoneyCheckAlt } from 'react-icons/fa';
import { MdAttachMoney, MdMoneyOff, MdAccountBalanceWallet } from 'react-icons/md';

const Menu = () => {
    const menuItems = [
        {name: 'ภาพรวม', link: '/dashboard', logo:<FaChartLine size={20} />},
        {name: 'รายรับ', link: '/income', logo:<FaMoneyBillWave size={20} />},
        {name: 'รายจ่าย', link: '/expense', logo:<MdAttachMoney size={20} />},
    ]


  return (
    <div className='w-full'>
        <ul className='py-3 w-full '>
            {menuItems.map((item, index) => (
                <li key={index} className='flex hover:cursor-pointer hover:bg-pink-400 w-full'>
                    <Link className='flex md:justify-start justify-center gap-2 py-2 px-3 w-full' to={item.link}>{item.logo} {item.name}</Link>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Menu