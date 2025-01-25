import { Link } from "react-router";
import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";


export default function Login() {
const [isUser, setUser] = useState({ role:'principal', email: '', password: '' });
const { login, loading } = useAuth();
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
    console.error("Message Error: ", error);
  }
}


  return (
 <div className="flex w-full h-screen items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
<div  className="h-auto w-96 rounded-xl bg-white p-8 shadow-lg">
   {/* Title */}
   <h1 className="mb-4 text-center text-2xl font-bold text-gray-800">
          Welcome Back
        </h1>
        <p className="mb-6 text-center text-gray-600">
          Login to your account to continue.
        </p>

      <form onSubmit={HandleSubmit}>
        {/* Select Role */}
        <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="role"
              >
              Select Role
              </label>
              <select
              onChange={HandleOnchange}
              value={isUser.role}
              name="role"
              id="school"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="principal">Principal</option>
              <option value="teacher">Teacher</option>
            </select>
            </div>
        {/* Email Input */}
        <div className="mb-4">
          <Label htmlFor="email2" value="Email" className="mb-1 text-sm" />
          <TextInput
            id="email2"
            onChange={HandleOnchange}
            value={isUser.email}
            name="email"
            type="email"
            placeholder={`Enter ${isUser.role} email`}
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
          <TextInput id="password2"
          onChange={HandleOnchange}
          value={isUser.password}
          name="password"
          type="password"
          placeholder="Enter a password"
          required shadow />
        </div>

        {/* Submit Button */}
        <Button
          className="w-full bg-blue-600 text-white hover:bg-blue-700 focus:ring focus:ring-blue-300"
          type="submit"
        >
        {`Login as ${isUser.role}`}
        </Button>

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
