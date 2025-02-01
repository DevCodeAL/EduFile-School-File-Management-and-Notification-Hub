
export default function PendingApprovalModal({ isOpen, onClose }) {
  if (isOpen) return null;

  return (
    <div className="fixed z-20 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        {/* Warning Icon (Pure Tailwind) */}
        <div className="flex justify-center">
          <div className="w-12 h-12 flex items-center justify-center bg-yellow-100 text-yellow-600 rounded-full">
            <span className="text-2xl font-bold">!</span>
          </div>
        </div>

        {/* Text Content */}
        <h2 className="text-lg font-semibold text-gray-800 text-center mt-3">
          Account Pending Approval
        </h2>
        <p className="text-sm text-gray-600 text-center mt-1">
          Your account is pending and requires approval from the principal before you can log in.
        </p>

        {/* OK Button */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
