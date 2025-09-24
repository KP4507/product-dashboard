import { useState } from "react";
import "./ProductForm.css";

export default function ProductForm({ onAdd }) {
  const [form, setForm] = useState({ name: "", category: "", price: "", inStock: true });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://coding-test-pink.vercel.app/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, price: parseFloat(form.price) }),
      });
      const newProduct = await res.json();
      onAdd(newProduct);
      setForm({ name: "", category: "", price: "", inStock: true });
    } catch (err) {
      console.error("Add failed:", err);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Product Name" required />
      <input type="text" name="category" value={form.category} onChange={handleChange} placeholder="Category" required />
      <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" required />
      <label>
        <input type="checkbox" name="inStock" checked={form.inStock} onChange={handleChange} />
        In Stock
      </label>
      <button type="submit">Add Product</button>
    </form>
  );
}
