document.addEventListener("DOMContentLoaded", function () {
  // Tu código JavaScript aquí
  console.log("El HTML ha sido completamente cargado.");
});
let palabra = [];
let letrasAcertadas = [];
let intentosFallidos = [];

function start(event) {
  event.preventDefault();
  console.log(event.target.password.value.toLowerCase());
  const conjuntoDeCaracteres = new Set(event.target.password.value);
  if (
    event.target.password.value.includes(" ") ||
    event.target.password.value.length < 3 ||
    conjuntoDeCaracteres.size <= 1
  ) {
    alert(
      "La palabra no puede contener, espacios, ser menor a 3 caracteres o solo tener un caracter"
    );
  } else {
    palabra = event.target.password.value.toLowerCase().split("");
    mostrarTablero();
    intento(seleccionarPista(palabra));
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

function adivinarLetra(event) {
  event.preventDefault();

  let letra = document.getElementById("tryInput").value;
  letra = letra.toLowerCase();
  console.log(letra);
  console.log(letra.toLowerCase());
  intento(letra);
}

function seleccionarPista(array) {
  const indiceAleatorio = Math.floor(Math.random() * array.length);
  return array[indiceAleatorio];
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
      document.getElementById("reset").style.display = "flex";
      alert("ganaste krbon!");
    }
  } else {
    intentosFallidos.push(letra);
    document.getElementById("fails").innerHTML = intentosFallidos;
    document.getElementById(
      "ahorcadoImg"
    ).src = `./assets/ahorcado${intentosFallidos.length}.png`;
    if (intentosFallidos.length >= 8) {
      alert("Perdiste :(");
      document.getElementById("reset").style.display = "flex";
    }
  }
}

function winScreen() {
  document.getElementById("tablero").style.display = "none";
  document.getElementById("winScreen").style.display = "flex";
}
function reset() {
  document.getElementById("tablero").style.display = "none";
  document.getElementById("loseScreen").style.display = "none";
  document.getElementById("winScreen").style.display = "none";
  document.getElementById("wordChoose").style.display = "flex";
  document.getElementById("reset").style.display = "none";
  document.getElementById("ahorcadoImg").src = ``;
  document.getElementById("password").value = "";
  document.getElementById("tryInput").value = "";
  document.getElementById("fails").innerHTML = "";
  document.getElementById("word").innerHTML = "";
  palabra = [];
  letrasAcertadas = [];
  intentosFallidos = [];
}
