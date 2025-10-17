"use client";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Menu, Bell, Search, Plus, Users, Folder, BarChart, Settings, User, LogOut } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { AuthModals } from "../../modals/Auth_Modals";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigationItems = [
    { name: "Projects", href: "/projects", icon: Folder },
    { name: "Team", href: "/team", icon: Users },
    { name: "Analytics", href: "/analytics", icon: BarChart },
  ];

  const handleLoginClick = () => {
    setIsLoginOpen(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-gray-900 border-gray-700 px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img 
                src="/logo.jpg" 
                alt="AI SHA Project Management" 
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg object-cover"
              />
              <span className="font-bold text-lg sm:text-xl tracking-tight text-white">
                AI SHA
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:block">
              <div className="flex items-center gap-2">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                  >
                    <Button
                      variant="ghost"
                      asChild
                      className="text-gray-300 hover:text-white hover:bg-gray-800"
                    >
                      <Link href={item.href} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </nav>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-2 text-gray-300 hover:text-black">
              <Search className="h-4 w-4" />
              <span>Search</span>
            </Button>

            {/* New Project */}
            <Button size="sm" className="hidden sm:flex items-center gap-2 bg-blue-500 hover:bg-blue-600">
              <Plus className="h-4 w-4" />
              <span>New Project</span>
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-black relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-gray-900"></span>
            </Button>

            {/* Settings Dropdown */}
        <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon" className="text-gray-300 hover:text-black">
      <Settings className="h-5 w-5" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="w-56 bg-gray-900 border-gray-700 text-white">
    {isLoggedIn && (
      <>
        <div className="flex items-center gap-3 px-2 py-1.5">
          <img 
            src="/logo.jpg" 
            alt="Profile" 
            className="h-8 w-8 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium">Your Account</span>
            <span className="text-xs text-gray-400">Manage settings</span>
          </div>
        </div>
        <DropdownMenuSeparator className="bg-gray-700" />
      </>
    )}
    
    <DropdownMenuItem className="flex items-center gap-2 text-gray-300 hover:!text-white hover:bg-gray-800 focus:bg-gray-800">
      <User className="h-4 w-4 text-inherit" />
      <span className="text-inherit">Profile</span>
    </DropdownMenuItem>
    
    <DropdownMenuItem className="flex items-center gap-2 text-gray-300 hover:!text-white hover:bg-gray-800 focus:bg-gray-800">
      <Settings className="h-4 w-4 text-inherit" />
      <span className="text-inherit">Settings</span>
    </DropdownMenuItem>

    <DropdownMenuSeparator className="bg-gray-700" />

    {isLoggedIn ? (
      <DropdownMenuItem 
        className="flex items-center gap-2 text-gray-300 hover:!text-white hover:bg-gray-800 focus:bg-gray-800"
        onClick={handleLogout}
      >
        <LogOut className="h-4 w-4 text-inherit" />
        <span className="text-inherit">Logout</span>
      </DropdownMenuItem>
    ) : (
      <DropdownMenuItem 
        className="flex items-center gap-2 text-gray-300 hover:!text-white hover:bg-gray-800 focus:bg-gray-800"
        onClick={handleLoginClick}
      >
        <User className="h-4 w-4 text-inherit" />
        <span className="text-inherit">Login</span>
      </DropdownMenuItem>
    )}
  </DropdownMenuContent>
</DropdownMenu>


            {/* Mobile Menu */}
         


<Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
  <SheetTrigger asChild>
    <Button variant="ghost" size="icon" className="lg:hidden text-gray-300 hover:text-white">
      <Menu className="h-5 w-5" />
    </Button>
  </SheetTrigger>
  <SheetContent side="right" className="bg-gray-900 border-gray-700 text-white sm:w-80">
    <SheetHeader className="text-left">
      <SheetTitle className="text-white flex items-center gap-3">
        <img 
          src="/logo.jpg" 
          alt="AI SHA" 
          className="h-8 w-8 rounded-lg object-cover"
        />
        <span>AI SHA</span>
      </SheetTitle>
      <SheetDescription className="text-gray-400">
        Project Management Platform
      </SheetDescription>
    </SheetHeader>

    {/* Rest of the mobile menu content remains the same */}
    <div className="flex-1 p-4 space-y-2 mt-4">
      {navigationItems.map((item, index) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: index * 0.05 }}
        >
          <Button
            variant="ghost"
            asChild
            className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Link href={item.href} className="flex items-center gap-3">
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          </Button>
        </motion.div>
      ))}

      {/* Mobile Actions */}
      <div className="pt-4 space-y-2">
        <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800">
          <Search className="h-4 w-4" />
          <span>Search</span>
        </Button>
        <Button className="w-full justify-start bg-blue-500 hover:bg-blue-600">
          <Plus className="h-4 w-4" />
          <span>New Project</span>
        </Button>
      </div>

      {/* Auth Section */}
      <div className="pt-4 border-t border-gray-700 space-y-2">
        {isLoggedIn ? (
          <Button 
            variant="ghost" 
            className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
            onClick={() => {
              handleLogout();
              setIsMobileMenuOpen(false);
            }}
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        ) : (
          <Button 
            variant="ghost" 
            className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
            onClick={() => {
              handleLoginClick();
              setIsMobileMenuOpen(false);
            }}
          >
            <User className="h-4 w-4" />
            <span>Login</span>
          </Button>
        )}
      </div>
    </div>
  </SheetContent>
</Sheet>
          </div>
        </div>
      </header>

      {/* Auth Modals */}
      <AuthModals
        isLoginOpen={isLoginOpen}
        setIsLoginOpen={setIsLoginOpen}
        isSignupOpen={isSignupOpen}
        setIsSignupOpen={setIsSignupOpen}
        setIsLoggedIn={setIsLoggedIn}
      />
    </>
  );
}