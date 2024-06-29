//------------------------- Inicio de sesión
const validarUsuario = (e) => {
    e.preventDefault();
    const email1 = document.getElementById('email1');
    const password1 = document.getElementById('password1');

    if (email1.value === "") {
        alert("Por favor, ingrese su email.");
        email1.focus();
        return false;
    }

    if (!emailVálido(email1.value)) {
        alert("Por favor, escribe un correo electrónico válido");
        emailAd1.focus();
        return false;
    }

    if (password1.value === "") {
        alert("Por favor, ingrese la contraseña.");
        password1.focus();
        return false;
    }
    
    return true;
};

const emailVálido = email => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
document.getElementById('sesion').addEventListener('click', validarUsuario);