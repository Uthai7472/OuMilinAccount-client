import React, { useState } from 'react'
import NavSideBar from '../components/NavSideBar'
import ExpenseRecord from '../components/ExpenseRecord'
import { FaPlus } from 'react-icons/fa';
import ExpenseHistory from '../components/ExpenseHistory';

const Expense = () => {
    const [records, setRecords] = useState([{}]);

    const addRecord = () => {
        setRecords([...records, {}])
    }

  return (
    <div>
        <div className='flex md:flex-row flex-col min-h-screen'>
            <NavSideBar />

            {/* Expense Content */}
            <div className='flex flex-1 flex-col justify-start items-center px-2 bg-pink-300'>
                {/* Topic */}
                <div className='flex justify-start items-start text-xl font-bold py-2 text-pink-600'>
                    รายจ่าย
                </div>

                {/* Record expense content */}
                <div className='block w-full h-auto bg-pink-200 text-pink-600 border-white border-2 rounded-[10px] pb-2'>
                    {/* Record topic */}
                    <div className='font-bold bg-pink-400 text-white rounded-t-[10px] px-2 py-1'>
                        บันทึกรายจ่าย
                    </div>
                    {/* Date input */}
                    <div className='flex gap-2 px-2 py-2'>
                        <span>วัน/เดือน/ปี</span>
                        <span>
                            <input type="date" className='px-2 rounded-md' />
                        </span>
                    </div>
                    {/* Detail record component */}
                    <div className='block'>
                        {records.map((record, index) => (
                            <ExpenseRecord key={index} />
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
                        '>บันทึกรายจ่าย</button>
                    </div>

                </div>

                {/* Expense History */}
                <div className='w-full h-auto mx-2 my-3 bg-pink-200 border-white border-2 rounded-lg'>
                    <ExpenseHistory />
                </div>
            </div>
            
            
        </div>
        
    </div>
  )
}

export default Expense