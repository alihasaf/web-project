import React, { useState } from "react";

const demoOrders = [
  { id: "ORD1234", customer: "Ayesha", payment: "COD", paid: false, status: "Processing" },
  { id: "ORD1235", customer: "Fatima", payment: "Stripe", paid: true, status: "Shipped" },
  { id: "ORD1236", customer: "Zara", payment: "COD", paid: true, status: "Delivered" },
  { id: "ORD1237", customer: "Noor", payment: "Stripe", paid: false, status: "Processing" },
  { id: "ORD1238", customer: "Ali", payment: "COD", paid: false, status: "Cancelled" },
];

const statusOptions = ["Processing", "Shipped", "Delivered", "Cancelled"];

export default function AdminOrders() {
  const [orders, setOrders] = useState(demoOrders);

  const handleStatusChange = (id, newStatus) => {
    setOrders(orders => orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };
  const handleDelete = (id) => {
    setOrders(orders => orders.filter(o => o.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-pink-50 p-6">
      <h1 className="text-2xl font-bold text-pink-700 mb-6">Manage Orders</h1>
      <table className="w-full bg-white rounded-xl shadow text-sm">
        <thead>
          <tr className="border-b">
            <th>Order ID</th>
            <th>Customer</th>
            <th>Payment</th>
            <th>Paid</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id} className="border-b hover:bg-pink-50">
              <td>{o.id}</td>
              <td>{o.customer}</td>
              <td>{o.payment}</td>
              <td>{o.paid ? "Paid" : "Unpaid"}</td>
              <td>
                <select value={o.status} onChange={e => handleStatusChange(o.id, e.target.value)} className="border rounded px-2 py-1">
                  {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </td>
              <td>
                <button className="text-blue-600 underline mr-2">View</button>
                <button className="text-red-600 underline mr-2" onClick={() => handleDelete(o.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
