import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../AuthContext/AuthContext";


export default function Login() {
  const [admin, setAdmin] = useState({username: '', password: ''});
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
    const {username, password } = admin;
    try {
      const response = await login(username, password);
      setAdmin({
        username: '',
        password: '',
      });
      console.log(response);
      navigate('/dashboard');
    } catch (error) {
      console.log("Error", error);
    }
  }
    
  return (
    <div className="flex w-full h-screen items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
      <form onSubmit={HandleSubmit} className="h-auto w-96 rounded-xl bg-white p-8 shadow-lg">
        {/* Title */}
        <h1 className="mb-4 text-center text-2xl font-bold text-gray-800">
        Administrator
        </h1>
        <p className="mb-6 text-center text-gray-600">
          Login to your account to continue.
        </p>
        
        {/* Email Input */}
        <div className="mb-4">
          <Label htmlFor="email2" value="Username" className="mb-1 text-sm" />
          <TextInput
            onChange={HandleFormChange}
            value={admin.username}
            name="username"
            id="username"
            type="text"
            placeholder="username"
            required
            shadow
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <Label
            htmlFor="password2"
            value="Password"
            className="mb-1 text-sm"
          />
          <TextInput  
          onChange={HandleFormChange}
           value={admin.password}
           name="password"
           id="password" type="password" required shadow />
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
