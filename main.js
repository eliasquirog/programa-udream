/*creando acceso al vue*/
const app = Vue.createApp({
    data() {
        return {
            mensaje: "Historietas mavel",
        };
    },
}).mount("#app")

// Creamos un array el cual los productos queden guardados en el local storage
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

/*utilizando los datos de API*/
const marvel = {
    render:()=> {
      const urlAPI = "https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=360cc65c64133e5435a69ab7103dd02f&hash=046a650fb002014e44c82c94d5dc3cbe";
      const container = document.querySelector("#marvel-row");
      let contentHTML = "";
      fetch(urlAPI)
      .then(res => res.json())
      .then((json) => {
        for (const hero of json.data.results) {
            let urlHeroe = hero.urls[0].url;
            contentHTML += `
            <div class="valorCss">
                <a href="${urlHeroe}" target="_blank">
                  <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}" class="img-marv">
                </a>
               <h3 class="title"> ${hero.name}</h3>
               <button data-id="${hero.name}" class="buttonCTA"> Agregar a la lista </button>
            </div>`;
        }
        container.innerHTML = contentHTML;
      })
      const botonesLista = document.querySelectorAll('.buttonCTA');
    botonesLista.forEach((botonesLista) => {
    botonesLista.addEventListener('click', agregarProducto);
    })
  }
};
marvel.render();

/*Creamos una variable para que cada producto seleccionado, quede en la lista*/
const carritoConteiner = document.querySelector('#carritoConteiner');

const imprimirLista = () => {
    carritoConteiner.innerHTML = ""
    carrito.forEach((hero) => {
        const cartRow = document.createElement('div')
        cartRow.className = 'cartRow'
        cartRow.innerHTML = `
        <div class="cartImg">
        <a href="${urlHeroe}" target="_blank">
            <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}" class="img-marv">
         </a>
        </div>
        <button data-id="${hero.name}" id="botonX">X</button>
        `
        carritoConteiner.append(cartRow)
        eliminarArticulo()
    })
};
imprimirLista()

// Cuando el usuario haga click en un boton, a traves del parametro e nos va a llegar cual es el boton en cuestion. 
const agregarProducto = (e) => {
  // Al acceder a target accedemos al nodo y con getAttribute accedemos al atributo donde nosotros guardamos el valor de referencia 
 const productoElegido = e.target.getAttribute('data-id')
  // Una vez que tenemos el valor de referencia que guardamos en el boton hacemos una busqueda (find) en el array original de productos (el mismo que usamos para mostrarlos) y este nos va a devolver todo el objeto que coincida con la busqueda (buscar por el mismo dato que enviamos a data-id)
 const hero = productos.find((hero) => hero.name ==  productoElegido)
  // Una vez tenemos todo el objeto, lo enviamos al carrito y ya tenemos nuestro primer producto seleccionado!
  carrito.push(hero)
  imprimirCarrito()
  localStorage.setItem("carrito", JSON.stringify(carrito))
   }



