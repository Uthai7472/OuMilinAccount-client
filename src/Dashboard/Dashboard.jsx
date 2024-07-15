import React from 'react'
import NavSideBar from '../components/NavSideBar'

const Dashboard = () => {
  return (
    <div>
        <div className='flex flex-col md:flex-row min-h-screen'>
            <NavSideBar />
            <div className='flex-1 p-4'>
                Main content
            </div>
        </div>
        
    </div>
  )
}

export default Dashboard