import { useState } from "react";
import "./DeleteById.css";

export default function DeleteById({ onDelete }) {
  const [searchId, setSearchId] = useState("");
  const [found, setFound] = useState(false);

  const handleSearch = () => {
    if (!searchId) return;
    setFound(true);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete product with ID "${searchId}"?`)) {
      onDelete(searchId);
      setSearchId("");
      setFound(false);
    }
  };

  return (
    <div className="delete-by-id">
      <input
        type="text"
        placeholder="Enter Product ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {found && (
        <div className="delete-section">
          <p>Product ID: {searchId} found</p>
          <button className="delete-btn" onClick={handleDelete}>
            Delete Product
          </button>
        </div>
      )}
    </div>
  );
}
