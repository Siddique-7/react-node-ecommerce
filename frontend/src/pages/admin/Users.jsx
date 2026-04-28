import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FiUser, FiTrash2 } from "react-icons/fi";

import authAPI from "../../services/authAPI";
import Loader from "../../components/Loader";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await authAPI.getAllUsers();
      setUsers(res.data.users || []);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const getRoleStyle = (role) => {
    if (role === "admin") return "bg-purple-100 text-purple-600";
    return "bg-gray-100 text-gray-600";
  };

  const handleDelete = async (id) => {
    try {
      await authAPI.deleteUser(id);
      toast.success("User deleted");
      fetchUsers();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div>
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FiUser /> Users
      </h1>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        {users.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No users found
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="p-4 text-left">User</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  {/* Name + Avatar */}
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full text-sm font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium">{user.name}</span>
                  </td>

                  {/* Email */}
                  <td className="p-4 text-gray-600">
                    {user.email}
                  </td>

                  {/* Role Badge */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleStyle(
                        user.role
                      )}`}
                    >
                      {user.role || "user"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="inline-flex items-center gap-1 text-red-600 hover:underline"
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Users;