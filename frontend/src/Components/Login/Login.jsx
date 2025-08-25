// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation, useOutletContext } from "react-router-dom";
import API from "../Utils/axiosConfig";
import { UserRoleContext } from "../Utils/UserRoleContext.jsx";

import bgImage from "../../assets/Images/log in page background.png";
import sideArt from "../../assets/Images/log in page image.png";

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
      const response = await API.post("api/members/login", { email, password });

      const userData = JSON.stringify(response.data.user.username);
      const userRole = response.data.user.role;
      const userId = response.data.user.id;

      localStorage.setItem("memberData", userData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userRole", userRole);
      localStorage.setItem("userData", JSON.stringify(response.data));
      localStorage.setItem("userId", userId);

      setRole(userRole);
      handleLoginToggle();
      navigate(`/${userRole}/home`, { state: { userData: response.data.user } });
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Login failed");
    }
  };

  const isMemberLogin = location.pathname === "/member/login"; // kept

  return (
    <div className="overflow-y-hidden">


    <div
      className=" w-full relative overflow-y-hidden h-screen bg-cover bg-center flex flex-col"
      style={{
        backgroundImage: `url(${bgImage})`,

      }}
    >
      {/* MAIN CENTERED AREA */}
      <div className="flex-1 flex items-center justify-center px-4 py-10 md:py-16">
        <div className="w-full max-w-4xl  /* smaller than before */
                        backdrop-blur-xl bg-white/40 rounded-2xl shadow-2xl
                        grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10
                        p-6 md:p-10">
          {/* Illustration (left) */}
          <div className="hidden md:flex items-center justify-center">
            <img
              src={sideArt}
              alt="Login illustration"
              className="w-full max-w-md select-none pointer-events-none"
              draggable="false"
            />
          </div>

          {/* Form (right) */}
          <div className="flex flex-col justify-center">
            <h2 className="text-center text-lg md:text-xl font-medium text-gray-800 mb-6">
              Log in
            </h2>

            {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Email address</label>
                <input
                  type="email"
                  className="w-full rounded-xl border border-gray-300 bg-white/70 px-4 py-2
                             outline-none focus:ring-2 focus:ring-black/40"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  className="w-full rounded-xl border border-gray-300 bg-white/70 px-4 py-2
                             outline-none focus:ring-2 focus:ring-black/40"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full px-6 py-3 font-medium text-white
                           bg-gradient-to-b from-black to-black/80 hover:from-black hover:to-black
                           transition"
              >
                Log in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Login;
