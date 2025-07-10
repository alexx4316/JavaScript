const API_URL = "http://localhost:3000/Estudiantes";
let msgge = document.getElementById("message");

// Definir rutas
const routes = {
   "/" : "./index.html",
   "/users" : "./views/users.html"
};

// Mostrar mensajes
function mostrarMensaje(msg, tipo = "green") {
  const mensaje = document.createElement("p");
  mensaje.textContent = msg;
  mensaje.style.color = tipo;
  msgge.prepend(mensaje);
  setTimeout(() => mensaje.remove(), 3000);
}

// Funcion para cargar la vista
async function cargarVista(vista) {
  const ruta = routes[vista];
  console.log(ruta)
  if (!ruta) {
    msgge.innerHTML = `<p style="color:red">Ruta "${vista}" no definida.</p>`;
    return;
  }
  try {
    const res = await fetch(ruta);
    if (!res.ok) throw new Error("Vista no encontrada");
    const texto = await res.text();
    iniciarLogica();
  } catch (error) {
    msgge.innerHTML = `<p style="color:red">Error: ${error.message}</p>`;
  }
}

// Manejo de enlaces
document.addEventListener("click", function (e) {
  const link = e.target.matches("[data-link]");
  if(link){
    e.preventDefault();
    const path = link.target.getAttribute("href");
    location.hash = path
  }
});

// Variable de edicion
let idEdicion = null;

// Iniciar logica cuando se carga /users
function iniciarLogica() {
  const btnAgregar = document.getElementById("btn-agregar");
  const btnEditar = document.getElementById("btn-editar");
  const btnEliminar = document.getElementById("btn-eliminar");
  const form = document.getElementById("form-estudiante");


  btnAgregar.onclick = mostrarFormularioAgregar;
  btnEditar.onclick = mostrarFormularioEditar;
  btnEliminar.onclick = eliminarEstudiante;
  form.onsubmit = guardarEstudiante;

  listarEstudiantes();
}

// Muestra el formulario y analiza si lo vamos a editar o a agregar
function mostrarFormulario({modo = "Agregar", datos = {} } = {}) {
  const form = document.getElementById("form-estudiante")
  const formulario = document.getElementById("formulario")
  form.reset();

  Object.entries(datos).forEach(([key, value]) => {
    if(form[key]) form[key].value = value;
  });

  formulario.style.display = "block";
  document.getElementById("btn-guardar").textContent = modo;
  form.elements[0]?.focus();
}

// Muestra el formulario para agregar al clickear el btn
function mostrarFormularioAgregar(){
  idEdicion = null;
  mostrarFormulario({modo: "Agregar"});
}

// Muestra el formulario para editar al clickear el btn
async function mostrarFormularioEditar(){
  if(!idEdicion) return;
  const res = await fetch(`${API_URL}/${idEdicion}`);
  const datos = await res.json();
  mostrarFormulario({modo: "Editar", datos})
}

// Eliminar algun registro
async function eliminarEstudiante() {
  const formulario = document.getElementById("formulario");
  if(!idEdicion || !confirm("Desea eliminar este estudiante?"))return;
  await fetch(`${API_URL}/${idEdicion}`,
    {method: "DELETE"});
  mostrarMensaje("Estudiante eliminado");
  idEdicion = null;
  formulario.style.display = "none";
  listarEstudiantes();
}

// Añadir un usuario/estudiante
async function guardarEstudiante(e) {
  e.preventDefault();
  const form = document.getElementById("form-estudiante");
  const formulario = document.getElementById("formulario");
  const data = Object.fromEntries(new FormData(form));
  const method = idEdicion ? "PUT" : "POST"; 
  const url = idEdicion ? `${API_URL}/${idEdicion}` : API_URL;
  
  await fetch(url,{
    method,
    headers: {"Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  mostrarMensaje(idEdicion ? "Estudiante actualizado" : "Estudiante creado");
  formulario.style.display = "none";
  form.reset();
  idEdicion = null;
  listarEstudiantes();
}

// Mostrar la lista de estudiantes
async function listarEstudiantes() {
  const lista = document.getElementById("listar-estudiantes");
  const res = await fetch(API_URL);
  const alumnos = await res.json();

  lista.innerHTML = `
      <table border="1" cellpadding="8">
        <tr>
          <th>ID</th><th>Nombre</th><th>Email</th><th>Teléfono</th><th>Matrícula</th><th>Ingreso</th>
        </tr>
        ${alumnos.map((a) => `
          <tr onclick="seleccionarFila(${a.id})">
            <td>${a.id}</td>
            <td>${a.name}</td>
            <td>${a.email}</td>
            <td>${a.phone}</td>
            <td>${a.enrollNumber}</td>
          <td>${a.dateOfAdmission}</td>
        </tr>
      `).join("")}
    </table>
  `;
}


