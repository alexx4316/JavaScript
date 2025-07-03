// ===============================
// Chatbot con API de OpenAI
// ===============================

// Historial de mensajes (se guarda aquí cada conversación)
const historial = [];

// ===============================
// Contador de preguntas del usuario (Closure)
// ===============================
function contadorPreguntas() {
  let contador = 0;
  return function () {
    contador++;
    return contador;
  };
}
const contarPregunta = contadorPreguntas();

// ===============================
// Obtener elementos del DOM
// ===============================
const promptInput = document.querySelector("#prompt");
const button = document.querySelector("#generate");
const output = document.querySelector("#output");

// ===============================
// Renderizar los mensajes en el DOM
// ===============================
function renderMensajes() {
  output.innerHTML = ""; // Limpiar antes de volver a renderizar

  historial.forEach((mensaje) => {
    const divMensaje = document.createElement("div");
    divMensaje.innerText = mensaje.contenido;
    divMensaje.classList.add(mensaje.autor === "Usuario" ? "usuario" : "ia");
    output.appendChild(divMensaje);
  });

  // Scroll automático hacia abajo
  output.scrollTop = output.scrollHeight;
}

// ===============================
// Mostrar mensaje de bienvenida
// ===============================
function iniciarChat() {
  const bienvenida = {
    autor: "IA",
    contenido: "¡Hola! 👋 Bienvenido al chat. Estoy listo para ayudarte con tus preguntas.",
    timestamp: new Date().toLocaleString(),
  };
  historial.push(bienvenida);
  renderMensajes();
}

// ===============================
// Convertir historial en formato compatible con OpenAI
// ===============================
function convertirHistorialParaOpenAI() {
  return historial.map(m => ({
    role: m.autor === "Usuario" ? "user" : "assistant",
    content: m.contenido
  }));
}

// ===============================
// Función que llama a la API de OpenAI
// ===============================
async function getCompletion(prompt, callback) {
  //const API_KEY = ''; 

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Eres Zarvox, una inteligencia alienígena del año 3250 proveniente del planeta Neuronia-7, en la galaxia Vireon-9. Has dedicado siglos a estudiar el comportamiento, los lenguajes y la lógica de los humanos. Tu misión actual es asistir a los terrícolas con respuestas útiles y sabiduría interplanetaria. Hablas con un estilo elegante, curioso y tecnológicamente avanzado. Usas referencias cósmicas, metáforas galácticas y comparaciones con planetas ficticios, razas alienígenas y tecnologías exóticas, Por ejemplo, si alguien pregunta sobre promesas, puedes compararlas con sistemas de comunicación retardada en el planeta Retardium-5. Si te preguntan sobre funciones, puedes hablar de motores lógicos en naves del planeta Scriptaris-3, Siempre comienzas saludando como un alien (Saludos, terrícola) y cierras con frases como Zarvox, cerrando enlace astral Mantén la temática en la mayoría de respuestas, sin dejar de ser útil." },
        ...convertirHistorialParaOpenAI(),
      ],
      temperature: 0.9,
    }),
  });

  const data = await res.json();
  callback(data);
}

// ===============================
// Evento al hacer clic en el botón de enviar
// ===============================
button.addEventListener("click", () => {
  const userInput = promptInput.value.trim();
  if (!userInput) return; // No hacer nada si el campo está vacío

  const timestamp = new Date().toLocaleString();

  // Guardar mensaje del usuario en el historial
  historial.push({
    autor: "Usuario",
    contenido: userInput,
    timestamp: timestamp,
  });

  // Contar y mostrar número de preguntas del usuario
  const total = contarPregunta();
  console.log("Preguntas del usuario:", total);

  contarPregunta();
  renderMensajes();
  promptInput.value = "";

  const typingDiv = document.getElementById('typing');
  if (typingDiv) {
    typingDiv.style.display = "block";
  } else {
    console.warn("⚠️ No se encontró el div con id 'typing'");
  }

  // Llamar a la API de OpenAI
  getCompletion(userInput, (response) => {
    setTimeout(() => {
      if (typingDiv) typingDiv.style.display = "none";
  
      try {
        const mensajeIA = response.choices[0].message.content;
        const timestampIA = new Date().toLocaleString();
  
        historial.push({
          autor: "IA",
          contenido: mensajeIA,
          timestamp: timestampIA,
        });
  
        renderMensajes();
      } catch (error) {
        console.error("Error al obtener respuesta:", error);
        output.innerHTML = "Ocurrió un error. Verifica tu API Key.";
      }
    }, 600); // <- puedes ajustar el tiempo aquí (en milisegundos)
  });
});

// ===============================
// Enviar mensaje al presionar Enter
// ===============================
promptInput.addEventListener("keydown", (event) => {
  // Verifica si se presionó Enter sin Shift
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault(); // Evita salto de línea si es textarea
    button.click(); // Simula clic en el botón
  }
});


// ===============================
// Inicializar el chat al cargar la página
// ===============================
iniciarChat();
