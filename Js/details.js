import { data } from "./data.js";

document.addEventListener("DOMContentLoaded", function () {
  // Obtén el ID del evento de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get("id");

  // Función para mostrar los detalles del evento
  function showEventDetails(eventId) {
    const eventDetailsContainer = document.getElementById(
      "eventDetailsContainer"
    );
    const event = data.events.find((event) => event.id === parseInt(eventId));

    if (event) {
      // Crear la tarjeta dinámica con la información del evento
      const card = `
          <div class="card mb-4">
            <img src="${event.image}" class="card-img-top" alt="${event.name}" />
            <div class="card-body">
              <h5 class="card-title">${event.name}</h5>
              <p class="card-text">date: ${event.date}</p>
              <p class="card-text">${event.description}</p>
              <p class="card-text">${event.category}</p>
              <p class="card-text">location: ${event.place}</p>
              <p class="card-text">Capacity: ${event.capacity}</p>
              <p class="card-text">Assistance: ${event.assistance}</p>
              <p class="card-text">Price: $${event.price}</p>
            </div>
          </div>
        `;

      eventDetailsContainer.innerHTML = card;
    }
  }

  showEventDetails(eventId);
});
