import React from 'react'
import NavSideBar from '../components/NavSideBar'

const Dashboard = () => {
  return (
    <div>
        <div className='flex flex-col md:flex-row min-h-screen'>
            <NavSideBar />

            {/* Main Dashboard Content */}
            <div className='flex-1 justify-center items-center text-xl md:text-2xl font-bold bg-pink-300'>
                {/* Topic Dashboard */}
                <div className='flex justify-center items-center py-3 text-white'>
                    User Dashboard
                </div>

                {/* Card Dashboard */}
                <div className='md:flex-row md:justify-evenly flex flex-col justify-center items-center'>
                    <div className='md:w-1/3 w-2/3 h-[7rem] mx-3 my-3 bg-pink-500 rounded-2xl'>

                    </div>
                    <div className='md:w-1/3 w-2/3 h-[7rem] mx-3 my-3 bg-pink-500 rounded-2xl'>

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