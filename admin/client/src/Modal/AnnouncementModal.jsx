import Markdown from 'react-markdown';

export default function AnnouncementModal({ announcement, onClose }) {
  if (!announcement) return null;

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
          {announcement.title}
        </h2>
        <p className="text-gray-500 text-sm mb-4">
          📅 {announcement.date} | ⏰ {announcement.time}
        </p>
        <div className="text-gray-700 whitespace-pre-line">
        {announcement.files.map((file, index)=> {
            if(file?.fileType.startsWith('image')){
              return(
                file?.metadata.path && (
                  <img
              key={index} 
              className={`rounded-lg object-cover ${announcement.files.length === 1 ? 'max-w-lg h-auto' : ' mx-4 my-4 w-1/3 inline-block'}`}
              src={`http://localhost:5000/${encodeURI(file?.metadata?.path.replace(/\\/g, "/"))}`}
              alt={`Image ${index + 1}`}
            />
                )
              );
            } else if(file?.fileType.startsWith('video')){
              return (
                file?.metadata.path && (
                  <video
                      key={index}
                      className={`rounded-lg object-cover ${
                        announcement.files.length === 1 ? "w-1/2 h-auto" : "h-32 w-full"
                      }`}
                      controls
                      src={`http://localhost:5000/${encodeURI(file?.metadata?.path.replace(/\\/g, "/"))}`}
                      alt={`Video ${index + 1}`}
                    />
                )
              )
            } else {
              return (
                <div key={index} className="w-full h-32 bg-gray-300 flex justify-center items-center rounded-lg">
                <span>No Image</span>
              </div>
              )
            }
        })};
          <Markdown>
            {announcement.message}
            </Markdown>
        </div>
      </div>
    </div>
  );
}
