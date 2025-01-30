import { useEffect, useState } from "react";
import { getAllFiles } from "../../services/Api";
import { WebViewerModal } from "../../components/WebViewer";
import Header from "../../components/Header";
import ProfileModal from "../../components/Profile";

export default function FileLibrary() {
  const [isOpen, setOpen] = useState(false);
  const [filesBySchool, setFilesBySchool] = useState({});
  const [webOpen, setWebOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchFiles = async () => {
    try {
      const response = await getAllFiles();
      const groupedData = response.reduce((acc, file) => {
        const { uploadedBy, grade, subject, quarter } = file;
        if (!acc[uploadedBy]) acc[uploadedBy] = {};
        if (!acc[uploadedBy][grade]) acc[uploadedBy][grade] = {};
        if (!acc[uploadedBy][grade][subject]) acc[uploadedBy][grade][subject] = {};
        if (!acc[uploadedBy][grade][subject][quarter]) acc[uploadedBy][grade][subject][quarter] = [];
        acc[uploadedBy][grade][subject][quarter].push(file);
        return acc;
      }, {});
      setFilesBySchool(groupedData);
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
        <div className="flex justify-between items-center mb-6 px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-700">Teacher Dashboard</h1>
          <Header setOpen={() => setOpen(true)} />
        </div>

        {isOpen && <ProfileModal setClose={() => setOpen(false)} />}

        {/* Folders Structure */}
        <div className="space-y-6">
          {Object.entries(filesBySchool).map(([school, grades]) => (
            <div key={school} className="bg-white p-4 shadow rounded-lg">
              <details className="group">
                <summary className="cursor-pointer text-lg font-bold text-indigo-700 flex items-center">
                  🗂 {school}
                </summary>
                <div className="ml-6 mt-2">
                  {Object.entries(grades).map(([grade, subjects]) => (
                    <details key={grade} className="group">
                      <summary className="cursor-pointer text-md font-semibold text-blue-600 flex items-center">
                        📂 {grade}
                      </summary>
                      <div className="ml-6 mt-2">
                        {Object.entries(subjects).map(([subject, quarters]) => (
                          <details key={subject} className="group">
                            <summary className="cursor-pointer text-md font-medium text-green-600 flex items-center">
                              📁 {subject}
                            </summary>
                            <div className="ml-6 mt-2">
                              {Object.entries(quarters).map(([quarter, files]) => (
                                <details key={quarter} className="group">
                                  <summary className="cursor-pointer text-md text-gray-700 flex items-center">
                                    📑 {quarter}
                                  </summary>
                                  <div className="ml-6 mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {files.map((file) => {
                                      const fileUrl = `http://localhost:5000/${file.files[0]?.metadata.path}`;
                                      const fileType = file.files[0]?.fileType;
                                      return (
                                        <div key={file._id} className="bg-gray-50 p-4 border border-gray-200 rounded-lg shadow-md">
                                          <div className="mt-3">
                                            {fileType === "video" ? (
                                              <video controls className="w-full h-40 rounded">
                                                <source src={fileUrl} type={file.files[0]?.mimetype} />
                                                Your browser does not support the video tag.
                                              </video>
                                            ) : fileType === "image" ? (
                                              <img src={fileUrl} alt={file.files[0]?.filename} className="w-full h-40 object-cover rounded" />
                                            ) : (
                                              fileType === "docx" || fileType === "doc" ? 
                                              (<img src="/png/docx.png" alt="DOC & DOCX" className="w-20 mx-auto" />)
                                              : fileType === "pdf" ? 
                                              (<img src="/png/pdf.png" alt="PDF" className="w-20 mx-auto" />)
                                              : fileType === "ppt" || fileType === "pptx" ? 
                                              (<img src="/png/Microsoft-PowerPoint.png" alt="PPT & PPTX" className="w-20 mx-auto" />)
                                              : fileType === "xlsx" || fileType === "xls" ? 
                                              (<img src="/png/excel.png" alt="EXCEL" className="w-20 mx-auto" />)
                                              : null
                                            )}
                                          </div>

                                          <div>
                                            <p className="text-sm text-gray-600"><strong>Description: </strong>{file.description}</p>
                                            <p className="text-sm text-gray-600"><strong>Filename:</strong> {file.files[0]?.filename}</p>
                                            <p className="text-sm text-gray-600"><strong>Type:</strong> {fileType}</p>
                                          </div>

                                          <div className="mt-4 flex space-x-2">
                                            {fileType !== "video" && fileType !== "image" && (
                                              <button
                                                onClick={() => {
                                                  setSelectedFile({ url: fileUrl, name: file.description });
                                                  setWebOpen(true);
                                                }}
                                                className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700 transition"
                                              >
                                                Preview
                                              </button>
                                            )}
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
                                </details>
                              ))}
                            </div>
                          </details>
                        ))}
                      </div>
                    </details>
                  ))}
                </div>
              </details>
            </div>
          ))}
        </div>
      </main>

      {/* Web Viewer Modal */}
      {webOpen && selectedFile && (
        <WebViewerModal
          fileUrl={selectedFile.url}
          FileName={selectedFile.name}
          WebViewerOpen={webOpen}
          WebViewerClose={() => setWebOpen(false)}
        />
      )}
    </div>
  );
}
