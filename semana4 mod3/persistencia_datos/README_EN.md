# 📝 Data Persistence Application

A simple web application developed in vanilla JavaScript that demonstrates the use of **LocalStorage** and **SessionStorage** for data persistence in the browser.

## 🌍 Available Languages
- 🇺🇸 **English**: `README_EN.md` (this file)
- 🇪🇸 **Español**: `README.md`

## 🚀 Features

- ✅ **Data validation**: Real-time validation of name and age
- 💾 **Local persistence**: Data is stored in LocalStorage and persists between sessions
- 📊 **Interaction counter**: User action tracking using SessionStorage
- 🎨 **Modern interface**: Responsive design with Bootstrap and custom CSS
- 🧹 **Data management**: Functionality to clear all stored data

## 🛠️ Technologies Used

- **HTML5**: Semantic application structure
- **CSS3**: Custom styles with gradients and modern effects
- **JavaScript ES6+**: Application logic and DOM manipulation
- **Bootstrap 5.3**: CSS framework for responsive components
- **Web Storage API**: LocalStorage and SessionStorage for data persistence

## 📋 Functionalities

### Implemented Validations
- **Name**: Only accepts letters, accents, ñ and spaces (minimum 2 characters)
- **Age**: Integer numbers between 1 and 120 years

### Data Persistence
- **LocalStorage**: Stores the user list persistently
- **SessionStorage**: Maintains an interaction counter during the current session

## 🚀 Installation and Usage

1. **Clone or download** this repository
2. **Open** the `index.html` file in your web browser
3. **Fill out** the form with a valid name and age
4. **Click** "Guardar datos" (Save data) to store the information
5. **Use** "Limpiar datos" (Clear data) to remove all stored users

## 📁 Project Structure

```
persistencia_datos/
├── index.html          # Main HTML structure
├── app.js              # JavaScript logic
├── style.css           # Custom styles
├── README.md           # Project documentation (Spanish)
└── README_EN.md        # Project documentation (English)
```

## 🔧 Main Functions

### `saveData()`
Validates and saves user data in LocalStorage as an array of objects.

### `displayLocalData()`
Displays all stored users in the DOM dynamically.

### `clearData()`
Removes all data from LocalStorage and updates the interface.

### `updateInteractionCount()`
Increments the interaction counter in SessionStorage.

## 💡 Demonstrated Concepts

- **Web Storage API**: Differences between LocalStorage and SessionStorage
- **Form validation**: Client-side validation with JavaScript
- **DOM manipulation**: Dynamic content updates
- **JSON**: Data serialization and deserialization
- **Event Handling**: User event management
- **Responsive Design**: Adaptation to different screen sizes

## 🎯 Use Cases

This application is ideal for:
- Learning about data persistence in the browser
- Understanding the differences between LocalStorage and SessionStorage
- Practicing form validation
- Understanding DOM manipulation with vanilla JavaScript

## 🌐 Compatibility

Compatible with all modern browsers that support:
- ES6+ JavaScript
- Web Storage API
- CSS3 Grid and Flexbox

## 📝 Additional Notes

- Data is stored locally in your browser
- Information persists between sessions (LocalStorage)
- The interaction counter resets when closing the browser (SessionStorage)
- No internet connection required after initial load

---

**Developed as part of the data persistence module - Week 4**
