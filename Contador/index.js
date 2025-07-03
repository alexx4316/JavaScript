let count = 0;

const botonIncrementar = document.getElementById('Incrementar');
const botonDecrementar = document.getElementById('Decrementar');
const valorContador = document.getElementById('Valor-contador');

botonIncrementar.addEventListener('click', () =>{
    count++;
    valorContador.textContent = count;
});

botonDecrementar.addEventListener('click', () =>{
    if(count > 0){
        count--;
        valorContador.textContent = count;
    }
});

