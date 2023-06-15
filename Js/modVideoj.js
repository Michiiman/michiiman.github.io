let juegos=[];
let cont_2=0;

//botones
let addGame=document.getElementById('addGame');

// Traer datos del locla si hay 
if (localStorage.getItem('juegos')) {
    juegos = JSON.parse(localStorage.getItem('juegos'));
}
mostrarJuegos(juegos);

//Ejecucion botones
addGame.addEventListener('click',agregarJuegos);

//****Funciones*******/

function agregarJuegos(){
    let gameEnter=document.getElementById('form-game');
    let nombre=gameEnter.titulo.value,
        genero=gameEnter.genero.value,
        valor=gameEnter.valor.value,
        puntos=gameEnter.puntos.value;

    let juego={
        'id':cont_2,
        'titulo':nombre,
        'genero':genero,
        'valor':valor,
        'puntos':puntos,
    }

    // lo agrego a la lista
    juegos.push(juego);
    cont_2+=1;
    localStorage.setItem('juegos',JSON.stringify(juegos));
    mostrarJuegos(juegos);
    gameEnter.reset();
}

function obtenerJuego() {
    let localJuego = localStorage.getItem('juegos');
    //Valido si el dato del local tiene informacion o no
    if (localJuego == null) {
        juegos = [];
    }
    else {
        juegos = JSON.parse(juegos);
    }
    return juegos;
}

function mostrarJuegos(array) {
    //Limpiamos la tabla anterior
    const tablaJuegos = document.getElementById('tabla-juegos');
    tablaJuegos.innerHTML = '';
    //Mostramos los nuevos datos
    array.forEach(videoJuego => {
        tablaJuegos.innerHTML += `
        <tr>
            <td>${videoJuego.id}</td>
            <td>${videoJuego.titulo}</td>
            <td>${videoJuego.genero}</td>
            <td>${videoJuego.valor}</td>
            <td>${videoJuego.puntos}</td>
            <td>
                <div class="d-flex justify-content-center align-items-center">
                    <button class="btn btn-danger" onclick="eliminarJuego(${videoJuego.id})">
                        <i class="bi bi-trash">Del</i>
                    </button>
                </div>
            </td>
        </tr>    
        `
    });
}

function eliminarJuego(id) {
    juegos = juegos.filter(game=>game.id!==id)
    localStorage.setItem('juegos', JSON.stringify(juegos)); 
    mostrarJuegos(juegos);
}
