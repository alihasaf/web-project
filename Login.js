import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const form = e.target;
    const data = {
      username: form.username.value,
      password: form.password.value
    };
    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      setMessage(result.message);
      if (res.ok && result.message && result.message.toLowerCase().includes("success")) {
        navigate("/dashboard");
      }
    } catch (err) {
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm text-center">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">Login Form</h2>
        <form id="loginForm" className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Username" required className="px-4 py-3 rounded-lg border border-gray-200 focus:border-pink-400 bg-gray-50 focus:outline-none text-base" />
          <input type="password" name="password" placeholder="Password" required className="px-4 py-3 rounded-lg border border-gray-200 focus:border-pink-400 bg-gray-50 focus:outline-none text-base" />
          <button type="submit" disabled={loading} className="bg-gradient-to-r from-yellow-300 to-pink-400 text-white font-semibold rounded-lg py-3 mt-2 shadow hover:from-pink-400 hover:to-yellow-300 transition-all disabled:opacity-60">{loading ? "Logging in..." : "Login"}</button>
        </form>
        <div id="message" className="mt-4 text-pink-700 font-medium min-h-[1.2rem]">{message}</div>
      </div>
    </div>
  );
}
