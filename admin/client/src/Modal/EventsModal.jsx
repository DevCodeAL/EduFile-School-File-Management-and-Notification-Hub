

export default function EventsModal({ newsItem, onClose }) {
    if (!newsItem) return null;
  
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg  max-w-5xl relative overflow-y-auto "
          style={{maxHeight: '560px'}}
        >
         <button
    onClick={onClose}
    className="fixed top-4 right-4 w-10 h-10 bg-white text-gray-700 hover:bg-red-500 hover:text-white 
    rounded-full flex items-center justify-center shadow-lg transition duration-300"
  >
    ✕
  </button>
  
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {newsItem.title}
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            📅 {newsItem.date} | ⏰ {newsItem.time}
          </p>
          <div className="text-gray-700 whitespace-pre-line">
            <Markdown>{newsItem.message}</Markdown>
          </div>
        </div>
      </div>
    );
  }
  