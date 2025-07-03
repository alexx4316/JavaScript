const colores = ["Amarillo","Verde","Rojo","Azul","Morado"];
const contenedor = document.getElementById("mensaje");

for(color of colores){
    const p = document.createElement("p");
    p.textContent = `El color ${color} es muy bonito`;
    contenedor.appendChild(p);
}