import React, { useState } from "react";

export default function AdminSettings() {
  // Change Password
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  // Categories/Tags
  const [categories, setCategories] = useState(["Abaya", "Hijab", "Niqab", "Dubata"]);
  const [newCategory, setNewCategory] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState("");

  // Shipping Rules
  const [shippingRules, setShippingRules] = useState([
    { id: 1, name: "Flat Rate", value: "PKR 200" },
    { id: 2, name: "Free Shipping Above PKR 5000", value: "PKR 0" },
  ]);
  const [newRule, setNewRule] = useState({ name: "", value: "" });
  const [editRuleIndex, setEditRuleIndex] = useState(-1);
  const [editRule, setEditRule] = useState({ name: "", value: "" });

  // Banners
  const [banners, setBanners] = useState([]);
  const [bannerFile, setBannerFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);

  // Password Logic
  const handleChangePassword = (e) => {
    e.preventDefault();
    setMsg("Password changed successfully (demo)");
    setPassword("");
  };

  // Category Logic
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
    }
  };
  const handleEditCategory = (i) => {
    setEditIndex(i);
    setEditValue(categories[i]);
  };
  const handleSaveEditCategory = (i) => {
    if (editValue.trim()) {
      const updated = [...categories];
      updated[i] = editValue.trim();
      setCategories(updated);
      setEditIndex(-1);
      setEditValue("");
    }
  };
  const handleDeleteCategory = (i) => {
    setCategories(categories.filter((_, idx) => idx !== i));
  };

  // Shipping Rules Logic
  const handleAddRule = (e) => {
    e.preventDefault();
    if (newRule.name && newRule.value) {
      setShippingRules([...shippingRules, { ...newRule, id: Date.now() }]);
      setNewRule({ name: "", value: "" });
    }
  };
  const handleEditRule = (i) => {
    setEditRuleIndex(i);
    setEditRule(shippingRules[i]);
  };
  const handleSaveEditRule = (i) => {
    if (editRule.name && editRule.value) {
      const updated = [...shippingRules];
      updated[i] = { ...editRule };
      setShippingRules(updated);
      setEditRuleIndex(-1);
      setEditRule({ name: "", value: "" });
    }
  };
  const handleDeleteRule = (i) => {
    setShippingRules(shippingRules.filter((_, idx) => idx !== i));
  };

  // Banner Logic
  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    setBannerFile(file);
    setBannerPreview(file ? URL.createObjectURL(file) : null);
  };
  const handleAddBanner = (e) => {
    e.preventDefault();
    if (bannerFile) {
      setBanners([...banners, bannerPreview]);
      setBannerFile(null);
      setBannerPreview(null);
    }
  };
  const handleDeleteBanner = (i) => {
    setBanners(banners.filter((_, idx) => idx !== i));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-pink-50 p-6">
      <h1 className="text-2xl font-bold text-pink-700 mb-6">Settings</h1>
      {/* Change Password */}
      <form onSubmit={handleChangePassword} className="bg-white rounded-xl shadow p-6 mb-8 max-w-md">
        <div className="font-bold mb-2">Change Admin Password</div>
        <input
          type="password"
          placeholder="New Password"
          className="border rounded px-3 py-2 w-full mb-2"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-pink-600 text-white rounded py-2 px-4 font-bold hover:bg-pink-700">Change Password</button>
        {msg && <div className="text-green-700 mt-2">{msg}</div>}
      </form>

      {/* Categories/Tags */}
      <div className="bg-pink-100 rounded-lg p-4 mb-4">
        <div className="font-bold mb-1">Manage Categories/Tags</div>
        <form onSubmit={handleAddCategory} className="flex gap-2 mb-2">
          <input value={newCategory} onChange={e=>setNewCategory(e.target.value)} placeholder="Add new category/tag" className="border rounded px-2 py-1" />
          <button className="bg-pink-600 text-white rounded px-3 py-1 font-bold" type="submit">Add</button>
        </form>
        <ul className="list-disc ml-6">
          {categories.map((cat, i) => (
            <li key={i} className="flex items-center gap-2 mb-1">
              {editIndex === i ? (
                <>
                  <input value={editValue} onChange={e=>setEditValue(e.target.value)} className="border rounded px-2 py-1" />
                  <button className="text-green-700 underline" onClick={()=>handleSaveEditCategory(i)}>Save</button>
                  <button className="text-gray-400 underline" onClick={()=>{setEditIndex(-1);setEditValue("")}}>Cancel</button>
                </>
              ) : (
                <>
                  <span>{cat}</span>
                  <button className="text-blue-700 underline" onClick={()=>handleEditCategory(i)}>Edit</button>
                  <button className="text-red-600 underline" onClick={()=>handleDeleteCategory(i)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Shipping Rules */}
      <div className="bg-pink-100 rounded-lg p-4 mb-4">
        <div className="font-bold mb-1">Set Shipping Rules</div>
        <form onSubmit={handleAddRule} className="flex gap-2 mb-2">
          <input value={newRule.name} onChange={e=>setNewRule({...newRule, name: e.target.value})} placeholder="Rule name" className="border rounded px-2 py-1" />
          <input value={newRule.value} onChange={e=>setNewRule({...newRule, value: e.target.value})} placeholder="Value (e.g. PKR 200)" className="border rounded px-2 py-1" />
          <button className="bg-pink-600 text-white rounded px-3 py-1 font-bold" type="submit">Add</button>
        </form>
        <ul className="list-disc ml-6">
          {shippingRules.map((rule, i) => (
            <li key={rule.id} className="flex items-center gap-2 mb-1">
              {editRuleIndex === i ? (
                <>
                  <input value={editRule.name} onChange={e=>setEditRule({...editRule, name: e.target.value})} className="border rounded px-2 py-1" />
                  <input value={editRule.value} onChange={e=>setEditRule({...editRule, value: e.target.value})} className="border rounded px-2 py-1" />
                  <button className="text-green-700 underline" onClick={()=>handleSaveEditRule(i)}>Save</button>
                  <button className="text-gray-400 underline" onClick={()=>{setEditRuleIndex(-1);setEditRule({name:"",value:""})}}>Cancel</button>
                </>
              ) : (
                <>
                  <span>{rule.name}: {rule.value}</span>
                  <button className="text-blue-700 underline" onClick={()=>handleEditRule(i)}>Edit</button>
                  <button className="text-red-600 underline" onClick={()=>handleDeleteRule(i)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Banners */}
      <div className="bg-pink-100 rounded-lg p-4">
        <div className="font-bold mb-1">Manage Banners</div>
        <form onSubmit={handleAddBanner} className="flex gap-2 mb-2 items-center">
          <input type="file" accept="image/*" onChange={handleBannerChange} />
          {bannerPreview && <img src={bannerPreview} alt="Banner Preview" className="h-12 rounded" />}
          <button className="bg-pink-600 text-white rounded px-3 py-1 font-bold" type="submit">Add Banner</button>
        </form>
        <div className="flex gap-4 flex-wrap mt-2">
          {banners.map((b, i) => (
            <div key={i} className="relative">
              <img src={b} alt={`Banner ${i+1}`} className="h-20 rounded shadow" />
              <button className="absolute top-0 right-0 bg-red-600 text-white rounded px-2 py-1 text-xs" onClick={()=>handleDeleteBanner(i)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
