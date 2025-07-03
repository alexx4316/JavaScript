# Product management with objects, sets and Maps in JavaScript

This project demonstrates how to manage product information using JavaScript data structures such as objects, sets and Maps. In addition, it shows how to print this information dynamically on an HTML page using the Dom.

First, an object called `products` which contains three products with their respective `ID`,`Name` and `price` is created. This structure allows you to store multiple elements under a unique key (the ID), similar to a small database.

Then, a `set` is created from the names of the products. This serves to automatically filter the duplicate products by name. The `set` only retains the unique values, therefore if there are two products with the same name, only one will be shown.

Then, a MAP `is defined to relate categories to products. The` Map` stores key/value pairs, for example,“ electronics ”→“ laptop ”. It is important to keep in mind that if the same key is repeated (“accessories” for example), only the last assignment will be preserved, which can overwrite the above values.

Finally, Javascript is used to create lists (`` ``) in the HTML by using the DOM. Each structure (object, set, MAP) is traveled with loops (`for in`,`for of`, `Foreach`) and its elements are added to different visible lists on the page. This allows to visualize the information in a clear, organized and dynamic way in the browser.

## 📁 Project structure

📦 Management-Products/
├── Index.html # Main page
├── Style.CSS # Styles for the Interface
├── Script.js # project logic
└── Readme.MD # Project Documentation

## Code explanation

The products are stored as objects with ID, name and price.

Duplicates are eliminated with SET to show only unique names.

MAP is used to group products according to its category.

The DOM is dynamically updated with document.Createlement () and .Appendchild ().

## Used technologies

- HTML5
- CSS3
- Pure JavaScript (without frameworks)
- Dom Api
