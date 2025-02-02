import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import ProfileModal from "../../components/Profile";
import UploadLoading from "../../Success/UploadLoading";

const PrincipalDashboard = () => {
  const [isGradesOpen, setGradesOpen] = useState(false);
  const [isSubjectsOpen, setSubjectsOpen] = useState(false);
  const [isQuartersOpen, setQuartersOpen] = useState(false);
  const [isWeek, setWeek] = useState(false);
// Modal Ready to Upload Indicator
  const [isSelectedOpen, setSelectedOpen] = useState(false);

  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedQuarter, setSelectedQuarter] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");

  const [isLoading, setLoading] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [isFormOpen, setFormOpen] = useState(false); 
  const [formData, setFormData] = useState({ 
    description: "", 
    file: null,
    grade: '',
    subject: '',
     quarter: '',
     week: '',
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      grade: selectedGrade,
      subject: selectedSubject,
      quarter: selectedQuarter,
      week: selectedWeek,
    }));
  }, [selectedWeek, selectedGrade, selectedSubject, selectedQuarter]);

// Handle Dropdown Event
  const handleGradeSelect = (grade, e)=>{
    e.stopPropagation();
    setSelectedGrade(grade);
    setSubjectsOpen(true);
    setSelectedOpen(true);
  };

  const handleSubjectSelect = (subject, e)=>{
    e.stopPropagation();
    setSelectedSubject(subject);
    setQuartersOpen(true);
  };

  const handleQuarterSelect = (quarter, e)=>{
    e.stopPropagation();
    setSelectedQuarter(quarter);
    setWeek(true);
  };

  const handleWeekSelect = (week, e)=>{
    e.stopPropagation();
    setSelectedWeek(week);
    setGradesOpen(false);
    setSubjectsOpen(false);
    setQuartersOpen(false);
    setWeek(false);
  }

  
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

  // Hande Reset Form
  const handleReset = ()=>{
   setFormData({ 
    description: "", 
    file: null,
    grade: '',
    subject: '',
     quarter: '',
     week: '',
  });

  setSelectedGrade('');
  setSelectedSubject('');
  setSelectedQuarter('');
  setSelectedWeek('');
  }

// File submission
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const data = new FormData();
    data.append("description", formData.description);
    data.append("file", formData.file);
    data.append("grade", formData.grade);
    data.append("subject", formData.subject);
    data.append("quarter", formData.quarter);
    data.append('week', formData.week);

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
    } catch (error) {
      alert(error.message);
    }
};



  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 p-6 ml-64">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 px-6 py-4">
          <div>
              <h1 className="text-2xl font-bold text-gray-700">Principal Dashboard</h1>
          </div>

          <div className='flex justify-end'>
               <Header setOpen={()=> setOpen(true)}/>
            </div>
          </div>

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
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10">
            <div  className="relative bg-white rounded-lg shadow-lg p-6 w-96 sm:w-5/6 max-w-lg">
              <h2 className="text-xl font-bold text-gray-700 mb-4">Add New File</h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Description */}
                <div  className="col-span-2">
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

      <div>
      <label className="block text-gray-700 text-sm font-bold mb-2">Select Grade</label>
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
              {["Kindergarten", "Grade 1", "Grade 2", "Grade 3"].map((grade) => (
                <li key={grade}>
                  <button
                  type="button"
                    onClick={(e) => handleGradeSelect(grade, e)}
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
                      type="button"
                        onClick={(e) => handleSubjectSelect(subject, e)}
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
                            type="button"
                              onClick={(e) => handleQuarterSelect(quarter, e)}
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

                {/* Weeks */}
                {isWeek && (
                  <div
                    id="quartersDropdown"
                    className="z-10 absolute left-full translate-x-36 top-0 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 overflow-y-auto"
                     style={{ maxHeight: "200px" }} 
                  >
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                      {["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8", "Week 9", "Week 10", "Week 11", "Week 12"].map(
                        (week) => (
                          <li key={week}>
                            <button
                            type="button"
                              onClick={(e) => handleWeekSelect(week, e)}
                              className="block px-4 py-2 hover:bg-gray-100 hover:underline dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              {week}
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

     {isSelectedOpen && ( <div className="absolute bg-white shadow-lg rounded-lg border border-gray-200">
        <div className="flex justify-self-end p-1">
           <button onClick={() =>setSelectedOpen(false)}>✖</button>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">📌 Selected Options</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded-md">
            <p className="text-gray-600 text-sm">Selected Grade</p>
            <p className="text-lg font-medium text-blue-600">{selectedGrade || "None"}</p>
          </div>
          <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded-md">
            <p className="text-gray-600 text-sm">Selected Subject</p>
            <p className="text-lg font-medium text-green-600">{selectedSubject || "None"}</p>
          </div>
          <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded-md">
            <p className="text-gray-600 text-sm">Selected Quarter</p>
            <p className="text-lg font-medium text-yellow-600">{selectedQuarter || "None"}</p>
          </div>
          <div className="p-3 bg-violet-50 border-l-4 border-violet-500 rounded-md">
            <p className="text-gray-600 text-sm">Selected Week</p>
            <p className="text-lg font-medium text-violet-600">{selectedWeek || "None"}</p>
          </div>
        </div>
      </div>)}

              
               {/* Input Element */}
            <div  className="col-span-2 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 p-2">
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
                accept="image/*,video/*,.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

                {/* Form Buttons */}
                <div className="col-span-2 flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={() => handleReset()}
                   className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormOpen(false);
                      handleReset();
                      setSelectedOpen(false);
                    }}
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

          <section id="teachers" className="mt-8 bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">List of Teachers</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-indigo-600 text-white">
                    <th className="px-6 py-3 text-left font-medium">Name</th>
                    <th className="px-6 py-3 text-left font-medium">Role</th>
                    <th className="px-6 py-3 text-left font-medium">School</th>
                    <th className="px-6 py-3 text-left font-medium">Email</th>
                    <th className="px-6 py-3 text-left font-medium">Status</th>
                    <th className="px-6 py-3 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-50 hover:bg-gray-100 transition">
                    <td className="px-6 py-4 border-b">John Doe</td>
                    <td className="px-6 py-4 border-b">Math Teacher</td>
                    <td className="px-6 py-4 border-b">Sunrise High School</td>
                    <td className="px-6 py-4 border-b">john@example.com</td>
                    <td className="px-6 py-4 border-b text-green-500 font-semibold">Active</td>
                    <td className="px-6 py-4 border-b">
                      <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition">
                        View
                      </button>
                    </td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-100 transition">
                    <td className="px-6 py-4 border-b">Jane Smith</td>
                    <td className="px-6 py-4 border-b">Science Teacher</td>
                    <td className="px-6 py-4 border-b">Green Valley Academy</td>
                    <td className="px-6 py-4 border-b">jane@example.com</td>
                    <td className="px-6 py-4 border-b text-red-500 font-semibold">Inactive</td>
                    <td className="px-6 py-4 border-b">
                      <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition">
                        View
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
      </main>
    </div>
  );
};

export default PrincipalDashboard;
