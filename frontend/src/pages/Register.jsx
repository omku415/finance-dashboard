import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Register = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("viewer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      alert("Registration successful");

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white text-black">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-white border border-gray-300 p-6 rounded shadow mx-4"
      >
        <fieldset>
          <legend className="text-lg font-semibold text-center mb-4">
            Register
          </legend>

          {/* Name */}
          <label className="block mt-2">Name</label>
          <input
            type="text"
            className="w-full mt-1 p-2 rounded border border-gray-400 bg-white text-black"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* Role */}
          <label className="block mt-3">Role</label>
          <select
            className="w-full mt-1 p-2 rounded border border-gray-400 bg-white text-black"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="viewer">Viewer</option>
            <option value="analyst">Analyst</option>
            <option value="admin">Admin</option>
          </select>

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
            Register
          </button>

          {/* Login Link */}
          <div className="mt-3 text-sm text-center">
            <a href="/" className="underline text-blue-600">
              Already have an account? Login
            </a>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
