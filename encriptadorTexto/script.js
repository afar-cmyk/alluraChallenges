const criptos = {
  'a':'un valor para a',
  'e':'un valor para e',
  'i':'un valor para i',
  'o':'un valor para o',
  'u':'un valor para u',
}

//inputEncriptador
//inputDesencriptador

const inputTextoEncriptado = document.getElementById('inputTextoEncriptado')

// Funcion que controla la visibilidad de la seccion del desencriptador
function cambiarEstadoInterfaz(estado1, estado2) {

  function estadoInterfaz (interface, estado) {
    document.getElementById(interface).style.display = estado;
  }

  estadoInterfaz("sin-ejecutar", estado1);
  estadoInterfaz("interfaz-encriptado", estado2);
}

// Condicional que esconde o hace visible a la interfaz del texto encriptado
if (inputTextoEncriptado.value == "") {
  cambiarEstadoInterfaz("flex", "none");
} else {
  cambiarEstadoInterfaz("none", "flex");
}

// Funcion que lee el contenido del elemento HTML textarea por su id
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

//funcionalidades del boton encriptar
const botonEncriptar = document.getElementById("botonEncriptar");

botonEncriptar.addEventListener("click", async function() {
  console.log("Hola mundo desde boton encriptar");
});

//funcionalidades del boton desencriptar
const botonDesencriptar = document.getElementById("botonDesencriptar");

botonDesencriptar.addEventListener("click", async function() {
  console.log("Hola mundo desde boton desencriptar");
});

//funcionalidades del boton desencriptar
const botonBorrar = document.getElementById("botonBorrar");

botonBorrar.addEventListener("click", async function() {
  console.log("Hola mundo desde boton borrar en la seccion principal");
});

//funcionalidades del boton de prueba
const botonDebug = document.getElementById("debug");

botonDebug.addEventListener("click", async function() {
  console.log(await conseguirTexto("inputEncriptador"));
});

console.log('hola mundo desde archivo script')
console.log(criptos.a)
console.log(criptos.e)
console.log(criptos.i)
console.log(criptos.o)
console.log(criptos.u)
