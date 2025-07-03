const apiKey = '0d22a9435ac1cdd42b23590c77b18176';

const inputCiudad = document.getElementById('ciudadInput');
const botonBuscar = document.getElementById('buscarBtn')
const resultado = document.getElementById('result')

function convertirHora(unix, timezoneOffset){
    const fecha = new Date((unix + timezoneOffset) * 1000);
    return fecha.toLocaleTimeString('es-CO',{
        hour: '2-digit',
        minute: '2-digit'
    });
}

async function getWeather() {
//   const city = document.getElementById('cityInput').value;
  const city = ciudadInput.value.trim();

  if (!city) {
    resultado.innerText = 'Por favor ingresa una ciudad.';
    return;
  }

  try {
    resultado.innerText = 'Buscando...';

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`
    );

    if (!response.ok) throw new Error('Ciudad no encontrada.');

    const data = await response.json();
    const { name, main, weather, sys, timezone} = data;

    const amanecer = convertirHora(sys.sunrise, timezone)
    const anochecer = convertirHora(sys.sunset, timezone)

    console.log(data)

    resultado.innerHTML = `
      <p><strong>Ciudad:</strong> ${name}</p>
      <p><strong>Temperatura:</strong> ${main.temp}°C</p>
      <p><strong>Clima:</strong> ${weather[0].description}</p>
      <p><strong>Amanecer:</strong> ${amanecer}</p>
      <p><strong>Anochecer:</strong> ${anochecer}</p>
      
    `;
  } catch (error) {
    console.log(error)
    resultado.innerText = error.message;
  }
}

botonBuscar.addEventListener('click', getWeather)