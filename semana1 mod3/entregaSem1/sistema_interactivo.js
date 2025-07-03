console.log("Welcome to the interactive message system");

//Ingreso del nombre y validacion
let userName = prompt("Enter your name: ");
while (userName.trim() === "" || /\d/.test(userName)) { //Validacion de no campos vacios y numeros
    alert("Invalid name, try again");
    userName = prompt("Enter your name: ");
}

console.log("Valid name", userName);

let age = prompt("Enter your age: ");
age = parseInt(age);

//Ingreso de edad y mensaje personalizado
if (isNaN(age)) { // isNaN valida que la edad sea un número
    console.error("Error: Please, enter a valid age in numbers."); //mensaje en consola
} else if (age < 18) {
    alert(`hello ${userName}, you are a minor ¡continue learning and enjoying the code`);
} else {
    alert(`hello ${userName}, you are a elderly ¡Prepare for great opportunities in the world of programming`);
}