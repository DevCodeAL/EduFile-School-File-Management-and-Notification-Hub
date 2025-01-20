import { Link } from "react-router";

export default function RegistrationForm() {
  return (
    <>
      <div className="flex relative z-20 w-full items-center justify-center min-h-screen bg-gray-100 bg-gradient-to-r from-blue-400 to-purple-500 p-4">
        <div className="w-full sm:w-5/6 max-w-lg bg-white shadow-lg rounded-lg p-6 sm:p-8">
          {/* Header */}
          <h2 className="text-2xl font-bold text-gray-700 text-center">Registration</h2>
          <p className="text-sm text-gray-500 text-center mt-2">
            Register your account to get started
          </p>

          {/* Form */}
          <form className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            {/* Role Selection */}
            <div className="sm:col-span-2">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="role"
              >
                Role
              </label>
              <select
                id="role"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="principal">Principal</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>

            {/* School Name */}
            <div className="sm:col-span-2">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="school"
              >
                School Name
              </label>
              <input
                type="text"
                id="school"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your school name"
              />
            </div>

            {/* Full Name */}
            <div className="col-span-1">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div className="col-span-1">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div className="col-span-1">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Create a password"
              />
            </div>

            {/* Confirm Password */}
            <div className="col-span-1">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="confirm-password"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your password"
              />
            </div>

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
                to={"/"}
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
