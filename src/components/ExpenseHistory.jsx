import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavSideBar from '../components/NavSideBar';
import moment from 'moment-timezone';

const convertToThaiDate = (dateString) => {
    const thaiMonths = [
        'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
        'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];

    const date = moment.utc(dateString).tz('Asia/Bangkok').toDate();
    const day = date.getDate();
    const month = date.getUTCMonth();
    const year = date.getUTCFullYear() + 543;

    return `${day} ${thaiMonths[month]} ${year}`;
}

const ExpenseHistory = ({ expenses }) => {
    const token = localStorage.getItem('token');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [filteredExpenses, setFilteredExpenses] = useState([]);

    const months = [
        '', 'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
        'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];

    const categories = [
        '', 'สำคัญ', 'ทำกินเอง', 'กินนอกบ้าน', 'ดีต่อใจ', 'กินเล่น',
        'ซื้อของเข้าบ้าน', 'ใส่ใจ', 'รถ', 'น้ำดื่ม', 'สุขภาพ', 'อู๋', 'มิลืน', 'อื่นๆ'
    ]

    useEffect(() => {
        if (Array.isArray(expenses)) {
            let filtered = expenses;

            if (selectedMonth !== '') {
                filtered = filtered.filter(expense => {
                    const expenseDate = new Date(expense.date);
                    return expenseDate.getMonth() + 1 === parseInt(selectedMonth);
                });
            }

            if (selectedCategory !== '') {
                filtered = filtered .filter(expense => expense.category === selectedCategory);
            }

            filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
            setFilteredExpenses(filtered);
        } else {
            console.error('Expenses data is not an array:', expenses);
        }
    }, [selectedMonth, selectedCategory, expenses]);

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    }

    const groupedExpenses = filteredExpenses.reduce((acc, expense) => {
        const date = expense.date.split('T')[0];
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push({
            detail: expense.detail,
            category: expense.category,
            price: expense.price
        });
        return acc;
    }, {});

    // Calculate total price
    const totalPrice = filteredExpenses.reduce((total, expense) => total + parseFloat(expense.price), 0);

    return (
        <div>
            <div className='text-pink-700 shadow-lg'>
                <div className='flex justify-start items-center px-2 py-2 bg-pink-400 rounded-t-lg text-white font-bold'>
                    ประวัติการใช้จ่าย
                </div>
                <div className='flex justify-start items-center px-2 gap-2 bg-pink-300 mx-1 my-1 rounded-md shadow-xl'>
                    <div>
                        รายจ่ายของเดือน
                    </div>
                    {/* Filter month */}
                    <div className='py-2 flex'>
                        <select
                            name="month"
                            id="month"
                            className='rounded-md px-1 w-auto shadow-md shadow-pink-700'
                            value={selectedMonth}
                            onChange={handleMonthChange}
                        >
                            {months.map((month, index) => (
                                <option key={index} value={index === 0 ? '' : index}>{month}</option>
                            ))}
                        </select>
                    </div>
                    {/* Filter category */}
                    <div className='py-2 flex'>
                        <div className='px-2'>
                            หมวดหมู่
                        </div>
                        <select
                            name="category"
                            id="category"
                            className='rounded-md px-1 w-auto shadow-md shadow-pink-700'
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            {categories.map((category, index) => (
                                <option key={index} value={category === '' ? '' : category}>{category}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className='w-full px-2 py-2'>
                    <table className='w-full'>
                        <thead className='w-full border-white border-y-2'>
                            <tr className='flex w-full justify-around'>
                                <th>รายการ</th>
                                <th>ราคา</th>
                                <th>หมวดหมู่</th>
                            </tr>
                        </thead>
                        <thead className='w-full'>
                            <tr className='flex w-full justify-around'>
                                <th className='w-1/3 px-2 flex justify-center'>รวม</th>
                                <th className='w-1/3 px-2 flex justify-center'>{totalPrice}</th>
                                <th className='w-1/3 px-2 flex justify-center'></th>
                            </tr>
                        </thead>
                        <tbody className='w-full'>
                            {Object.keys(groupedExpenses).map((date, index) => (
                                <React.Fragment key={index}>
                                    <tr className='flex'>
                                        <td className='w-full flex justify-center items-center font-bold bg-pink-300'>{convertToThaiDate(date)}</td>
                                    </tr>
                                    {groupedExpenses[date].map((expense, idx) => (
                                        <tr key={idx} className='flex w-full justify-between border-pink-700 border-t-[0.5px]'>
                                            <td className='w-1/3 px-2 flex justify-center'>{expense.detail}</td>
                                            <td className='w-1/3 px-2 flex justify-center'>{expense.price}</td>
                                            <td className='w-1/3 px-2 flex justify-center'>{expense.category}</td>
                                            
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ExpenseHistory;
