
# Product CRUD

This project is a basic web application that allows you to **Create, Read, Update, and Delete (CRUD)** products. It is built using **HTML, CSS, and JavaScript**, and connects to a backend (such as `json-server`) running at `http://localhost:3000/products`.

## 🧰 Technologies Used

- HTML5  
- CSS3  
- JavaScript  
- Fetch API  
- `json-server` to simulate a REST API  

## 📁 Project Structure

```
📂 CRUD PRODUCT
├── index.html      → Main interface
├── style.css       → Visual styles
├── gestion_api.js  → Main CRUD logic and extra logic using Fetch API
```

## ⚙️ Main Features

### 🔸 1. Create Products
A form with validation allows you to add new products:
- Blank name
- Price must be greater than 0
- Prevents adding duplicate IDs

### 🔸 2. Read Products
On page load, products are fetched via **GET** and dynamically shown in the DOM as cards.

### 🔸 3. Edit Products
Clicking **Edit** loads the product info into the form for update. Upon saving, it sends a **PUT** request.

### 🔸 4. Delete Products
Clicking **Delete** sends a **DELETE** request to remove the product from the backend trough its id.

## 🧪 Auxiliary File (`gestion_api.js`)

This file demonstrates how to test each operation:

- GET all products
- POST a new product
- PUT (update) a product by ID
- DELETE a product by ID
- Validation before submission

### Example Validation Function:

```javascript
function validarProducto(producto) {
  if (typeof producto.nombre !== "string" || producto.nombre.trim() === "") {
    mostrarMensaje("The name must be a non-empty text");
    return false;
  }
  if (typeof producto.precio !== "number" || producto.precio < 0) {
    mostrarMensaje("The price must be a number greater than or equal to zero.");
    return false;
  }
  return true;
}
```

## ✅ Prerequisites

- Install json-server:  
  `npm install -g json-server`

- Start the server:  
  `json-server --watch db.json --port 3000`

## 🚀 How to Use

1. Clone this repository or download the files  
2. Make sure json-server is running  
3. Open `index.html` in your browser  
4. Use the interface to add, update, or delete products   

## 📌 Notes

This CRUD uses `json-server` for demonstration and does **not** persist data in a real database.
