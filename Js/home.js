
const allCardContainer = document.getElementById("allCardContainer");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");


function filterCars(){
  const cards = document.querySelectorAll(".card");
  const checkboxes = document.querySelectorAll(".form-check-input");
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategories = Array.from(checkboxes)
  .filter((checkbox) => checkbox.checked)
  .map((checkbox) => checkbox.getAttribute("data-category"));

  const searchByText =  searchTerm !== ""
  const hasSearchBoxSelected = selectedCategories.length !== 0

  cards.forEach((card)=> {
      const cardTitle = card.querySelector(".card-title").textContent.toLowerCase();
      const cardDescription = card.querySelector(".card-text").textContent.toLowerCase();
      const category = card.getAttribute("data-category");
      
      if(!searchByText && !hasSearchBoxSelected ){
      card.style.display = "block";
      } 
      else if(searchByText && !hasSearchBoxSelected ){ 
      if (cardTitle.includes(searchTerm) || cardDescription.includes(searchTerm)) {
          card.style.display = "block";
      } else {
          card.style.display = "none";
      } 


      } else if (!searchByText && hasSearchBoxSelected ){

      if (selectedCategories.includes(category)) {
          card.style.display = "block";
      } else {
          card.style.display = "none";
      }

      } else {

      if ((cardTitle.includes(searchTerm) || cardDescription.includes(searchTerm)) && selectedCategories.includes(category)) {
          card.style.display = "block";
      } else {
          card.style.display = "none";
      }

      }
  });
}

function obtainCategories(events) {
  const uniqueCategories = [];
  events.forEach((event) => {
    if (!uniqueCategories.includes(event.category)) {
      uniqueCategories.push(event.category);
    }
  });
  return uniqueCategories;
}

function createCard(event) {
  let card = `
    <div class="card mb-4" style="width: 25rem" data-category="${event.category}">
      <img src="${event.image}" class="card-img-top" alt="${event.name}" />
      <div class="card-body">
        <h5 class="card-title">${event.name}</h5>
        <p class="card-text">${event.description}</p>
        <div class="container d-flex justify-content-between">
          <p class="card-text">Price: $${event.price}</p>
          <a href="details.html?id=${event._id}" class="btn btn-dark">Description</a>
        </div>
      </div>
    </div>
  `;
  allCardContainer.innerHTML += card;
}

function filterCardsByCategory() {
  const cards = document.querySelectorAll(".card");
  const checkboxes = document.querySelectorAll(".form-check-input");
  const selectedCategories = Array.from(checkboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.getAttribute("data-category"));

  cards.forEach((card) => {
    const category = card.getAttribute("data-category");
    if (selectedCategories.length === 0 || selectedCategories.includes(category)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

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

  const checkboxes = document.querySelectorAll(".form-check-input");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      filterCardsByCategory();
    });
  });
}

function createCards (events){
  events.forEach((event) => {
    createCard(event); 
  });
}


searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  filterCars();
  });

  searchInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    filterCars();
  }
});

// ------ Import Data  from API ------
function obtainDataFromAPI() {
  fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error para acceder a la informacion');
      }
      return response.json();
    })
    .then(data => {
      createCheckbox(data.events); 
      createCards(data.events)
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


obtainDataFromAPI();
















