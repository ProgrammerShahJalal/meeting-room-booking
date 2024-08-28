import { useState } from "react";
import { useLoginUserMutation } from "../redux/api/authApi";
import { toast } from "sonner";
import {
  IoCheckmarkDoneCircleOutline,
  IoWarningOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loginUser, { isLoading, error }] = useLoginUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await loginUser(formData).unwrap();
      console.log("Login successful:", result?.message);
      toast("Success!", {
        className: "border-green-500 text-base",
        description: result?.message,
        duration: 3000,
        icon: <IoCheckmarkDoneCircleOutline />,
      });

      // Handle success (e.g., navigate to dashboard)
    } catch (err) {
      console.log(err);
      const errorMessage =
        error && "status" in error
          ? (error.data as { message?: string })?.message || "An error occurred"
          : error?.message || "An unknown error occurred";
      console.error("Login failed:", errorMessage);
      toast("Login Failed", {
        className: "border-red-500 text-base",
        description: errorMessage,
        duration: 3000,
        icon: <IoWarningOutline />,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-4 py-2 text-white rounded-xl ${
              isLoading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          {error && (
            <p className="mt-4 text-red-500 text-center">
              An error occurred. Please try again.
            </p>
          )}
        </form>
        <h5 className="text-center mt-5">
          {" "}
          Not Yet Signup? Please{" "}
          <Link className="text-blue-500 font-bold" to="/signup">
            Signup
          </Link>
          , it's free!
        </h5>
      </div>
    </div>
  );
};

export default LoginPage;
