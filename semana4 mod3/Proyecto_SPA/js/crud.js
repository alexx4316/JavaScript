/**
 * CRUD.JS - Operaciones de Base de Datos
 * 
 * Este archivo contiene todas las funciones para interactuar con la API REST
 * que maneja la base de datos de estudiantes (json-server)
 */

// URL base de la API donde están los estudiantes
const URL = 'http://localhost:3000/estudiantes';

/**
 * Obtiene todos los estudiantes de la base de datos
 */
export async function getEstudiantes() {
  try {
    // Hace una petición GET al servidor para obtener todos los estudiantes
    const resp = await fetch(URL);
    
    // Verifica si la respuesta es exitosa (status 200-299)
    if (!resp.ok) {
      throw new Error(`Error al obtener estudiantes: ${resp.status}`);
    }
    
    // Convierte la respuesta a JSON y la retorna
    return resp.json();
  } catch (error) {
    // Si hay error, lo muestra en consola y lo propaga
    console.error('Error en getEstudiantes:', error);
    throw error;
  }
}

/**
 * Agrega un nuevo estudiante a la base de datos
 */
export async function addEstudiante(est) {
  try {
    // Hace una petición POST al servidor para crear un nuevo estudiante
    const resp = await fetch(URL, {
      method: 'POST', // Método HTTP para crear
      headers: { 'Content-Type': 'application/json' }, // Indica que enviamos JSON
      body: JSON.stringify(est) // Convierte el objeto a string JSON
    });
    
    // Verifica si la creación fue exitosa
    if (!resp.ok) {
      throw new Error(`Error al agregar estudiante: ${resp.status}`);
    }
    
    // Retorna el estudiante creado (incluye el ID generado por el servidor)
    return resp.json();
  } catch (error) {
    // Manejo de errores: log y propagación
    console.error('Error en addEstudiante:', error);
    throw error;
  }
}

/**
 * Elimina un estudiante de la base de datos
 */
export async function deleteEstudiante(id) {
  try {
    // Hace una petición DELETE al endpoint específico del estudiante
    const resp = await fetch(`${URL}/${id}`, { method: 'DELETE' });
    
    // Verifica si la eliminación fue exitosa
    if (!resp.ok) {
      throw new Error(`Error al eliminar estudiante: ${resp.status}`);
    }
    
    // Retorna la respuesta del servidor (generalmente un objeto vacío o confirmación)
    return resp.json();
  } catch (error) {
    // Manejo de errores: log y propagación
    console.error('Error en deleteEstudiante:', error);
    throw error;
  }
}

/**
 * Actualiza los datos de un estudiante existentedo
 */
export async function updateEstudiante(id, est) {
  try {
    // Hace una petición PUT al endpoint específico del estudiante
    const resp = await fetch(`${URL}/${id}`, {
      method: 'PUT', // Método HTTP para actualizar completamente
      headers: { 'Content-Type': 'application/json' }, // Indica que enviamos JSON
      body: JSON.stringify(est) // Convierte el objeto actualizado a string JSON
    });
    
    // Verifica si la actualización fue exitosa
    if (!resp.ok) {
      throw new Error(`Error al actualizar estudiante: ${resp.status}`);
    }
    
    // Retorna el estudiante actualizado con todos sus datos
    return resp.json();
  } catch (error) {
    // Manejo de errores: log y propagación
    console.error('Error en updateEstudiante:', error);
    throw error;
  }
}
