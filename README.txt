Listado de cursos:

- Cuando presione "agregar al carrito" me lo agregue al listado de la parte superior
- Los cursos que se agreguen se van a ir inyectando al <tbody> de forma dinamica


Procedimiento:

1)- Crear las variables (traemos el carrito de la parte superior, listado de cursos, boton de vaciar carrito, table body

2)- Crear una funcion donde se registren todos los Event Listeners

3)- Crear una funcion donde se van a poner las demas Funciones
a- agregarle un parametro (e) para verificar la clase del boton "agregar al carrito" a trav�s de parametro.target.classList (target: objetivo a presionar  - classList: devuelve una lista de clases donde se presion�).
b- crear un if donde el nodo anterior (e.target.classList) tenga un .contains("el id del boton agregar al carrito")
c- opcional: e.preventDefault(); para evitar que al hacer click nos lleve hacia arriba debido al href="#" del HTML

4)- Crear una funcion de leerDatosCurso(), hacer 2 parentElement, para extraer el nombre y la imagen del card (para obtener el div padre de todo)
a- crear una constante para poner ese choclo de e.target.parentElement.parentElement
b- dentro del mismo bloque de cod de la funcion, llamar a la funcion leerDatosCurso y pasarle de argumento la constante anterior
c- pasarle un parametro a leerDatosCurso(). Entonces esa funcion est� tomando un curso donde el usuario al darle click, se extraigan todos los elementos html que pertenecen a esa card.

Hasta el momento tenemos 3 funciones:
1. la del evento: que al darle click ejecuta otra funcion
2. la que extrae el contenido del card
3. la que lee el contenido del card


5)- Crear un objeto con el contenido del curso actual, dentro de la misma funcion que lee el card
objeto: id, titulo, precio, imagen, cantidad


--------------------------------------------------------------------------------------

MOSTRAR EN EL CARRITO EL CURSO SELECCIONADO

1- Creo un array vacio, para luego ser llenado con los datos del objeto de la funcion leerDatosCurso()
2- Hacer un spread de el array vacio y como segundo parametro, los elementos que se le van a agregar al mismo (objeto)

