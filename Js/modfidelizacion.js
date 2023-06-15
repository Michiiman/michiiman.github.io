let lista=[];
let Search = document.getElementById('buscar');

if (localStorage.getItem("clientes")) {
    lista = JSON.parse(localStorage.getItem("clientes"));
}

mostrarClientes(lista);
Search.addEventListener('keyup', buscarClientes);


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

function mostrarClientes(array) {
  //Limpiamos la tabla anterior
    const tabla = document.getElementById('tabla-clientes');
    tabla.innerHTML = '';
  //Mostramos los nuevos datos
    array.forEach(cliente => {
        tabla.innerHTML += `
        <tr>
            <td>${cliente.documento}</td>
            <td>${cliente.nombre}</td>
            <td>${cliente.apellido}</td>
            <td>${cliente.puntos}</td>
        </tr>    
        `
  });
}
