"use client";

import { LogOut, User, Settings, Bell, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { logout } from "@/features/auth/authSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function Topbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const isLoggedIn = Boolean(user);

  const handleLogout = () => {
    dispatch(logout());
  };

  // Safe user data extraction
  const userName = user?.name || user?.email || "User";
  const userInitial = userName.charAt(0).toUpperCase();
  const userEmail = user?.email || "";

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white border-b shadow-sm">
      {/* Left Section - Title/Breadcrumb */}
      <div>
        <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
        {isLoggedIn && (
          <p className="text-sm text-gray-500 mt-1">Welcome back, {userName}</p>
        )}
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <Button
          variant="ghost"
          size="sm"
          className="hidden sm:flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <Search className="h-4 w-4" />
          <span className="text-sm">Search</span>
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-600 hover:text-gray-900 relative"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
        </Button>

        {/* User Menu */}
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-gray-50"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {userInitial}
                  </span>
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {userName}
                  </p>
                  <p className="text-xs text-gray-500">{userEmail}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center gap-3 px-2 py-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">{userInitial}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">
                    {userName}
                  </span>
                  {userEmail && (
                    <span className="text-xs text-gray-500">{userEmail}</span>
                  )}
                </div>
              </div>

              <DropdownMenuSeparator />

              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            onClick={() => {
              /* Add login handler */
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white"
          >
            <User size={16} />
            <span>Login</span>
          </Button>
        )}
      </div>
    </header>
  );
}
