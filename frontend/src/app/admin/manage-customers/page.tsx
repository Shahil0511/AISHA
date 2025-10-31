"use client";

import { useState, useEffect } from "react";
import { Search, UserPlus, Edit, Trash2, Building } from "lucide-react";

interface Client {
  id: number;
  company: string;
  contactPerson: string;
  email: string;
  phone: string;
  status: string;
  projects: number;
}

export default function ManageClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setClients([
        {
          id: 1,
          company: "TechCorp Inc.",
          contactPerson: "Robert Brown",
          email: "robert@techcorp.com",
          phone: "+1 (555) 123-4567",
          status: "Active",
          projects: 3,
        },
        {
          id: 2,
          company: "Global Solutions",
          contactPerson: "Emily Davis",
          email: "emily@globalsolutions.com",
          phone: "+1 (555) 987-6543",
          status: "Active",
          projects: 5,
        },
        {
          id: 3,
          company: "Innovate Labs",
          contactPerson: "Michael Taylor",
          email: "michael@innovatelabs.com",
          phone: "+1 (555) 456-7890",
          status: "Inactive",
          projects: 0,
        },
        {
          id: 4,
          company: "Data Systems LLC",
          contactPerson: "Sarah Johnson",
          email: "sarah@datasystems.com",
          phone: "+1 (555) 234-5678",
          status: "Pending",
          projects: 2,
        },
      ]);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredClients = clients.filter(
    (c) =>
      c.company.toLowerCase().includes(search.toLowerCase()) ||
      c.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="text-gray-600">Loading clients...</div>;
  }

  return (
    <div className="space-y-6">
      {/* 🔍 Search Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-full max-w-sm">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none text-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium">
          <Building size={18} />
          Add Client
        </button>
      </div>

      {/* 👥 Clients Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="py-3 px-4 text-left">Company</th>
              <th className="py-3 px-4 text-left">Contact Person</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Projects</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => (
              <tr
                key={client.id}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4 font-medium text-gray-900">
                  {client.company}
                </td>
                <td className="py-3 px-4">{client.contactPerson}</td>
                <td className="py-3 px-4">{client.email}</td>
                <td className="py-3 px-4">{client.phone}</td>
                <td className="py-3 px-4">{client.projects}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      client.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : client.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {client.status}
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

      {filteredClients.length === 0 && (
        <div className="text-center text-gray-500 py-6">No clients found.</div>
      )}
    </div>
  );
}
