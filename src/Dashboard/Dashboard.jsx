import React, { useEffect, useState } from 'react'
import NavSideBar from '../components/NavSideBar'
import { FaDollarSign, FaMoneyBill, FaRegCalendarAlt } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register ChartJS components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Dashboard = ({ expenses, loading }) => {
    const [expenseThisMonth, setExpenseThisMonth] = useState(0);
    const [expenseAll, setExpenseAll] = useState(0);
    const [chartData, setChartData] = useState({
        labels: [],  // Categories
        datasets: [
            {
                label: '',
                data: [],  // Values
                backgroundColor: '',
                borderColor: '',
                borderWidth: 1
            }
        ]
    });
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // Default to current month
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to current year

    const handleMonthChange = (event) => {
        setSelectedMonth(parseInt(event.target.value));
        console.log(selectedMonth);
    };

    const handleYearChange = (event) => {
        setSelectedYear(parseInt(event.target.value));
    };

    useEffect(() => {

        const calculateExpenses = () => {
            const today = new Date();
            const currentMonth = today.getMonth(); // 0-indexed month
            const currentYear = today.getFullYear();

            // Filter expenses for the current month year for card
            const filteredExpenses = expenses.filter(expense => {
                const expenseDate = new Date(expense.date);
                return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
                
            });

            // Filter expenses for the current month year for chart
            const filteredExpensesChart = expenses.filter(expense => {
                const expenseDate = new Date(expense.date);
                return expenseDate.getMonth() === selectedMonth && expenseDate.getFullYear() === selectedYear;
                
            });

            // Calculate the total expense for this month year
            const totalThisMonth = filteredExpenses.reduce((total, expense) => total + parseFloat(expense.price), 0);

            // Calculate the total expense for all time
            const totalAll = expenses.reduce((total, expense) => total + parseFloat(expense.price), 0);

            setExpenseThisMonth(totalThisMonth);
            setExpenseAll(totalAll);

            // Calculate expenses by category for chart
            const categoryTotals = filteredExpensesChart.reduce((acc, expense) => {
                if (acc[expense.category]) {
                    acc[expense.category] += parseFloat(expense.price);
                } else {
                    acc[expense.category] = parseFloat(expense.price);
                }
                return acc;
            }, {});

            setChartData({
                labels: Object.keys(categoryTotals),
                datasets: [
                    {
                        label: 'Expenses by Category',
                        data: Object.values(categoryTotals),
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }
                ]
            });// Data is loaded
        };

        calculateExpenses();
    }, [expenses, selectedMonth, selectedYear]);

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

                {/* Show loading message if data is still being fetched */}
                {loading ? (
                    <div className='flex justify-center items-center py-10 text-white'>
                        กำลังโหลด...
                    </div>
                ) : (
                    <>
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
                                {/* Additional Content */}
                            </div>
                        </div>

                        {/* Chart Dashboard */}
                        {/* Filters */}
                        <div className='flex justify-center items-center gap-4 py-2'>
                            <select
                                value={selectedMonth}
                                onChange={handleMonthChange}
                                className='p-2 rounded-md'
                            >
                                {Array.from({ length: 12 }, (_, i) => (
                                    <option key={i} value={i}>
                                        {new Date(0, i).toLocaleString('default', { month: 'long' })}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={selectedYear}
                                onChange={handleYearChange}
                                className='p-2 rounded-md'
                            >
                                {Array.from({ length: 5 }, (_, i) => (
                                    <option key={i} value={2020 + i}>
                                        {2020 + i}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='flex justify-center my-3 mx-3'>
                            <div className='w-[95%] h-[22rem] bg-pink-300 flex justify-center items-center rounded-[1rem]'>
                                <Bar
                                    data={chartData}
                                    options={{
                                        responsive: true,
                                        plugins: {
                                            legend: {
                                                position: 'top',
                                            },
                                            title: {
                                                display: true,
                                                text: 'Expenses by Category',
                                            },
                                        },
                                        scales: {
                                            x: {
                                                beginAtZero: true,
                                            },
                                            y: {
                                                beginAtZero: true,
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
        
    </div>
  )
}

export default Dashboard