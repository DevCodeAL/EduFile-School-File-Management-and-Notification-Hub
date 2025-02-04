import { useEffect, useState } from "react";
import { FaFolder, FaFilePdf, FaFileWord, FaFileExcel, FaArrowLeft, FaFilePowerpoint } from "react-icons/fa";
import { getAllFiles } from "../../services/Api";
import { WebViewerModal } from "../../components/WebViewer";

export default function UploadedFiles() {
  const [fileData, setFileData] = useState([]);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [webOpen, setWebOpen] = useState(false);
  const [fileUrl, setFileUrl] = useState(""); // Added state to store file URL

  const transformToFolderStructure = (files) => {
    const structure = { name: "Learning Record Store (LRS)", subfolders: {} };
  
    files.forEach((file) => {
      const { grade, subject, quarter, week, files: fileList } = file;
      if (!structure.subfolders[grade]) structure.subfolders[grade] = { name: grade, subfolders: {} };

      if (!structure.subfolders[grade].subfolders[subject])
        structure.subfolders[grade].subfolders[subject] = { name: subject, subfolders: {} };

      if (!structure.subfolders[grade].subfolders[subject].subfolders[quarter])
        structure.subfolders[grade].subfolders[subject].subfolders[quarter] = { name: quarter, subfolders: {} };

      if (!structure.subfolders[grade].subfolders[subject].subfolders[quarter].subfolders[week])
        structure.subfolders[grade].subfolders[subject].subfolders[quarter].subfolders[week] = { name: week, files: [] };
  
      // Store full file objects instead of only filenames
      structure.subfolders[grade].subfolders[subject].subfolders[quarter].subfolders[week].files.push(...fileList);
    });
  
    return [structure];
  };
  

  useEffect(() => {
    const fetchAllFiles = async () => {
      try {
        const response = await getAllFiles();
        setFileData(transformToFolderStructure(response));
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchAllFiles();
  }, []);

  const navigateTo = (folder) => {
    setCurrentFolder(folder);
    setBreadcrumbs([...breadcrumbs, { name: folder.name, folder }]);
  };

  const goBack = () => {
    if (breadcrumbs.length > 0) {
      const updatedBreadcrumbs = breadcrumbs.slice(0, -1);
      setCurrentFolder(updatedBreadcrumbs.length > 0 ? updatedBreadcrumbs[updatedBreadcrumbs.length - 1].folder : null);
      setBreadcrumbs(updatedBreadcrumbs);
    }
  };

  const getFileIcon = (file) => {
  if (!file || typeof file !== "object") {
    console.warn("Invalid file object:", file);
    return <p className="text-gray-500">Invalid File</p>;
  }

  const fileUrl = file.metadata?.path ? `http://localhost:5000/${file.metadata.path}` : null;
  const fileType = file?.mimetype;
  const fileName = file?.filename || "Unknown File";

  if (fileName.endsWith(".pdf")) return <FaFilePdf className="text-red-500 w-6 h-6" />;
  if (fileName.endsWith(".docx") || fileName.endsWith(".doc")) return <FaFileWord className="text-blue-500 w-6 h-6" />;
  if (fileName.endsWith(".xls") || fileName.endsWith(".xlsx")) return <FaFileExcel className="text-green-500 w-6 h-6" />;
  if (fileName.endsWith(".pptx") || fileName.endsWith(".ppt")) return <FaFilePowerpoint className="text-red-500 w-6 h-6" />;

  if (fileType?.startsWith("video/") && fileUrl) {
    return (
      <video controls className="w-full h-40 rounded">
        <source src={fileUrl} type={fileType} />
        Your browser does not support the video tag.
      </video>
    );
  }

  return <p className="text-gray-500">Unsupported File Type</p>;
};

  

const handleOpenViewer = (file) => {
  if (file.metadata?.path) {
    const fileUrl = `http://localhost:5000/${file.metadata.path}`;
    setFileUrl(fileUrl);
    setWebOpen(true);
  } else {
    console.error("File URL not found.");
  }
};


  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-1 p-6 ml-64">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center mb-4">
          {breadcrumbs.length > 0 && (
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-blue-500 hover:underline"
            >
              <FaArrowLeft /> Back
            </button>
          )}
          <h2 className="text-lg font-semibold ml-4">
            {currentFolder ? currentFolder.name : "Root"}
          </h2>
        </div>

        {/* Breadcrumb Links */}
        <div className="flex space-x-2 mb-4 text-sm text-gray-500">
          <button className="hover:underline" onClick={() => {
            setCurrentFolder(null);
            setBreadcrumbs([]);
          }}>
            Root
          </button>
          {breadcrumbs.map((crumb, index) => (
            <span key={index} className="flex items-center">
              <span className="mx-1">/</span>
              <button
                className="hover:underline"
                onClick={() => {
                  setCurrentFolder(crumb.folder);
                  setBreadcrumbs(breadcrumbs.slice(0, index + 1));
                }}
              >
                {crumb.name}
              </button>
            </span>
          ))}
        </div>

        {/* Grid View */}
        <div className="grid grid-cols-3 gap-4">
          {!currentFolder &&
            fileData.map((folder, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-200"
                onClick={() => navigateTo(folder)}
              >
                <FaFolder className="text-yellow-500 w-12 h-12" />
                <p className="mt-2 text-center">{folder.name}</p>
              </div>
            ))}

          {currentFolder?.subfolders &&
            Object.values(currentFolder.subfolders).map((folder, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-200"
                onClick={() => navigateTo(folder)}
              >
                <FaFolder className="text-yellow-500 w-12 h-12" />
                <p className="mt-2 text-center">{folder.name}</p>
              </div>
            ))}

            {currentFolder?.files?.map((file, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 border rounded-lg bg-gray-100 cursor-pointer hover:bg-gray-200"
                onClick={() => handleOpenViewer(file)}
              >
                {getFileIcon(file)}
                <p className="mt-2 text-center text-sm">
                  {file?.filename || "Filename Missing"}
                </p>
              </div>
            ))}

        </div>
      </main>

      {/* Web Viewer Modal */}
      {webOpen && fileUrl && (
          <WebViewerModal
            fileUrl={fileUrl}
            FileName={fileUrl.split('/').pop()} // Extract filename from URL
            WebViewerOpen={webOpen}
            WebViewerClose={() => setWebOpen(false)}
          />
        )}
    </div>
  );
}
