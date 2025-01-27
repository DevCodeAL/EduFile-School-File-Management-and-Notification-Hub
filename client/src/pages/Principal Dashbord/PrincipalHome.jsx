import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import ProfileModal from "../../components/Profile";
import UploadLoading from "../../Success/UploadLoading";

const PrincipalDashboard = () => {
  const [isGradesOpen, setGradesOpen] = useState(false);
  const [isSubjectsOpen, setSubjectsOpen] = useState(false);
  const [isQuartersOpen, setQuartersOpen] = useState(false);

  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedQuarter, setSelectedQuarter] = useState("");


  const [isLoading, setLoading] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [isFormOpen, setFormOpen] = useState(false); // State for form modal
  const [formData, setFormData] = useState({ 
    description: "", 
    uploadedBy: "", 
    file: null,
    grade: selectedGrade,
    subject: selectedSubject,
     quarter: selectedQuarter,
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      grade: selectedGrade,
      subject: selectedSubject,
      quarter: selectedQuarter,
    }));
  }, [selectedGrade, selectedSubject, selectedQuarter]);

  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((prev) => ({ ...prev, file }));
  };
  
  
  
// File submission
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    // setLoading(true);

    const data = new FormData();
    data.append("description", formData.description);
    data.append("uploadedBy", formData.uploadedBy);
    data.append("file", formData.file);
    data.append("grade", formData.grade);
    data.append("subject", formData.subject);
    data.append("quarter", formData.quarter);

    try {
      const response = await fetch("http://localhost:5000/api/stats", {
        method: "POST",
        body: data,
      });

      setTimeout(()=>{
        setFormOpen(false);
      setLoading(false);
      }, 1000);

      if (!response.ok) throw new Error("File upload failed");
      // setTimeout(()=>{
      //     setLoading(false);
      //     setIsClose(closeEvent);
      // }, 2000);
    } catch (error) {
      alert(error.message);
    }
};



  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 p-6 ml-64">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-700">Principal Dashboard</h1>
        <Header setOpen={() => setOpen(true)} />

        {isOpen && <ProfileModal setClose={() => setOpen(!true)} />}

      {/* Upload Loading */}
       {isLoading && (
           <UploadLoading/>
       )}

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-gray-500 text-sm">Total Teachers</h2>
            <p className="text-2xl font-bold text-blue-500">123</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-gray-500 text-sm">Pending Applications</h2>
            <p className="text-2xl font-bold text-orange-500">5</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-gray-500 text-sm">Files Uploaded</h2>
            <p className="text-2xl font-bold text-green-500">47</p>
          </div>
        </section>

       {/* Upload Files Section */}
        <section
          id="upload"
          className="flex flex-col items-center justify-center border-dashed border-2 border-gray-300 mt-8 bg-white shadow-lg rounded-lg p-6 "
        >
          <h2 className="text-lg font-bold text-gray-700 mb-4">Upload Files</h2>
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-lg font-semibold"
            onClick={() => setFormOpen(true)}
          >
            Add New File
          </button>
        </section>


        {/* Form Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
              <h2 className="text-xl font-bold text-gray-700 mb-4">Add New File</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Description */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-3 py-2 text-gray-700"
                    rows="3"
                    required
                  ></textarea>
                </div>

                {/* Uploaded By */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Uploaded By
                  </label>
                  <input
                    type="text"
                    name="uploadedBy"
                    value={formData.uploadedBy}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-3 py-2 text-gray-700"
                    placeholder="Enter uploader name"
                    required
                  />
                </div>

                
      <div className="inline-block text-left">
        <button
          id="multiLevelDropdownButton"
          onClick={() => setGradesOpen(!isGradesOpen)}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Dropdown button
          <svg
            className="w-2.5 h-2.5 ml-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        {/* Grades Dropdown */}
        {isGradesOpen && (
          <div
            id="multi-dropdown"
            className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700"
          >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              {["Kindergarten", "Grade 1", "Grade 2"].map((grade) => (
                <li key={grade}>
                  <button
                    onClick={() => {
                      setSelectedGrade(grade);
                      setSubjectsOpen(true);
                    }}
                    className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {grade}
                  </button>
                </li>
              ))}
            </ul>

            {/* Subjects Dropdown */}
            {isSubjectsOpen && (
              <div
                id="subjectDropdown"
                className="z-10 absolute left-full top-0 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700"
              >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  {["English", "Filipino", "Science", "Math"].map((subject) => (
                    <li key={subject}>
                      <button
                        onClick={() => {
                          setSelectedSubject(subject);
                          setQuartersOpen(true);
                        }}
                        className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        {subject}
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Quarters Dropdown */}
                {isQuartersOpen && (
                  <div
                    id="quartersDropdown"
                    className="z-10 absolute left-full top-0 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700"
                  >
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                      {["1st Quarter", "2nd Quarter", "3rd Quarter", "4th Quarter"].map(
                        (quarter) => (
                          <li key={quarter}>
                            <button
                              onClick={() => setSelectedQuarter(quarter)}
                              className="block px-4 py-2 hover:bg-gray-100 hover:underline dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              {quarter}
                            </button>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Display Selected Options */}
      <div className="mt-4">
        <p>Selected Grade: {selectedGrade}</p>
        <p>Selected Subject: {selectedSubject}</p>
        <p>Selected Quarter: {selectedQuarter}</p>
      </div>
              
               {/* Input Element */}
            <div className="w-full border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 p-5">
              <label
                htmlFor="fileInput"
                className="flex flex-col items-center cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 16l4-4m0 0l4-4m-4 4h12M13 5h5a2 2 0 012 2v10a2 2 0 01-2 2h-5m-7-7l-4 4m0 0l4 4m-4-4h12"
                  />
                </svg>
                <p className="text-gray-600 font-medium mt-2 text-sm">Drag & drop your file here</p>
                <p className="text-gray-400 text-xs">or click to browse</p>
              </label>
              <input
                id="fileInput"
                type="file"
                name="file"
                accept="image/*,video/*,.pdf,.doc,.docx,.pptx,.ppt"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

                {/* Form Buttons */}
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setFormOpen(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

<section id="teachers" className="mt-8 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">List of Teachers</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">John Doe</td>
              <td className="border border-gray-300 px-4 py-2">john@example.com</td>
              <td className="border border-gray-300 px-4 py-2 text-green-500 font-semibold">
                Active
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        </section>
      </main>
    </div>
  );
};

export default PrincipalDashboard;
