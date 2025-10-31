"use client";

import { useState, useEffect } from "react";
import { Search, UserPlus, Edit, Trash2 } from "lucide-react";

interface Manager {
  id: number;
  name: string;
  email: string;
  department: string;
  status: string;
  employees: number;
}

export default function ManageManagersPage() {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setManagers([
        {
          id: 1,
          name: "Alex Thompson",
          email: "alex@example.com",
          department: "Sales",
          status: "Active",
          employees: 8,
        },
        {
          id: 2,
          name: "Maria Garcia",
          email: "maria@example.com",
          department: "Marketing",
          status: "Active",
          employees: 5,
        },
        {
          id: 3,
          name: "David Wilson",
          email: "david@example.com",
          department: "Operations",
          status: "On Leave",
          employees: 12,
        },
        {
          id: 4,
          name: "Lisa Chen",
          email: "lisa@example.com",
          department: "IT",
          status: "Active",
          employees: 6,
        },
      ]);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredManagers = managers.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.department.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="text-gray-600">Loading managers...</div>;
  }

  return (
    <div className="space-y-6">
      {/* 🔍 Search Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-full max-w-sm">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search managers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none text-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium">
          <UserPlus size={18} />
          Add Manager
        </button>
      </div>

      {/* 👥 Managers Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Department</th>
              <th className="py-3 px-4 text-left">Employees</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredManagers.map((manager) => (
              <tr
                key={manager.id}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4 font-medium text-gray-900">
                  {manager.name}
                </td>
                <td className="py-3 px-4">{manager.email}</td>
                <td className="py-3 px-4">{manager.department}</td>
                <td className="py-3 px-4">{manager.employees}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      manager.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : manager.status === "On Leave"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {manager.status}
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

      {filteredManagers.length === 0 && (
        <div className="text-center text-gray-500 py-6">No managers found.</div>
      )}
    </div>
  );
}
