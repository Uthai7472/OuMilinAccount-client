import React, { useEffect, useState } from 'react'
import NavSideBar from '../components/NavSideBar'
import { FaDollarSign, FaMoneyBill, FaRegCalendarAlt } from 'react-icons/fa';

const Dashboard = ({ expenses }) => {
    const [expenseThisMonth, setExpenseThisMonth] = useState(0);
    const [expenseAll, setExpenseAll] = useState(0);

    useEffect(() => {
        const calculateExpenses = () => {
            const today = new Date();
            const currentMonth = today.getMonth(); // 0-indexed month
            const currentYear = today.getFullYear();

            // Filter expenses for the current month year
            const filteredExpenses = expenses.filter(expense => {
                const expenseDate = new Date(expense.date);
                return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
                
            });

            // Calculate the total expense for this month year
            const totalThisMonth = filteredExpenses.reduce((total, expense) => total + parseFloat(expense.price), 0);

            // Calculate the total expense for all time
            const totalAll = expenses.reduce((total, expense) => total + parseFloat(expense.price), 0);

            setExpenseThisMonth(totalThisMonth);
            setExpenseAll(totalAll);
        };

        calculateExpenses();
    }, [expenses]);

  return (
    <div>
        <div className='flex flex-col md:flex-row min-h-screen'>
            <NavSideBar />

            {/* Main Dashboard Content */}
            <div className='flex-1 justify-center items-center text-xl md:text-2xl font-bold bg-pink-300'>
                {/* Topic Dashboard */}
                <div className='flex justify-center items-center py-3 text-white'>
                    ภาพรวม ของ มิลิน
                </div>

                {/* Card Dashboard */}
                <div className='md:flex-row md:justify-evenly flex flex-col justify-center items-center'>
                    <div className='md:w-1/3 w-2/3 h-[7rem] mx-3 my-3 bg-pink-500 rounded-2xl'>
                        <div className='text-md text-white flex justify-center items-center py-2 bg-pink-700 rounded-t-2xl'>
                            รายจ่ายเดือนนี้ 
                        </div>
                        <div className='text-2xl text-white flex justify-center items-center py-2 gap-4'>
                            <FaRegCalendarAlt size={40} className='text-black' />{expenseThisMonth} บาท
                        </div>
                    </div>
                    <div className='md:w-1/3 w-2/3 h-[7rem] mx-3 my-3 bg-pink-500 rounded-2xl'>
                        <div className='text-md text-white flex justify-center items-center py-2 bg-pink-700 rounded-t-2xl'>
                            รายจ่ายทั้งหมด 
                        </div>
                        <div className='text-2xl text-white flex justify-center items-center py-2 gap-4'>
                            <FaMoneyBill size={45} className='text-black' />{expenseAll} บาท
                        </div>
                    </div>
                    <div className='md:w-1/3 w-2/3 h-[7rem] mx-3 my-3 bg-pink-500 rounded-2xl'>

                    </div>
                </div>

                {/* Chart Dashboard */}
                <div className='flex justify-center my-3 mx-3'>
                    <div className='block w-[95%] h-[22rem] bg-pink-400'>

                    </div>
                </div>

            </div>
        </div>
        
    </div>
  )
}

export default Dashboard