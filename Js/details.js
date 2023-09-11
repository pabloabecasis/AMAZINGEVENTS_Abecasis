import { data } from "./data.js";

  const eventDetailsContainer = document.getElementById(
    "eventDetailsContainer"
  );
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get("id");
console.log({eventId})

  // ----- Create Card ------
  function showEventDetails(eventId) {
    const event = data.events.find((event) => event.id === eventId);
    console.log({event})

      const card = `
          <div class="card mb-4  d-flex ">
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


  showEventDetails(eventId);
;
