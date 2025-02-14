import React, { useState, useEffect } from "react";
import { FaFilePdf, FaFileWord, FaFileExcel, FaFilePowerpoint } from "react-icons/fa";
import Header from "../../components/Header";
import ProfileModal from "../../components/Profile";
import UploadLoading from "../../Success/UploadLoading";
import { deleteSpecificTeacher, getAllSpecificTeachers } from "../../services/Api";
import { useAuth } from "../../context/AuthContext";
import { getUserPending } from "../../services/Api";
import { getAllFiles } from "../../services/Api";
import TeachersProfile from "./Modal/TeachersDetails";
import DeleteModalTeacher from "../../Error/DeleteTeacherAlert";
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const PrincipalDashboard = () => {
  const [isSpecificUser, setisSpecificUser] = useState([]);
  const { user } = useAuth();
  const [pending, setPending] = useState([]);
  const [files, setFiles] = useState([]);
  const [isGradesOpen, setGradesOpen] = useState(false);
  const [isSubjectsOpen, setSubjectsOpen] = useState(false);
  const [isQuartersOpen, setQuartersOpen] = useState(false);
  const [isWeek, setWeek] = useState(false);
  const [isSummary, setisSummary] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  // Modal Teachers View 
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalDeleteTeacher, setIsModalDeleteTeacher] = useState(false);
  const [selectedByteacher, setIsSelectedByTeachers] = useState(null);

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

  const handleGradeSelect = (grade, e)=>{
    e.stopPropagation();
    setSelectedGrade(grade);
    setSubjectsOpen(true);
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

  // Seleted Option 
  const handleSeletedOption = ()=>{
      setisSummary(false);
      handleReset();
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

  //  handle continue
  const handleContinueEvent = ()=>{
      setisSummary(true);
  };

  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle File Change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((prev) => ({ ...prev, file }));
  };

  // File Preview
  const renderFilePreview = () => {
    if (formData.file) {
      const file = formData.file;
      const fileURL = URL.createObjectURL(file);
      
      if (file.type.startsWith('image/')) {
        // For image files, display a preview
        return (
          <div className="flex justify-center items-center mt-1 p-3 border rounded-lg shadow-md bg-white">
            <img src={fileURL} alt="Preview" className="max-w-full max-h-20 rounded-md" />
         </div>
        )
      } else if (file.type.startsWith('video/')) {
        // For video files, display a preview with controls
        return (
          <div className="flex justify-center items-center mt-1 p-3 border rounded-lg shadow-md bg-white">
           <video src={fileURL} controls className="max-w-full max-h-20 ">
            Your browser does not support the video tag.
          </video>
           </div>
        );
      } else if (file.type === 'application/pdf') {
        // For PDF files, display the name and a preview option
        return (
          <div className="flex flex-col justify-center items-center mt-1 p-3 border rounded-lg shadow-md bg-white">
           <div>
            <FaFilePdf className="text-red-500 w-6 h-6"/>
           </div>
           <div>{file.name}</div>
          </div>
        )
      } else if (file.type === 'application/msword' || 
         file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        return (
          <div className="flex flex-col justify-center items-center mt-1 p-3 border rounded-lg shadow-md bg-white">
          <div>
            <FaFileWord className="text-blue-500 w-6 h-6"/>
          </div>
           <div>{file.name}</div>
          </div>
        )
      } else if (  file.type === 'application/vnd.ms-powerpoint' ||
         file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
       return (
        <div className="flex flex-col justify-center items-center mt-1 p-3 border rounded-lg shadow-md bg-white">
        <div>
            <FaFilePowerpoint className="text-red-500 w-6 h-6"/>
        </div>
         <div>{file.name}</div>
        </div>
       )
       
      } else if( file.type === 'application/vnd.ms-excel' ||
         file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        return(
          <div className="flex flex-col justify-center items-center mt-1 p-3 border rounded-lg shadow-md bg-white">
           <FaFileExcel className="text-green-500 w-6 h-6"/>
           <div>{file.name}</div>
          </div>
        )

      } else {
        return (
          <div className="flex flex-col justify-center items-center mt-1 p-3 border rounded-lg shadow-md bg-white">
           <p>Unsupported Files</p>
         </div>
        )
      }
    }
    return null;
  };
  

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
      const response = await fetch(`${VITE_API_BASE_URL}/api/stats`, {
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


  
// Fetch all pending user
  useEffect(() => {
    const userId = user;
    if(!userId){
     return console.log('No user pending exist!');
    }

    const fetchAllPendingTeachers = async () => {
      const pendingUserTeacherId = userId?.data._id

      try {
        const response = await getUserPending(pendingUserTeacherId);
        const allFiles = await getAllFiles();
        setFiles(allFiles);
        setPending(response);
      } catch (error) {
        console.error("No user to be approved!", error);
      }
    };

    fetchAllPendingTeachers();
  }, []);


// Get All Specific teachers
useEffect(()=>{
  const userId = user;
  if(!userId){
   return console.log('No user!');
   }

  const getTeachers = async()=>{
    const  id  = userId?.data._id;
    try {
      const response = await getAllSpecificTeachers(id);
      setisSpecificUser(response);
    } catch (error) {
      console.log('No user exist!', error);
    }
  }

  getTeachers();

},[]);

// Create a function to delete a teachers user
const HandleDeleteByTeachers = async (item)=>{
     try {
        await deleteSpecificTeacher(item._id);
        setisSpecificUser((prev)=> {
          prev.filter((t)=> t._id !== t._item);
        });

        setIsModalDeleteTeacher(false);

     } catch (error) {
        console.error('Failed to delete teachers', error);
        throw error;
     }
}



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
            <p className="text-2xl font-bold text-blue-500">{isSpecificUser.length}</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-gray-500 text-sm">Pending Applications</h2>
            <p className="text-2xl font-bold text-orange-500">{pending.length}</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-gray-500 text-sm">Files Uploaded</h2>
            <p className="text-2xl font-bold text-green-500">{files.length}</p>
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
            <div  className="relative bg-white rounded-lg shadow-lg p-5 w-96 sm:w-5/6 max-w-md">
              <h2 className="text-xl font-bold text-gray-700 mb-4">Add New File</h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
       
              <div className="col-span-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Select Type of School
                </label>
                <button
                  id="multiLevelDropdownButton"
                  onClick={() => setGradesOpen(!isGradesOpen)}
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-between dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                >
                  Dropdown button
                  <svg
                    className="w-2.5 h-2.5"
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
              {selectedGrade.indexOf('Kindergarten') < 0 && selectedGrade.indexOf('Grade')  < 0 ? (<span className="text-red-600 font-semibold text-xs" >Required</span>) : null}
              </div>

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
                    required
                  ></textarea>
                  {!formData.description && (<span className="text-red-600 font-semibold text-xs" >Required</span>)}
                </div>
            <div>


{isGradesOpen && (
  <div className="fixed inset-0  bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div
      id="multi-dropdown"
      className="absolute z-10  top-36 bg-slate-50 divide-y divide-gray-200 rounded-lg shadow-lg w-1/3 dark:bg-gray-800 dark:divide-gray-700"
    >
       <div
       id="gradeDropdown"
       className="absolute top-0 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full overflow-y-auto"  style={{maxHeight: '350px'}}
     >
       {/* Heading */}
       <div className="px-4 py-3 text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-indigo-700 dark:from-indigo-700 dark:to-indigo-900 rounded-t-xl shadow-md">
         Select Grade
       </div>
     
       <ul className="py-2 text-sm text-gray-800 dark:text-gray-200 p-2">
        {[
          "Kindergarten",
          "Grade 1",
          "Grade 2",
          "Grade 3",
          "Grade 4",
          "Grade 5",
          "Grade 6",
          "Grade 7",
          "Grade 8",
          "Grade 9",
          "Grade 10",
        ].map((grade, index, array) => (
          <li key={grade}>
            <button
              type="button"
              onClick={(e) => handleGradeSelect(grade, e)}
               className="flex items-center justify-between w-full px-4 py-3 transition-all duration-300 ease-in-out rounded-md hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white hover:shadow-md"
            >
              {grade}
            </button>
    
            {/* Underline separator (except for last item) */}
            {index !== array.length - 1 && (
              <div className="border-b border-gray-200 dark:border-gray-600 mx-4 my-1"></div>
            )}
          </li>
        ))}
      </ul>
    </div>
    



    {/* Subjects Dropdown */}
    {isSubjectsOpen && (
      <div
      id="subjectDropdown"
      className="absolute top-0 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full overflow-y-auto"  style={{maxHeight: '350px'}}
    >
      {/* Heading */}
      <div className="px-4 py-3 text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-indigo-700 dark:from-indigo-700 dark:to-indigo-900 rounded-t-xl shadow-md">
        Select Subject
      </div>
    
      <ul className="py-2 text-sm text-gray-800 dark:text-gray-200 p-2">
          {["Reading and Literacy", "GMRC", "Makabayan", "English", "Filipino", "Science", "Math"].map((subject, index, array) => (
            <li key={subject}>
              <button
                type="button"
                onClick={(e) => handleSubjectSelect(subject, e)}
                className="flex items-center justify-between w-full px-4 py-3 transition-all duration-300 ease-in-out rounded-md hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white hover:shadow-md"
              >
                {subject}
              </button>
              {/* Underline separator (except for last item) */}
              {index !== array.length - 1 && (
                <div className="border-b border-gray-200 dark:border-gray-600 mx-4 my-1"></div>
              )}
            </li>
          ))}
        </ul>
      </div>
    )}

    {/* Quarters Dropdown */}
    {isQuartersOpen && (
      <div
      id="quarterDropdown"
      className="absolute top-0 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full"
    >
      {/* Heading */}
      <div className="px-4 py-3 text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-indigo-700 dark:from-indigo-700 dark:to-indigo-900 rounded-t-xl shadow-md">
        Select Quarter
      </div>
    
      <ul className="py-2 text-sm text-gray-800 dark:text-gray-200 p-2">
          {["1st Quarter", "2nd Quarter", "3rd Quarter", "4th Quarter"].map((quarter, index, array) => (
            <li key={quarter}>
              <button
                type="button"
                onClick={(e) => handleQuarterSelect(quarter, e)}
                 className="flex items-center justify-between w-full px-4 py-3 transition-all duration-300 ease-in-out rounded-md hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white hover:shadow-md"
              >
                {quarter}
              </button>
               {/* Underline separator (except for last item) */}
              {index !== array.length - 1 && (
                <div className="border-b border-gray-200 dark:border-gray-600 mx-4 my-1"></div>
              )}
            </li>
          ))}
        </ul>
      </div>
    )}

    {/* Weeks Dropdown */}
    {isWeek && (
     <div
     id="weekDropdown"
     className="absolute top-0 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full overflow-y-auto" style={{maxHeight: '350px'}}
   >
     {/* Heading */}
     <div className="px-4 py-3 text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-indigo-700 dark:from-indigo-700 dark:to-indigo-900 rounded-t-xl shadow-md">
       Select Week
     </div>
   
     <ul className="py-2 text-sm text-gray-800 dark:text-gray-200 p-2">
          {["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8", "Week 9", "Week 10", "Week 11", "Week 12"].map((week, index, array) => (
            <li key={week}>
              <button
                type="button"
                onClick={(e) => handleWeekSelect(week, e)}
                className="flex items-center justify-between w-full px-4 py-3 transition-all duration-300 ease-in-out rounded-md hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white hover:shadow-md"
              >
                {week}
              </button>
               {/* Underline separator (except for last item) */}
               {index !== array.length - 1 && (
                <div className="border-b border-gray-200 dark:border-gray-600 mx-4 my-1"></div>
              )}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
 </div>
  )}
</div> 
{/* End */}

{/* Summary of uploads */}
{isSummary && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10">
      <div  className="relative bg-white rounded-lg shadow-lg p-5 w-96 sm:w-5/6 max-w-md">
      {/* Close Button */}
      <button type="button" onClick={handleSeletedOption} className="absolute top-0 p-2 right-2 text-gray-600 hover:text-gray-900 focus:outline-none">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>

      <h3 className="text-lg p-2 font-semibold text-gray-700 text-center">📌 Summary of upload</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded-md text-center">
          <p className="text-gray-600 text-sm">Selected Grade</p>
          <p className="text-lg font-medium text-blue-600">{selectedGrade || "None"}</p>
        </div>
        <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded-md text-center">
          <p className="text-gray-600 text-sm">Selected Subject</p>
          <p className="text-lg font-medium text-green-600">{selectedSubject || "None"}</p>
        </div>
        <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded-md text-center">
          <p className="text-gray-600 text-sm">Selected Quarter</p>
          <p className="text-lg font-medium text-yellow-600">{selectedQuarter || "None"}</p>
        </div>
        <div className="p-3 bg-violet-50 border-l-4 border-violet-500 rounded-md text-center">
          <p className="text-gray-600 text-sm">Selected Week</p>
          <p className="text-lg font-medium text-violet-600">{selectedWeek || "None"}</p>
        </div>
        <div>
          {renderFilePreview()}
      </div>
      </div>
      <div className="relative top-4 flex justify-center">
      <button type="submit" className="w-1/2  text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5  dark:focus:ring-[#2557D6]/50 me-2 mb-2">Upload</button>
      </div>
    </div>
    </div>
      )}
{/* Input Element */}
  <div  className="relative col-span-2 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 p-2">
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

        <div>
          {renderFilePreview()}
      </div>
    </div>

    {!formData.file && (<span className="text-red-600 font-semibold text-xs" >Required</span>)}

        {/* Form Buttons */}
        <div className="col-span-2 flex justify-end space-x-4">
        <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={() => {
              setFormOpen(false);
              handleReset();
            }}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="button" onClick={handleContinueEvent}
            className={`px-4 py-2 ${formData.description
               || formData.file || formData.grade
                || formData.quarter || formData.subject || formData.week 
               ? 
            'bg-blue-600  hover:bg-blue-700'
             : ' bg-gray-500'} text-white rounded-lg`}
            disabled={!formData.description
              || !formData.file ||  !formData.grade
               || !formData.quarter || !formData.subject || !formData.week }
          >
            {formData.description
               || formData.file || formData.grade
                || formData.quarter || formData.subject || formData.week 
               ? 
            'Continue'
             : 'Fill to continue'}
          </button>
        </div>
      </form>
    </div>
  </div>
)}
         <section id="teachers" className="mt-8 bg-white shadow-lg rounded-xl p-6">
  <h2 className="text-xl font-semibold text-gray-700 mb-4">List of Teachers</h2>

  <div className="overflow-x-auto"> {/* Enables horizontal scrolling */}
    <div className="overflow-y-auto" style={{ maxHeight: '450px' }}>
      <table className="w-full min-w-max border-collapse rounded-xl">
        <thead>
          <tr className="bg-indigo-600 text-white">
            <th className="px-4 py-3 text-left font-medium">Profile</th>
            <th className="px-4 py-3 text-left font-medium">Role</th>
            <th className="px-4 py-3 text-left font-medium">Name</th>
            <th className="px-4 py-3 text-left font-medium">School</th>
            <th className="px-4 py-3 text-left font-medium">Email</th>
            <th className="px-4 py-3 text-left font-medium">Status</th>
            <th className="px-4 py-3 text-center font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isSpecificUser.map(item => (
            <tr key={item._id} className="bg-white hover:bg-gray-100 transition">
              <td className="px-4 py-4 border-b">
                <img 
                  className="rounded-full w-10 h-10 border-2 border-blue-500" 
                  src={item?.metadata?.path ? 
                    `${VITE_API_BASE_URL}/${encodeURI(item?.metadata?.path.replace(/\\/g, "/"))}` 
                    : './png/avatar.png'} 
                  alt="Profile Picture" 
                />
              </td>
              <td className="px-4 py-4 border-b whitespace-nowrap">{item.role.toUpperCase()}</td>
              <td className="px-4 py-4 border-b whitespace-nowrap">{item.fullname}</td>
              <td className="px-4 py-4 border-b whitespace-nowrap">{item.school}</td>
              <td className="px-4 py-4 border-b whitespace-nowrap">{item.email}</td>
              <td className="px-4 py-4 border-b text-green-500 font-semibold">Active</td>
              <td className="px-4 py-4 border-b">
                <div className="flex flex-wrap justify-center gap-2">
                  <button 
                    onClick={() => {
                      setOpenProfile(true);
                      setSelectedUser(item);
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
                  >
                    View
                  </button>

                  <button 
                    onClick={() => {
                      setIsSelectedByTeachers(item);
                      setIsModalDeleteTeacher(true);
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</section>

         {/* View Specific Profile Teachers */}
          <TeachersProfile
           isOpen={openProfile}
            onClose={()=> setOpenProfile(false)}
            item={selectedUser}
            />

            {isModalDeleteTeacher && 
            (<DeleteModalTeacher
             isOpen={isModalDeleteTeacher}
             onClose={()=> setIsModalDeleteTeacher(false)}
             item={selectedByteacher}
             onConfirm={()=> {
              HandleDeleteByTeachers(selectedByteacher);
              setIsModalDeleteTeacher(false);
             }}
             />)}
      </main>
    </div>
  );
};

export default PrincipalDashboard;
