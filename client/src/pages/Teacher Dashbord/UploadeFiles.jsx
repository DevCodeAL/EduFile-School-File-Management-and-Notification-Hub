import { useEffect, useState } from "react";
import { getAllFiles } from "../../services/Api";
import { WebViewerModal } from "../../components/WebViewer";
import Header from "../../components/Header";
import ProfileModal from "../../components/Profile";
import NestedDropdown from "../../components/NestedDropDown";

export default function UploadedFiles() {
  const [isOpen, setOpen] = useState(false);
  const [filesByPrincipal, setFilesByPrincipal] = useState({});
  const [webOpen, setWebOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedQuarter, setSelectedQuarter] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(""); 

  const fetchFiles = async () => {
    try {
      const response = await getAllFiles();
      const groupedData = response.reduce((acc, file) => {
        const principal = file.uploadedBy;
        if (!acc[principal]) acc[principal] = [];
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



  // **Updated Filter Logic**
  const filteredFiles = Object.entries(filesByPrincipal).reduce((acc, [principal, files]) => {
    const filtered = files.filter(({ uploadedBy, grade, quarter, subject }) =>
      (!selectedSchool || uploadedBy === selectedSchool) && // Match 'uploadedBy' instead of 'school'
      (!selectedGrade || grade === selectedGrade) &&
      (!selectedQuarter || quarter.trim().toLowerCase() === selectedQuarter.trim().toLowerCase()) && // Normalize case & trim
      (!selectedSubject || subject === selectedSubject)
    );
  
    if (filtered.length > 0) acc[principal] = filtered;
    return acc;
  }, {});
  
  
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
    <main className="flex-1 p-6 ml-64">
      <div className="flex justify-between items-center mb-6 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-700">Teachers Dashboard</h1>
        <Header setOpen={() => setOpen(true)} />
      </div>
  
      {/* Filters */}
      <div className="p-2">
        <NestedDropdown
          selectedSchool={selectedSchool}
          setSelectedSchool={setSelectedSchool}
          selectedGrade={selectedGrade}
          setSelectedGrade={setSelectedGrade}
          selectedQuarter={selectedQuarter}
          setSelectedQuarter={setSelectedQuarter}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
        />
      </div>
  
      {isOpen && <ProfileModal setClose={() => setOpen(false)} />}
  
      {/* Grouped File Display */}
      {Object.entries(filteredFiles).map(([school, files]) => (
        <div key={school} className="mb-8 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">{school}</h2>
  
          {/* Group by Grade */}
          {Object.entries(
            files.reduce((acc, file) => {
              acc[file.grade] = acc[file.grade] || [];
              acc[file.grade].push(file);
              return acc;
            }, {})
          ).map(([grade, gradeFiles]) => (
            <div key={grade} className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{grade}</h3>
  
              {/* Group by Subject */}
              {Object.entries(
                gradeFiles.reduce((acc, file) => {
                  acc[file.subject] = acc[file.subject] || [];
                  acc[file.subject].push(file);
                  return acc;
                }, {})
              ).map(([subject, subjectFiles]) => (
                <div key={subject} className="mb-4">
                  <h4 className="text-lg font-medium text-gray-700">{subject}</h4>
  
                  {/* Group by Quarter */}
                  {Object.entries(
                    subjectFiles.reduce((acc, file) => {
                      acc[file.quarter] = acc[file.quarter] || [];
                      acc[file.quarter].push(file);
                      return acc;
                    }, {})
                  ).map(([quarter, quarterFiles]) => (
                    <div key={quarter} className="mb-4">
                      <h5 className="text-md font-medium text-gray-600">{quarter}</h5>
  
                      {/* Group by File Type */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
                        {quarterFiles.map((file) => {
                          const fileUrl = `http://localhost:5000/${file.files[0]?.metadata.path}`;
                          const fileType = file.files[0]?.fileType;
  
                          return (
                            <div key={file._id} className="bg-gray-50 p-4 border border-gray-200 rounded-lg shadow-md">
                              {/* File Type Display */}
                              <div className="flex justify-center mb-3">
                                {fileType === "video" ? (
                                  <video controls className="w-full h-40 rounded">
                                    <source src={fileUrl} type={file.files[0]?.mimetype} />
                                    Your browser does not support the video tag.
                                  </video>
                                ) : fileType === "image" ? (
                                  <img src={fileUrl} alt={file.files[0]?.filename} className="w-full h-40 object-cover rounded" />
                                ) : (
                                  fileType === "docx" || fileType === "doc" ? 
                                  (<img src="/png/docx.png" alt="DOC & DOCX" className="w-30 h-20 mx-auto" />)
                                  : fileType === "pdf" ? 
                                  (<img src="/png/pdf.png" alt="PDF" className="w-20 mx-auto" />)
                                  : fileType === "ppt" || fileType === "pptx" ? 
                                  (<img src="/png/Microsoft-PowerPoint.png" alt="PPT & PPTX" className="w-20 mx-auto" />)
                                  : fileType === "xlsx" || fileType === "xls" ? 
                                  (<img src="/png/excel.png" alt="EXCEL" className="w-20 mx-auto" />)
                                  : null
                                )}
                              </div>
  
                              {/* File Info */}
                              <div>
                                <p className="text-sm text-gray-600"><strong>Description:</strong> {file.description}</p>
                                <p className="text-sm text-gray-600"><strong>Filename:</strong> {file.files[0]?.filename}</p>
                                <p className="text-sm text-gray-600"><strong>Type:</strong> {fileType}</p>
                              </div>
  
                              {/* Action Buttons */}
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
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
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
