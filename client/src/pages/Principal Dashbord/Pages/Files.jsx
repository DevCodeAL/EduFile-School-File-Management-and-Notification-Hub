import { useEffect, useState } from "react";
import { FaFolder, FaFilePdf, FaFileWord, FaFileExcel, FaArrowLeft } from "react-icons/fa";
import { getAllFiles } from "../../../services/Api";


export default function UploadedFiles() {
  const [fileData, setFileData] = useState([]);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

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

  const transformToFolderStructure = (files) => {
    const structure = { name: "LRS", subfolders: {} };

    files.forEach((file) => {
      const { grade, subject, quarter, week, files: fileList } = file;
      if (!structure.subfolders[grade]) structure.subfolders[grade] = { name: grade, subfolders: {} };
      if (!structure.subfolders[grade].subfolders[subject])
        structure.subfolders[grade].subfolders[subject] = { name: subject, subfolders: {} };
      if (!structure.subfolders[grade].subfolders[subject].subfolders[quarter])
        structure.subfolders[grade].subfolders[subject].subfolders[quarter] = { name: quarter, subfolders: {} };
      if (!structure.subfolders[grade].subfolders[subject].subfolders[quarter].subfolders[week])
        structure.subfolders[grade].subfolders[subject].subfolders[quarter].subfolders[week] = { name:  week, files: [] };

      structure.subfolders[grade].subfolders[subject].subfolders[quarter].subfolders[week].files.push(
        ...fileList.map((f) => f.filename)
      );
    });

    return [structure];
  };

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

  const getFileIcon = (fileName) => {
    if (fileName.endsWith(".pdf")) return <FaFilePdf className="text-red-500 w-6 h-6" />;
    if (fileName.endsWith(".docx")) return <FaFileWord className="text-blue-500 w-6 h-6" />;
    if (fileName.endsWith(".xlsx")) return <FaFileExcel className="text-green-500 w-6 h-6" />;
    return null;
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
          {/* Show Root Folders when currentFolder is null */}
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

          {/* Show Subfolders and Files inside a folder */}
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
            <div key={index} className="flex flex-col items-center p-4 border rounded-lg bg-gray-100">
              {getFileIcon(file)}
              <p className="mt-2 text-center text-sm">{file}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
