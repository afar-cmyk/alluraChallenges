let inputTextoEncriptado = document.getElementById('inputTextoEncriptado');
let inputEncriptador = document.getElementById('inputEncriptador');

// Controla la visibilidad de la seccion que muestra el texto encriptado
function cambiarEstadoInterfaz(estado1, estado2) {

  function estadoInterfaz (interface, estado) {
    document.getElementById(interface).style.display = estado;
  }

  estadoInterfaz("sin-ejecutar", estado1);
  estadoInterfaz("interfaz-encriptado", estado2);
}

// Verifica el evento del textarea para activar o desactivar la interfaz
inputTextoEncriptado.addEventListener('input', function() {
  if (inputTextoEncriptado.value.length > 0) {
    cambiarEstadoInterfaz("none", "flex");
  } else {
    cambiarEstadoInterfaz("flex", "none");
  }
});

// Lee el contenido del elemento HTML textarea por su id
function conseguirTexto(idCajaTexto) {
  return new Promise((resolve) => {
    const cajaTexto = document.getElementById(idCajaTexto);

    function handleChange() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        resolve(cajaTexto.value);
      }, 100);
    }

    let timeoutId = setTimeout(() => {
      resolve(cajaTexto.value);
    }, 100);

    cajaTexto.addEventListener('input', handleChange);
    cajaTexto.addEventListener('propertychange', handleChange);
    cajaTexto.addEventListener('change', handleChange);
  });
}

// Convierte el string en un arreglo para reemplazar las vocales
function encriptarTexto(texto) {
  let arrayTexto = texto.split('');
  let arrayEncriptado = [];

  arrayTexto.forEach(letra => {
    switch (letra) {
      case 'a':
        arrayEncriptado.push('ai');
        break;
      case 'e':
        arrayEncriptado.push('enter');
        break;
      case 'i':
        arrayEncriptado.push('imes');
        break;
      case 'o':
        arrayEncriptado.push('ober');
        break;
      case 'u':
        arrayEncriptado.push('ufat');
        break;
      default:
        arrayEncriptado.push(letra);
        break;
    }
  });

  return arrayEncriptado.join('');
}

// Reemplaza cada palabra por su correspondiente vocal
function desencriptarTexto(texto) {
  texto = texto.replace(/ai/g, "a");
  texto = texto.replace(/enter/g, "e");
  texto = texto.replace(/imes/g, "i");
  texto = texto.replace(/ober/g, "o");
  texto = texto.replace(/ufat/g, "u");

  return texto;
}

//=========================  BOTONES  ====================================//

// Boton encriptar
const botonEncriptar = document.getElementById("botonEncriptar");

botonEncriptar.addEventListener("click", async function() {
  // Recibe el texto del textarea
  let texto = await conseguirTexto("inputEncriptador");

  // Borra el textarea, encripta el texto recibido y envia un evento
  inputTextoEncriptado.value = "";
  inputTextoEncriptado.value = encriptarTexto(texto);
  inputTextoEncriptado.dispatchEvent(new Event('input'));

  // Cambia de color el borde del textarea
  inputEncriptador.style.border = "solid thin #5865f2"
  setTimeout(()=> {
    inputEncriptador.style.border = "initial"
 }
 ,250);
});

//===================================================================

// Boton desencriptar
const botonDesencriptar = document.getElementById("botonDesencriptar");

botonDesencriptar.addEventListener("click", async function() {
  // Recibe el texto del textarea
  let texto = await conseguirTexto("inputEncriptador");

  // Borra el textarea, encripta el texto recibido y envia un evento
  inputTextoEncriptado.value = "";
  inputTextoEncriptado.value = desencriptarTexto(texto);
  inputTextoEncriptado.dispatchEvent(new Event('input'));

  // Cambia de color el borde del textarea
  inputEncriptador.style.border = "solid thin #23a55a"
  setTimeout(()=> {
    inputEncriptador.style.border = "initial"
 }
 ,250);
});

//===================================================================

// Boton borrar en la interfaz principal
const botonBorrar = document.getElementById("botonBorrar");

botonBorrar.addEventListener("click", async function() {
  // Borra el textarea
  inputEncriptador.value = "";
  inputEncriptador.dispatchEvent(new Event('input'));

  // Cambia de color el borde del textarea
  inputEncriptador.style.border = "solid thin #da373c"
  setTimeout(()=> {
    inputEncriptador.style.border = "initial"
 }
 ,250);
});

//===================================================================

// Boton copiar en la interfaz del mensaje encriptado
const botonCopiar = document.getElementById("botonCopiar");

botonCopiar.addEventListener("click", async function() {
  // Copia el contenido del textarea
  navigator.clipboard.writeText(inputTextoEncriptado.value)

  // Cambia de color el borde del textarea
  inputTextoEncriptado.style.border = "solid thin #999999"
  setTimeout(()=> {
    inputTextoEncriptado.style.border = "initial"
 }
 ,250);
});

//===================================================================

// Boton borrar en la interfaz del mensaje encriptado
const botonBorrarEncriptado = document.getElementById("botonBorrarEncriptado");

botonBorrarEncriptado.addEventListener("click", async function() {
  // Borra el contenido del textarea
  inputTextoEncriptado.value = "";
  inputTextoEncriptado.dispatchEvent(new Event('input'));
});

//=========================  TEXTAREA  ====================================//

// Selecciona todos los textarea del sitio
const textareas = document.querySelectorAll('textarea');

// Evento que compara los caracteres especiales y los reemplaza por nada
textareas.forEach(textarea => {
  textarea.addEventListener('input', event => {
    const regex = /^[A-Za-z0-9\s]*$/;
    const value = event.target.value;
    if (!regex.test(value)) {
      event.target.value = value.replace(/[^\sa-zA-Z0-9]/gi, '');
    }
  });
});
