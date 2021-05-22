// Variables
const carrito = document.querySelector('#carrito');  // traemos el carrito de la parte superior.
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos'); //traemos listado de cursos
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');  // boton de vaciar carrito
// Array para carrito
let articulosCarrito = [];

// Funcion con todos los event listeners
eventListeners();
function eventListeners(){
    // cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click' , agregarCurso);

    // Elimina del carrito
    carrito.addEventListener('click' , eliminarCurso);

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click' , () => {
        articulosCarrito = []

        limpiarHTML()
    })
}


// FUNCIONES
function agregarCurso(e){
    e.preventDefault();  // evita que al hacer click nos lleve hacia arriba debido al href="#" del html

    if ( e.target.classList.contains('agregar-carrito') ){ 
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

//Elimina un curso del carrito
function eliminarCurso(e){
        if(e.target.classList.contains('borrar-curso')){
            const cursoId = e.target.getAttribute('data-id');

            //Elimina del array de articulosCarrito por el data-id
            articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
            
            carritoHTML() // iterar sobre el carrito y mostrar su html
    }
}



// LEER EL CONTENIDO HTML al que le dimos click y extrae la información del curso (nombre, precio, etc)
function leerDatosCurso(curso) {
    console.log(curso);

    // creamos un objeto con toda la informacion del curso
    const infoCurso = { 
        imagen: curso.querySelector('img').src ,
        titulo: curso.querySelector('.info-card h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    } 

    // Revisar si un elemento existe o no 
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){
        //actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; // retorna objetos actualizados
            } else {
                return curso; // retorna los objetos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos]
    } else{
        //agregamos el curso al carrito
        articulosCarrito.push(infoCurso); 
    }
    console.log(articulosCarrito);
    
    carritoHTML()
}



// Muestra el carrito de compras en el HTML 
function carritoHTML() {

    // Limpiar HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const row = document.createElement('tr');
        const { imagen, titulo, precio, cantidad, id }= curso;

        row.innerHTML = `
        
            <td> <img src="${imagen}" width=100> </td>

            <td> ${titulo} </td>

            <td> ${precio} </td>

            <td> ${cantidad} </td>
        
            <td>
                <a href="#" class="borrar-curso" data-id= "${id}"> X <a/>
            </td>
        `;

        // Agrega el HTML del carrito en el tbody (contenido en la variable contenedorCarrito)
    contenedorCarrito.appendChild(row)

    })
}


// Elimina los cursos extras del tbody
function limpiarHTML(){
    // contenedorCarrito.innerHTML = ''; //Forma LENTA

    //Forma más rapida
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}