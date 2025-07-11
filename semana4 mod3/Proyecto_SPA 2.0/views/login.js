import { login } from "../js/auth.js";  // Importamos la funcion login de auth

export function loginView(){
    // Mostramos el login en pantalla
    const container = document.createElement('div');
    container.innerHTML = `
    <h2>Iniciar Sesion</h2>
    <form id="loginForm">
        <input type="email" id="email" placeholder="Enter Email" required>
        <input type="password" id="password" placeholder="Enter Password" required>
        <button type="submit">Entrar</button>
    </form>
    <p id="error" style="color: red;"></p>
    <p><a href="#/register">¿No tienes cuenta? Regístrate</a></p>  
    `;

    // Obtenemos sus ids
    const form = container.querySelector('#loginForm');
    const error = container.querySelector('#error');

    // Pide los datos y los valida con la funcion de login de ./auth.js
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = form.email.value.trim();
        const password = form.password.value.trim();

        try{
            const success = await login(email, password);
            if(!success){
                const user = JSON.parse(localStorage.getItem('user')); // Dependiendo del rol muestra el dashboard o la vista para el publico 
                window.location.hash = user.role === 'admin' ? '#/dashboard' : '#/public'
            }
        } catch (err) {
            error.textContent = err.message;
        }
});
    return container
};