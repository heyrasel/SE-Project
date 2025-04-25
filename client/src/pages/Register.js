import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('owner');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5002/api/users/register', { name, email, password, role });
      setSuccess('Registration successful! Redirecting to login...');
      setError('');

      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      setSuccess('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-blue-100 to-indigo-200 items-center justify-center">
      {/* Left Section */}
      <div className="hidden md:flex flex-col justify-center items-start p-10 w-1/2">
        <h1 className="text-4xl font-bold text-indigo-700 mb-4">🐾 MovePet</h1>
        <p className="text-xl text-gray-700 mb-6">Join the community that puts pets first.</p>
        <ul className="text-gray-600 space-y-2">
          <li>✅ Sign up as a pet owner, caretaker, vet, or store owner</li>
          <li>✅ Offer or request pet care services anytime</li>
          <li>✅ Build trust and connect with other animal lovers</li>
        </ul>
        <blockquote className="mt-8 italic text-sm text-gray-500">
          “Since joining MovePet, I’ve found the perfect caretaker for my cat — and even made some new friends!” – New User 🐱
        </blockquote>
      </div>

      {/* Right Section - Form */}
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md m-8">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Create Your Account</h2>
        <p className="text-center text-gray-600 mb-6">Sign up to get started with MovePet and explore the world of pet care.</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
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
            placeholder="Create Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="owner">Pet Owner</option>
            <option value="caretaker">Caretaker</option>
            <option value="vet">Veterinarian</option>
            <option value="store_owner">Pet Store Owner</option>
          </select>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-600 transition"
          >
            Sign Up
          </button>
        </form>

        {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
        {success && <p className="text-green-500 text-sm mt-4 text-center">{success}</p>}

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">Already have an account? <a href="/login" className="text-indigo-500 font-medium hover:underline">Login</a></p>
        </div>
      </div>
    </div>
  );
}

export default Register;
