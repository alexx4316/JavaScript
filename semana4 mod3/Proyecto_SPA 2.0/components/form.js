import { createItem, updateItem, getElementById } from "../js/api.js";  // Importe de funciones
import { getCurrentUser } from "../js/auth.js";

export function createFormComponent({ onSubmit, mode = 'read', estudiante = null } = {}) {
    const user = getCurrentUser();
    const isadmin = user && user.role === 'admin'; 
    const isEditMode = (mode = 'edit' || mode === 'create') && isadmin;

    // Creacion del formulario
    const container = document.createElement('div');
    container.innerHTML = `
    <h3>${isEditMode ? (mode === 'create' ? 'Crear Estudiante' : 'Editar estudiante') : 'Ver Estudiante'}</h3>
    <form id="itemform">
        <input type="text" id="name" placeholder="Nombre" required>
        <input type="email" id="email" placeholder="Correo" required>
        <input type="text" id="phone" placeholder="Telefono" required>
        <input type="text" id="enrollNumber" placeholder="Matricula" required>
        <input type="date" id="dateOfAdmision" placeholder="Fecha de admision" required>
        <button type="submit">Guardar</button>
    </form>
    <p id="formMessage" style="color: red;"></p>
    `;

    // Referencias a los campos del formulario
    const form = document.querySelector('#itemform');
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const phoneInput = document.querySelector('#phone');
    const enrollNumberInput = document.querySelector('#enrollNumber');
    const dateOfAdmissionInput = document.querySelector('#dateOfAdmision');
    const message = document.querySelector('#formMessage');

    let editinId = null; // si es null estamos agregando un estudiante y si no es null estamos editanto el estudiante con el id correspondiente 

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Asigna los valores del user a mi bd
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const enrollNumber = enrollNumberInput.value.trim();
        const dateOfAdmission = dateOfAdmissionInput.value.trim();

        if(!name || !email || !phone || !enrollNumber || !dateOfAdmission){  // Valida que los campos esten completos
            message.textContent = 'Todos los campos son obligatorios';
            return;
        };
        try{
            const data = { name, email, phone, enrollNumber, dateOfAdmission }
            if(editinId) {
                await updateItem(editinId, data);
                message.textContent = 'Estudiante actualizado correctamente';
            } else {
                await createItem(data);
                message.textContent = 'Estudiante creado correctamente';
            }

            form.reset();
            editinId = null;
            if(onSubmit) onSubmit();

        } catch (error) {
            console.error(error);
            message.textContent = ('Error al guardar el estudiante');
        };
    });

    async function loadItems(id) {
        try{
            // Carga los estudiantes en el form para poder editarlo
            const item = await getElementById(id);
            nameInput.value = item.name;
            emailInput.value = item.email;
            phoneInput.value = item.phone;
            enrollNumberInput.value = item.enrollNumber;
            dateOfAdmissionInput.value = item.dateOfAdmission;
            editinId = item.id;
            message.textContent = (`Editando estudiante ID: ${item.id}`);
        } catch (error) {
            console.error(error);
            message.textContent = 'Error al cargar los datos del estudiante';
        };
    };

    // Regresa el form como elemento HTML y llama a loadItems para cargar un elemento en modo edicion 
    return{
        element : container,
        loadItems,
    };
};