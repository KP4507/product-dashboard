# Product Management Dashboard

A **React frontend application** to manage products using a REST API.  
Features include **add, delete, filter, sort, pagination**, and **delete by product ID**.  

---

## **Features**

1. **Display Products**
   - Shows a responsive table of products.
   - Includes **Name, Category, Price, Stock status, and Action (Delete)**.
   - Table supports **pagination** (20 products per page).

2. **Add Product**
   - Users can add a new product using a form.
   - Fields: Name, Category, Price, In Stock checkbox.
   - Sends **POST request** to API:  
     ```
     POST /api/products
     Body: { name, category, price, inStock }
     ```
   - Shows a **success message** when added.

3. **Delete Product**
   - Each row has a **Delete button**.
   - Sends **DELETE request** to API using product ID:
     ```
     DELETE /api/products?id=<productId>
     ```
   - Updates table and shows a **success or error message**.

4. **Delete by ID**
   - Separate input to **search product by ID**.
   - After entering ID, a **Delete button appears**.
   - Allows direct deletion without browsing the table.

5. **Filters**
   - Filter by **Category** (All, Books, Electronics, Clothing, Home).
   - Filter by **In-stock only**.
   
6. **Sort**
   - Sort products by **Price (Low → High or High → Low)**.

7. **Pagination**
   - Displays **20 products per page**.
   - Next / Prev buttons navigate pages.

8. **Error Handling**
   - Handles API errors for fetch, add, and delete.
   - Fallback values for missing data (`price`, `name`, `category`).

---

## **File Structure**


---

## **Components Explanation**

### **1. App.jsx**
- Manages **state for products, filtered products, filters, sorting, loading, and messages**.  
- Fetches products from API on mount.  
- Handles **Add product** (`handleAdd`) and **Delete product** (`handleDelete`).  
- Integrates **ProductForm, DeleteById, Filters, and ProductTable**.  

### **2. ProductForm.jsx**
- Controlled form to add products.
- Converts `price` to number before sending POST request.  
- Resets form on successful addition.

### **3. DeleteById.jsx**
- Input to enter a product ID.  
- Search button shows a Delete button.  
- Calls `onDelete(id)` to remove product from API and update table.

### **4. Filters.jsx**
- Dropdowns and checkbox to filter products by category and stock.  
- Dropdown to sort by price.  

### **5. ProductTable.jsx**
- Displays products in a table with **Name, Category, Price, Stock, Delete**.  
- **Safe handling of missing price** to prevent runtime errors:  
  ```js
  {p.price !== undefined ? Number(p.price).toFixed(2) : "0.00"}

src/
 ├── components/
 │    ├── ProductTable.jsx      # Table to display products with pagination
 │    ├── ProductTable.css
 │    ├── ProductForm.jsx       # Form to add new products
 │    ├── ProductForm.css
 │    ├── Filters.jsx           # Filters and sorting component
 │    ├── Filters.css
 │    ├── DeleteById.jsx        # Delete product by ID
 │    ├── DeleteById.css
 ├── App.jsx                     # Main App component
 ├── App.css
 ├── index.js


## API Endpoints

- Get products:  
  GET https://coding-test-pink.vercel.app/api/products

- Add product:  
  POST https://coding-test-pink.vercel.app/api/products
  Body: { "name": "New Product", "category": "Books", "price": 199.99, "inStock": true }

- Delete product by ID:  
  DELETE https://coding-test-pink.vercel.app/api/products?id=<productId>


## Installation & Running

1. Clone repository:
   git clone <your-repo-url>
   cd <project-folder>

2. Install dependencies:
   npm install

3. Run app:
   npm start

4. Open browser at http://localhost:3000


## Notes

- All components have separate CSS files for modular styling.
- ProductTable handles missing fields safely.
- DeleteById allows users to delete without browsing the table.
- Pagination ensures UI performance with 10,000 products.

