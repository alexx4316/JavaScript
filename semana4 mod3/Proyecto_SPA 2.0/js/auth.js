import { getUsers, createItem } from "../js/api.js";

export async function login(email, password) {
  // Verificamos que el usuario y la contraseña son correctas y lo guardamos en el localStorage
  try {
    const users = await getUsers();
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
        throw new Error('Credenciales incorrectas');
    }
    localStorage.setItem(
      'user',
      JSON.stringify({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      })
    );
    return true;
  } catch (error) {
    throw new Error(error.message || "Error al iniciar sesión");
  }
}

// Funcion para registrar un nuevo ususario
export async function register({name, email, password, phone, enrollNumber, dateOfAdmission, role = 'visitor'}){   // Por defecto le agregamos el rol de visitante
    try{
        const users = await getUsers();
        // Validamos que el correo no este registrado ya
        const existingUser = users.find((u) => u.email === email);
        if (existingUser) {
            throw new Error('El correo electrónico ya está registrado');
        }
        const newUser = await createItem({name, email, password, phone, enrollNumber, dateOfAdmission, role});
        return newUser;  
    } catch (error) {
        throw new Error(error.message || 'Error al registrar el usuario');
    }
}

export function logout() {
  // Elimina el usuario del localStorage y redirige
  localStorage.removeItem('user');
  window.location.hash = '#/login';
}

export function isAuthenticated() {
  //Verifica si hay un usuario guardado
  return !!localStorage.getItem('user');
}

export function getCurrentUser() {
  // Obtenemos el usuario que esta autenticado
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}
