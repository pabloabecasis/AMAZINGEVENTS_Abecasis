import {data} from "./data.js";

let cardContainer = document.getElementById("cardContainer");

for (let event of data.events) {
    let card = `
      <div class="col-12 col-sm-6 col-md-4 col-xl-3">
        <div class="card mb-4" style="width: 25rem">
          <img src="${event.image}" class="card-img-top" alt="${event.name}" />
          <div class="card-body">
            <h5 class="card-title">${event.name}</h5>
            <p class="card-text">${event.description}</p>
            <div class="container d-flex justify-content-between">
              <p class="card-text">Price: $${event.price}</p>
              <a href="details.html" class="btn btn-dark">Description</a>
            </div>
          </div>
        </div>
      </div>`;
    cardContainer.innerHTML += card;
}

