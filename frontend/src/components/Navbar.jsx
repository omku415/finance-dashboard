import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="bg-black text-white p-4 flex justify-between items-center">
      <h1 className="font-bold text-lg">Finance Dashboard</h1>

      <div className="flex gap-4 items-center">
        <Link to="/dashboard" className="hover:underline">
          Dashboard
        </Link>

        <Link to="/records" className="hover:underline">
          Records
        </Link>

        <button
          onClick={handleLogout}
          className="bg-white text-black px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;