import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useRegisterMutation } from '../store/states/authApi';

const RegisterPage = () => {
  const navigate = useNavigate(); 
  const [register] = useRegisterMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const user = await register({ username: email, password }).unwrap();
      console.log('User registered', user);
      navigate('/Login');
    } catch (error) {
      console.error('Failed to register', error);
    }
  };

  return (
    <div className="flex flex-col justify-between items-center min-h-screen">
      <div className="flex flex-col justify-center items-center w-full mt-24">
        <div className="w-80 p-8 border-2 border-gray-500 rounded-lg shadow-lg mb-8">
          <h1 className="text-3xl font-bold mb-4">Register</h1>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 mb-4 border border-gray-500 rounded"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 mb-4 border border-gray-500 rounded"
          />
          <button 
            onClick={handleRegister} 
            className="w-full bg-blue-500 hover:bg-blue-700 active:bg-blue-900 text-white font-bold py-2 px-4 rounded transition-all duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            Register
          </button>
        </div>
      </div>
      <footer className="text-gray-600 text-sm w-full py-4 bg-gray-200 text-center fixed bottom-0">
        &copy; 2024 MyWebsite. All rights reserved.
      </footer>
    </div>
  );
};

export default RegisterPage;
