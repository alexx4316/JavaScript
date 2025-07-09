console.log("Gestión de datos con objetos, maps y sets");

// Definir objeto productos
const productos = {
  1: { id: 1, nombre: "Laptop", precio: 500 },
  2: { id: 2, nombre: "Mouse", precio: 30 },
  3: { id: 3, nombre: "Teclado", precio: 150 },
};

// Crear Set con nombres únicos
const setProductos = new Set(Object.values(productos).map(p => p.nombre));

// Crear Map con categorías y productos
const mapProductos = new Map([
  ["Electronica", "Laptop"],
  ["Accesorios", "Mouse"],
  ["Accesorios", "Teclado"],
]);

// Mostrar productos (objeto)
const listaProductos = document.getElementById("listaProductos");
for (const id in productos) {
  const item = document.createElement("li");
  const { nombre, precio } = productos[id];
  item.textContent = `ID: ${id} - ${nombre} ($${precio})`;
  listaProductos.appendChild(item);
}

// Mostrar productos únicos (Set)
const setList = document.getElementById("setProductos");
for (const id of setProductos) {
  const item = document.createElement("li");
  item.textContent = id;
  setList.appendChild(item);
}

// Mostrar Map con categorías
const mapList = document.getElementById("mapProductos");
mapProductos.forEach((producto, categoria) => {
  const item = document.createElement("li");
  item.textContent = `Categoría: ${categoria} → Producto: ${producto}`;
  mapList.appendChild(item);
});