import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import API from "../services/api";

const Login = () => {
  const [role, setRole] = useState("viewer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      // store token
      localStorage.setItem("token", res.data.data.token);

      // store user (optional)
      localStorage.setItem("user", JSON.stringify(res.data.data.user));

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white text-black">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white border border-gray-300 p-6 rounded shadow mx-4"
      >
        <fieldset>
          <legend className="text-lg font-semibold text-center mb-4">
            Login
          </legend>

          {/* Email */}
          <label className="block mt-3">Email</label>
          <input
            type="email"
            className="w-full mt-1 p-2 rounded border border-gray-400 bg-white text-black"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password */}
          <label className="block mt-3">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full mt-1 p-2 rounded border border-gray-400 bg-white text-black pr-10"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              👁
            </span>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-black text-white py-2 rounded font-semibold"
          >
            Login
          </button>

          {/* Register Link */}
          <div className="mt-3 text-sm text-center">
            <Link to="/register" className="underline text-blue-600">
              Don’t have an account? Register
            </Link>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
