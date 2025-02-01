export default function RegistrationSuccessModal({ isOpen, onClose }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed z-20 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-3">
            <svg className="w-12 h-12 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
  
          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-700">Welcome Aboard!</h2>
  
          {/* Message */}
          <p className="text-gray-600 mt-2">
            Your registration was successful! 🎉 <br />
            Please wait for your principal's approval before logging in.
          </p>
  
          {/* Button */}
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Okay, Got It!
          </button>
        </div>
      </div>
    );
  }
  