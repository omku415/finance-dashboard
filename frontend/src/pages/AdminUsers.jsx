import { useEffect, useState } from "react";
import api from "../services/api";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdate = async (id, field, value) => {
    try {
      await api.patch(`/users/${id}`, {
        [field]: value,
      });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 text-black"> {/* ✅ FIX */}
      <h2 className="text-2xl font-bold mb-6 text-center">
        Admin User Management
      </h2>

      <div className="overflow-x-auto bg-white shadow rounded-lg text-black"> {/* ✅ FIX */}
        <table className="min-w-full text-sm text-left text-black"> {/* ✅ FIX */}
          <thead className="bg-black text-white">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b hover:bg-gray-50 transition text-black" // ✅ FIX
              >
                <td className="px-4 py-3 font-medium">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>

                {/* Role */}
                <td className="px-4 py-3">
                  <select
                    value={user.role}
                    onChange={(e) =>
                      handleUpdate(user._id, "role", e.target.value)
                    }
                    className="border rounded px-2 py-1 text-black bg-white" // ✅ FIX
                  >
                    <option value="viewer">Viewer</option>
                    <option value="analyst">Analyst</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  <select
                    value={user.status}
                    onChange={(e) =>
                      handleUpdate(user._id, "status", e.target.value)
                    }
                    className="border rounded px-2 py-1 text-black bg-white" // ✅ FIX
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </td>

                {/* Delete */}
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="text-center p-4 text-gray-500">
            No users found
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;