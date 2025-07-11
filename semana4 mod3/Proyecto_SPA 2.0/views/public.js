import { getCourses, enrollInCourse, getEnrollmentsByUser } from '../js/api.js'; // Importamos funciones 
import { getCurrentUser } from '../js/auth.js';

// Creamos la vista publica 
export function publicView() {
  const user = getCurrentUser();
  const container = document.createElement('div');
  container.innerHTML = `
    <header>
      <h1>Sistema de Cursos</h1>
      ${user ? `<div>Bienvenido, ${user.name} (<a href="#" id="logout">Cerrar sesión</a>)</div>` : ''}
    </header>
    <nav class="sidebar">
      <ul>
        <li><a href="#/public">Cursos Disponibles</a></li>
        ${user ? `<li><a href="#/public/my-courses">Mis Cursos</a></li>` : ''}
      </ul>
    </nav>
    <main>
    // Si el usuario esta logeado muestra bienvenido y si no esta logueado muestra cursos disponibles
      <h2>${user ? `Bienvenido, ${user.name}` : 'Cursos Disponibles'}</h2>
      // dependiendo si esta logeado o no muestra los cursos disponibles o los cursos inscritos
      ${window.location.hash === '#/public/my-courses' && user ? `
        <h3>Mis Cursos</h3>
        <ul id="my-courses-list"></ul>
      ` : `
        <h3>Cursos Disponibles</h3>
        <ul id="courses-list"></ul>
      `}
    </main>
  `;

  // Si el ususario se deslogea el sistema lo elimina del local storage y lo envia automaticamente al login
  if (user) {
    const logoutLink = container.querySelector('#logout');
    logoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('user');
      window.location.hash = '#/login';
    });
  }

  // Referencias a ids
  const coursesList = container.querySelector('#courses-list');
  const myCoursesList = container.querySelector('#my-courses-list');

  if (window.location.hash === '#/public/my-courses' && user) { // Verifica que el usuario este en esa ruta y que este logeado 
    getEnrollmentsByUser(user.id).then(async (enrollments) => { // Devuelve las inscripciones del usuario
      const courses = await getCourses(); // Obtiene los cursos
      enrollments.forEach((enrollment) => {
        const course = courses.find((c) => c.id === enrollment.courseId); // Revisa que el id de la inscripcion coincida con el id de el curso
        if (course) {
          const li = document.createElement('li');
          li.innerHTML = `${course.title} - ${course.description} (${course.startDate}, ${course.duration})`; // Esto lo agrega a la lista de mis cursos
          myCoursesList.appendChild(li);
        }
      });
    });

    // De lo contrario si el usuario no esta logeado muestra una lista con los cursos disponibles 
  } else {
    getCourses().then((courses) => {
      courses.forEach((course) => {
        const li = document.createElement('li');
        li.innerHTML = `
          ${course.title} - ${course.description} (${course.startDate}, ${course.duration})
          ${user ? `<button class="enroll-btn" data-course-id="${course.id}">Inscribirse</button>` : ''}
        `;
        coursesList.appendChild(li);
      });

    // Si el usuario se quiere inscribir y esta logeado se le añadira el curso a la lista de mis cursos y se desactivara el boton de inscribirse
      if (user) {
        container.querySelectorAll('.enroll-btn').forEach((btn) => {
          btn.addEventListener('click', async () => {
            try {
              await enrollInCourse(user.id, btn.dataset.courseId);
              btn.parentElement.innerHTML += '<span style="color: green;"> Inscrito!</span>';
              btn.remove();
              // Si el usuario no esta registrado le saldra un mensaje personalizado 
            } catch (error) {
              btn.parentElement.innerHTML += `<span style="color: red;">${error.message}</span>`;
            }
          });
        });
      }
    });
  }

  return container;
}