import { getCurrentUser, login } from "../js/auth.js";  // Importamos la funcion login de auth

export function loginView(){
    // Mostramos el login en pantalla
    const container = document.createElement('div');
    container.innerHTML = `
    <h2>Login</h2>
    <form id="loginForm">
        <input type="email" id="email" placeholder="Email" required>
        <input type="password" id="password" placeholder="Password" required>
        <button type="submit">Entrar</button>
    </form>
    <p id="error" style="color: red;"></p>
    `;

    // Obtenemos sus ids
    const form = container.querySelector('#loginForm');
    const err = container.querySelector('#error');

    // Pide los datos y los valida con la funcion de login de ./auth.js
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.email.value;
        const password = form.password.value;

        if(login(email, password)){
            const user = getCurrentUser();
            if(user.role === 'admin'){
                window.location.hash = '#/admin';    
            } else {
                window.location.hash = '#/dashboard';
            }
        } else  {
            err.textContent = 'Credenciales invalidas'
        };
    });

    return container
}