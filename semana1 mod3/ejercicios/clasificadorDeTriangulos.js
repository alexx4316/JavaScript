let angulo1 = parseInt(prompt("Ingrese la longitud del primer lado del triangulo: "));
let angulo2 = parseInt(prompt("Ingrese la longitud del segundo lado del triangulo:"));
let angulo3 = parseInt(prompt("Ingrese la longitud del tercer lado del triangulo:"));

if(angulo1 + angulo2 > angulo3 && angulo1 + angulo3 > angulo2 && angulo2 + angulo3 > angulo1){

    if(angulo1 == angulo2 && angulo2 == angulo3){
        console.log("El triangulo es EQUILATERO")
    }
    else if((angulo1 == angulo2 && angulo1 !== angulo3) || (angulo2 == angulo3 && angulo2 !== angulo1) || (angulo1 == angulo3 && angulo1 !== angulo2)){
        console.log("El triangulo es ISOCELES")
    }
    else
        console.log("El triangulo es ESCALENO")
}
else{
    console.log("los valores del triangulo no son validos")
}
