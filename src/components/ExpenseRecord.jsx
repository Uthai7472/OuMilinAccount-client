import React from 'react'

const ExpenseRecord = ({ index, record, handleChange }) => {
    const categoryOption = [
        'สำคัญ',
        'ทำกินเอง',
        'กินนอกบ้าน',
        'ดีต่อใจ',
        'กินเล่น',
        'ซื้อของเข้าบ้าน',
        'ใส่ใจ',
        'รถ',
        'น้ำดื่ม',
        'สุขภาพ',
        'อู๋',
        'มิลืน',
        'อื่นๆ',
    ]

  return (
    <div>
        <div className='flex justify-around items-start gap-2 px-1'>
            <div className='flex flex-col justify-center items-center'>
                <div className='text-[13px] font-bold pb-2'>
                    รายการ
                </div>
                <div >
                    <textarea name="" id="" className='rounded-lg w-full px-1' required
                        onChange={(e) => handleChange(index, 'detail', e.target.value)}
                        value={record.detail}
                    >

                    </textarea>
                </div>
            </div>

            <div className='flex flex-col justify-center items-center'>
                <div className='text-[13px] font-bold pb-2'>
                    หมวดหมู่
                </div>
                <div>
                    <select name="category" id="category" className='rounded-md w-full px-1'
                        onChange={(e) => handleChange(index, 'category', e.target.value)}
                        value={record.category}
                    >
                        {categoryOption.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div> 
            </div>

            <div className='flex flex-col justify-center items-center'>
                <div className='text-[13px] font-bold pb-2'>
                    ราคา
                </div>
                <div>
                    <input type="number" className='rounded-md w-full px-1' required
                        onChange={(e) => handleChange(index, 'price', e.target.value)}
                        value={record.price}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default ExpenseRecord