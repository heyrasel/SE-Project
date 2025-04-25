import React from 'react';

function About() {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-4 text-indigo-700">About MovePet</h1>
      <p className="text-gray-700 mb-4">MovePet is a platform dedicated to connecting pet owners, caretakers, veterinarians, and pet store owners. Our mission is to make pet care accessible, trustworthy, and joyful for everyone.</p>
      <ul className="list-disc pl-6 text-gray-600">
        <li>Find trusted pet caretakers and vets</li>
        <li>Book services and manage your pets easily</li>
        <li>Join a caring community of animal lovers</li>
      </ul>
    </div>
  );
}

export default About;
