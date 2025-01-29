import { useEffect, useState } from "react";
import { getAllFiles } from "../../../services/Api";

export default function Files() {
  const [filesByPrincipal, setFilesByPrincipal] = useState({});

  const fetchFiles = async () => {
    try {
      const response = await getAllFiles();

      // Group files by `uploadedBy`
      const groupedData = response.reduce((acc, file) => {
        const principal = file.uploadedBy;
        if (!acc[principal]) {
          acc[principal] = [];
        }
        acc[principal].push(file);
        return acc;
      }, {});

      setFilesByPrincipal(groupedData);
    } catch (error) {
      console.error("Failed to fetch files:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
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

        {/* Display Files Grouped by Principals */}
        {Object.entries(filesByPrincipal).map(([principal, files]) => (
          <div key={principal} className="mb-6 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">{principal}</h2>

            {/* Grid layout for file cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {files.map((file) => {
                const fileUrl = `http://localhost:5000/${file.files[0]?.metadata.path}`;
                const fileType = file.files[0]?.fileType;

                return (
                  <div key={file._id} className="bg-gray-50 p-4 border border-gray-200 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-800">{file.description}</h3>
                    <p className="text-sm text-gray-600"><strong>Grade:</strong> {file.grade}</p>
                    <p className="text-sm text-gray-600"><strong>Subject:</strong> {file.subject}</p>
                    <p className="text-sm text-gray-600"><strong>Quarter:</strong> {file.quarter}</p>
                    <p className="text-sm text-gray-600"><strong>Filename:</strong> {file.files[0]?.filename}</p>
                    <p className="text-sm text-gray-600"><strong>Type:</strong> {fileType}</p>

                    {/* Preview Section */}
                    <div className="mt-3">
                      {fileType === "video" ? (
                        <video controls className="w-full h-40 rounded">
                          <source src={fileUrl} type={file.files[0]?.mimetype} />
                          Your browser does not support the video tag.
                        </video>
                      ) : fileType === "image" ? (
                        <img src={fileUrl} alt={file.files[0]?.filename} className="w-full h-40 object-cover rounded" />
                      ) : (
                        <a
                          href={fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block mt-2 text-blue-500 underline"
                        >
                          View File
                        </a>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="mt-4 flex space-x-2">
                      <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700 transition"
                      >
                        Preview
                      </a>
                      <a
                        href={fileUrl}
                        download
                        className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 transition"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
