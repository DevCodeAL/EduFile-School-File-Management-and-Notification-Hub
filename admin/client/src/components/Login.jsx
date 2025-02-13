import { Button, Label, } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../AuthContext/AuthContext";
import AdminLoading from "../LoadingAdmin/AdminLoading";
import Warning from "../Error/Alert";



export default function Login() {
  const [admin, setAdmin] = useState({username: '', password: ''});
  const [isLoading, setLoading] = useState(false);
  const [isAlert, setAlert] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const HandleFormChange = (e)=>{
    const { name, value } = e.target;
        setAdmin({
          ...admin, 
           [name]: value,
        });
  };

  async function HandleSubmit(e) {
    e.preventDefault();

    if(isAlert){
      setLoading(true);
    } else {
      setLoading(false);
    };
   
    const {username, password } = admin;
    try {
     await login(username, password);
      setAdmin({
        username: '',
        password: '',
      });
     setTimeout(()=>{
      navigate('/dashboard');
     }, 2000);
    } catch (error) {
      console.log("Error", error);
      setAlert(true);
      setLoading(false);
      setAdmin({
        username: '',
        password: '',
      });
    }
  }
    
  return (
    <div className="flex w-full h-screen items-center justify-center relative overflow-hidden">
      <video 
      className="absolute top-0 left-0 w-full h-full object-cover" 
      src="/video/edu.mp4" 
      autoPlay 
      muted 
      loop
    ></video>

   {isAlert && (
     <Warning/>
   )}

    {isLoading && (
        <AdminLoading/>
    )}

      <form onSubmit={HandleSubmit} className="relative z-10 h-auto w-96 rounded-xl bg-gray-300/50 backdrop-blur-md p-8 shadow-lg">
        {/* Title */}
        <h1 className="mb-4 text-center text-2xl font-bold text-gray-800">
        Administrator
        </h1>
        <p className="mb-6 text-center text-gray-600">
          Login to your account to continue.
        </p>
        
        {/* Email Input */}
        <div className="mb-4  border-b-2 border-blue-500">
          <Label htmlFor="email2" value="Username" className="mb-1 text-sm" />
          <input
            onChange={HandleFormChange}
            value={admin.username}
            name="username"
            id="username"
            type="text"
            placeholder="username"
            required
            shadow
             className="w-full bg-transparent border-none text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-blue-600"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4  border-b-2 border-blue-500">
          <Label
            htmlFor="password2"
            value="Password"
            className="mb-1 text-sm"
          />
          <input 
          onChange={HandleFormChange}
           value={admin.password}
           name="password"
           className="w-full bg-transparent border-none text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-blue-600"
           placeholder="password"
           id="password" type="password" required shadow />
        </div>

         {/* Forgot Password */}
         <div className="mb-6 text-center">
        <span className="relative text-blue-500 font-semibold hover:text-blue-700 transition duration-300 cursor-pointer 
        after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-500 
        hover:after:w-full after:transition-all after:duration-300">
          Forgot Password?
  </span>
</div>

        {/* Submit Button */}
        <Button
          className="w-full bg-blue-600 text-white hover:bg-blue-700 focus:ring focus:ring-blue-300"
          type="submit"
        >
          Login
        </Button>
      </form>
    </div>
  );
}
