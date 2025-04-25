import React from 'react';

function Contact() {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-4 text-indigo-700">Contact Us</h1>
      <p className="text-gray-700 mb-4">We'd love to hear from you! For questions, feedback, or support, reach out to us:</p>
      <ul className="list-disc pl-6 text-gray-600">
        <li>Email: <a href="mailto:support@movepet.com" className="text-indigo-500 underline">support@movepet.com</a></li>
        <li>Phone: <a href="0155555555" className="text-indigo-500 underline">0155555555</a></li>
      </ul>
    </div>
  );
}

export default Contact;
