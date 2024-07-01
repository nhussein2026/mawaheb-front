import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn || user.role !== "Admin") {
      navigate("/login");
    } else {
      fetchUsers();
    }
  }, [isLoggedIn, user, navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      const allUsers = data.users;
      if (Array.isArray(allUsers)) {
        setUsers(allUsers);
        setFilteredUsers(allUsers);
      } else {
        throw new Error("Users data is not an array");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: newRole }),
      });
      if (!response.ok) {
        throw new Error('Failed to update user role');
      }
      fetchUsers();
    } catch (error) {
      console.error('Error updating user role:', error);
      setError(error.message);
    }
  };

  const handleRoleFilterChange = (e) => {
    const role = e.target.value;
    setSelectedRole(role);
    if (role === "") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter(user => user.role === role));
    }
  };

  return (
    <div className="container mx-auto p-4">

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading && <div className="text-blue-500 mb-4">Loading users...</div>}

      <div className="mb-4">
        <label htmlFor="roleFilter" className="mr-2 ">Filter by role:</label>
        <select
          id="roleFilter"
          value={selectedRole}
          onChange={handleRoleFilterChange}
          className="p-2 rounded border border-gray-300 focus:outline-none focus:border-gold"
        >
          <option value="">All Roles</option>
          <option value="User">User</option>
          <option value="Employee">Employee</option>
          <option value="Admin">Admin</option>
          <option value="Institute Student">Institute Student</option>
          <option value="Scholarship Student">Scholarship Student</option>
        </select>
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user._id}>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className="border px-4 py-2">
                  <select
                    value={user.role}
                    onChange={(e) => updateUserRole(user._id, e.target.value)}
                    className="bg-gray-200 p-2 rounded"
                  >
                    <option value="User">User</option>
                    <option value="Employee">Employee</option>
                    <option value="Admin">Admin</option>
                    <option value="Institute Student">Institute Student</option>
                    <option value="Scholarship Student">Scholarship Student</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="border px-4 py-2 text-center">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
