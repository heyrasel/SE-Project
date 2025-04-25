import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5002/api/users/login', { email, password });
      localStorage.setItem('token', data.token);
      window.location.href = '/pets';
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-blue-100 to-indigo-200 items-center justify-center">
      {/* Left Side - Welcome & Features */}
      <div className="hidden md:flex flex-col justify-center items-start p-10 w-1/2">
        <h1 className="text-4xl font-bold text-indigo-700 mb-4">🐾 MovePet</h1>
        <p className="text-xl text-gray-700 mb-6">Connecting you with trusted pet caretakers — anywhere, anytime.</p>
        <ul className="text-gray-600 space-y-2">
          <li>✅ Book walking, feeding, or vet support!</li>
          <li>✅ Track your pet in real-time!</li>
          <li>✅ Join a community of pet lovers!</li>
        </ul>
        <blockquote className="mt-8 italic text-sm text-gray-500">
          “MovePet makes it so easy to find someone I can trust with my dog while I’m at work!” – Happy Pet Parent 🐶
        </blockquote>
      </div>

      {/* Right Side - Login Form */}
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md m-8">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Welcome Back!</h2>
        <p className="text-center text-gray-600 mb-6">Login to continue your journey with MovePet</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-600 transition"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">Don't have an account? <a href="/register" className="text-indigo-500 font-medium hover:underline">Register</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
