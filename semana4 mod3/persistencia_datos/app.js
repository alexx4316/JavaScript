// Referencias a elementos del DOM
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const saveButton = document.getElementById('saveButton');
const clearButton = document.getElementById('clearButton');
const outputDiv = document.getElementById('output');

// Limpiar el formulario
function resetForm() {
    nameInput.value = '';
    ageInput.value = '';
}

// Validar nombre (solo letras y espacios, mínimo 2 caracteres)
function isValidName(name) {
    return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/.test(name);
}

// Validar edad (número entre 1 y 120)
function isValidAge(age) {
    return Number.isInteger(age) && age > 0 && age < 120;
}

// Guardar datos en localStorage como array
function saveData() {
    const name = nameInput.value.trim();
    const age = parseInt(ageInput.value, 10);

    if (!isValidName(name)) {
        alert('Por favor, ingresa un nombre válido (solo letras y al menos 2 caracteres).');
        return;
    }
    if (!isValidAge(age)) {
        alert('Por favor, ingresa una edad válida (número entre 1 y 120).');
        return;
    }

    // Obtener el array actual
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ name, age });
    localStorage.setItem('users', JSON.stringify(users));

    displayLocalData();
    resetForm();
}

// Mostrar el array de localStorage
function displayLocalData() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.length === 0) {
        outputDiv.textContent = 'No hay datos almacenados.';
        return;
    }
    outputDiv.innerHTML = '<strong>Usuarios almacenados:</strong><ul>' +
        users.map(u => `<li>${u.name} (${u.age} años)</li>`).join('') +
        '</ul>';
}

// Limpiar datos del localStorage
function clearData() {
    localStorage.removeItem('users');
    displayLocalData();
    resetForm();
}

// Inicializar contador de interacciones
function initInteractionCount() {
    if (!sessionStorage.getItem('interactionCount')) {
        sessionStorage.setItem('interactionCount', 0);
    }
}

// Incremento contador de interacciones
function updateInteractionCount() {
    let count = parseInt(sessionStorage.getItem('interactionCount'), 10);
    count++;
    sessionStorage.setItem('interactionCount', count);
    console.log(`Interacciones en la sesión: ${count}`);
}

// Inicializar eventos
function initEvents() {
    saveButton.addEventListener('click', () => {
        saveData();
        updateInteractionCount();
    });
    clearButton.addEventListener('click', () => {
        clearData();
        updateInteractionCount();
    });
}

// Inicialización al cargar la página
window.onload = () => {
    initInteractionCount();
    displayLocalData();
    initEvents();
};