// Login.js
import React, { useState } from 'react';
import {Link,useNavigate, useLocation, useOutletContext} from 'react-router-dom'
import background from '../../assets/Images/background.jpg';


const Login = ({setRole, role}) => {
  
  const { handleLoginToggle } = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Logic for login based on role
    if (role === 'admin') {
      console.log('Logging in as admin');
    } else {
      console.log('Logging in as member');
    }
  };

  const isMemberLogin = location.pathname === '/member/login';

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center"
    style={{ backgroundImage: `url(${background})` }}>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="flex mb-6">
          <Link
          to='/member/login'
            className={`flex-1 text-center py-2 text-lg font-semibold rounded-t-lg ${
              isMemberLogin ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-500'
            }`}
            onClick={() => setRole('member')}
          >
            MEMBER
          </Link>
          <Link
            to='/admin/login'
            className={`flex-1 text-center py-2 text-lg font-semibold rounded-t-lg ${
              !isMemberLogin ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-500'
            }`}
            onClick={() => setRole('admin')}
          >
            ADMIN
          </Link>
        </div>
        <form onSubmit={handleLogin}>
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
          <Link to={`/${role}/home`} >
          <button
            type="submit"
            onClick={handleLoginToggle}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
          </Link>
        </form>
        <div className="mt-4 text-center">
          {
            role === 'admin' ? (
              ""
            ) : (
              <Link to={`/member/signup`} className="text-blue-500 hover:underline">
                don't have an account? Sign Up
              </Link>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Login;
