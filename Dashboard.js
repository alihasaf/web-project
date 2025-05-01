import React from "react";
import { Link, useNavigate } from "react-router-dom";

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center w-44">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="font-bold text-2xl text-pink-700">{value}</div>
      <div className="text-gray-600 text-sm mt-1 text-center">{title}</div>
    </div>
  );
}

export default function Dashboard() {
  // Get orders from localStorage (simulate real database)
  let orders = [];
  try {
    const stored = localStorage.getItem("admin_orders");
    if (stored) orders = JSON.parse(stored);
  } catch {}

  // If no orders, show empty state
  const latestOrders = orders.slice(0, 5);
  const totalOrders = orders.length;
  const totalSales = orders.filter(o => o.status !== "Cancelled").reduce((sum, o) => sum + (o.amount || 0), 0);
  // For demo, users and stock static
  const stats = [
    { title: "Total Orders", value: totalOrders, icon: "📦" },
    { title: "Total Sales", value: `PKR ${totalSales.toLocaleString()}`, icon: "💰" },
    { title: "Total Users", value: 78, icon: "👤" },
    { title: "Low Stock", value: 3, icon: "⚠️" },
  ];

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100 p-6">
      <h1 className="text-3xl font-bold text-pink-700 mb-6">Admin Dashboard</h1>
      <div className="flex flex-wrap gap-6 mb-10">
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <div className="font-bold text-lg mb-4">Latest 5 Orders</div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th>Order ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Amount</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {latestOrders.length ? latestOrders.map(o => (
              <tr key={o.id} className="border-b hover:bg-pink-50">
                <td>{o.id}</td>
                <td>{o.customer}</td>
                <td>{o.status}</td>
                <td>PKR {o.amount?.toLocaleString()}</td>
                <td><button onClick={()=>navigate(`/admin/orders/${o.id}`)} className="text-pink-600 underline">View</button></td>
              </tr>
            )) : (
              <tr><td colSpan={5} className="text-center py-4">No orders yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex gap-4 flex-wrap">
        <Link to="/admin/orders" className="bg-pink-200 text-pink-700 px-6 py-3 rounded font-bold hover:bg-pink-300">Manage Orders</Link>
        <Link to="/admin/products" className="bg-pink-200 text-pink-700 px-6 py-3 rounded font-bold hover:bg-pink-300">Manage Products</Link>
        <Link to="/admin/users" className="bg-pink-200 text-pink-700 px-6 py-3 rounded font-bold hover:bg-pink-300">Manage Users</Link>
        <Link to="/admin/analytics" className="bg-pink-200 text-pink-700 px-6 py-3 rounded font-bold hover:bg-pink-300">Analytics</Link>
        <Link to="/admin/settings" className="bg-pink-200 text-pink-700 px-6 py-3 rounded font-bold hover:bg-pink-300">Settings</Link>
      </div>
    </div>
  );
}
