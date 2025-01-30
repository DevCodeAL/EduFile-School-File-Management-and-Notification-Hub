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
      <button 
        className="w-full bg-blue-600 py-2 px-4 rounded-lg shadow-lg text-white font-semibold hover:bg-blue-700 flex justify-between items-center"
        onClick={() => {
          setSchoolOpen(!isSchoolOpen);
          setGradeOpen(false);
          setSubjectOpen(false);
          setQuarterOpen(false);
          // resetSelections();
        }}
      >
        <span>{selectedSchool || "Select School"}</span>
        <span className={`w-3 h-3 border-t-2 border-r-2 border-white transform ${isSchoolOpen ? "rotate-135" : "rotate-45"}`}></span>
      </button>

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
        <ul className="absolute z-20 left-40 top-0 w-64 bg-white text-gray-800 shadow-lg rounded-md border border-gray-300">
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
        <ul className="absolute z-30 left-80 top-0 w-64 bg-white text-gray-800 shadow-lg rounded-md border border-gray-300">
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
        <ul className="absolute z-40 left-full translate-x-60 top-0 w-64 bg-white text-gray-800 shadow-lg rounded-md border border-gray-300">
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
