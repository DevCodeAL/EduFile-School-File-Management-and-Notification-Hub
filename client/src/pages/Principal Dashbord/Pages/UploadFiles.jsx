import { useEffect, useState } from "react";
import { getAllFiles } from "../../../services/Api";

export default function UploadFiles() {
const [files, setFiles] = useState([]);

const fetchFiles = async ()=>{
    try {
      const response = await getAllFiles(files);
      setFiles(response);
      console.log(response);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
}

useEffect(()=>{
fetchFiles();
}, []);


    return (
      <>
        <div className="flex flex-col min-h-screen bg-gray-100">
          <main className="flex-1 p-6 ml-64">
          <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-700">Principal Dashboard</h1>
          <div className="flex flex-col items-center space-x-4">
            <div className="w-12 h-12 border border-indigo-600 rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="/image/Leomar .jpg"
                alt="User Profile"
              />
            </div>
            <div className="text-sm text-gray-500">{new Date().toLocaleDateString()}</div>
          </div>
        </header>

            {/* Videos Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-700 mb-4">Title Videos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Video Card */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      src="https://www.youtube.com/embed/example"
                      title="Video Example"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-700">Videos</h3>
                    <p className="text-sm text-gray-500">Uploaded on 01/20/2025</p>
                    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                      Download Video
                    </button>
                  </div>
                </div>
                {/* Additional Video Cards can go here */}
              </div>
            </section>
  
            {/* PDFs Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-700 mb-4">Files</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* PDF Card */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <div className="p-6 bg-gray-100 flex justify-center items-center">
                    <span className="text-6xl text-gray-400 material-icons">picture_as_pdf</span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-700">PDF Title</h3>
                    <p className="text-sm text-gray-500">Uploaded on 01/20/2025</p>
                    <a
                      href="/path-to-pdf.pdf"
                      download
                      className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 block text-center"
                    >
                      Download PDF
                    </a>
                  </div>
                </div>
                {/* Additional PDF Cards can go here */}
              </div>
            </section>
          </main>
        </div>
      </>
    );
  }
  