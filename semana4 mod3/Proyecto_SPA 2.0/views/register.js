import { register } from "../js/auth";

export function registerView(){
    // Mostramos el formulario de registro 
    const container = document.createElement('div');
    container.innerHTML = `
    <h2>Registro</h2>
    <form id="registerForm">
      <input type="text" id="name" placeholder="Nombre" required>
      <input type="email" id="email" placeholder="Correo electrónico" required>
      <input type="password" id="password" placeholder="Contraseña" required>
      <input type="text" id="phone" placeholder="Teléfono" required>
      <input type="text" id="enrollNumber" placeholder="Número de matrícula" required>
      <input type="date" id="dateOfAdmission" placeholder="Fecha de admisión" required>
      <button type="submit">Registrarse</button>
    </form>
    <p id="error" style="color: red;"></p>
    <p><a href="#/login">¿Ya tienes cuenta? Inicia sesión</a></p>
  `;

    // Otenemos el formulario y su mensaje de error
  const form = document.getElementById('#registerForm');
  const error = container.querySelector('#error');

  // Le asignamos un evento y traemos los datos del form
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      password: form.password.value.trim(),
      phone: form.phone.value.trim(),
      enrollNumber: form.enrollNumber.value.trim(),
      dateOfAdmission: form.dateOfAdmission.value.trim(),
    };

    // Hace la validacion con la funcion register() y dependienmdo de la respuesta redirige al login o muestra un mensaje personalizado 
    try{
        await register(userData);
        error.textContent = 'Registro exitoso. redirigiendo al login....';
        setTimeout(() => {
           window.location.hash = '#/login' 
        }, 2000);
    } catch (err) {
        error.textContent = err.messagge;
    };
  });

  return container;
}