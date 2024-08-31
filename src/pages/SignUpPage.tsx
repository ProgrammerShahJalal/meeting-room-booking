import { useState } from "react";
import {
  useSignupUserMutation,
  useLoginUserMutation,
} from "../redux/api/authApi";
import { toast } from "sonner";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { IoAlertCircleOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/features/authSlice";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [signupUser, { isLoading: isSignupLoading, error: signupError }] =
    useSignupUserMutation();
  const [loginUser, { isLoading: isLoginLoading, error: loginError }] =
    useLoginUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Perform signup
      const signupResult = await signupUser(formData).unwrap();
      console.log("Signup successful:", signupResult?.message);
      toast("Signup Successful!", {
        className: "border-green-500 text-base",
        description: signupResult?.message,
        duration: 3000,
        icon: <IoCheckmarkDoneCircleOutline />,
      });

      // Perform login
      const loginResult = await loginUser({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      const { data: user, token } = loginResult;

      if (user && token) {
        dispatch(loginSuccess({ user, token })); // Passing both user and token to loginSuccess

        const from =
          (location.state as { from?: Location })?.from?.pathname || "/";
        navigate(from); // Redirect to the requested page or home page
      } else {
        throw new Error("Login failed: No user or token returned");
      }
    } catch (err) {
      console.error("Error:", err);
      const errorMessage =
        signupError && "status" in signupError
          ? (signupError.data as { message?: string })?.message ||
            "Signup error occurred"
          : signupError?.message || "An unknown error occurred during signup";

      toast("Signup Failed", {
        className: "border-red-500 text-base",
        description: errorMessage,
        duration: 3000,
        icon: <IoAlertCircleOutline />,
      });

      if (loginError) {
        const loginErrorMessage =
          loginError && "status" in loginError
            ? (loginError.data as { message?: string })?.message ||
              "Login error occurred"
            : loginError?.message || "An unknown error occurred during login";

        toast("Login Failed", {
          className: "border-red-500 text-base",
          description: loginErrorMessage,
          duration: 3000,
          icon: <IoAlertCircleOutline />,
        });
      }
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
            disabled={isSignupLoading || isLoginLoading}
            className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition duration-300"
          >
            {isSignupLoading || isLoginLoading ? "Signing Up..." : "Sign Up"}
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
