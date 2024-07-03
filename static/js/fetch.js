
const BASEURL = 'http://127.0.0.1:5000/';

/**
 * Función para realizar una petición fetch con JSON.
 * @param {string} url - La URL a la que se realizará la petición.
 * @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición.
 * @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
 */
async function fetchData(url, method, data = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'access-control-allow-origin': '*',
        },
        body: data ? JSON.stringify(data) : null,  // Si hay datos, los convierte a JSON y los incluye en el cuerpo
    };
    try {
      const response = await fetch(url, options);  // Realiza la petición fetch
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return await response.json();  // Devuelve la respuesta en formato JSON
    } catch (error) {
      console.error('Fetch error:', error);
      alert('An error occurred while fetching data. Please try again.');
    }
}

async function save(){
  //const id_objeto = document.querySelector('#id_objeto').value;
  const titulo = document.querySelector('#titulo').value;
  const age = document.querySelector('#age').value;
  const ejemplares = document.querySelector('#ejemplares').value;
  const prestados = document.querySelector('#prestados').value;
  const restantes = document.querySelector('#restantes').value;
  const autor = document.querySelector('#autor').value;
  const editorial = document.querySelector('#editorial').value;


  // Crea un objeto con los datos
  const objeto = {
    titulo: titulo,
    age: age,
    ejemplares: ejemplares,
    prestados: prestados,
    restantes: restantes,
    autor: autor,
    editorial: editorial,
  };
  
  let result = null;
  result = await fetchData(`${BASEURL}/api/libro`, 'POST', objeto);
    // Si hay un id, realiza una petición PUT para actualizar
    //if(id_objeto!==""){
      //result = await fetchData(`${BASEURL}/api/libro/${id_objeto}`, 'PUT', objeto);
    
  const validar = document.querySelector('#validarFormulario');
  validar.reset();
  alert("Datos guardados")
}


// Escuchar el evento 'DOMContentLoaded' que se dispara cuando el 
// contenido del DOM ha sido completamente cargado y parseado.
document.addEventListener('DOMContentLoaded',function(){
  // Obtén referencias a los botones
  const btnSave = document.querySelector('#enviar');
  // Asocia una función al evento click del botón "Guardar"
  btnSave.addEventListener('click', save);
});