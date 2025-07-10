import { loginView } from '../views/login.js';
import { adminView } from '../views/admin.js';
import { dashboardView } from '../views/dashboard.js';   // importacion de las vistas y el autenticator
import { notFoundView } from '../views/notFound.js';
import { getCurrentUser, isAuthenticated } from './auth.js';

export function router(){
    const route = window.location.hash || '#/login'; // Detectamos el # actual
    const app = document.getElementById('app');

    app.innerHTML = '';

    if(route === '#/login') {
        // muestra el login
        app.appendChild(loginView());
    } else if (route === '#/dashboard'){
        // si no esta logeado
        if(!isAuthenticated()){
            window.location.hash = '#/login';
            return;                             // Segun la ruta y si esta autenticado muestra las diferentes vistas
        };
        // Si esta logeado
        app.appendChild(dashboardView());
    } else if (route === '#/admin'){
        if(!isAuthenticated()){
            window.location.hash = '#/login';
            return;
        }
        const user = getCurrentUser();
        if(user.role !== 'admin'){
            window.location.hash = '#/dashboard'
        }
        app.appendChild(adminView());
    } else {
        app.appendChild(notFoundView());
    }
};