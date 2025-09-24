import { useEffect, useState } from "react";
import ProductTable from "./components/ProductTable";
import ProductForm from "./components/ProductForm";
import Filters from "./components/Filters";
import DeleteById from "./components/DeleteById";
import "./App.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: "All", inStock: false });
  const [sortOrder, setSortOrder] = useState(null);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  // Fetch products
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch(
          "https://coding-test-pink.vercel.app/api/products"
        );
        const data = await res.json();
        setProducts(data);
        setFiltered(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setMessage("Failed to load products.");
        setMessageType("error");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Apply filters & sorting
  useEffect(() => {
    let temp = [...products];
    if (filters.category !== "All") temp = temp.filter((p) => p.category === filters.category);
    if (filters.inStock) temp = temp.filter((p) => p.inStock);
    if (sortOrder) temp.sort((a, b) => (sortOrder === "asc" ? a.price - b.price : b.price - a.price));
    setFiltered(temp);
  }, [filters, sortOrder, products]);

  // Add product
  const handleAdd = (newProduct) => {
    setProducts([newProduct, ...products]);
    setMessage(`Product "${newProduct.name}" added successfully!`);
    setMessageType("success");
    setTimeout(() => setMessage(""), 3000);
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm(`Are you sure you want to delete product with ID "${id}"?`)) return;
    try {
      await fetch(`https://coding-test-pink.vercel.app/api/products?id=${id}`, { method: "DELETE" });
      setProducts(products.filter((p) => p.id !== id));
      setMessage("Product deleted successfully!");
      setMessageType("success");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error(error);
      setMessage("Failed to delete the product.");
      setMessageType("error");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="app">
      <h1 className="title">Product Management Dashboard</h1>

      {message && <p className={`message ${messageType}`}>{message}</p>}

      <ProductForm onAdd={handleAdd} />

      <DeleteById onDelete={handleDelete} />

      <Filters filters={filters} setFilters={setFilters} setSortOrder={setSortOrder} />

      {loading ? (
        <p className="loading">Loading products...</p>
      ) : (
        <ProductTable products={filtered} onDelete={handleDelete} />
      )}
    </div>
  );
}
