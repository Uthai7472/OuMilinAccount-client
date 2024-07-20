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

const ExpenseHistory = () => {
    const token = localStorage.getItem('token');
    const [expenses, setExpenses] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [filteredExpenses, setFilteredExpenses] = useState([]);

    const months = [
        '', 'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
        'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];

    useEffect(() => {
        axios.get('https://oumilin-account-server.onrender.com/api/expense/show', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            setExpenses(response.data.expenses);
        })
        .catch(error => {
            console.error('Error fetching expenses:', error);
        });
    }, [token]);

    useEffect(() => {
        let filtered = expenses;
        if (selectedMonth !== '') {
            filtered = expenses.filter(expense => {
                const expenseDate = new Date(expense.date);
                return expenseDate.getMonth() + 1 === parseInt(selectedMonth);
            });
        }
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        setFilteredExpenses(filtered);
    }, [selectedMonth, expenses]);

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

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
            <div className='text-pink-700'>
                <div className='flex justify-start items-center px-2 py-2 bg-pink-300 rounded-t-lg text-white font-bold'>
                    ประวัติการใช้จ่าย
                </div>
                <div className='flex justify-start items-center px-2 gap-2'>
                    <div>
                        รายจ่ายของเดือน
                    </div>
                    <div className='py-2 flex'>
                        <select
                            name="month"
                            id="month"
                            className='rounded-md px-1 w-auto'
                            value={selectedMonth}
                            onChange={handleMonthChange}
                        >
                            {months.map((month, index) => (
                                <option key={index} value={index}>{month}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className='w-full px-2 py-2'>
                    <table className='w-full'>
                        <thead className='w-full'>
                            <tr className='flex w-full justify-around'>
                                <th>รายการ</th>
                                <th>หมวดหมู่</th>
                                <th>ราคา</th>
                            </tr>
                        </thead>
                        <thead className='w-full'>
                            <tr className='flex w-full justify-around'>
                                <th className='w-1/3 px-2 flex justify-center'>รวม</th>
                                <th className='w-1/3 px-2 flex justify-center'></th>
                                <th className='w-1/3 px-2 flex justify-center'>{totalPrice}</th>
                            </tr>
                        </thead>
                        <tbody className='w-full'>
                            {Object.keys(groupedExpenses).map((date, index) => (
                                <React.Fragment key={index}>
                                    <tr className='flex'>
                                        <td className='w-full flex justify-center items-center text-white font-bold bg-pink-400'>{convertToThaiDate(date)}</td>
                                    </tr>
                                    {groupedExpenses[date].map((expense, idx) => (
                                        <tr key={idx} className='flex w-full justify-between border-pink-700 border-t-[0.5px]'>
                                            <td className='w-1/3 px-2 flex justify-center'>{expense.detail}</td>
                                            <td className='w-1/3 px-2 flex justify-center'>{expense.category}</td>
                                            <td className='w-1/3 px-2 flex justify-center'>{expense.price}</td>
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
