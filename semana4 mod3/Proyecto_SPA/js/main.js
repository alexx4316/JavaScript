/**
 * MAIN.JS - Controlador Principal de la Aplicación
 * 
 * Este archivo contiene la lógica principal de la aplicación SPA (Single Page Application)
 * Maneja el estado global, la navegación entre pantallas y las operaciones CRUD
 */

// === IMPORTACIONES ===
// Funciones para renderizar las diferentes pantallas de la UI
import { renderLogin, renderCRUD } from '../js/tables.js';
// Funciones para interactuar con la base de datos
import { getEstudiantes, addEstudiante, deleteEstudiante, updateEstudiante } from '../js/crud.js';

// === VARIABLES GLOBALES ===
// Array que mantiene una copia local de los estudiantes (cache)
let estudiantes = [];
// ID del estudiante que se está editando (null = modo agregar, número = modo editar)
let editandoId = null;

// === INICIO DE LA APLICACIÓN ===
// Llama automáticamente a start() cuando se carga el script
start();

/**
 * Función de inicialización de la aplicación
 * Muestra la pantalla de login al cargar
 */
function start() {
  renderLogin(login); // Renderiza login y pasa la función login como callback
}

/**
 * Maneja el proceso de autenticación del usuario
 */
async function login(usuario, password) {
  // Verifica las credenciales hardcodeadas (en producción esto sería más seguro)
  if (usuario === 'admin' && password === '1234') {
    // Si las credenciales son correctas:
    
    // 1. Carga todos los estudiantes desde la base de datos
    estudiantes = await getEstudiantes();
    
    // 2. Cambia a la pantalla principal del CRUD
    // Pasa todos los handlers como callbacks para manejar las acciones del usuario
    renderCRUD(estudiantes, handleAdd, handleEdit, handleDelete, handleLogout);
  } else {
    // Si las credenciales son incorrectas, muestra un mensaje de error
    alert('Credenciales inválidas');
  }
}

/**
 * Maneja tanto la adición como la edición de estudiantes
 * Esta función tiene doble propósito según el estado de editandoId
 */
async function handleAdd(est) {
  // Determina si estamos editando o agregando basándose en editandoId
  if (editandoId) {
    // MODO EDICIÓN: Actualiza un estudiante existente
    await updateEstudiante(editandoId, est);
    
    // Resetea editandoId para volver al modo "agregar"
    editandoId = null;
  } else {
    // MODO AGREGAR: Crea un nuevo estudiante
    await addEstudiante(est);
  }
  
  // Después de cualquier operación:
  // 1. Recarga los datos desde la base de datos para mantener sincronización
  estudiantes = await getEstudiantes();
  
  // 2. Re-renderiza la interfaz con los datos actualizados
  renderCRUD(estudiantes, handleAdd, handleEdit, handleDelete, handleLogout);
}

/**
 * Prepara la interfaz para editar un estudiante existente
 * No realiza la edición, solo prepara el formulario con los datos actuales
 */
function handleEdit(id) {
  // 1. Marca que estamos en modo edición guardando el ID
  editandoId = id;
  
  // 2. Busca el estudiante en la copia local (cache) usando el ID
  const est = estudiantes.find(e => e.id === id);
  
  // 3. Llena todos los campos del formulario con los datos actuales del estudiante
  document.getElementById('name').value = est.name;
  document.getElementById('email').value = est.email;
  document.getElementById('phone').value = est.phone;
  document.getElementById('enrollNumber').value = est.enrollNumber;
  document.getElementById('dateOfAdmission').value = est.dateOfAdmission;
  
  // Nota: Cuando el usuario envíe el formulario, handleAdd detectará que
  // editandoId tiene un valor y ejecutará updateEstudiante en lugar de addEstudiante
}

/**
 * Elimina un estudiante de la base de datos
 */
async function handleDelete(id) {
  // 1. Elimina el estudiante de la base de datos
  await deleteEstudiante(id);
  
  // 2. Recarga los datos desde la base de datos para sincronizar
  estudiantes = await getEstudiantes();
  
  // 3. Re-renderiza la interfaz sin el estudiante eliminado
  renderCRUD(estudiantes, handleAdd, handleEdit, handleDelete, handleLogout);
}

/**
 * Maneja el cierre de sesión del usuario
 * Limpia el estado de la aplicación y regresa al login
 */
function handleLogout() {
  // 1. Limpia todos los datos en memoria (por seguridad)
  estudiantes = [];
  editandoId = null;
  
  // 2. Regresa a la pantalla de login
  // El usuario tendrá que autenticarse nuevamente
  renderLogin(login);
}
