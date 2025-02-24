import { useEffect, useState } from "react";
import { createTranferSchool, getAllUsers } from "../../../services/Api";
import { useAuth } from "../../../context/AuthContext";

export function TransferButton({ isOpen, setClose, item, onUpdate }) {
  if (!isOpen) return null;
    const { user } = useAuth();

    const principalId = user?.data._id;
    const [isFormData, setIsFormData] = useState({ fromPrincipalId: principalId || '',
     toPrincipalId: "",
     teacherId: item._id });
     const [isSchoolItems, setIsSchoolItems] = useState([]);

     
    useEffect(()=>{
    const fetchPrincipal = async ()=>{
        try {
            const response = await getAllUsers();
            setIsSchoolItems(response.data);
            console.log('Data: ', response);
        } catch (error) {
            console.error('No principals users', error);
        };
    };

    fetchPrincipal();

    },[]);


  const HandleChange = (e) => {
    const { name, value } = e.target;
    setIsFormData({ ...isFormData, [name]: value });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createTranferSchool(item._id, isFormData);
      onUpdate(response);
    } catch (error) {
      console.error("Failed to update transfer to school!", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-xl relative">
        
        {/* Close Button (Tailwind only) */}
        <button 
          onClick={setClose} 
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition"
        >
          ✕
        </button>

        {/* Modal Title */}
        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Transfer to Another School</h2>

        {/* Form */}
        <form onSubmit={HandleSubmit} className="space-y-4">
          
          {/* Select Input */}
          <div>
            <label htmlFor="schools" className="block text-sm font-medium text-gray-600">Select School</label>
            <select 
              onChange={HandleChange} 
              value={isFormData.toPrincipalId} 
              name="toPrincipalId" 
              id="toPrincipalId" 
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Choose a School</option>
              {isSchoolItems.map((schoolItem, index) => (
                <option key={index} value={schoolItem._id}>{schoolItem.school}</option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
          >
            Submit
          </button>

        </form>
      </div>
    </div>
  );
}
