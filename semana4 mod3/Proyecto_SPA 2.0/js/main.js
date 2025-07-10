import { router } from './router.js'; //importa la funcion router

window.addEventListener('DOMContentLoaded', () => { 
    router();
});                                            // Ejecutan el enrutador al cargar la pagina y al recargar la pagina 

window.addEventListener('hashchange', () => {
    router();
});


