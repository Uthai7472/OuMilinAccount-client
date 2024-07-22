import React, { useEffect, useState } from 'react'
import NavSideBar from '../components/NavSideBar'
import moment from 'moment-timezone';
import ExpenseRecord from '../components/ExpenseRecord'
import { FaPlus } from 'react-icons/fa';
import ExpenseHistory from '../components/ExpenseHistory';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Expense = ({ expenses }) => {
    const [records, setRecords] = useState([{ detail: '', category: 'สำคัญ', price: '' }]);
    const [date, setDate] = useState('');

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const addRecord = () => {
        setRecords([...records, { detail: '', category: 'สำคัญ', price: '' }])
    }

    // Set default date
    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        setDate(formattedDate);
    }, []);

    const handleChange = (index, field, value) => {
        const newRecords = [...records];
        newRecords[index] = { ...newRecords[index], [field]: value};
        setRecords(newRecords);
    }

    const handleRecord = async () => {
        console.log('Records: ', records);

        // Filter out incomplete records
        const filteredRecords = records.filter(record => record.detail !== '' && record.category !== '' && record.price !== '')

        const expenses = filteredRecords.map(record => ({
            date: date,
            detail: record.detail,
            category: record.category,
            price: record.price
        }));

        console.log('Expenses: ', expenses);

        try {
            const response = await axios.post('https://oumilin-account-server.onrender.com/api/expense/record', { expenses }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(response.data.message);
            window.location.reload();

        } catch (error) {
            console.error('Error saving records:', error);
        }
    }

  return (
    <div>
        <div className='flex md:flex-row flex-col min-h-screen'>
            <NavSideBar />

            {/* Expense Content */}
            <div className='flex flex-1 flex-col justify-start items-center px-2 bg-pink-300'>
                {/* Topic */}
                <div className='flex justify-start items-start text-xl font-bold py-2 text-pink-600 mt-[2.5rem] md:mt-0'>
                    รายจ่าย
                </div>

                {/* Record expense content */}
                <div className='block w-full h-auto bg-pink-200 text-pink-600 border-white border-2 rounded-[10px] pb-2'>
                    {/* Record topic */}
                    <div className='flex justify-center font-bold bg-pink-700 text-white rounded-t-[10px] px-2 py-2'>
                        บันทึกรายจ่าย
                    </div>
                    {/* Date input */}
                    <div className='flex gap-2 px-2 py-2'>
                        <span>วัน/เดือน/ปี</span>
                        <span>
                            <input type="date" className='px-2 rounded-md shadow-md shadow-pink-700'
                                value={date} onChange={(e) => setDate(e.target.value)}/>
                        </span>
                    </div>
                    {/* Detail record component */}
                    <div className='block'>
                        {records.map((record, index) => (
                            <ExpenseRecord 
                                key={index}
                                index={index}
                                record={record}
                                handleChange={handleChange}
                            />
                        ))}
                    </div>

                    {/* Add Detail button */}
                    <div className='flex justify-end items-center px-2 my-2'>
                        <button className='bg-white flex justify-center items-center w-6 h-6 rounded-md' onClick={addRecord}>
                            <FaPlus size={16}/>
                        </button>
                    </div>
                    
                    {/* Record button */}
                    <div className='w-full flex justify-center items-center'>
                        <button className='bg-pink-600 text-pink-200 w-full mx-2 py-2 rounded-lg hover:bg-pink-300
                            hover:text-pink-700
                        '
                            onClick={handleRecord}
                        >บันทึกรายจ่าย</button>
                    </div>

                </div>

                {/* Expense History */}

                <div className='w-full h-auto mx-2 my-3 bg-pink-200 border-white border-2 rounded-lg'>
                    <ExpenseHistory expenses={expenses} />
                </div>
            </div>
            
            
        </div>
        
    </div>
  )
}

export default Expense