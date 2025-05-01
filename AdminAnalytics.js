import React, { useMemo } from "react";

// Helper: Get day name from date (0=Sun, 1=Mon...)
function getDayName(date) {
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()];
}

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function AdminAnalytics() {
  // Try to get orders from localStorage (simulate real orders)
  const orders = useMemo(() => {
    let parsed = [];
    try {
      const stored = localStorage.getItem("admin_orders");
      if (stored) parsed = JSON.parse(stored);
    } catch {}
    if (!parsed.length) {
      parsed = [
        { id: "ORD1234", customer: "Ayesha", payment: "COD", paid: false, status: "Processing", amount: 5999, date: new Date().toISOString(), product: "Black Abaya" },
        { id: "ORD1235", customer: "Fatima", payment: "Stripe", paid: true, status: "Shipped", amount: 7999, date: new Date(Date.now()-86400000).toISOString(), product: "White Hijab" },
        { id: "ORD1236", customer: "Zara", payment: "COD", paid: true, status: "Delivered", amount: 2999, date: new Date(Date.now()-2*86400000).toISOString(), product: "Classic Niqab" },
        { id: "ORD1237", customer: "Noor", payment: "Stripe", paid: false, status: "Processing", amount: 3999, date: new Date(Date.now()-3*86400000).toISOString(), product: "Black Abaya" },
        { id: "ORD1238", customer: "Ali", payment: "COD", paid: false, status: "Cancelled", amount: 9999, date: new Date(Date.now()-4*86400000).toISOString(), product: "White Hijab" },
      ];
    }
    return parsed;
  }, []);

  // Prepare weekly sales data (Mon-Sun)
  const salesByDay = useMemo(() => {
    const sales = Object.fromEntries(weekDays.map(d => [d, 0]));
    orders.forEach(o => {
      const d = new Date(o.date || Date.now());
      const day = getDayName(d);
      if (sales[day] !== undefined && o.status !== "Cancelled") sales[day] += o.amount || 0;
    });
    return weekDays.map(d => sales[d]);
  }, [orders]);

  // Product-wise sales
  const productSales = useMemo(() => {
    const map = {};
    orders.forEach(o => {
      if (o.status === "Cancelled") return;
      if (!map[o.product]) map[o.product] = 0;
      map[o.product] += o.amount || 0;
    });
    return map;
  }, [orders]);

  // Best selling products
  const bestSellers = Object.entries(productSales)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([name]) => name);

  // Total sales
  const totalSales = orders.filter(o=>o.status!=="Cancelled").reduce((sum,o)=>sum+(o.amount||0),0);

  // Chart URL
  const chartUrl =
    "https://quickchart.io/chart?c=" +
    encodeURIComponent(
      JSON.stringify({
        type: "bar",
        data: {
          labels: weekDays,
          datasets: [{ label: "Sales", data: salesByDay }],
        },
        options: {
          scales: { y: { beginAtZero: true } },
        },
      })
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-pink-50 p-6">
      <h1 className="text-2xl font-bold text-pink-700 mb-6">Analytics</h1>
      <div className="bg-white rounded-xl shadow p-6 mb-8 flex flex-col items-center">
        <div className="font-bold text-lg mb-2">Sales Chart (This Week)</div>
        <img src={chartUrl} alt="Sales Chart" className="w-full max-w-lg" />
        <div className="mt-4 font-bold text-pink-700">Total Sales: PKR {totalSales.toLocaleString()}</div>
      </div>
      <div className="flex gap-8 flex-wrap mb-8">
        <div className="bg-pink-100 rounded-lg p-4">
          <div className="font-bold">Best Selling Products</div>
          <ul className="list-disc ml-6 text-sm mt-2">
            {bestSellers.length ? bestSellers.map((p,i)=>(<li key={i}>{p}</li>)) : <li>No sales yet</li>}
          </ul>
        </div>
        <div className="bg-pink-100 rounded-lg p-4">
          <div className="font-bold">Product-wise Sales</div>
          <ul className="list-disc ml-6 text-sm mt-2">
            {Object.entries(productSales).length ? Object.entries(productSales).map(([p,amt],i)=>(<li key={i}>{p}: PKR {amt.toLocaleString()}</li>)) : <li>No sales data</li>}
          </ul>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <div className="font-bold mb-2">Recent Orders</div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th>Order ID</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.length ? orders.slice(0,10).map((o,i)=>(
              <tr key={o.id} className="border-b hover:bg-pink-50">
                <td>{o.id}</td>
                <td>{new Date(o.date).toLocaleDateString()}</td>
                <td>{o.customer}</td>
                <td>{o.product}</td>
                <td>{o.status}</td>
                <td>PKR {o.amount?.toLocaleString()}</td>
              </tr>
            )) : (
              <tr><td colSpan={6} className="text-center py-4">No orders yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
