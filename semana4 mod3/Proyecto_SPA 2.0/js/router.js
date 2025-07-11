import { loginView } from '../views/login.js';
import { registerView } from '../views/register.js';
import { adminView } from '../views/admin.js';
import { dashboardView } from '../views/dashboard.js';   // importacion de las vistas y el autenticator
import { notFoundView } from '../views/notFound.js';
import { publicView} from '../views/public.js'; 
import { getCurrentUser, isAuthenticated } from './auth.js';

export function router(){
    const route = window.location.hash || '#/public'; // Detectamos el # actual
    const app = document.getElementById('app');

    app.innerHTML = '';

    if(route === '#/login') {
        // muestra el login
        app.appendChild(loginView());
    } else if (route === '#/register'){
        app.appendChild(registerView());
    } else if (route === '#/dashboard'){
        if(!isAuthenticated()){
            window.location.hash = '#/login';
            return;
        }
        const user = getCurrentUser();
        if(user.role !== 'admin'){
            window.location.hash = '#/public'
            return;
        }
        app.appendChild(dashboardView());
    } else if (route.startsWith('#/admin')){
        if(!isAuthenticated()){
            window.location.hash = '#/login';
            return;
        }
        const user = getCurrentUser();
        if(user.role !== 'admin'){
            window.location.hash = '#/public';
            return;
        }
        app.innerHTML = '';
        app.appendChild(adminView());
    } else if (route === '#/public' || route === '#/public/my-courses'){
        if(route == '#/public/my-courses' && !isAuthenticated()){
            window.location.hash = '#/login';
            return;
        }
        app.appendChild(publicView());
    } else {
        app.appendChild(notFoundView());
    }
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router)