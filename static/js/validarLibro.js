//-------------------- Ingreso de datos: libro
const validarFormulario = (e) => {
    e.preventDefault();
    const titulo = document.getElementById('titulo');
    const age = document.getElementById('age');
    const ejemplares = document.getElementById('ejemplares')
    const prestados = document.getElementById('prestados')
    const restantes = document.getElementById('restantes')
    const autor = document.getElementById('autor')
    const editorial = document.getElementById('editorial')

    if (titulo.value === "") {
        alert("Por favor, escribe el nombre del libro.");
        titulo.focus();
        return false;
    }

    if (age.value === "") {
        alert("Por favor, ingrese la fecha de publicación.");
        age.focus();
        return false;
    }

    if (ejemplares.value == "" || ejemplares.value < 0) {
        alert("Por favor, escribe cantidad de ejemplares.");
        ejemplares.focus();
        return false;
    }

    if (prestados.value === "" || prestados.value < 0) {
        alert("Por favor, escribe cantidad de ejemplares prestados.");
        prestados.focus();
        return false;
    }

    if (restantes.value === "" || restantes.value < 0) {
        alert("Por favor, escribe cantidad de ejemplares.");
        restantes.focus();
        return false;
    }

    if (autor.value === "") {
        alert("Por favor, ingresa nombre del autor.");
        autor.focus();
        return false;
    }

    if (editorial.value === "") {
        alert("Por favor, ingresa nombre de la editorial.");
        editorial.focus();
        return false;
    }
    return true;
};
document.getElementById('enviar').addEventListener('click', validarFormulario);