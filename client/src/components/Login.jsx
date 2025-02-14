import { Link } from "react-router";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import AlertWarning from "../Error/Alert";
import PendingApprovalModal from "../Error/NotApprovedAlert";


export default function Login() {
const [isUser, setUser] = useState({ role:'principal', email: '', password: '' });
const [isAlert, setAlert] = useState(false);
const { login, loading } = useAuth();
const [needApproval, setApproval] = useState(false);
const navigate = useNavigate();

// Input Field
const HandleOnchange = (e)=> {
 const { name, value } = e.target;
 setUser({
  ...isUser,
   [name]: value,
 });

};

async function HandleSubmit(e) {
  e.preventDefault();
  const { role, email, password } = isUser;
  try {
    const response = await login(role, email, password);
    if (response.data) {
      setUser({ role: '', email: '', password: '' });
     // Redirect based on user role
     if (role === "principal") {
      navigate("/principals_dashboard");
    } else if (role === "teacher") {
      navigate("/teacher_dashboard");
    }
  }
    
  } catch (error) {
    if(error.response.status === 403){
        setApproval(true);
    } else{
       setAlert(true);
    };
    setUser({ role: '', email: '', password: '' });
    console.error("Message Error: ", error);
  }
}


  return (
    <div className="flex w-full h-screen bg-blue-100 items-center justify-center relative overflow-hidden">
   
{/* Alert if wrong password */}
    {isAlert && (
        <AlertWarning/>
    )}

    {needApproval && <PendingApprovalModal onClose={()=> {
      setApproval(false);
      location.reload();
    }}/>}

    {/* Login Card */}
    <div className="relative z-10 h-auto w-96 rounded-xl bg-white p-8 pt-3 pb-3 shadow-lg">
        <div className="flex justify-center">
        <img src={'/Logo/GUIMBA EAST DISTRICT.png'}
        className="max-w-16 object-cover"
        alt="EduLink-Logo" />
        </div>
      {/* Title */}
      <h1 className="mb-4 text-center text-2xl font-bold text-gray-800">
        Welcome Back
      </h1>
      <p className="mb-6 text-center text-gray-600">
        Login to your account to continue.
      </p>
  
      {/* Form */}
      <form onSubmit={HandleSubmit}>
        {/* Select Role */}
        <div className="mb-4 border-b-2 border-blue-500">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="role"
          >
             Designation
          </label>
          <select
            onChange={HandleOnchange}
            value={isUser.role}
            name="role"
            id="school"
            className="w-full bg-transparent border-none text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-blue-600"
          >
            <option className="text-gray-500" value="principal">Principal</option>
            <option className="text-gray-500" value="teacher">Teacher</option>
          </select>
        </div>
  
        {/* Email Input */}
        <div className="mb-4 border-b-2 border-blue-500">
          <label
            htmlFor="email2"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            id="email2"
            onChange={HandleOnchange}
            value={isUser.email}
            name="email"
            type="email"
            placeholder={`Enter ${isUser.role} email`}
            required
            className="w-full bg-transparent border-none text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-blue-600"
            disabled={loading}
          />
        </div>

  
        {/* Password Input */}
        <div className="mb-4 border-b-2 border-blue-500">
          <label
            htmlFor="password2"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            id="password2"
            onChange={HandleOnchange}
            value={isUser.password}
            name="password"
            type="password"
            placeholder="Enter a password"
            required
            className="w-full bg-transparent border-none text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-blue-600"
            disabled={loading}
          />
        </div>
  
        {/* Submit Button */}
        <button
          className="w-full py-2 mt-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="submit"
        >
          {`Login as ${isUser.role}`}
        </button>

        <span className="flex justify-center pt-1">
          <Link to='/forgot-pass' className="text-blue-500 text-base underline">
            Forgot Password
          </Link>
        </span>
  
        {/* Register Link */}
        <div className="mt-4 text-center">
          <span className="text-gray-600 text-sm">
            Registration for teachers!{" "}
            <Link
              to={"/register"}
              className="text-blue-600 underline hover:text-blue-700"
            >
              Register
            </Link>
          </span>
        </div>
      </form>
    </div>
  </div>  
  );
}
