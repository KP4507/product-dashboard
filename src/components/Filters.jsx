import "./Filters.css";

export default function Filters({ filters, setFilters, setSortOrder }) {
  return (
    <div className="filters">
      <div>
        <label>Category: </label>
        <select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
          <option>All</option>
          <option>Books</option>
          <option>Electronics</option>
          <option>Clothing</option>
          <option>Home</option>
        </select>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => setFilters({ ...filters, inStock: e.target.checked })}
          />
          In Stock Only
        </label>
      </div>

      <div>
        <label>Sort Price: </label>
        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option value="">None</option>
          <option value="asc">Low → High</option>
          <option value="desc">High → Low</option>
        </select>
      </div>
    </div>
  );
}
