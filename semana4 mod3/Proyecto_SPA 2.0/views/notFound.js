export function notFoundView() {
    const container = document.createElement('div');
    container.innerHTML = `
        <h2>Página no encontrada</h2>
        <p>La ruta que buscas no existe.</p>
    `;
    return container;
}
