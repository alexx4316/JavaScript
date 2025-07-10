import { getAllItems, deleteItem } from "../js/api.js"; // Importamos funciones

export function createListComponent(onEdit){
    // crea una lista de los elementos de la bd
    const container = document.createElement('div');
    container.innerHTML = '<h2>Listado de estudiantes</h2>';
    const listEL = document.createElement('ul');
    container.appendChild(listEL);

    async function loadItems() {
        try{
            const items = await getAllItems();
            listEL.innerHTML = '';

            if(items.length == 0){
                listEL.innerHTML = '<li>No hay registros</li>';
                return;
            }

            items.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `
                ID:<strong>${item.id}</strong>
                Name:<strong>${item.name}</strong>
                Email:<strong>${item.email}</strong>
                Phone:<strong>${item.phone}</strong>
                EnrollNumber:<strong>${item.enrollNumber}</strong>
                DateOfAdmission:<strong>${item.dateOfAdmission}</strong>
                <button data-edit="${item.id}">Editar</button>
                <button data-delete="${item.id}">Eliminar</button>
                `;
                listEL.appendChild(li);
            });

            // Evento para el boton editar
            listEL.querySelectorAll('button[data-edit]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = parseInt(btn.dataset.edit);
                    onEdit(id);
                });
            });

            // Evento para el boton de eliminar
            listEL.querySelectorAll('button[data-delete]').forEach(btn => {
                btn.addEventListener('click', async () => {
                    const id = parseInt(btn.dataset.delete);
                    if(confirm('¿Esta seguro de eliminar el usuario?')){
                        try{
                            await deleteItem(id);
                            loadItems();
                        } catch (err) {
                            alert(`Alerta al eliminar item`);
                        }
                    }
                });
            });
        } catch (err) {
            listEL.innerHTML = '<li>Error al cargar los datos</li>';
            console.error(err);
        }
    }

    loadItems();

    return{
        element : container,
        reload : loadItems,
    };
};