import React from 'react';

const RejectModal = ({ isOpen, onClose, rejectItem, teacherId }) => {
  if (!isOpen) return null;

  const userReject = async () => {
    if (!teacherId) return;
    try {
      const result = await rejectItem(teacherId);
      console.log("User rejected successfully:", result);
      onClose(); // Close the modal after rejecting
    } catch (error) {
      console.error("Error rejecting user:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-xl transform transition-all">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-red-600">Confirm Rejection</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-gray-700 mt-4">Are you sure you want to reject this teacher?</p>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-300"
          >
            Cancel
          </button>
          <button
            onClick={userReject}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectModal;
