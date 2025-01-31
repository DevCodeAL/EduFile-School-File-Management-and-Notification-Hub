import React from 'react';

const SuccessModal = ({ isOpen, onClose }) => {

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 shadow-lg transform transition-all">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-green-600">Success!</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-gray-600 mb-4">Your request has been successfully approved!</p>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition duration-300"
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
