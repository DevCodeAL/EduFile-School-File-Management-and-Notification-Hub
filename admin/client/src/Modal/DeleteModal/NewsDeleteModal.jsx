

export default function NewsDeleteModal({ isOpen, onClose, onConfirm, newItem }) {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
        <div 
          className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center relative transform transition-all scale-95 hover:scale-100"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
          >
            ✕
          </button>
  
          {/* Modal Content */}
          <h2 className="text-lg font-semibold text-gray-800">Are you sure?</h2>
          <p className="text-gray-600 mt-2">You are about to delete this events. This action cannot be undone.</p>
  
          {/* Buttons */}
          <div className="mt-5 flex justify-center gap-4">
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button 
                onClick={()=> {
                    onConfirm(newItem);
                    onClose(); 
                }}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
  