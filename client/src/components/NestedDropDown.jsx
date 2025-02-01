import { useState } from "react";

const NestedDropdown = ({ 
  selectedSchool, setSelectedSchool, 
  selectedGrade, setSelectedGrade, 
  selectedSubject, setSelectedSubject, 
  selectedQuarter, setSelectedQuarter 
}) => {
  const [isSchoolOpen, setSchoolOpen] = useState(false);
  const [isGradeOpen, setGradeOpen] = useState(false);
  const [isSubjectOpen, setSubjectOpen] = useState(false);
  const [isQuarterOpen, setQuarterOpen] = useState(false);

  const schools = Array.from({ length: 28 }, (_, index) => ({
    name: `School ${index + 1}`,
    grades: [
      {
        grade: "Kindergarten",
        subjects: ["Math", "Science", "English", "Filipino"],
        quarters: ["1st Quarter", "2nd Quarter", "3rd Quarter", "4th Quarter"]
      },
      {
        grade: "Grade 1",
        subjects: ["Math", "Science", "English", "Filipino"],
        quarters: ["1st Quarter", "2nd Quarter", "3rd Quarter", "4th Quarter"]
      },
      {
        grade: "Grade 2",
        subjects: ["Math", "Science", "English", "Filipino"],
        quarters: ["1st Quarter", "2nd Quarter", "3rd Quarter", "4th Quarter"]
      },
      {
        grade: "Grade 3",
        subjects: ["Math", "Science", "English", "Filipino"],
        quarters: ["1st Quarter", "2nd Quarter", "3rd Quarter", "4th Quarter"]
      }
    ]
  }));

  const resetSelections = () => {
    // setSchoolOpen(false);
    setSelectedSchool("");
    setSelectedGrade("");
    setSelectedSubject("");
    setSelectedQuarter("");
  };

  const handleSchoolClick = (school) => {
    resetSelections();
    setSelectedSchool(school);
    setGradeOpen(true);
    setSubjectOpen(false);
    setQuarterOpen(false);
  };

  const handleGradeClick = (grade) => {
    setSelectedGrade(grade);
    setSubjectOpen(true);
    setQuarterOpen(false);
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    setQuarterOpen(true);
  };

  const handleCloseAllDropdown = ()=>{
    setGradeOpen(false);
    setSubjectOpen(false);
    setQuarterOpen(false);
  }

  return (
    <div className="relative left-0   w-64 text-white">
      {/* Select School Dropdown */}
      <div className="flex justify-between items-center w-full gap-2">
        <button 
          className="py-2 px-4 rounded-lg border border-indigo-500 text-indigo-500 font-medium flex justify-between items-center transition-all duration-300 ease-in-out hover:bg-indigo-500 hover:text-white active:scale-95 text-sm"
          onClick={() => {
            setSchoolOpen(!isSchoolOpen);
            setGradeOpen(false);
            setSubjectOpen(false);
            setQuarterOpen(false);
          }}
        >
          <span>Select School</span>
          <svg 
            className={`w-5 h-5 transition-transform duration-300 ${isSchoolOpen ? "rotate-0" : "-rotate-90"}`} 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <button 
         onClick={()=> resetSelections()}
          className="px-4 py-2 rounded-lg border border-gray-700 text-gray-700 font-medium transition-all duration-300 ease-in-out hover:bg-gray-700 hover:text-white active:scale-95 text-sm"
        >
          View All
        </button>
      </div>

      {isSchoolOpen && (
        <ul className="absolute z-10 left-0 w-64 bg-white text-gray-800 shadow-lg rounded-md mt-1 max-h-60 overflow-y-auto border border-gray-300">
          {schools.map(({ name }) => (
            <li key={name}>
              <button 
                className="w-full text-left py-2 px-4 hover:bg-blue-100 flex justify-between items-center"
                onClick={() => handleSchoolClick(name)}
              >
                <span>{name}</span>
                <span className="w-3 h-3 border-t-2 border-r-2 border-gray-500 rotate-45 transform"></span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Select Grade Dropdown */}
      {isGradeOpen && selectedSchool && (
        <ul className="absolute z-20 left-40 top-10 w-64 bg-white text-gray-800 shadow-lg rounded-md border border-gray-300">
          {schools.find(s => s.name === selectedSchool).grades.map(({ grade }) => (
            <li key={grade}>
              <button 
                className="w-full text-left py-2 px-4 hover:bg-blue-100 flex justify-between items-center"
                onClick={() => handleGradeClick(grade)}
              >
                <span>{grade}</span>
                <span className="w-3 h-3 border-t-2 border-r-2 border-gray-500 rotate-45 transform"></span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Select Subject Dropdown */}
      {isSubjectOpen && selectedGrade && (
        <ul className="absolute z-30 left-80 top-20 w-64 bg-white text-gray-800 shadow-lg rounded-md border border-gray-300">
          {schools
            .find(s => s.name === selectedSchool)
            .grades.find(g => g.grade === selectedGrade)
            .subjects.map(subject => (
              <li key={subject}>
                <button 
                  className="w-full text-left py-2 px-4 hover:bg-blue-100 flex justify-between items-center"
                  onClick={() => handleSubjectClick(subject)}
                >
                  <span>{subject}</span>
                  <span className="w-3 h-3 border-t-2 border-r-2 border-gray-500 rotate-45 transform"></span>
                </button>
              </li>
            ))}
        </ul>
      )}

      {/* Select Quarter Dropdown */}
      {isQuarterOpen && selectedSubject && (
        <ul className="absolute z-40 left-full translate-x-60 top-40 w-64 bg-white text-gray-800 shadow-lg rounded-md border border-gray-300">
          {schools
            .find(s => s.name === selectedSchool)
            .grades.find(g => g.grade === selectedGrade)
            .quarters.map(quarter => (
              <li key={quarter}>
                <button 
                  className="w-full text-left py-2 px-4 hover:bg-blue-100 flex justify-between items-center"
                  onClick={() => {
                    setSelectedQuarter(quarter);
                    handleCloseAllDropdown(setSchoolOpen(false));
                  }}
                >
                  <span>{quarter}</span>
                  <span className="w-3 h-3 border-t-2 border-r-2 border-gray-500 rotate-45 transform"></span>
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default NestedDropdown;
