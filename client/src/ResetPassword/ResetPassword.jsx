import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ResetPassword() {
  const { token } = useParams(); // Get token from URL
  const navigate = useNavigate(); // Redirect after success
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!password || !confirmPassword) {
      setError("Both fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, confirmPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccessMessage(data.message);
      setTimeout(() => navigate("/login"), 2000); // Redirect after 2s
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white text-center">
          Reset Password
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
          Enter a new password for your account.
        </p>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        {successMessage && <p className="text-green-500 text-center mt-2">{successMessage}</p>}

        <form className="mt-6" onSubmit={handleSubmit}>
          <label className="block mb-2 text-gray-700 dark:text-gray-300">New Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="absolute right-3 top-3 text-gray-500 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <label className="block mt-4 mb-2 text-gray-700 dark:text-gray-300">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span className="absolute right-3 top-3 text-gray-500 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all duration-300">
            Reset Password
          </button>
        </form>

        <div className="mt-4 text-center">
          <a href="/login" className="text-blue-500 hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
