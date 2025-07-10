import { createListComponent } from "../components/list";
import { createFormComponent } from "../components/form";

export function dashboardView() {
    const container = document.createElement('div');
    container.innerHTML = `<h1>Panel de estudiantes</h1>`;

    const formComponent = createFormComponent({
        onSubmit: () => {
            listcomponent.reload();
        }
    });

    const listcomponent = createListComponent(async (id) => {
        await formComponent.loadItems(id);
    });

    container.appendChild(formComponent.element);
    container.appendChild(listcomponent.element);

    return container;
};