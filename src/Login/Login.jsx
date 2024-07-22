import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        console.log(`username: ${username} password: ${password}`);

        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', {username, password});
            console.log(response.data.message);
            
            // Check if the response is successful and contains the token
            if (response.status === 200) {
                const { token } = response.data;
                console.log(response.data.message);
                console.log(response.data.token);

                localStorage.setItem('token', token); // Store token in localStorage

                console.log('Login successful');
                navigate('/dashboard');
            } else {
                console.log(response.data.message);
                setError(response.data.message);
                setShowAlert(true);

                // Hide the alert after 3 seconds
                setTimeout(() => {
                    setShowAlert(false);
                }, 3000);
            }

        } catch (error) {
            setError('Invalid username or password');

            setShowAlert(true);

            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        }

        
    }

  return (
    <div className='bg-[#FFE5EC] w-full min-h-screen flex justify-center items-center'>
        {/* Login Main */}
        <div className='bg-[#FF8FAB77] w-[22rem] h-[22.5rem] rounded-[2rem] flex flex-col'>
            {/* Login Topic */}
            <div className='text-2xl font-bold text-[#FB6F92] flex justify-center items-center
                mt-5
            '>
                <span>OuMilin Account|</span>
                <span className='text-white'>Login</span>
            </div>
            {/* Login Input */}
            <form onSubmit={handleLogin}>
                <div className='flex flex-col justify-center w-[90%] mt-3 pl-10'>
                    <p className='font-bold mb-2 text-[#FB6F92]'>Username</p>
                    <input type="text" placeholder='username' 
                        className='p-1 rounded-md text-[#fb6f92] bg-[#ffe5ec] mb-4'
                        onChange={(e) => setUsername(e.target.value) } 
                    />
                    <p className='font-bold mb-2 text-[#FB6F92]'>Password</p>
                    <input type="password" placeholder='password' 
                        className='p-1 rounded-md text-[#fb6f92] bg-[#ffe5ec] mb-4'
                        onChange={(e) => setPassword(e.target.value) }
                    />
                </div>
                {/* Remember */}
                <div className='flex gap-1 pl-10'>
                    <input type="checkbox" className='bg-[#FB6F92]' /> 
                    <p className='text-[#FB6F92]'>Remember me</p>
                </div>
                {/* Register */}
                <div className='flex justify-center items-center text-white hover:text-[#FB6F92]'>
                    <Link to={'/register'}>Are you register?</Link>
                </div>
                {/* Login Button */}
                <div className='flex justify-center items-center mt-6'>
                    <button className='w-[60%] h-10 bg-[#FB6F92] text-xl font-bold text-white rounded-lg hover:bg-[#FB6F9266]'
                    >
                        Login
                    </button>
                    
                </div>
            </form>
            {showAlert && (
                    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-3 rounded">
                        {error}
                    </div>
            )}
        </div>
    </div>
  )
}

export default Login