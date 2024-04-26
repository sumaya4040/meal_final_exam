function search() {
    var search = document.getElementById("searchInput").value;
    var url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${search}`;
    fetch(url)
      .then(res => res.json())
      .then(data => process(data));
  }
  
  function process(data) {
    var dataArr = data.meals;
    var content = document.getElementById("content");
    content.textContent = "";
  
    for (var i = 0; i < 5; i++) {
      if (!dataArr[i]) return; // Handle potential undefined data
  
      var newDiv = document.createElement("div");
      newDiv.classList.add("box");
      newDiv.innerHTML = `
        <div class="inner-box">
          <img src="${dataArr[i].strMealThumb}">
          <div class="padding">
            <h4>Meal: ${dataArr[i].strMeal}</h4>
            <h5 class="light-text">Meal ID: ${dataArr[i].idMeal}</h5>
            <button class="details-btn" onclick="getDetails(${dataArr[i].idMeal})">Details</button>
          </div>
        </div>
      `;
      content.appendChild(newDiv);
    }
  }
  
  async function getDetails(idMeal) {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    const response = await fetch(url);
    const data = await response.json();
  
    if (!data.meals[0]) return; // Handle potential undefined data
  
    const meal = data.meals[0];
    const detailsModal = document.createElement("div");
    detailsModal.classList.add("modal");
    detailsModal.innerHTML = `
      <div class="modal-content">
        <span class="close-btn">&times;</span>
        <h3>${meal.strMeal}</h3>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <p><b>Instructions:</b> ${meal.strInstructions}</p>
      </div>
    `;
  
    document.body.appendChild(detailsModal);
  
    const closeButton = detailsModal.querySelector(".close-btn");
    closeButton.addEventListener("click", () => {
      detailsModal.remove();
    });
  }
  