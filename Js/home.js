import { data } from "./data.js";

// ------ Obtain categories ------
function obtainCategories(events) {
    const uniqueCategories = [];
    events.forEach((event) => {
      if (!uniqueCategories.includes(event.category)) {
        uniqueCategories.push(event.category);
      }
    });
    return uniqueCategories;
  }

// ------ Card Create ------
let allCardContainer = document.getElementById("allCardContainer");

function createCard(event) {
  let card = `
    <div class="card mb-4" style="width: 25rem" data-category="${event.category}">
      <img src="${event.image}" class="card-img-top" alt="${event.name}" />
      <div class="card-body">
        <h5 class="card-title">${event.name}</h5>
        <p class="card-text">${event.description}</p>
        <div class="container d-flex justify-content-between">
          <p class="card-text">Price: $${event.price}</p>
          <a href="details.html?id=${event.id}" class="btn btn-dark">Description</a>
        </div>
      </div>
    </div>
  `;
  allCardContainer.innerHTML += card;
}

// ------ Show Cards ------
function showAllCards() {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.style.display = "block";
    });
  }

// ------ Card Filter ------
function filterCardsByCategory() {
  const checkboxes = document.querySelectorAll(".form-check-input");
  const selectedCategories = Array.from(checkboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.getAttribute("data-category"));

  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    const category = card.getAttribute("data-category");
    if (selectedCategories.length === 0 || selectedCategories.includes(category)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

//------ Create Checkboxes ------
function createCheckbox(events) {
  const uniqueCategories = obtainCategories(events);
  const checkboxContainer = document.getElementById("checkboxContainer");

  uniqueCategories.forEach((category) => {
    let checkbox = `
    <div class="form-check form-check-inline">
        <label class="form-check-label"> ${category} </label>
        <input
        class="form-check-input"
        type="checkbox"
        id="${category}"
        data-category="${category}"
        />
    </div>
    `;
    checkboxContainer.innerHTML += checkbox;
  });

  // ------ Event Listener ------
  const checkboxes = document.querySelectorAll(".form-check-input");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      filterCardsByCategory();
    });
  });
}


createCheckbox(data.events);

showAllCards();

for (let event of data.events) {
    createCard(event);
};


//------ Search Bar -------

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

// .... event listener
searchBtn.addEventListener("click", function (event) {
  event.preventDefault(); 
  performSearch();
});

searchInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    performSearch();
  }
});

function performSearch() {
  const searchTerm = searchInput.value.toLowerCase();
  const cards = document.querySelectorAll(".card");

  cards.forEach(function (card) {
    const cardTitle = card.querySelector(".card-title").textContent.toLowerCase();
    const cardDescription = card.querySelector(".card-text").textContent.toLowerCase();

    if (searchTerm === "") {
      card.style.display = "block";
    } else if (cardTitle.includes(searchTerm) || cardDescription.includes(searchTerm)) {
      card.style.display = "block"; 
    } else {
      card.style.display = "none"; 
    }
  });
}