document.addEventListener("DOMContentLoaded", function () {
  // Tu código JavaScript aquí
  console.log("El HTML ha sido completamente cargado.");
});
let palabra = [];
let letrasAcertadas = [];
let intentosFallidos = [];

function start(event) {
  event.preventDefault();
  palabra = event.target.password.value.split("");
  if (palabra.includes(" ") || palabra.length < 3) {
    alert("La palabra no puede contener espacios ni ser menor a 3 caracteres");
  } else {
    mostrarTablero();
    document.getElementById("wordChoose").style.display = "none";
    document.getElementById("tablero").style.display = "flex";
  }
}

function mostrarTablero() {
  const word = document.getElementById("word");
  palabra.forEach((character) => {
    word.innerHTML += `<div class=${character} class="letter"> _ </div>`;
    console.log(palabra.indexOf(character));
  });
}

function tryOut(event) {
  event.preventDefault();
  const letra = document.getElementById("tryInput").value;
  intento(letra);
}

function intento(letra) {
  if (intentosFallidos.includes(letra) || letrasAcertadas.includes(letra)) {
    alert("Ya intentaste con esa letra");
    return;
  } else if (palabra.includes(letra)) {
    var concurrencias = document.getElementsByClassName(letra);
    for (let i = 0; i < concurrencias.length; i++) {
      concurrencias[i].innerHTML = letra;
      letrasAcertadas.push(letra);
      console.log("me meto");
    }
    console.log(letrasAcertadas.length, palabra.length);
    if (letrasAcertadas.length == palabra.length) {
      winScreen();
    }
  } else {
    intentosFallidos.push(letra);
    document.getElementById("fails").innerHTML = intentosFallidos;
    if (intentosFallidos.length >= 3) {
      loseScreen();
    }
  }
}

function loseScreen() {
  document.getElementById("tablero").style.display = "none";
  document.getElementById("loseScreen").style.display = "flex";
}
function winScreen() {
  document.getElementById("tablero").style.display = "none";
  document.getElementById("winScreen").style.display = "flex";
}
