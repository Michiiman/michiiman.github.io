// variables
let lista = [];
let juegos = [];
let clientDato = [];
let datoJuego = [];
let juegoSelect;
let Search = document.getElementById("buscar-clientes");
const modClientes = document.getElementById("clientes");
const modJuegos = document.getElementById("juegos");
let buscarJuego = document.getElementById('buscar-juegos');
let comprarJuego = document.getElementById('comprarJuego');
//botones
let SelectCliente = document.getElementById("select-cliente");
SelectCliente.addEventListener("click", function () {
    modClientes.classList.add("d-none");
    modJuegos.classList.remove("d-none");

    cargarCliente();
    imprimirTablaJuegos(juegos);
});

//traer datos del local
if (localStorage.getItem("clientes")) {
    lista = JSON.parse(localStorage.getItem("clientes"));
}
if (localStorage.getItem("juegos")) {
    juegos = JSON.parse(localStorage.getItem("juegos"));
}
//imprimo la tabla
imprimirTablaClientes(lista);

//buscar lista-compras
Search.addEventListener("keyup", buscarClientes);

function buscarClientes() {
  //validamos si esta vacio o no
    if (Search == "") {
    imprimirTablaClientes(lista);
    } else {
    if (isNaN(Search.value)) {
        let busqueda = lista.filter(function (cliente) {
        return (
            cliente.apellido.toLowerCase().includes(Search.value.toLowerCase()) ||
            cliente.nombre.toLowerCase().includes(Search.value.toLowerCase())
        );
        });
      // Validar si es un sólo usuario
        if (busqueda.length === 1) {
        SelectCliente.classList.remove("disabled");
        } else if (
        busqueda.length > 1 ||
        (busqueda.length < 1 && SelectCliente.classList.contains("disabled"))
        ) {
        SelectCliente.classList.add("disabled");
        }

        clientDato = busqueda;
        imprimirTablaClientes(busqueda);
    } else {
        let busqueda = lista.filter(function (cliente) {
        return cliente.documento.includes(Search.value);
        });
        if (busqueda.length === 1) {
        SelectCliente.classList.remove("disabled");
        } else if (
        busqueda.length > 1 ||
        (busqueda.length < 1 && !SelectCliente.classList.contains("disabled"))
        ) {
        SelectCliente.classList.add("disabled");
        }
            clientDato = busqueda;
            imprimirTablaClientes(busqueda);
        }
    }
}

function imprimirTablaClientes(array) {
  // Limpiar la tabla anterior
    const tabla = document.getElementById("tabla-clientes");
    tabla.innerHTML= "";

  // Imprimir
    array.forEach((cliente) => {
    tabla.innerHTML += `
        <tr>
        <td>${cliente.documento}</td>
        <td>${cliente.nombre}</td>
        <td>${cliente.apellido}</td>
        </tr>
    `;
    });
}

function cargarCliente() {
    const clienteDatos = document.getElementById("datosCliente");

    clienteDatos.innerHTML = `
        <p><b>Documento: </b>${clientDato[0].documento}</p>
        <p><b>Nombre: </b>${clientDato[0].nombre} ${clientDato[0].apellido}</p>
        <p><b>Teléfono: </b>${clientDato[0].telefono}</p>
        <p><b>Email: </b>${clientDato[0].correo}</p>
        <p><b>Nacionalidad: </b>${clientDato[0].nacionalidad}</p>
    `;
}

//Juegos

imprimirTablaJuegos(juegos);


buscarJuego.addEventListener('keyup', buscarJuegos);


function buscarJuegos() {
    // Verificar que no esté vacío
    if (buscarJuego.value === '') {
        console.log('vacio');
        imprimirTablaJuegos(juegos);
    } else {
        if (buscarJuego.value) { 
            busqueda = juegos.filter(function (juego) {
                return juego.titulo.toLowerCase().includes(buscarJuego.value.toLowerCase());
            });

            if (busqueda.length === 1) {
                comprarJuego.classList.remove('disabled');
            } else if (busqueda.length > 1 || busqueda.length < 1 && comprarJuego.classList.contains('disabled')) {
                comprarJuego.classList.add('disabled');
            }

            datoJuego = busqueda;

            imprimirTablaJuegos(busqueda);
        }
    }
}
comprarJuego.addEventListener('click', () => {
    cargarInfoJuego();

    document.getElementById('formVenta').classList.add('d-none');

    lista.forEach((cliente, idc) =>{
        
        if(clientDato[0].documento === cliente.documento){
            lista[idc].puntos += parseInt(datoJuego[0].puntos);
            } 
        }); 
    // Guardar en LocalStorage
    localStorage.setItem('clientes', JSON.stringify(lista));
});
function cargarInfoJuego() {
    const juegoDato = document.getElementById('datosJuego');

    juegoDato.innerHTML = `
        <p><b>Valor Videojuego:</b> ${datoJuego[0].valor}</p>
        <p><b>+IVA:</b> ${datoJuego[0].valor* 0.16}</p>
        <p><b>+Impuesto Especial:</b> ${datoJuego[0].valor* 0.04}</p>
        <p><b>Total:</b> ${datoJuego[0].valor*1.20}</p>
        <hr>
        <p><b>Puntos de Fidelización por compra:</b> ${datoJuego[0].puntos}</p>
    `
}


function imprimirTablaJuegos(array) {
    // Limpiar la tabla anterior
    const tabla = document.getElementById("tabla-juegos");
    tabla.innerHTML = "";

    // Imprimir
    array.forEach((juego) => {
    tabla.innerHTML += `
        <tr>
        <td>${juego.titulo}</td>
        <td>${juego.genero}</td>
        <td>${juego.valor}</td>
        <td>${juego.puntos}</td>
        </tr>
    `;
    });
}
