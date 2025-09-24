import { useState } from "react";
import "./ProductTable.css";

export default function ProductTable({ products, onDelete }) {
  const [page, setPage] = useState(1);
  const perPage = 20; // products per page
  const totalPages = Math.ceil(products.length / perPage);

  // Get current page products
  const current = products.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="table-container">
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price (₹)</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {current.map((p) => (
            <tr key={p.id}>
              <td>{p.name || "N/A"}</td>
              <td>{p.category || "N/A"}</td>
              <td>{p.price !== undefined ? Number(p.price).toFixed(2) : "0.00"}</td>
              <td>
                <span className={p.inStock ? "stock in" : "stock out"}>
                  {p.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </td>
              <td>
                <button className="delete-btn" onClick={() => onDelete(p.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
