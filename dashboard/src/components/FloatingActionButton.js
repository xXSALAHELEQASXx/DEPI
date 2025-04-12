import React from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const FloatingActionButton = () => {
  const navigate = useNavigate(); // React Router hook for navigation

  const handleClick = () => {
    navigate('../pages/ChatbotPage.js'); // Replace '/chatbot' with the route to your Chatbot page
  };

  return (
    <button
      className="fixed bottom-8 right-8 bg-purple-500 hover:bg-yellow-600 text-white rounded-full p-4 shadow-lg focus:outline-none"
      style={{ width: '56px', height: '56px' }}
      onClick={handleClick} // Add click handler
    >
      <FaStar size={24} />
    </button>
  );
};

export default FloatingActionButton;
