import React, { useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      navigate("/map"); // redirect after login
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 w-full">
      <div className="bg-white p-12 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-8">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-8">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
          <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold">Login</button>
        </form>
        <p className="text-gray-600 text-center mt-6">
          Don't have an account? <a href="/signup" className="text-blue-500 font-bold hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
