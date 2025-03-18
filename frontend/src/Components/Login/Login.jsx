import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation, useOutletContext } from "react-router-dom";
import API from "../Utils/axiosConfig";
import background from "../../assets/Images/background.jpg";
import { UserRoleContext } from "../Utils/UserRoleContext.jsx";

const Login = () => {
  const { handleLoginToggle } = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { setRole } = useContext(UserRoleContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("api/members/login", {
        email,
        password,
      });
      console.log("Login Successful:", response.data.user);

      const userData = JSON.stringify(response.data.user.username);
      const userRole = response.data.user.role;
      console.log("Role", userRole);

      localStorage.setItem("memberData", userData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userRole", userRole);
      localStorage.setItem('userData', JSON.stringify(response.data));

      setRole(userRole); // Update the role in context

      handleLoginToggle();

      navigate(`/${userRole}/home`, { state: { userData: response.data.user } });
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Login failed");
    }
  };

  const isMemberLogin = location.pathname === "/member/login";

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
