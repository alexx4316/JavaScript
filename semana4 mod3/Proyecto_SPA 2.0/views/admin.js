import { createFormComponent } from '../components/form.js';
import { createCourseFormComponent } from '../components/courseForm.js';
import { getUsers, getCourses, deleteItem, deleteCourse, getCourseById, getElementById} from '../js/api.js';
import { getCurrentUser, logout } from '../js/auth.js';

export function adminView() {
  const user = getCurrentUser();
  const container = document.createElement('div');
  const isUsersView = window.location.hash === '#/admin/users';
  const isCoursesView = window.location.hash === '#/admin/courses';

  container.innerHTML = `
    <header>
      <h1>Sistema de Gestión</h1>
      <div>Bienvenido, ${user.name} (<a href="#" id="logout">Cerrar sesión</a>)</div>
    </header>
    <nav class="sidebar">
      <ul>
        <li><a href="#/dashboard">Dashboard</a></li>
        <li><a href="#/admin/users">Gestionar Usuarios</a></li>
        <li><a href="#/admin/courses">Gestionar Cursos</a></li>
      </ul>
    </nav>
    <main>
      <h2>${isUsersView ? 'Gestionar Usuarios' : isCoursesView ? 'Gestionar Cursos' : 'Panel de Administrador'}</h2>
      ${isUsersView ? `
        <h3>Crear Usuario</h3>
        <div id="user-form"></div>
        <h3>Lista de Usuarios</h3>
        <table>
          <thead>
            <tr><th>ID</th><th>Nombre</th><th>Email</th><th>Rol</th><th>Acciones</th></tr>
          </thead>
          <tbody id="users-table"></tbody>
        </table>
      ` : isCoursesView ? `
        <h3>Crear Curso</h3>
        <div id="course-form"></div>
        <h3>Lista de Cursos</h3>
        <table>
          <thead>
            <tr><th>ID</th><th>Título</th><th>Descripción</th><th>Fecha de Inicio</th><th>Duración</th><th>Acciones</th></tr>
          </thead>
          <tbody id="courses-table"></tbody>
        </table>
      ` : '<p>Seleccione una opción del menú</p>'}
    </main>
  `;

  const logoutLink = container.querySelector('#logout');
  logoutLink.addEventListener('click', (e) => {
    e.preventDefault();
    logout();
  });

  // Condicion para ver usuarios
  if (isUsersView) {
    const userForm = createFormComponent({ mode: 'create', onSubmit: () => window.location.reload() });
    container.querySelector('#user-form').appendChild(userForm.element);

    getUsers().then((users) => {
      const usersTable = container.querySelector('#users-table');
      users.forEach((user) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.role}</td>
          <td>
            <button class="edit-user" data-id="${user.id}">Editar</button>
            <button class="delete-user" data-id="${user.id}">Eliminar</button>
          </td>
        `;
        usersTable.appendChild(tr);
      });

      // Funcion para editar el usuario
      container.querySelectorAll('.edit-user').forEach((btn) => {
        btn.addEventListener('click', async () => {
          const userData = await getElementById(btn.dataset.id);
          const form = createFormComponent({ mode: 'edit', user: userData, onSubmit: () => window.location.reload() });
          container.querySelector('#user-form').innerHTML = '';
          container.querySelector('#user-form').appendChild(form.element);
          form.loadItems(btn.dataset.id);
        });
      });

      // Funcion para eliminar un usuario
      container.querySelectorAll('.delete-user').forEach((btn) => {
        btn.addEventListener('click', async () => {
          try {
            await deleteItem(btn.dataset.id);
            btn.closest('tr').remove();
          } catch (error) {
            alert(error.message);
          }
        });
      });
    });
  }

  // Condicion para ver los cursos
  if (isCoursesView) {
    const courseForm = createCourseFormComponent({ mode: 'create', onSubmit: () => window.location.reload() });
    container.querySelector('#course-form').appendChild(courseForm.element);

    getCourses().then((courses) => {
      const coursesTable = container.querySelector('#courses-table');
      courses.forEach((course) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${course.id}</td>
          <td>${course.title}</td>
          <td>${course.description}</td>
          <td>${course.startDate}</td>
          <td>${course.duration}</td>
          <td>
            <button class="edit-course" data-id="${course.id}">Editar</button>
            <button class="delete-course" data-id="${course.id}">Eliminar</button>
          </td>
        `;
        coursesTable.appendChild(tr);
      });

      // Funcion para editar los cursos
      container.querySelectorAll('.edit-course').forEach((btn) => {
        btn.addEventListener('click', async () => {
          const courseData = await getCourseById(btn.dataset.id);
          const form = createCourseFormComponent({ mode: 'edit', course: courseData, onSubmit: () => window.location.reload() });
          container.querySelector('#course-form').innerHTML = '';
          container.querySelector('#course-form').appendChild(form.element);
          form.loadCourse(btn.dataset.id);
        });
      });

      // Funcion para eliminar los cursos
      container.querySelectorAll('.delete-course').forEach((btn) => {
        btn.addEventListener('click', async () => {
          try {
            await deleteCourse(btn.dataset.id);
            btn.closest('tr').remove();
          } catch (error) {
            alert(error.message);
          }
        });
      });
    });
  }

  return container;
}