import { Link } from "react-router";
import { useState } from "react";
import { createUser, createAssociate  } from "../services/Api";
import { useNavigate } from "react-router";
import Loading from "../Success/Loading";
import RegistrationSuccessModal from "../Error/WaitingApproval";


export default function RegistrationForm() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [userItems, setUserItems] = useState({role: 'teacher',
   school: '',
    fullname: '',
     email: '',
      password: ''});

const handleChange = (e)=>{
  const { name, value } = e.target;
  setUserItems(
      {
      ...userItems,
      [name]: value,
  })
}

// Handle function to submit
async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await createUser(userItems);
    await createAssociate();
    
    setUserItems({
      role: '', school: '', fullname: '', email: '', password: '',
    });

    if (response.success) {
      setSuccess(true);
      setLoading(false); 
    } else {
      setLoading(false); 
    }

  } catch (error) {
    console.log({ message: error });
    setLoading(false); // Stop loading on error
  }
}


  return (
    <>
      <div className="flex w-full h-screen items-center justify-center relative overflow-hidden">
         {/* Background Video */}
    <video 
      className="absolute top-0 left-0 w-full h-full object-cover" 
      src="/video/edu.mp4" 
      autoPlay 
      muted 
      loop
    ></video>

          {/* Loading for Registration */}
         {isLoading && (
           <Loading/>
         )}

         {/* Registration Greetings */}
          {isSuccess && <RegistrationSuccessModal isOpen={isSuccess} onClose={()=> {
            setSuccess(false);
            navigate('/login');
          }}/>}


        <div className="relative z-10 h-auto w-96  bg-gray-300/50 backdrop-blur-md  sm:w-5/6 max-w-lg shadow-lg rounded-lg p-6 sm:p-8 ">
          {/* Header */}
          <h2 className="text-2xl font-bold text-gray-700 text-center">Registration</h2>
          <p className="text-sm text-gray-500 text-center mt-2">
            Register your account to get started
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        {/* School Name */}
          <div className="sm:col-span-2 border-b-2  border-blue-500">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="role"
              >
                School
              </label>
              <select
               onChange={handleChange}
               value={userItems.school}
               name="school"
              id="school"
              required
             className="w-full bg-transparent border-none text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-blue-600"
            >
              <option value="">Select School</option>
              {[...Array(28)].map((_, index) => (
                <option key={index + 1} value={`school${index + 1}`}>
                  School {index + 1}
                </option>
              ))}
            </select>
            </div>

           {/* Full Name */}
           <div className="col-span-1 border-b-2 border-blue-500">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="name"
              >
                Role
              </label>
              <input
                onChange={handleChange}
                name="role"
                value={userItems.role}
                disabled
                type="text"
                id="name"
                className="w-full bg-transparent border-none text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Full Name */}
            <div className="col-span-1 border-b-2  border-blue-500">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                onChange={handleChange}
                name="fullname"
                value={userItems.fullname}
                type="text"
                id="fullname"
                className="w-full bg-transparent border-none text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Email */}
            <div className="col-span-1 border-b-2 border-blue-500">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                onChange={handleChange}
                name="email"
                value={userItems.email}
                type="email"
                id="email"
                className="w-full bg-transparent border-none text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password */}
            <div className="col-span-1 border-b-2 border-blue-500">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                onChange={handleChange}
                name="password"
                value={userItems.password}
                type="password"
                id="password"
                className="w-full bg-transparent border-none text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                placeholder="Create a password"
                required
              />
            </div>

            {/* Confirm Password */}
            {/* <div className="col-span-1">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="confirm-password"
              >
                Confirm Password
              </label>
              <input
                onChange={handleChange}
                name="confirmed_password"
                value={userItems.confirm_password}
                type="password"
                id="confirm-password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your password"
              />
            </div> */}

            {/* Submit Button */}
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-300"
              >
                Register
              </button>
            </div>
          </form>

          {/* Register Link */}
          <div className="mt-4 text-center">
            <span className="text-gray-600 text-sm">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="text-blue-600 underline hover:text-blue-700"
              >
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
