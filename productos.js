const productosJSON = `[
  {
    "id": "TSH01",
    "nombre": "MACACARENA",
    "descripcion": "Quan balles sense vergonya i el ritme et domina.",
    "precioBase": 19.95,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["blanco", "negro", "mostaza"],
    "imagenes": {
      "blanco": "img/MACACARENA.png",
      "negro": "img/MACACARENA_BLACK.png",
      "mostaza": "img/MACACARENA.png"
    },
    "tags": ["nuevo"]
  },
  {
    "id": "TSH02",
    "nombre": "NINETIES MODE",
    "descripcion": "Un homenatge pixelat als anys 90.",
    "precioBase": 21.50,
    "tallas": ["S", "M", "L", "XL", "XXL"],
    "colores": ["gris", "negro"],
    "imagenes": {
      "gris": "img/NINETIES.png",
      "negro": "img/NINETIES_BLACK.png"
    },
    "tags": ["retro"]
  },
  {
    "id": "TSH03",
    "nombre": "RESERVOIR INVADERS",
    "descripcion": "Quan Tarantino coneix els videojocs clàssics.",
    "precioBase": 22.90,
    "tallas": ["M", "L", "XL"],
    "colores": ["azul", "negro"],
    "imagenes": {
      "azul": "img/RESERVOIR.png",
      "negro": "img/RESERVOIR_BLACK.png"
    },
    "tags": ["edicion-especial"]
  },
  {
    "id": "TSH04",
    "nombre": "VITRUVIAN CODE",
    "descripcion": "Art, codi i proporció perfecta.",
    "precioBase": 24.00,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["blanco", "negro"],
    "imagenes": {
      "blanco": "img/VITRUVIAN.png",
      "negro": "img/VITRUVIAN_BLACK.png"
    },
    "tags": ["premium"]
  }
]`;

//convertimos el texto JSON a un array 
const productos = JSON.parse(productosJSON);

//cuando la pagina carga mostramos los productos
window.addEventListener('DOMContentLoaded', function() {
    mostrarProductos(productos);
});


function mostrarProductos(listaProductos) {
    //cogemos el contenedor principal del HTML
    const contenedor = document.getElementById('catalogo');

    //para cada producto creamos su tarjeta
    listaProductos.forEach(producto => {
        crearTarjetaProducto(contenedor, producto);
    });
}


function crearTarjetaProducto(contenedor, producto) {
    //creamos el elemento article que será la tarjeta
    const tarjeta = document.createElement('article');
    tarjeta.className = 'card';
    tarjeta.setAttribute('data-id', producto.id);

    //añadimos cada parte de la tarjeta
    añadirImagen(tarjeta, producto);
    añadirInformacion(tarjeta, producto);
    añadirSelectores(tarjeta, producto);
    añadirBotonCompra(tarjeta, producto);

    //añadimos la tarjeta completa al catálogo
    contenedor.appendChild(tarjeta);
}


function añadirImagen(tarjeta, producto) {

    //cogemos el primer color disponible para mostrar su imagen
    const primerColor = producto.colores[0];
    const rutaImagen = producto.imagenes[primerColor];

    //creamos el elemento imagen
    const imagen = document.createElement('img');
    imagen.src = rutaImagen;
    imagen.alt = 'Camiseta ' + producto.nombre;
    imagen.className = 'producto-img';

    //añadimos la imagen a la tarjeta
    tarjeta.appendChild(imagen);
}


