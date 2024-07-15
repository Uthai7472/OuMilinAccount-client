import React from 'react'

const ExpenseRecord = () => {
  return (
    <div>
        <div className='flex justify-around items-start gap-2 px-1'>
            <div className='flex flex-col justify-center items-center'>
                <div className='text-[13px] font-bold pb-2'>
                    รายการ
                </div>
                <div >
                    <textarea name="" id="" className='rounded-lg w-full px-1'>

                    </textarea>
                </div>
            </div>

            <div className='flex flex-col justify-center items-center'>
                <div className='text-[13px] font-bold pb-2'>
                    หมวดหมู่
                </div>
                <div>
                    <select name="" id="" className='rounded-md w-full px-1'>
                        <option value="">อาหารที่ทำเอง</option>
                        <option value="">อู๋</option>
                        <option value="">มิลิน</option>
                    </select>
                </div>
            </div>

            <div className='flex flex-col justify-center items-center'>
                <div className='text-[13px] font-bold pb-2'>
                    ราคา
                </div>
                <div>
                    <input type="number" className='rounded-md w-full px-1' />
                </div>
            </div>
        </div>
    </div>
  )
}

export default ExpenseRecord