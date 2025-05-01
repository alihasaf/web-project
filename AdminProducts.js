import React, { useState } from "react";

const demoProducts = [
  { id: 1, name: "Black Abaya", price: 5999, category: "Abaya", stock: 5, rating: 4.7 },
  { id: 2, name: "White Hijab", price: 1499, category: "Hijab", stock: 15, rating: 4.5 },
  { id: 3, name: "Classic Niqab", price: 999, category: "Niqab", stock: 2, rating: 4.9 },
  { id: 4, name: "Colorful Dubata", price: 899, category: "Dubata", stock: 20, rating: 4.2 },
];

export default function AdminProducts() {
  const [products, setProducts] = useState(demoProducts);

  const handleDelete = (id) => {
    setProducts(products => products.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-pink-50 p-6">
      <h1 className="text-2xl font-bold text-pink-700 mb-6">Manage Products</h1>
      <button className="mb-4 bg-pink-600 text-white px-4 py-2 rounded font-bold hover:bg-pink-700">Add New Product</button>
      <table className="w-full bg-white rounded-xl shadow text-sm">
        <thead>
          <tr className="border-b">
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id} className="border-b hover:bg-pink-50">
              <td>{p.name}</td>
              <td>PKR {p.price}</td>
              <td>{p.category}</td>
              <td>{p.stock}</td>
              <td>{p.rating}</td>
              <td>
                <button className="text-blue-600 underline mr-2">Edit</button>
                <button className="text-red-600 underline" onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
