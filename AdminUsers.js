import React, { useState } from "react";

const demoUsers = [
  { id: 1, name: "Ayesha", email: "ayesha@email.com", role: "User", status: "Active" },
  { id: 2, name: "Fatima", email: "fatima@email.com", role: "User", status: "Blocked" },
  { id: 3, name: "Ali", email: "ali@email.com", role: "Admin", status: "Active" },
  { id: 4, name: "Noor", email: "noor@email.com", role: "User", status: "Active" },
];

export default function AdminUsers() {
  const [users, setUsers] = useState(demoUsers);

  const makeAdmin = (id) => {
    setUsers(users => users.map(u => u.id === id ? { ...u, role: "Admin" } : u));
  };
  const blockUser = (id) => {
    setUsers(users => users.map(u => u.id === id ? { ...u, status: "Blocked" } : u));
  };
  const handleDelete = (id) => {
    setUsers(users => users.filter(u => u.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-pink-50 p-6">
      <h1 className="text-2xl font-bold text-pink-700 mb-6">Manage Users</h1>
      <table className="w-full bg-white rounded-xl shadow text-sm">
        <thead>
          <tr className="border-b">
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} className="border-b hover:bg-pink-50">
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.status}</td>
              <td>
                <button className="text-green-700 underline mr-2" onClick={() => makeAdmin(u.id)}>Make Admin</button>
                <button className="text-yellow-700 underline mr-2" onClick={() => blockUser(u.id)}>Block</button>
                <button className="text-red-600 underline" onClick={() => handleDelete(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
