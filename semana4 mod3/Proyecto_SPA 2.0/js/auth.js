import db from '../db.json';

export function login(email,password){
    // Verificamos que el usuario y la contraseña son correctas y lo guardamos en el localStorage
    const user = db.estudiantes.find(
        (u) => u.email === email && u.password === password
    );
    if(!user){
        return false;
    };

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
}

export function logout(){
    // Elimina el usuario del localStorage
    localStorage.removeItem('user');
    window.location.hash = '#/login';
}


export function isAuthenticated(){
    //Verifica si hay un usuario guardado
    return !!localStorage.getItem('user');
}

export function getCurrentUser(){
    // Obtenemos el usuario que esta autenticado
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}