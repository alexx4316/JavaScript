# 📝 Aplicación de Persistencia de Datos

Una aplicación web sencilla desarrollada en JavaScript vanilla que demuestra el uso de **LocalStorage** y **SessionStorage** para la persistencia de datos en el navegador.

## 🌍 Idiomas Disponibles
- 🇪🇸 **Español**: `README.md` (este archivo)
- 🇺🇸 **English**: `README_EN.md`

## 🚀 Características

- ✅ **Validación de datos**: Validación en tiempo real de nombre y edad
- 💾 **Persistencia local**: Los datos se almacenan en LocalStorage y persisten entre sesiones
- 📊 **Contador de interacciones**: Seguimiento de acciones del usuario usando SessionStorage
- 🎨 **Interfaz moderna**: Diseño responsivo con Bootstrap y CSS personalizado
- 🧹 **Gestión de datos**: Funcionalidad para limpiar todos los datos almacenados

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica de la aplicación
- **CSS3**: Estilos personalizados con gradientes y efectos modernos
- **JavaScript ES6+**: Lógica de la aplicación y manipulación del DOM
- **Bootstrap 5.3**: Framework CSS para componentes responsivos
- **Web Storage API**: LocalStorage y SessionStorage para persistencia de datos

## 📋 Funcionalidades

### Validaciones Implementadas
- **Nombre**: Solo acepta letras, acentos, ñ y espacios (mínimo 2 caracteres)
- **Edad**: Números enteros entre 1 y 120 años

### Persistencia de Datos
- **LocalStorage**: Almacena la lista de usuarios de forma persistente
- **SessionStorage**: Mantiene un contador de interacciones durante la sesión actual

## 🚀 Instalación y Uso

1. **Clona o descarga** este repositorio
2. **Abre** el archivo `index.html` en tu navegador web
3. **Completa** el formulario con un nombre y edad válidos
4. **Haz clic** en "Guardar datos" para almacenar la información
5. **Usa** "Limpiar datos" para eliminar todos los usuarios almacenados

## 📁 Estructura del Proyecto

```
persistencia_datos/
├── index.html          # Estructura HTML principal
├── app.js              # Lógica de JavaScript
├── style.css           # Estilos personalizados
├── README.md           # Documentación del proyecto (Español)
└── README_EN.md        # Documentación del proyecto (English)
```

## 🔧 Funciones Principales

### `saveData()`
Valida y guarda los datos del usuario en LocalStorage como un array de objetos.

### `displayLocalData()`
Muestra todos los usuarios almacenados en el DOM de forma dinámica.

### `clearData()`
Elimina todos los datos del LocalStorage y actualiza la interfaz.

### `updateInteractionCount()`
Incrementa el contador de interacciones en SessionStorage.

## 💡 Conceptos Demostrados

- **Web Storage API**: Diferencias entre LocalStorage y SessionStorage
- **Validación de formularios**: Validación client-side con JavaScript
- **Manipulación del DOM**: Actualización dinámica del contenido
- **JSON**: Serialización y deserialización de datos
- **Event Handling**: Gestión de eventos de usuario
- **Responsive Design**: Adaptación a diferentes tamaños de pantalla

## 🎯 Casos de Uso

Esta aplicación es ideal para:
- Aprender sobre persistencia de datos en el navegador
- Entender las diferencias entre LocalStorage y SessionStorage
- Practicar validación de formularios
- Comprender la manipulación del DOM con JavaScript vanilla

## 🌐 Compatibilidad

Compatible con todos los navegadores modernos que soporten:
- ES6+ JavaScript
- Web Storage API
- CSS3 Grid y Flexbox

## 📝 Notas Adicionales

- Los datos se almacenan localmente en tu navegador
- La información persiste entre sesiones (LocalStorage)
- El contador de interacciones se reinicia al cerrar el navegador (SessionStorage)
- No se requiere conexión a internet después de la carga inicial

---

**Desarrollado como parte del módulo de persistencia de datos - Semana 4**
