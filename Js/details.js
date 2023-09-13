const eventDetailsContainer = document.getElementById("eventDetailsContainer");
const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get("id");
console.log({ eventId });

// ------ Get Data Function------
function fetchEventData(eventId) {
  return fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("La solicitud a la API falló");
      }
      return response.json();
    })
    .then((data) => {
      const event = data.events.find((e) => e._id === parseInt(eventId));
      if (!event) {
        throw new Error(`Error al obtener los datos del evento`);
      }
      return event;
    });
}

// ------ Create Card ------
function showEventDetails(event) {
  const card = `
    <div class="card mb-4 d-flex">
      <img src="${event.image}" class="card-img-top" alt="${event.name}" />
      <div class="card-body">
        <h5 class="card-title">${event.name}</h5>
        <p class="card-text">Date: ${event.date}</p>
        <p class="card-text">${event.description}</p>
        <p class="card-text">${event.category}</p>
        <p class="card-text">Location: ${event.place}</p>
        <p class="card-text">Capacity: ${event.capacity}</p>
        <p class="card-text">Assistance: ${event.assistance}</p>
        <p class="card-text">Price: $${event.price}</p>
      </div>
    </div>
  `;
  eventDetailsContainer.innerHTML = card;
}

// ------ function  Call ------
fetchEventData(eventId)
  .then((event) => {
    showEventDetails(event);
  })
  .catch((error) => {
    console.error("Error al obtener los datos del evento:", error);
  });