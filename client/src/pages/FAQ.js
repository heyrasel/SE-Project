import React from 'react';

function FAQ() {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-4 text-indigo-700">Frequently Asked Questions</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-indigo-600 mb-2">How do I book a pet service?</h2>
        <p className="text-gray-700">Simply register, log in, and navigate to the Bookings page to schedule a service for your pet.</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-indigo-600 mb-2">Is MovePet free to use?</h2>
        <p className="text-gray-700">Yes! MovePet is free for pet owners. Some services may have associated costs, which will be clearly listed.</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-indigo-600 mb-2">How do I become a caretaker or vet?</h2>
        <p className="text-gray-700">Register as a caretaker or vet during sign-up, or update your profile later to offer your services.</p>
      </div>
    </div>
  );
}

export default FAQ;
