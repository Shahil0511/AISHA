"use client";
import {
  TrendingUp,
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  Eye,
  MoreHorizontal,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// Mock data - replace with actual API calls
const mockStats = {
  totalProducts: 1247,
  totalUsers: 8923,
  totalOrders: 3456,
  totalRevenue: 125430,
  growth: {
    products: 12.5,
    users: 8.2,
    orders: -3.1,
    revenue: 15.7,
  },
};

const recentActivities = [
  { id: 1, user: "John Doe", action: "created new product", time: "2 min ago" },
  {
    id: 2,
    user: "Sarah Smith",
    action: "updated inventory",
    time: "5 min ago",
  },
  {
    id: 3,
    user: "Mike Johnson",
    action: "placed new order",
    time: "10 min ago",
  },
  {
    id: 4,
    user: "Emily Brown",
    action: "registered account",
    time: "15 min ago",
  },
];

const topProducts = [
  { id: 1, name: "Wireless Headphones", sales: 234, revenue: 12560 },
  { id: 2, name: "Smart Watch", sales: 189, revenue: 9560 },
  { id: 3, name: "Laptop Stand", sales: 156, revenue: 4230 },
  { id: 4, name: "USB-C Cable", sales: 142, revenue: 1280 },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState(mockStats);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleManageUserCLick = () => {
    router.push("/admin/manage-users");
  };

  const StatCard = ({
    title,
    value,
    icon: Icon,
    growth,
    prefix = "",
    suffix = "",
  }: {
    title: string;
    value: number;
    icon: React.ElementType;
    growth: number;
    prefix?: string;
    suffix?: string;
  }) => (
    <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {prefix}
            {loading ? "..." : value.toLocaleString()}
            {suffix}
          </p>
          <div
            className={`flex items-center gap-1 mt-2 text-sm ${
              growth >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {growth >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            <span>{Math.abs(growth)}%</span>
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          <Icon className="text-blue-600" size={24} />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-xl border border-gray-200 animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Dashboard Overview
          </h2>
          <p className="text-gray-600 mt-1">Welcome to your admin dashboard</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Export Report
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Generate Insights
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={stats.totalRevenue}
          icon={DollarSign}
          growth={stats.growth.revenue}
          prefix="$"
        />
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={Users}
          growth={stats.growth.users}
        />
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          icon={Package}
          growth={stats.growth.products}
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={ShoppingCart}
          growth={stats.growth.orders}
        />
      </div>

      {/* Charts and Additional Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Activities
            </h3>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal size={20} />
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Eye size={16} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    <span className="font-semibold">{activity.user}</span>{" "}
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Top Selling Products
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                    <span className="text-sm font-bold text-green-600">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {product.sales} sales
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    ${product.revenue.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center">
            <Package className="mx-auto mb-2 text-blue-600" size={24} />
            <p className="text-sm font-medium text-gray-900">Add Product</p>
          </button>
          <button
            onClick={handleManageUserCLick}
            className="p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-center"
          >
            <Users className="mx-auto mb-2 text-green-600" size={24} />
            <p className="text-sm font-medium text-gray-900">Manage Users</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-center">
            <ShoppingCart className="mx-auto mb-2 text-purple-600" size={24} />
            <p className="text-sm font-medium text-gray-900">View Orders</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors text-center">
            <TrendingUp className="mx-auto mb-2 text-orange-600" size={24} />
            <p className="text-sm font-medium text-gray-900">Analytics</p>
          </button>
        </div>
      </div>
    </div>
  );
}
