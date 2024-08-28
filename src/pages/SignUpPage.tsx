import { useState } from "react";
import { useSignupUserMutation } from "../redux/api/authApi";
import { toast } from "sonner";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { IoAlertCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [signupUser, { isLoading, error }] = useSignupUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signupUser(formData).unwrap();
      console.log("Signup successful:", result?.message);
      toast("Success!", {
        className: "border-green-500 text-base",
        description: result?.message,
        duration: 3000,
        icon: <IoCheckmarkDoneCircleOutline />,
      });

      // Handle success (e.g., navigate to login or dashboard)
    } catch (err) {
      console.log(err);
      // Extract error message
      const errorMessage =
        error && "status" in error
          ? (error.data as { message?: string })?.message || "An error occurred"
          : error?.message || "An unknown error occurred";

      console.error("Signup failed:", errorMessage);

      // Show error message in toast
      toast("Signup Failed", {
        className: "border-red-500 text-base",
        description: errorMessage,
        duration: 3000,
        icon: <IoAlertCircleOutline />,
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-pink-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition duration-300"
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
        <h5 className="text-center mt-5">
          {" "}
          Already have an Account? Please{" "}
          <Link className="text-blue-500 font-bold" to="/login">
            Login
          </Link>
        </h5>
      </form>
    </div>
  );
};

export default SignUpPage;
