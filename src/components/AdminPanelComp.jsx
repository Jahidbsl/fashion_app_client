"use client";

import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const salesData = [
  { name: "Jan", sales: 4000, orders: 240 },
  { name: "Feb", sales: 3000, orders: 198 },
  { name: "Mar", sales: 5000, orders: 300 },
  { name: "Apr", sales: 2780, orders: 190 },
  { name: "May", sales: 6890, orders: 420 },
  { name: "Jun", sales: 4390, orders: 280 },
  { name: "Jul", sales: 8490, orders: 510 },
];

const categoryData = [
  { name: "Men", stock: 120 },
  { name: "Women", stock: 200 },
  { name: "Kids", stock: 80 },
  { name: "Accessories", stock: 150 },
];

const AdminPanelComp = () => {
  return (
    <div className="p-6 space-y-6 bg-base-200 min-h-screen">
      {/* পেজের শিরোনাম */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <span className="text-sm bg-primary text-primary-content px-3 py-1 rounded-full">
          Welcome, Admin
        </span>
      </div>

      {/* স্ট্যাটাস কার্ড বা ওভারভিউ */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="stat bg-base-100 shadow rounded-box">
          <div className="stat-title">Total Sales</div>
          <div className="stat-value text-primary">$34,350</div>
          <div className="stat-desc">↗︎ 12% more than last month</div>
        </div>
        <div className="stat bg-base-100 shadow rounded-box">
          <div className="stat-title">Total Orders</div>
          <div className="stat-value text-secondary">2,138</div>
          <div className="stat-desc">↗︎ 8% new orders</div>
        </div>
        <div className="stat bg-base-100 shadow rounded-box">
          <div className="stat-title">Total Products</div>
          <div className="stat-value">550</div>
          <div className="stat-desc">Active in store</div>
        </div>
        <div className="stat bg-base-100 shadow rounded-box">
          <div className="stat-title">Active Users</div>
          <div className="stat-value">1,200</div>
          <div className="stat-desc">↘︎ 3% decreased</div>
        </div>
      </div>

      {/* গ্রাফ সেকশন */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* লাইন চার্ট: মাসিক সেলস ওভারভিউ */}
        <div className="bg-base-100 p-4 rounded-box shadow">
          <h2 className="text-lg font-semibold mb-4">Monthly Sales Overview</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#570df8"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* বার চার্ট: ক্যাটাগরি অনুযায়ী প্রোডাক্ট স্টক */}
        <div className="bg-base-100 p-4 rounded-box shadow">
          <h2 className="text-lg font-semibold mb-4">Products by Category</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="stock" fill="#36d399" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanelComp;