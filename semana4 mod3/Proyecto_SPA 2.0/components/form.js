import { createItem, updateItem, getElementById } from "../js/api.js"; // Importe de funciones
import { getCurrentUser } from "../js/auth.js";

export function createFormComponent({onSubmit, mode = "read", user = null,} = {}) {
    // Validamos el tipo de rol y dependiendo de eso tenemos algunos elementos activos y otros no 
  const currentUser = getCurrentUser();
  const isAdmin = currentUser && currentUser.role === "admin";
  const isEditMode = (mode === "edit" || mode === "create") && isAdmin;

  // Creacion del formulario
  const container = document.createElement("div");
  container.innerHTML = `
    <h3>${
      isEditMode
        ? mode === "create"
          ? "Crear Usuario"
          : "Editar Usuario"
        : "Ver Usuarios"
    }</h3>
    <form id="itemform">
        <input type="text" id="name" placeholder="Nombre" value="${ user?.name || "" }" ${isEditMode ? "" : "disabled"} required>
        <input type="email" id="email" placeholder="Correo" value="${ user?.email || "" }" ${isEditMode ? "" : "disabled"} required>
        <input type="text" id="phone" placeholder="Telefono" value="${ user?.phone || "" }" ${isEditMode ? "" : "disabled"} required>
        <input type="text" id="enrollNumber" placeholder="Matricula"value="${ user?.enrollNumber || "" }" ${isEditMode ? "" : "disabled"} required>
        <input type="date" id="dateOfAdmision" placeholder="Fecha de admision" value="${ user?.dateOfAdmission || "" }" ${isEditMode ? "" : "disabled"} required>
        ${
          isAdmin
            ? `
        <select id="role" ${isEditMode ? "" : "disabled"} required>
          <option value="visitor" ${
            user?.role === "visitor" ? "selected" : ""
          }>Visitante</option>
          <option value="admin" ${
            user?.role === "admin" ? "selected" : ""
          }>Administrador</option>
        </select>`: "" }
      ${isEditMode ? '<button type="submit">Guardar</button>' : ""}
    </form>
    <p id="formMessage" style="color: red;"></p>}
    `;

  // Referencias a los campos del formulario
  const form = document.querySelector("#itemform");
  const nameInput = document.querySelector("#name");
  const emailInput = document.querySelector("#email");
  const phoneInput = document.querySelector("#phone");
  const enrollNumberInput = document.querySelector("#enrollNumber");
  const dateOfAdmissionInput = document.querySelector("#dateOfAdmision");
  const roleInput = document.querySelector("#role");
  const message = document.querySelector("#formMessage");

  let editinId = user?.id || null; // si es null estamos agregando un usuario y si no es null estamos editanto el usuario con el id correspondiente

  if (isEditMode) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Asigna los valores del user a mi bd
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const phone = phoneInput.value.trim();
      const enrollNumber = enrollNumberInput.value.trim();
      const dateOfAdmission = dateOfAdmissionInput.value.trim();
      const role = roleInput ? roleInput.value : "visitor";

      if (!name || !email || !phone || !enrollNumber || !dateOfAdmission || !role) {
        // Valida que los campos esten completos
        message.textContent = "Todos los campos son obligatorios";
        return;
      };
      // Dependiendo si editinId es null o no agrega o actualiza un usuario
      try {
        const data = { name, email, phone, enrollNumber, dateOfAdmission, role,};
        if (editinId) {
          await updateItem(editinId, data);
          message.textContent = "Estudiante actualizado correctamente";
        } else {
          await createItem(data);
          message.textContent = "Estudiante creado correctamente";
        }

        // Resetea el formulario y el EditinId cada vez que se agrega o se crea un usuario
        form.reset();
        editinId = null;
        if (onSubmit) onSubmit();
      } catch (error) {
        console.error(error);
        message.textContent = error.message || "Error al guardar el estudiante";
      }
    });
  }

  async function loadItems(id) {
    try {
      // Carga los estudiantes en el form para poder editarlo
      const item = await getElementById(id);
      if (item) {
        nameInput.value = item.name;
        emailInput.value = item.email;
        phoneInput.value = item.phone;
        enrollNumberInput.value = item.enrollNumber;
        dateOfAdmissionInput.value = item.dateOfAdmission;
        // Dependiendo del rol nos deja aditar o visualizar
        if (roleInput) roleInput.value = item.role;
        editinId = item.id;
        message.textContent = isAdmin ? `Editando usuario ID: ${item.id}`: `Viendo usuario ID: ${item.id}`;
      } else {
        message.textContent = 'Usuario no encontrado'
      }
    } catch (error) {
      console.error(error);
      message.textContent = error.message || "Error al cargar los datos del usuario";
    }
  }

  // Regresa el form como elemento HTML y llama a loadItems para cargar un elemento en modo edicion
  return {
    element: container,
    loadItems,
  };
}
