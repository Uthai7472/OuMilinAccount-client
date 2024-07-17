import React from 'react'

const ExpenseHistory = () => {
    const months = [
        'มกราคม',
        'กุมภาพันธ์',
        'มีนาคม',
        'เมษายน',
        'ดกดเกด',
        'กุมภาหกดเกหดเพันธ์',
        'หกดเหกดเหก',
        'หกดหก',
    ]
    const expenseDetails = [
        'ผัก',
        'ของเล่น',
        'มาม่า',
        'เก้าอี้',
        'ผัก',
        'โต้ะ',
    ];
    const expenseCategories = [
        'ou',
        'milin',
        'milin',
        'milin',
        'ou',
        'ou',
    ]
    const expensePrices = [
        '100',
        '100',
        '100',
        '100',
        '100',
        '100',
    ]
  return (
    <div>
        <div className='text-pink-700'>
            {/* Expense history topic */}
            <div className='flex justify-start items-center px-2 py-2 bg-pink-300 rounded-t-lg text-white
                font-bold
            '>
                ประวัติการใช้จ่าย
            </div>
            {/* Expense search month */}
            <div className='flex justify-start items-center px-2 gap-2'>
                <div >
                    รายจ่ายของเดือน
                </div>
                <div className='py-2 flex'>
                    <select name="" id="" className='rounded-md px-1 w-auto'>
                        {months.map((month, index) => (
                            <option key={index} value="">{month}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Expense History */}
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
                            <th className='w-1/3 px-2  flex justify-center'>รวม</th>
                            <th className='w-1/3 px-2  flex justify-center'></th>
                            <th className='w-1/3 px-2  flex justify-center'>10000</th>
                        </tr>
                    </thead>

                    <tbody className='w-full'>
                        {expenseDetails.map((detail, index) => (
                            <tr key={index} className='flex w-full justify-between border-pink-700 border-t-[0.5px]'>
                                <td className='w-1/3 px-2 flex justify-center'>{detail}</td>
                                <td className='w-1/3 px-2 flex justify-center'>{expenseCategories[index]}</td>
                                <td className='w-1/3 px-2 flex justify-center'>{expensePrices[index]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default ExpenseHistory