3- Crear una funcion para mostrar los cursos seleccionados en el HTML (dichos cursos aparecen en el array de articulosCarrito, una vez haciendo click en el boton de "Agregar al carrito".

FUNCION carritoHTML():

// RECORRE EL CARRITO Y MUESTRA EL HTML:
4- Iterar con cada elemento del array a traves de un forEach()
5- Todos los elementos creados los vamos a ir insertando en el <tbody>, ese elemento es un <tr> (table row),
6- Agregarle al row, el innerHTML, a continuacion un template strings para agregarle las etiquetas <td>, y detro del td va el titulo del curso a traves del ${}
7- Llamar la funcion anterior luego de leer los datos del curso
8- Ahora hay que mostrar el td dentro del tbody, a traves de la variable contenedorCarrito que contiene el ID. Agregarle el metodo appenChild y dentro agregamos el row anterior ( la constante )

Nota: despues de esto, en el carrito se agrega el arrauy con los nombres de los cursos, pero se repiten los anteriores, la idea es que esto no pase, y que se agreguen los nuevos solamente.

// LIMPIAR EL HTML

1- Creamos una funcion limpiarHTML
2- Agregamos un .innerHTML al contenedor del carrito = ' ';
3- Llamamos a la funcion limpiarHTML en la funcion carritoHTML(), IMPORTANTE: llamar a la funcion limpiarHTML para que limpie el contenido de la lista de cursos, antes de pasar al siguiente y asi, evitar repeticiones.
4- Otra opcion para limpiar y MAS RAPIDA, es crear la funcion limpiarHTML() y dentro hacer un while con la condicion "contenedorCarrito.firstChild", es decir, se va a ejecutar mientras haya por lo menos un hijo dentro del nodo padre (contenedorCarrito). Entonces si pasa esa condicion, vamos a remover del nodo padre, el primer hijo del mismo (remover con removeChild !! no con remove porque explota todo)


EN RESUMEN:

Cuando agrego un curso, se ejecuta la funcion agregarCurso. Nos aseguramos de que el usuario haya presionado en el boton "Agregar al Carrito" y accedemos a todo el div que tiene el contenido del curso (titulo, precio, cantidad, etc).
Despues leemos esos datos del curso y creamos un objeto con la informaci�n que requerimos. Lo agregamos a nuestro carrito de compras (articulosCarrito) y despues imprimimos el HTML (carritoHTML), primero limpiamos el html por los duplicados y luego lo volvemos a generar articulosCarrito



// CREAR EL RESTO DE <td> para IMAGEN, PRECIO Y CANTIDAD

1- Creamos el td de la imagen en la funcion carritoHTML y dentro creamos la etiqueta <img src= "${curso.imagen} width="">, con el template string para hacerlo de forma dinamica.
2- Crear los otros td 


// Agregar la habilidad de eliminar elementos (cursos) al usuario desde el carrito. 

1- Creamos un td debajo de los demas.
2- Crear un elemento <a href> con una clase "borrar-curso" (ya creada en la hoja de estilo).


-- USAR DESTRUCTURING --
Para minimizar el codigo, podemos utilizar DESTRUCTURING, ya que utilizamos el objeto "curso" reiteradas veces para acceder a sus propiedades. Ej: ${curso.titulo}
1- Creamos la la constante de objetos,  const {propiedades} = curso;
2- Borramos de los td la parte de {curso.titulo}, por ehemplo: dejamos solo {titulo}


// ACTUALIZAR CANTIDAD DE CURSOS EN VEZ DE SUMARLOS
Queremos que cuando se agrega un curso 2 veces, por ejemplo, al carrito, que su cantidad cambie a "cantidad:2" en vez de sumar dos veces el elemento al carrito con "cantidad:1"
1- Comprobar si el curso agregado existe, entonces actualizamos la cantidad y no lo agregamos, si no existe entonces lo agregamos (en la funcion leerDatosCurso)
2- Utilizaremos el metodo .some() que te permite iterar sobre un array de objetos y verificar si un elemento existe o no. Buscamos en articulosCarrito() que es donde pusheamos el objeto infoCurso.
3- Creamos una constante random y le agregamos la propiedad some a articulosCarrito, le pasamos un parametro"curso" a la funcion arrow y queremos que el id del elemento agregado, sea igual al nuevo elemento que estamos tratando de agregar (infoCurso.id).
4- Con un If(existe) entonces actualizamos la cantidad, sino agregamos el curso al carrito. Para el else agregamos el codigo anteriormente utilizado para agregar elementos al carrito (borrando el otro, obviamente)
5- Para actualizar la cantidad, debemos ir iterando sobre cada elemento de los cursos e identificar cual es el duplicado y de ahi, aumentar la cantidad:
a- crear una variable donde este el array del carrito y usamos .map. 
b- Si el curso actual del carrito es igual al curso que estamos tratando de agregar, aumentamos la cantidad. con un "curso.cantidad++"
c- MUY IMPORTANTE: hacer un return curso; porque .map requiere si o si crear un nuevo arreglo


// ELIMINAR ELEMENTOS O CURSOS DEL CARRITO DE compras

1- Vamos a la funcon eventListener.
2- Los elementos que se van a agregar, pertenecen en el HTML al tbody cuyo div es "carrito", por ende usaremos la variable "carrito" para ejecutar el eventListener.
3- cuando alguien hace click, vamos a ejecutar la funcion eliminarCurso (que va a ser creada posteriormente)
4- Creamos la funcion eliminarCurso en la seccion de "//funciones". Comprobar: a traves de un console.log('texto random) que la funcion se esté ejecutando
5- Pasamos un parametro 'e' para luego usar el e.target.classList. Lo que nos interesa es hacer click en la "X" del curso agregado para conocer su clase y poder trabajar sobre ella.
6- Una vez identificada su clase (borrar-curso). Podemos usar if(e.target.classList.value === 'borrar-curso') o un if(e.target.classList.contains('borrar-curso')
7- Cada curso posee un ID unico, por ende consoleamos un (e.target) para verificar el id del curso agregado.
8- Le agregamos un getAttribute('data-id) para obtener el ID del curso
9- Creamos una constante para almacenar el id del curso
10- Ahora vamos a buscar eliminar un articulo del carrito (array articulosCarrito) por su data ID utilizando filter.
11- Abajo, a articulosCarrito le asignamos articulosCarrito.filter(curso => y vamos a iterar con curso.id que sea distinto (!==) a el curso que seleccionamos para eliminar). Si hubieras usado === entonces el arreglo que se queda estaria compuesto por los elementos que hemos eliminado, y nosotros queremos todo lo contrario.
12- Como veremos, el carrito nuevo que quedaria no se imprime en el html por ende tenemos llamar a la funcion que imprime el html


// VACIAR EL CARRITO 

1- Creamos el eventListener con la variable vaciarCarritoBtn creada anteriormente
2- No hace falta que creemos una funcion en el evento, utilizaremos una funcion anonima y trabajaremos ahi mismo, ya que es poco código
3- articulosCarrito le asignamos []; 
4- Finalmente llamamos a la funcion carritoHTML() para que ejecute el html, o tambien usamos limpiarHTML(). Esta ultima es mas recomendable ya que la funcion carritoHTML ejecuta limpiarHTML.



































 