"use client";

import { useState, useEffect } from "react";
import {
  Search,
  UserPlus,
  Edit,
  Trash2,
  User,
  Mail,
  Shield,
  UserCheck,
} from "lucide-react";
import { AddEntityModal, FormField } from "../components/Modal";
import { useDispatch } from "react-redux";
import { addUser } from "@/features/users/userSlice";
import { useGetUsersQuery, useAddUserMutation } from "@/features/users/userApi";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  department: string;
}

export default function ManageUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [addUserModal, setAddUserModal] = useState(false);
  const dispatch = useDispatch();
  const { data: usersData = [], isLoading } = useGetUsersQuery();
  const [createUser, { isLoading: addingUser }] = useAddUserMutation();

  // Form configuration for users
  const userFormFields: FormField[] = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      placeholder: "Enter full name",
      required: true,
      icon: User,
      validation: {
        minLength: {
          value: 2,
          message: "Name must be at least 2 characters",
        },
      },
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter email address",
      required: true,
      icon: Mail,
      validation: {
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address",
        },
      },
    },

    {
      name: "role",
      label: "Role",
      type: "text",
      placeholder: "Enter user role (e.g. Admin, Editor, Viewer)",
      required: true,
      icon: Shield,
    },
    {
      name: "department",
      label: "Department",
      type: "text",
      placeholder: "Enter department name",
      required: true,
      icon: UserCheck,
    },
  ];

  const handleAddUser = async (userData: any) => {
    try {
      const newUser = await createUser(userData).unwrap();
      dispatch(addUser(newUser));
      setAddUserModal(false);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const filteredUsers = usersData.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return <div className="text-gray-600">Loading users...</div>;
  }

  return (
    <div className="space-y-6">
      {/* 🔍 Search Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-full max-w-sm">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none text-sm"
          />
        </div>
        <button
          onClick={() => setAddUserModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium"
        >
          <UserPlus size={18} />
          Add User
        </button>
      </div>

      {/* 👥 Users Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="py-3 px-4 text-left">EmployeeId</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4 font-medium text-gray-900">
                  {user.id}
                </td>
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.role}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right space-x-2">
                  <button className="p-1 hover:text-blue-600">
                    <Edit size={16} />
                  </button>
                  <button className="p-1 hover:text-red-600">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center text-gray-500 py-6">No users found.</div>
      )}

      {/* Add User Modal */}
      <AddEntityModal
        isOpen={addUserModal}
        onClose={() => setAddUserModal(false)}
        onAddEntity={handleAddUser}
        title="Add New User"
        description="Fill in the details to add a new user to the system"
        formFields={userFormFields}
        submitButtonText="Add User"
      />
    </div>
  );
}
