// Signup.js
import React, { useState } from 'react';
import {Link, useLocation, useOutletContext} from 'react-router-dom';
import background from '../../assets/Images/background.jpg';

const Signup = () => {
const location = useLocation();
const role = location.state?.role || 'member';

const { handleLoginToggle } = useOutletContext();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    // Logic for signup based on role
    if (role === 'admin') {
      console.log('Signing up as admin');
    } else {
      console.log('Signing up as member');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center"
    style={{ backgroundImage: `url(${background})` }}>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">{role === 'admin' ? 'Admin' : 'Member'} Signup</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Link to={`/member/home`}>
          <button
            type="submit"
            onClick={handleLoginToggle}
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-200"
          >
            Sign Up
          </button>
          </Link>
        </form>
        <div className="mt-4 text-center">
          <Link to="/member/login" className="text-blue-500 hover:underline">
            Already have an account? Log in here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
