import { data } from "./data.js";

let upcomingCardContainer = document.getElementById("upcomingCardContainer");
let checkboxesContainer = document.getElementById("checkboxesContainer");

// Filtrando por fecha
const upcomingEvents = data.events.filter(
  (event) => event.date < data.currentDate
);

function filterCategorys(array) {
  let categorys = [];
  array.forEach((event) => {
    // Check if is repeated
    if (categorys.includes(event.category)) return;
    //add to the category list
    categorys.push({ name: event.category, checked: true });
  });
  // Devuelve el array con las categorias filtradas
  return categorys;
}

function isChecked(value) {
  let arrayPosition = null;
  eventCategorys.forEach((category, index) => {
    if (category.name === value) arrayPosition = index;
  });

  return eventCategorys[arrayPosition].checked;
}

// Sete las categorias que voy a tener
const eventCategorys = filterCategorys(upcomingEvents);

function displayCards() {
  //borramos las cards viejas
  upcomingCardContainer.innerHTML = "";
  // Creamos la card
  upcomingEvents.forEach((event) => {
    let card = `
              <div class="card mb-4 " style="width: 25rem">
                <img src="${event.image}" class="card-img-top" alt="${event.name}" />
                <div class="card-body">
                  <h5 class="card-title">${event.name}</h5>
                  <p class="card-text">${event.description}</p>
                  <div class="container d-flex justify-content-between">
                    <p class="card-text">Price: $${event.price}</p>
                    <a href="details.html" class="btn btn-dark" data-id="${event.id}">Description</a>
                  </div>
                </div>
              </div>
        `;
    // La concatenamos al contenedor
    const checked = isChecked(event.category);
    if (checked) upcomingCardContainer.innerHTML += card;
  });
}

eventCategorys.forEach((category) => {
  // Creamos la card
  let checkbox = `
    <div class="form-check form-check-inline">
         <label class="form-check-label"> ${category.name} </label>
         <input
         class="form-check-input"
         type="checkbox"
         checked="true"
         id="${category.name}"
         />
    </div>
    `;
  // La concatenamos al contenedor
  checkboxesContainer.innerHTML += checkbox;
});

checkboxesContainer.addEventListener("click", (element) => {
  let arrayPosition = null;
  // Estamos consiguiendo la posicion de la lista
  // en la que se encuentra el checkbox que estamos clickeando
  eventCategorys.forEach((category, index) => {
    // Si el ID del elemento que clickeamos coincide con el name del elemento de la lista
    // en la que estamos entonces guardamos el index(posicion en la lista) en la variable arrayPosition
    if (category.name === element.target.id) arrayPosition = index;
  });
  // Modificamos la posicion en la lista del elemento clickeado
  if (arrayPosition !== null) {
    eventCategorys[arrayPosition].checked = element.target.checked;
  }
  // re cargamos las cards
  displayCards();
});
// initial load
displayCards();
