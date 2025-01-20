import { Link } from "react-router";
import { Button, Label, TextInput, Select } from "flowbite-react";

export default function Login() {
  return (
    <div className="flex relative z-20 w-full h-screen items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
      <form className="h-auto w-96 rounded-xl bg-white p-8 shadow-lg">
        {/* Title */}
        <h1 className="mb-4 text-center text-2xl font-bold text-gray-800">
          Welcome Back
        </h1>
        <p className="mb-6 text-center text-gray-600">
          Login to your account to continue.
        </p>

        {/* User Type Selection */}
        <div className="mb-4">
          <Label htmlFor="userType" value="Login as" className="mb-1 text-sm" />
          <Select id="userType" required>
            <option value="principal">Principal</option>
            <option value="teacher">Teacher</option>
          </Select>
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <Label htmlFor="email2" value="Your email" className="mb-1 text-sm" />
          <TextInput
            id="email2"
            type="email"
            placeholder="name@example.com"
            required
            shadow
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <Label
            htmlFor="password2"
            value="Your password"
            className="mb-1 text-sm"
          />
          <TextInput id="password2" type="password" required shadow />
        </div>

        {/* Submit Button */}
        <Button
          className="w-full bg-blue-600 text-white hover:bg-blue-700 focus:ring focus:ring-blue-300"
          type="submit"
        >
          Login
        </Button>

        {/* Register Link */}
        <div className="mt-4 text-center">
          <span className="text-gray-600 text-sm">
            Don't have an account?{" "}
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
  );
}
