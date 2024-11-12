import React from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate();
    const { handleLoginToggle } = useOutletContext();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h1 className="text-4xl font-bold text-red-500 mb-4">Error</h1>
            <p className="text-gray-700 mb-6">Oops! Something went wrong.</p>
            <button 
                onClick={()=>{
                    navigate('/')
                    handleLoginToggle()
                }} 
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
                Go to home Page
            </button>
        </div>
    </div>
  )
}

export default Error