function añadirInformacion(tarjeta, producto) {
    //creamos la caja donde va todo
    const divInfo = document.createElement('div');
    divInfo.className = 'info-producto';

    //si hay etiqueta la creamos y la pegamos primero
    if (producto.tags && producto.tags.length > 0) {
        const etiqueta = document.createElement('span');
        etiqueta.className = 'badge';
        etiqueta.textContent = producto.tags[0];
        divInfo.appendChild(etiqueta);
    }

    //creamos el Título
    const titulo = document.createElement('h3');
    titulo.textContent = producto.nombre;
    divInfo.appendChild(titulo);

    //creamos la Descripción
    const descripcion = document.createElement('p');
    descripcion.className = 'desc';
    descripcion.textContent = producto.descripcion;
    divInfo.appendChild(descripcion);

    //creamos el Precio
    const precio = document.createElement('div');
    precio.className = 'price';
    precio.textContent = producto.precioBase + '€';
    divInfo.appendChild(precio);

    //pegamos la caja completa en la tarjeta
    tarjeta.appendChild(divInfo);
}


function añadirSelectores(tarjeta, producto) {
    //creamos el contenedor de selectores
    const divSelectores = document.createElement('div');
    divSelectores.className = 'selectors-area';

    //creamos los selectores de talla y color
    const selectorTallas = crearSelectorTallas(producto.tallas);
    const selectorColores = crearSelectorColores(producto.colores, producto.imagenes, tarjeta);

    //añadimos ambos selectores al contenedor
    divSelectores.appendChild(selectorTallas);
    divSelectores.appendChild(selectorColores);

    //añadimos los selectores a la tarjeta
    tarjeta.appendChild(divSelectores);
}


function crearSelectorTallas(tallas) {
    //creamos el contenedor
    const divTallas = document.createElement('div');
    divTallas.className = 'selector-talla';
    
    //añadimos la etiqueta Talla
    const etiqueta = document.createElement('span');
    etiqueta.className = 'label';
    etiqueta.textContent = 'Talla:';
    divTallas.appendChild(etiqueta);

    //creamos un boton para cada talla
    tallas.forEach(talla => {
        const boton = document.createElement('button');
        boton.className = 'btn-talla';
        boton.textContent = talla;

        //cuando se hace clic en una talla
        boton.onclick = function() {
            //quitamos la clase active de todos los botones
            divTallas.querySelectorAll('.btn-talla').forEach(btn => {
                btn.classList.remove('active');
            });
            //añadimos active solo al botón pulsado
            boton.classList.add('active');
        };

        divTallas.appendChild(boton);
    });

    return divTallas;
}


function crearSelectorColores(colores, imagenes, tarjeta) {
    //creamos el contenedor
    const divColores = document.createElement('div');
    divColores.className = 'selector-color';
    
    //añadimos la etiqueta Color
    const etiqueta = document.createElement('span');
    etiqueta.className = 'label';
    etiqueta.textContent = 'Color:';
    divColores.appendChild(etiqueta);

    //creamos un botón circular para cada color
    colores.forEach(color => {
        const boton = document.createElement('button');
        boton.className = 'btn-color color-' + color;
        boton.title = color;

        //cuando se hace clic en un color
        boton.onclick = function() {
            //quitamos la clase active de todos los botones
            divColores.querySelectorAll('.btn-color').forEach(btn => {
                btn.classList.remove('active');
            });
            //añadimos active solo al boton pulsado
            boton.classList.add('active');

        };

        divColores.appendChild(boton);
    });

    return divColores;
}


function añadirBotonCompra(tarjeta, producto) {
    
    //creamos el botón
    const boton = document.createElement('button');
    boton.className = 'btn-add-cart';
    boton.textContent = 'AÑADIR AL CARRITO';

    //cuando se hace clic en el boton
    boton.onclick = function() {
        //buscamos si hay alguna talla seleccionada
        const tallaSeleccionada = tarjeta.querySelector('.btn-talla.active');

        //si no hay talla seleccionada, avisamos al usuario
        if (!tallaSeleccionada) {
            alert('selecciona una talla antes de añadir al carrito');
            return;
        }

        //mostramos un mensaje de confirmación
        const talla = tallaSeleccionada.textContent;
        console.log('Añadido: ' + producto.nombre + ' | Talla: ' + talla);
        alert(producto.nombre + ' añadido al carrito');
    };

    //añadimos el boton a la tarjeta
    tarjeta.appendChild(boton);
}