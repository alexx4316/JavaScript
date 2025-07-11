import { getCurrentUser } from "./auth.js";
const API_URL = 'http://localhost:3000';

// Funciones para users

// Funcion para obtener todos los datos de la API
export async function getUsers(){
    const res = await fetch(`${API_URL}/users`);
    if(!res.ok) throw new Error('Error al obtener los usuarios');
    return await res.json();
};

// Funcion para obtener un dato por id
export async function getElementById(id) {
    const res = await fetch(`${API_URL}/users/${id}`);
    if(!res.ok) throw new Error('Usuario no encontrado');
    return await res.json();
}

// Funcion para crear un nuevo usuario
export async function createItem(data) {
    const user = getCurrentUser();
    if(!user || user.role !== 'admin') {
        throw new Error('Solo admins pueden crear usuarios');
    }
    const res = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(data),
    });
    if(!res.ok) throw new Error('Error al crear usuario');
    return await res.json();
}

// Funcion para actualizar por id un usuario
export async function updateItem(id, data) {
    const user = getCurrentUser();
    if(!user || user.role !== 'admin') {
        throw new Error('Solo admins pueden actualizar usuarios');
    }
    const res = await fetch(`${API_URL}/users/${id}`, {
        method: 'PUT',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error('Error al actualizar usuario');
    return await res.json();
}

// Funcion para eliminar por id
export async function deleteItem(id) {
    const user = getCurrentUser();
    if(!user || user.role !== 'admin') {
        throw new Error('Solo admins pueden eliminar usuarios');
    }
    const res = await fetch(`${API_URL}/users/${id}`, {
        method: 'Delete',
    });
    if(!res.ok) throw new Error('Error al eliminar usuario');
    return await res.json();
}

// Funciones para courses

// Funcion para obtener los cursos
export async function getCourses(){
    const res = await fetch(`${API_URL}/courses`);
    if(!res.ok) throw new Error('Curso no encontrado');
    return await res.json();
};

// Funcion para obtener un curso por id
export async function getCourseById(id) {
    const res = await fetch(`${API_URL}/courses/${id}`);
    if(!res.ok) throw new Error('Curso no encontrado');
    return await res.json();
}

// Funcion para crear un nuevo curso
export async function createCourse(data) {
    const user = getCurrentUser();
    if(!user || user.role !== 'admin') {
        throw new Error('Solo admins pueden crear cursos');
    }
    const res = await fetch(`${API_URL}/courses`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(data),
    });
    if(!res.ok) throw new Error('Error al crear curso');
    return await res.json();
}

// Funcion para actualizar por id un curso
export async function updateCourse(id, data) {
    const user = getCurrentUser();
    if(!user || user.role !== 'admin') {
        throw new Error('Solo admins pueden actualizar los cursos');
    }
    const res = await fetch(`${API_URL}/courses/${id}`, {
        method: 'PUT',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error('Error al actualizar los usuario');
    return await res.json();
}

// Funcion para eliminar un curso por id
export async function deleteCourse(id) {
    const user = getCurrentUser();
    if(!user || user.role !== 'admin') {
        throw new Error('Solo admins pueden eliminar los cursos');
    }
    const res = await fetch(`${API_URL}/courses/${id}`, {
        method: 'Delete',
    });
    if(!res.ok) throw new Error('Error al eliminar el curso');
    return await res.json();
}

// Funciones para Enrollments

export async function enrollInCourse(userId, courseId) {
    const user = getCurrentUser();
    if(!user || user.role !== 'userId') {
        throw new Error('Solo puedes inscribirte con tu cuenta');
    }
    const res = await fetch(`${API_URL}/enrollments`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({ userId: parseInt(userId), courseId: parseInt(courseId) }),
    });
    if(!res.ok) throw new Error('Error al inscribirse en el curso');
    return await res.json();
}

export async function getEnrollmentsByUser(userId) {
    const res = await fetch(`${API_URL}/enrollments?userId=${userId}`);
    if(!res.ok) throw new Error('Error al obtener los cursos inscritos');
    return await res.json();
}