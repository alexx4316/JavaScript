const API_URL = 'http://localhost:3000/estudiantes';

// Funcion para obtener todos los datos de la API
export async function getAllItems(){
    const res = await fetch(API_URL);
    if(!res.ok) throw new Error('Error al obtener los datos');
    return await res.json();
};

// Funcion para obtener un dato por id
export async function getElementById(id) {
    const res = await fetch(`${API_URL}/${id}`);
    if(!res.ok) throw new Error('Estudiante no encontrado');
    return await res.json();
}

// Funcion para crear un nuevo usuario
export async function createItem(data) {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(data),
    });
    if(!res.ok) throw new Error('Error al crear Estudiante');
    return await res.json();
}

// Funcion para actualizar por id un usuario
export async function updateItem(id, data) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error('Error al actualizar usuario');
    return await res.json();
}


// Funcion para eliminar por id
export async function deleteItem(id) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'Delete',
    });
    if(!res.ok) throw new Error('Error al eliminar usuario');
}