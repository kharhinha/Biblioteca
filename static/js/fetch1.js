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

async function buscarLibro(){
  
  let id_objeto='';
  let fecha;
  let dia='';
  let mes='';
  let year='';
  let fechaFormat =''

  const filtro = document.querySelector('#busqueda').value
  result = await fetchData(`${BASEURL}/api/lista/libro`, 'GET');

  //usa filter para buscar datos especificos
  const librosFiltrados = result.filter(libro => libro.titulo === filtro);

  if (librosFiltrados.length > 0) {
    const libroEncontrado = librosFiltrados[0];
    id_objeto = libroEncontrado.id_objeto;

    /*se recibe fecha con formato: "1995-12-17T03:24:00""
      se formatea para enviar al input #age
    */ 
    fecha = libroEncontrado.age;
    fechaFormat= new Date(fecha);

    //en el caso que los datos no sean de tipo Date
    if (fechaFormat instanceof Date) {
      // Continúa con los pasos para formatear la fecha
      dia=fechaFormat.getDate();
      mes=fechaFormat.getMonth()+1;
      year=fechaFormat.getFullYear();
    } else {
      console.error("No es una fecha válida.");
    }

    //dando forma a la fecha
   
    if (mes < 10) {
      if (dia < 10) {
        fechaFormat = `${year}-0${mes}-0${dia}`;
      } else {
        fechaFormat = `${year}-0${mes}-${dia}`;
      }
    } else {
      if (dia < 10) {
        fechaFormat = `${year}-${mes}-0${dia}`;
      } else {
        fechaFormat = `${year}-${mes}-${dia}`;
      }
    }
  
    //.........................................Muestra los valores en los input
    document.querySelector('#titulo').value= libroEncontrado.titulo ;
    document.querySelector('#age').value = fechaFormat;
    document.querySelector('#ejemplar').value = libroEncontrado.ejemplares;
    document.querySelector('#prestado').value = libroEncontrado.prestados;
    document.querySelector('#restante').value = libroEncontrado.restantes;
    document.querySelector('#autor').value = libroEncontrado.autor;
    document.querySelector('#editorial').value = libroEncontrado.editorial;

    //----------------Se guarda el id del objeto
    id_objeto = libroEncontrado.id_objeto;

  } else {
    alert("Datos no encontrados, verifica la escritura.");
  }

  //Probandooo, si hay click ingresa?
  document.querySelector('#id-objeto').value = id_objeto;
  
}

async function delete_objeto(id){

  // El usuario hizo clic en "Aceptar", eliminar el elemento
  if(id!==''){
    result = await fetchData(`${BASEURL}/api/libro/${id}`, 'DELETE');
  }else{
    alert("Error en el id");
  }
  
}
  
async function update(id){

  let titulo =document.querySelector('#titulo').value;
  let age = document.querySelector('#age').value;
  let ejemplares = document.querySelector('#ejemplar').value ;
  let prestados = document.querySelector('#prestado').value ;
  let restantes = document.querySelector('#restante').value ;
  let autor = document.querySelector('#autor').value ;
  let editorial = document.querySelector('#editorial').value; 

  // Crea un objeto con los datos de la película
  const objeto = {
    titulo: titulo,
    age: age,
    ejemplares: ejemplares,
    prestados: prestados,
    restantes: restantes ,
    autor: autor,
    editorial: editorial
  };
 
  let result = null;
  result =await fetchData(`${BASEURL}/api/libro/${id}`, 'PUT',objeto);
  const validar = document.querySelector('#edicion');
  validar.reset();
  alert("Datos guardados")
}
  
// Escuchar el evento 'DOMContentLoaded' que se dispara cuando el 
// contenido del DOM ha sido completamente cargado y parseado.
document.addEventListener('DOMContentLoaded',function(){

    // Obtén referencias a los botones
    const botonBusq = document.querySelector('#buscar');

    const botonEliminar = document.querySelector('#eliminar');
    const botonModificar = document.querySelector('#modificar');

    // Asocia una función al evento click del botón
    if(!botonBusq===''){
      botonBusq.addEventListener('click', buscarLibro);
    }
   
    // Asocia una función al evento click del botón "Eliminar"
    botonEliminar.addEventListener('click', delete_objeto);
   
   // Asocia una función al evento click del botón "Modificar"
    botonModificar.addEventListener('click', update);
  });