"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  // Top panel buttons data
  const tabs = [
    { name: "Manage Users", path: "/admin/manage-users" },
    { name: "Manage Customers", path: "/admin/manage-customers" },
    { name: "Manage Managers", path: "/admin/manage-managers" },
  ];

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      router.push("/login");
    }
  }, [isAuthenticated, router, user]);

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen bg-gray-50 items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />

        {/* 🔹 Top Tabs - Now in layout */}
        <div className="border-b border-gray-200 bg-white">
          <div className="flex justify-center gap-6 px-6 pt-6">
            {tabs.map((tab) => (
              <button
                key={tab.path}
                onClick={() => router.push(tab.path)}
                className={`px-6 py-3 font-medium rounded-3xl transition-colors ${
                  pathname === tab.path
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
