let lista = [];
let cont = 0;

//botones
let buttonAdd = document.getElementById('btnAdd');
let Search = document.getElementById('buscar');
//Trae datos del local si existen
if (localStorage.getItem('clientes')) {
    lista = JSON.parse(localStorage.getItem('clientes'));
}
if (localStorage.getItem('contador')){
    cont=JSON.parse(localStorage.getItem('contador'));
}

mostrarClientes(lista);

//enviando a ejecutar los botones
buttonAdd.addEventListener('click', agregar);
Search.addEventListener('keyup', buscarClientes);

//*****FUNCIONES****** */

//funcion que tomara los datos de los inputs y los agregara a la lista
function agregar() {
    let entradas = document.getElementById('form');
    let documento = entradas.documento.value,
        nombre = entradas.nombre.value,
        apellido = entradas.apellido.value,
        telefono = entradas.telefono.value,
        correo = entradas.correo.value,
        fecha = entradas.fecha.value,
        nacionalidad = entradas.nacionalidad.value;

    //Creo la estructura como se va a guardar
    let cliente = {
        'id': cont,
        'documento': documento,
        'nombre': nombre,
        'apellido': apellido,
        'telefono': telefono,
        'correo': correo,
        'fecha': fecha,
        'nacionalidad': nacionalidad,
    }

    //Se agrega a la lista
    lista.push(cliente);
    cont += 1;
    localStorage.setItem('contador',cont);
    //Guardo el dato en el localStorage
    localStorage.setItem('clientes', JSON.stringify(lista));
    //se muestra el array con todos los agregados
    mostrarClientes(lista);
    //Se reinician los inputs
    entradas.reset();
}

function obtenerCliente() {
    let localCliente = localStorage.getItem('clientes');
    //Valido si el dato del local tiene informacion o no
    if (localCliente == null) {
        lista = [];
    }
    else {
        lista = JSON.parse(localCliente);
    }
    return lista;
}

function mostrarClientes(array) {
    //Limpiamos la tabla anterior
    const tabla = document.getElementById('tabla-clientes');
    tabla.innerHTML = '';
    //Mostramos los nuevos datos
    array.forEach(cliente => {
        tabla.innerHTML += `
        <tr>
            <td>${cliente.id}</td>
            <td>${cliente.documento}</td>
            <td>${cliente.nombre}</td>
            <td>${cliente.apellido}</td>
            <td>${cliente.telefono}</td>
            <td>${cliente.correo}</td>
            <td>${cliente.fecha}</td>
            <td>${cliente.nacionalidad}</td>
            <td>
                <div class="d-flex justify-content-center align-items-center">
                    <button class="btn btn-danger" onclick="eliminarClientes(${cliente.id})">
                        <i class="bi bi-trash">Del</i>
                    </button>
                </div>
            </td>
        </tr>    
        `
    });
}

function buscarClientes() {
    //validamos si esta vacio o no 
    if (Search == '') {
        mostrarClientes(lista);
    }
    else {
        if (isNaN(Search.value)) {
            let busqueda = lista.filter(function (cliente) {
                return (
                    cliente.apellido.toLowerCase().includes(Search.value.toLowerCase()) ||
                    cliente.nombre.toLowerCase().includes(Search.value.toLowerCase())
                );
            });
            mostrarClientes(busqueda);
        } else {
            let busqueda = lista.filter(function (cliente) {
                return cliente.documento.includes(Search.value);
            });
            mostrarClientes(busqueda);
        }
    }

}

function eliminarClientes(id) {
    lista = lista.filter(cliente=>cliente.id!==id)

    localStorage.setItem('clientes', JSON.stringify(lista));
    
    mostrarClientes(lista);
}