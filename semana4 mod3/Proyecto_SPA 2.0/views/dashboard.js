import { createFormComponent } from '../components/form.js';
import { createCourseFormComponent } from '../components/courseForm.js';
import { getCurrentUser, logout } from '../js/auth.js'; // Referencias de vista y de fucniones
import { getUsers, getCourses, getCourseById } from '../js/api.js';

// Funcion para mostrar el dashboard, los usuarios y los cursos
export function dashboardView() {
  const user = getCurrentUser();
  if (!user || user.role !== 'admin') {
    window.location.hash = '#/public';  // Valida que sea usuario admin y si no lo es lo envia a la vista publica
    return document.createElement('div');
  }

  // Construccion de el dashboard
  const container = document.createElement('div');
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
      <h2>Dashboard Administrativo</h2>
      <h3>Usuarios</h3>
      <table>
        <thead>
          <tr><th>ID</th><th>Nombre</th><th>Email</th><th>Rol</th><th>Acciones</th></tr>
        </thead>
        <tbody id="users-table"></tbody>
      </table>
      <h3>Cursos</h3>
      <table>
        <thead>
          <tr><th>ID</th><th>Título</th><th>Descripción</th><th>Fecha de Inicio</th><th>Duración</th><th>Acciones</th></tr>
        </thead>
        <tbody id="courses-table"></tbody>
      </table>
    </main>
  `;

  // Funcion de deslogue
  const logoutLink = container.querySelector('#logout');
  logoutLink.addEventListener('click', (e) => {
    e.preventDefault();
    logout();
  });

  // Construccion de la tabla de usuarios
  const usersTable = container.querySelector('#users-table');
  getUsers().then((users) => {
    users.forEach((user) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td><button class="edit-user" data-id="${user.id}">Editar</button></td>
      `;
      usersTable.appendChild(tr);
    });

    // Funcion de edita el usuario 
    container.querySelectorAll('.edit-user').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const userData = await getUsers(btn.dataset.id); // Busca los botones con ese selector, envia los datos a la funcion createFormComponent
        const form = createFormComponent({ mode: 'edit', user: userData, onSubmit: () => window.location.reload() });
        container.appendChild(form.element);
        form.loadItems(btn.dataset.id);
      });
    });
  });

  // Construccion de la tabla de cursos
  const coursesTable = container.querySelector('#courses-table');
  getCourses().then((courses) => {
    courses.forEach((course) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${course.id}</td>
        <td>${course.title}</td>
        <td>${course.description}</td>
        <td>${course.startDate}</td>
        <td>${course.duration}</td>
        <td><button class="edit-course" data-id="${course.id}">Editar</button></td>
      `;
      coursesTable.appendChild(tr);
    });

    // Funcion para editar los cursos
    container.querySelectorAll('.edit-course').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const courseData = await getCourseById(btn.dataset.id); // Busca los botones con ese selector, envia los datos a la funcion createCourseFormComponent
        const form = createCourseFormComponent({ mode: 'edit', course: courseData, onSubmit: () => window.location.reload() });
        container.appendChild(form.element);
        form.loadCourse(btn.dataset.id);
      });
    });
  });

  return container;
}