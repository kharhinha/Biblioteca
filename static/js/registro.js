//----------------------------- Registro de usuario
const validarRegistro = (e) => {
    e.preventDefault();
    const email = document.getElementById('email');
    const contrasena= document.getElementById('contrasena');
    const name = document.getElementById('name');
    const apellido= document.getElementById('apellido');

    if (email.value === "") {
        alert("Por favor, ingrese su email.");
        email.focus();
        return false;
    }

    if (contrasena.value === "") {
        alert("Por favor, ingrese la contraseña.");
        contrasena.focus();
        return false;
    }

    if (name.value === "") {
        alert("Por favor, ingrese su nombre .");
        name.focus();
        return false;
    }

    if (apellido.value === "") {
        alert("Por favor, ingrese su apellido.");
       apellido.focus();
        return false;
    }
    
    return true;
};
document.getElementById('registro').addEventListener('click', validarRegistro)