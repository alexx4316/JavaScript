const nombreInput = document.getElementById("nombre");
const precioInput = document.getElementById("precio");
const mensajeDiv = document.getElementById("mensaje");

// Funcion para formatear el mensaje

function mostrarMensaje(msg, isError = false) {
  mensajeDiv.textContent = msg;
  mensajeDiv.style.color = isError ? "red" : "green";
}

// Funcion para validar entrada de datos

function validarProducto(producto) {
  if (typeof producto.nombre !== "string" || producto.nombre.trim() === "") {
    mostrarMensaje("El nombre debe de ser un texto no vacio");
    return false;
  }
  if (typeof producto.precio !== "number" || producto.precio < 0) {
    mostrarMensaje("El precio debe ser un numero mayor o igual a cero");
    return false;
  }
  return true;
}

// Funcion para agregar los productos al JSON

async function agregarProducto() {
  const nuevoProducto = {
    nombre: nombreInput.value.trim(),
    precio: Number(precioInput.value),
  };
  if (!validarProducto(nuevoProducto)) return;
  try {
    // Creacion de nuevos datos (POST)
    await fetch("http://localhost:3000/productos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoProducto), // Convierte los datos de js a json
    });
    const data = await response.json();
    mostrarMensaje("Producto agregado correctamente", data);
  } catch (error) {
    console.error("Error agregando el producto");
  }
}

// Funcion para ver los productos disponibles

async function verProductos() {
  // solicitud get
  try {
    const response = await fetch("http://localhost:3000/productos");
    const data = await response.json();
    console.log("datos", data);
    mostrarMensaje("Consulta exitosa.", data);
    renderizarProductos();
  } catch (error) {
    console.error("Error en la consulta", error);
  }
}

// Funcion para eliminar algun producto por su id

async function eliminarProducto() {
  const id = document.getElementById("id").value.trim();
  if (!id || !/^[a-zA-Z0-9]+$/.test(id)) {
    // "!/^[a-zA-Z0-9]+$/" valida que los numeros sean del 1 al 9 y letras a-z min y mayus
    mostrarMensaje("ID inválido. Solo se permiten letras y numeros", true);
    return;
  }
  try {
    // Eliminacion de datos (Delete)
    const response = await fetch(`http://localhost:3000/productos/${id}`, {
      method: "DELETE",
    });
    if (!response) {
      mostrarMensaje("Recurso eliminado correctamente");
      renderizarProductos();
    } else {
      console.error("Error al eliminar");
    }
  } catch (error) {
    console.error("Error en la eliminacion del producto", error);
  }
}

// Funcion para actualizar 1 producto

async function actualizarProducto() {
  const id = document.getElementById("id").value.trim();
  if (!id) {
    mostrarMensaje("Por favor ingresa el ID para actualizar.", true);
    return;
  }
  const productoActualizado = {
    id,
    nombre: nombreInput.value.trim(),
    precio: Number(precioInput.value),
  };
  if (!validarProducto(productoActualizado)) return; // valida el string y el valor nuevo

  // Actualizacion de datos (PUT)
  try {
    const response = await fetch(`http://localhost:3000/productos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productoActualizado),
    });
    const data = await response.json();
    mostrarMensaje("Actualizacion exitosa", data);
    renderizarProductos();
  } catch (error) {
    console.error("Error en la actualizacion del producto", error);
  }
}

// Funcion para renderizar los datos

function renderizarProductos() {
  fetch(`http://localhost:3000/productos`)
    .then((response) => response.json())
    .then((data) => {
      const contenedor = document.getElementById("productos");
      contenedor.innerHTML = "";

      data.forEach((producto) => {
        const card = document.createElement("div"); // Crea un div en el html
        card.className = "card";
        card.innerHTML = `
        <strong>ID:</strong>${producto.id}<br>
        <strong>Nombre:</strong>${producto.nombre}<br>
        <strong>Precio:</strong>${producto.precio}<br>`;
        contenedor.appendChild(card); // se agregan al contenedor general
      });
    })
    .catch((error) => console.error("Error al renderizar productos:", error));
}
