import { useEffect, useState } from "react";
import { FaFolder, FaFilePdf, FaFileWord, FaFileExcel, FaArrowLeft, FaFilePowerpoint } from "react-icons/fa";
import { getAllFiles } from "../../services/Api";
import { WebViewerModal } from "../../components/WebViewer";
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function UploadedFiles() {
  const [fileData, setFileData] = useState([]);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [webOpen, setWebOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenVideo, setIsOpenVideo] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // Store the clicked image URL
  const [selectedVideo, setIsSelectedVideo] = useState(null);


    // Handle Download
    const handleDownload = (file) => {
      if (!file || !file.metadata?.path) {
        console.error("Invalid file for download.");
        return;
      }
    
      const fileUrl = `${VITE_API_BASE_URL}/${file.metadata.path}`;
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = file.filename || "downloaded_file"; // Set default filename if missing
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

  const transformToFolderStructure = (files) => {
    const structure = { name: "Learning Record Store (LRS)", subfolders: {} };

    files.forEach((file) => {
        const { grade, subject, quarter, week, files: fileList } = file;

        if (!structure.subfolders[grade]) 
            structure.subfolders[grade] = { name: grade, subfolders: {} };

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

  const fileUrl = file.metadata?.path ? `${VITE_API_BASE_URL}/${file.metadata.path}` : null;
  const fileType = file?.mimetype;
  const fileName = file?.filename || "Unknown File";

  if (fileName.endsWith(".pdf")) return <FaFilePdf className="text-red-500 w-6 h-6" />;
  if (fileName.endsWith(".docx") || fileName.endsWith(".doc")) return <FaFileWord className="text-blue-500 w-6 h-6" />;
  if (fileName.endsWith(".xls") || fileName.endsWith(".xlsx")) return <FaFileExcel className="text-green-500 w-6 h-6" />;
  if (fileName.endsWith(".pptx") || fileName.endsWith(".ppt")) return <FaFilePowerpoint className="text-red-500 w-6 h-6" />;

  if (fileType?.startsWith("video/") && fileUrl) {
    return (
      <div>
         <div
          onClick={() => { 
            setIsOpenVideo(true)
            setIsSelectedVideo(fileUrl);
          }}
         className="cursor-pointer w-full h-40 rounded overflow-hidden">
          <video controls className="w-full h-40 rounded">
            <source src={fileUrl} type={fileType} />
            Your browser does not support the video tag.
          </video>
      </div>

      {isOpenVideo && (
          <div 
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50">
            <div className="relative rounded-lg shadow-lg max-w-2xl">
              {/* Close Button */}
              <button
                className="absolute z-10 top-2 right-2 p-2 bg-gray-200 rounded-full text-gray-700 hover:bg-red-500 hover:text-white transition-all duration-300 shadow-md"
                onClick={() => setIsOpenVideo(false)}
                aria-label="Close"
              >
                ✕
              </button>
              {/* Full Video */}
              <video controls className="w-full h-auto rounded-lg">
                <source src={selectedVideo} type={fileType} />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        )}
      </div>
    );
  }


    // Image files (✅ Fixed return statement)
    if (fileType?.startsWith("image/") && fileUrl) {
      return (
        <div>
        {/* Clickable Image */}
        <div
          className="cursor-pointer w-full h-40 rounded overflow-hidden"
          onClick={() => { 
            setIsOpen(true)
            setSelectedImage(fileUrl);
          }}
        >
          <img
            src={fileUrl}
            alt="Image"
            className="w-full h-full object-cover"
          />
        </div>

          {/* Modal Image Viewer */}
          {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50">
            <div className="relative rounded-lg shadow-lg max-w-2xl">
              {/* Close Button */}
              <button
                className="absolute top-2 right-2 p-2 bg-gray-200 rounded-full text-gray-700 hover:bg-red-500 hover:text-white transition-all duration-300 shadow-md"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
              {/* Full Image */}
              <img
                src={selectedImage}
                alt="Full Size"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
      )
    }
  
    return <p className="text-gray-500">Unsupported File Type</p>;
};


// Web viewer modal
const handleOpenViewer = (file) => {
  const fileUrl = `${VITE_API_BASE_URL}/${file.metadata?.path}`;
  const fileType = file?.mimetype;

  if (!file.metadata?.path) {
    console.error("File URL not found.");
    return;
  }

  if (fileType.startsWith("video")) {
    console.log("Video files cannot be opened in viewer.");
    return; // Prevent modal from opening for videos
  }

  if (fileType.startsWith("image")) {
    console.log("Image files cannot be opened in viewer.");
    return; // Prevent modal from opening for image
  }

  setFileUrl(fileUrl);
  setWebOpen(true);
};

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-1 p-6 ml-64">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">📁  File Management</h1>
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
                <FaFolder className="text-yellow-400 w-12 h-12" />
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
                <FaFolder className="text-yellow-400 w-12 h-12" />
                <p className="mt-2 text-center">{folder.name}</p>
              </div>
            ))}

          {currentFolder?.files?.toReversed().map((file, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 border rounded-lg bg-white shadow-md hover:bg-gray-100 transition-all duration-300"
                onClick={() => handleOpenViewer(file)}
              >
                {/* File Icon / Preview */}
                {getFileIcon(file)}

                {/* File Details */}
                <div className="mt-2 text-center w-full px-3">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {file?.filename || "Filename Missing"}
                  </p>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                    {file?.description || "No Description Available"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    📅 {new Date(file?.uploadDate).toLocaleString() || "Unknown Time"}
                  </p>
                </div>
                <button
                  onClick={() => handleDownload(file)}
                  className="relative mt-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm"
                >
                  ⬇️ Download
                </button>
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
