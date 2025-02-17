import Markdown from 'react-markdown';

export default function EventsModal({ newItem, onClose }) {
  if (!newItem) return null;

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
          {newItem.title}
        </h2>
        <p className="text-gray-500 text-sm mb-4">
          📅 {newItem.date} | ⏰ {newItem.time}
        </p>
        <div className="text-gray-700 whitespace-pre-line">
        {newItem.files.map((file, index)=>
             (file.metadata.path) ? (
              <img
              key={index} 
              className={`rounded-lg object-cover w-1/3 inline-block mx-4 my-4`}
              src={`http://localhost:5000/${encodeURI(file?.metadata?.path.replace(/\\/g, "/"))}`}
              alt={`Image ${index + 1}`}
            />
             ): (
              <div key={index} className="w-full h-32 bg-gray-300 flex justify-center items-center rounded-lg">
                <span>No Image</span>
              </div>
            )
            )}
          <Markdown>
            {newItem.message}
            </Markdown>
        </div>
      </div>
    </div>
  );
}
