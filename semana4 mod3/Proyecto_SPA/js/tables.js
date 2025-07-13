/**
 * TABLES.JS - Renderizado de Interfaces de Usuario
 * 
 * Este archivo contiene las funciones responsables de crear y mostrar
 * las diferentes pantallas de la aplicación (Login y CRUD)
 */

// Elemento del DOM donde se renderizará toda la aplicación
const root = document.getElementById('root');

/**
 * Renderiza la pantalla de inicio de sesión
 */
export function renderLogin(onLogin) {
  // Limpia el contenido actual y crea la interfaz de login
  root.innerHTML = `
    <div class="login-container">
      <h2>🎓 Sistema de Estudiantes</h2>
      <form id="loginForm">
        <input id="usuario" placeholder="👤 Usuario" required>
        <input id="password" type="password" placeholder="🔒 Contraseña" required>
        <button type="submit">🚀 Entrar</button>
      </form>
    </div>
  `;

  // Configura el evento de envío del formulario de login
  document.getElementById('loginForm').addEventListener('submit', e => {
    e.preventDefault(); // Evita que la página se recargue
    
    // Obtiene los valores ingresados por el usuario
    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;
    
    // Llama a la función de callback pasando las credenciales
    onLogin(usuario, password);
  });
}

/**
 * Renderiza la pantalla principal del CRUD (Create, Read, Update, Delete)
 */
export function renderCRUD(estudiantes, onAdd, onEdit, onDelete, onLogout) {
  // Crea toda la interfaz del CRUD con HTML
  root.innerHTML = `
    <div class="header-section">
      <h2>📚 Gestión de Estudiantes</h2>
      <button id="logoutBtn">
        🚪 Cerrar Sesión
      </button>
    </div>
    <form id="formEstudiante">
      <input id="name" placeholder="👤 Nombre completo" required>
      <input id="email" type="email" placeholder="📧 Correo electrónico" required>
      <input id="phone" placeholder="📱 Teléfono" required>
      <input id="enrollNumber" placeholder="🎫 Número de matrícula" required>
      <input id="dateOfAdmission" type="date" placeholder="📅 Fecha de admisión" required>
      <button type="submit">💾 Guardar Estudiante</button>
    </form>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>👤 Nombre</th>
            <th>📧 Email</th>
            <th>📱 Teléfono</th>
            <th>🎫 Núm. Matrícula</th>
            <th>📅 Fecha Admisión</th>
            <th>⚙️ Acciones</th>
          </tr>
        </thead>
        <tbody id="listaEstudiantes"></tbody>
      </table>
    </div>
  `;

  // === OBTENCIÓN DE ELEMENTOS DEL DOM ===
  const form = document.getElementById('formEstudiante');
  const lista = document.getElementById('listaEstudiantes');
  const logoutBtn = document.getElementById('logoutBtn');

  // === CONFIGURACIÓN DEL BOTÓN DE LOGOUT ===
  logoutBtn.addEventListener('click', () => {
    // Pide confirmación antes de cerrar sesión
    if (confirm('¿Está seguro que desea cerrar sesión?')) {
      // Ejecuta la función de logout pasada como parámetro
      onLogout();
    }
  });

  // === GENERACIÓN DINÁMICA DE FILAS DE LA TABLA ===
  // Recorre cada estudiante y crea una fila en la tabla
  estudiantes.forEach(est => {
    // Crea un elemento <tr> (fila de tabla)
    const fila = document.createElement('tr');
    
    // Llena la fila con los datos del estudiante y botones de acción
    fila.innerHTML = `
      <td>${est.name}</td>
      <td>${est.email}</td>
      <td>${est.phone}</td>
      <td>${est.enrollNumber}</td>
      <td>${est.dateOfAdmission}</td>
      <td>
        <button class="edit">✏️ Editar</button>
        <button class="delete">🗑️ Eliminar</button>
      </td>
    `;
    
    // Configura los eventos de los botones de cada fila
    // Botón Editar: llama a onEdit con el ID del estudiante
    fila.querySelector('.edit').addEventListener('click', () => onEdit(est.id));
    
    // Botón Eliminar: llama a onDelete con el ID del estudiante
    fila.querySelector('.delete').addEventListener('click', () => onDelete(est.id));
    
    // Agrega la fila completa al cuerpo de la tabla
    lista.appendChild(fila);
  });

  // === CONFIGURACIÓN DEL FORMULARIO ===
  // Maneja el envío del formulario (tanto para agregar como para editar)
  form.addEventListener('submit', e => {
    e.preventDefault(); // Evita que la página se recargue
    
    // Recolecta todos los valores de los campos del formulario
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const enrollNumber = document.getElementById('enrollNumber').value;
    const dateOfAdmission = document.getElementById('dateOfAdmission').value;
    
    // Crea un objeto con todos los datos del estudiante
    const estudiante = { name, email, phone, enrollNumber, dateOfAdmission };
    
    // Llama a la función onAdd (que manejará si es agregar o editar)
    onAdd(estudiante);
    
    // Limpia todos los campos del formulario después de enviar
    form.reset();
  });
}
