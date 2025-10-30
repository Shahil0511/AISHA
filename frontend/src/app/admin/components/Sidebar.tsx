"use client";

import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Store,
  TrendingUp,
  FileText,
  MessageSquare,
  Palette,
  Shield,
  LogOut,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SidebarItem {
  name: string;
  icon: React.ElementType;
  path: string;
  badge?: number;
  children?: SidebarItem[];
}

const mainLinks: SidebarItem[] = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin",
    badge: 5,
  },
  {
    name: "Products",
    icon: Package,
    path: "/admin/products",
    children: [
      { name: "All Products", icon: Package, path: "/admin/products" },
      {
        name: "Categories",
        icon: FileText,
        path: "/admin/products/categories",
      },
      { name: "Inventory", icon: Store, path: "/admin/products/inventory" },
    ],
  },
  {
    name: "Customers",
    icon: Users,
    path: "/admin/customers",
    badge: 12,
  },
  {
    name: "Orders",
    icon: ShoppingCart,
    path: "/admin/orders",
    badge: 23,
  },
  {
    name: "Analytics",
    icon: BarChart3,
    path: "/admin/analytics",
    children: [
      {
        name: "Sales Report",
        icon: TrendingUp,
        path: "/admin/analytics/sales",
      },
      {
        name: "Customer Insights",
        icon: Users,
        path: "/admin/analytics/customers",
      },
      {
        name: "Inventory Report",
        icon: Package,
        path: "/admin/analytics/inventory",
      },
    ],
  },
];

const secondaryLinks: SidebarItem[] = [
  {
    name: "Marketing",
    icon: MessageSquare,
    path: "/admin/marketing",
  },
  {
    name: "Appearance",
    icon: Palette,
    path: "/admin/appearance",
  },
];

const bottomLinks: SidebarItem[] = [
  {
    name: "Settings",
    icon: Settings,
    path: "/admin/settings",
  },
  {
    name: "Admin Users",
    icon: Shield,
    path: "/admin/users",
  },
];

interface SidebarLinkProps {
  item: SidebarItem;
  isActive: boolean;
  isCollapsed: boolean;
  level?: number;
  onItemClick?: () => void;
}

function SidebarLink({
  item,
  isActive,
  isCollapsed,
  level = 0,
  onItemClick,
}: SidebarLinkProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const Icon = item.icon;

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
    onItemClick?.();
  };

  return (
    <div>
      <Link
        href={hasChildren ? "#" : item.path}
        onClick={handleClick}
        className={cn(
          "flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
          "hover:bg-blue-50 hover:text-blue-700",
          isActive && "bg-blue-50 text-blue-700 border-r-2 border-blue-600",
          level > 0 && "ml-4 text-sm",
          isCollapsed && "justify-center px-3"
        )}
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <Icon
            size={18}
            className={cn(
              "flex-shrink-0",
              isActive
                ? "text-blue-600"
                : "text-gray-500 group-hover:text-blue-600"
            )}
          />
          {!isCollapsed && <span className="truncate flex-1">{item.name}</span>}
        </div>

        {!isCollapsed && (
          <div className="flex items-center gap-1 flex-shrink-0">
            {item.badge && (
              <span
                className={cn(
                  "px-2 py-1 text-xs rounded-full font-medium",
                  isActive
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 group-hover:bg-blue-600 group-hover:text-white"
                )}
              >
                {item.badge}
              </span>
            )}
            {hasChildren && (
              <ChevronRight
                size={16}
                className={cn(
                  "transition-transform duration-200",
                  isExpanded && "rotate-90",
                  isActive ? "text-blue-600" : "text-gray-400"
                )}
              />
            )}
          </div>
        )}
      </Link>

      {hasChildren && !isCollapsed && isExpanded && (
        <div className="mt-1 space-y-1">
          {item.children!.map((child) => (
            <SidebarLink
              key={child.path}
              item={child}
              isActive={false}
              isCollapsed={isCollapsed}
              level={level + 1}
              onItemClick={onItemClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (item: SidebarItem): boolean => {
    if (item.path === pathname) return true;
    if (item.children) {
      return item.children.some((child) => isActive(child));
    }
    return false;
  };

  return (
    <aside
      className={cn(
        "bg-white border-r shadow-sm flex flex-col transition-all duration-300 relative",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Store className="text-white" size={18} />
            </div>
            <div>
              <h1 className="font-bold text-gray-900">RetailCRM</h1>
              <p className="text-xs text-gray-500">Enterprise Edition</p>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* User Info */}
      {!isCollapsed && (
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="text-gray-600" size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">
                John Anderson
              </p>
              <p className="text-xs text-gray-500 truncate">Admin</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-1">
          {mainLinks.map((item) => (
            <SidebarLink
              key={item.path}
              item={item}
              isActive={isActive(item)}
              isCollapsed={isCollapsed}
              onItemClick={() => {
                // Close sidebar on mobile if needed
                if (window.innerWidth < 768) {
                  // Add mobile sidebar close logic here
                }
              }}
            />
          ))}
        </div>

        {!isCollapsed && (
          <div className="px-4 py-2">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Marketing
            </p>
          </div>
        )}

        <div className="p-2 space-y-1">
          {secondaryLinks.map((item) => (
            <SidebarLink
              key={item.path}
              item={item}
              isActive={isActive(item)}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="border-t">
        <div className="p-2 space-y-1">
          {bottomLinks.map((item) => (
            <SidebarLink
              key={item.path}
              item={item}
              isActive={isActive(item)}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>

        {/* Logout */}
        <button
          className={cn(
            "flex items-center gap-3 w-full p-4 text-gray-700 hover:bg-gray-50 transition-colors border-t",
            isCollapsed && "justify-center"
          )}
        >
          <LogOut size={18} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>

      {/* Collapsed Tooltip */}
      {isCollapsed && (
        <div className="absolute left-full top-2 ml-2 hidden group-hover:block">
          <div className="bg-gray-900 text-white text-sm rounded py-1 px-2 whitespace-nowrap">
            Tooltip content
          </div>
        </div>
      )}
    </aside>
  );
}
