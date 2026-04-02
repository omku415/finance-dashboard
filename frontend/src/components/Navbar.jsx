import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const isAdmin = user?.role === "admin";
  const isAnalyst = user?.role === "analyst";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="bg-black text-white p-4 flex items-center">
      
      {/* LEFT: Title */}
      <h1 className="font-bold text-lg">
        Finance Dashboard
      </h1>

      {/* CENTER: Menu */}
      <div className="flex-1 flex justify-center gap-6 items-center">
        <Link to="/dashboard">Dashboard</Link>

        {(isAnalyst || isAdmin) && (
          <Link to="/analytics">Analytics</Link>
        )}

        {isAdmin && <Link to="/records">Records</Link>}
        {isAdmin && <Link to="/admin/users">Manage Users</Link>}

        <button
          onClick={handleLogout}
          className=" text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;