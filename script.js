const recipeCategories = document.querySelector(".recipe-categories");
const recipeCategory = document.querySelectorAll(".recipe-category");
const recipeCard = document.querySelector(".recipe-card");
const recipeCardsSection = document.querySelector(".recipe-cards");
const recipeBtn = document.querySelector(".btn-recipe");
const searchInput = document.querySelector(".search-form");
const searchBtn = document.querySelector(".search-btn");
const mealDetail = document.querySelector(".meal-details");
const mealDetailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");
let url = "https://www.themealdb.com/api/json/v1/1/filter.php?c=breakfast";
let recipes = [];
let recipeCardHTML = "";

const fetchAPI = () => {
  fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
      recipes = data.meals;
      if (recipes) {
        if (recipes.length > 0) {
          renderRecipeCard();
        } else {
          renderError();
        }
      } else {
        renderError();
      }
    })
    .catch(function (error) {
      error;
    });
};

fetchAPI();

const renderRecipeCard = () => {
  recipeCardHTML = "";
  recipes.forEach((recipe) => {
    let recipeTitle = recipe.strMeal;
    let recipeImg = recipe.strMealThumb;
    let recipeId = recipe.idMeal;
    recipeCardHTML += `<div class="col-sm-12 col-md-6 col-lg-4 recipe-card" data-id="${recipeId}">
                        <img src="${recipeImg}" alt="Recipe image" />
                        <div class="recipe-desc">
                          <p>${recipeTitle}</p>
                          <button href="" class="btn-recipe">Recipe</button>
                        </div>
                      </div>`;
  });
  recipeCardsSection.innerHTML = recipeCardHTML;
};

const getByCategory = (e) => {
  const selectedCategory = e.target.innerText;
  url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
  fetchAPI();
};

const getBySearching = (e) => {
  e.preventDefault();
  const keyword = searchInput.value;
  url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`;
  fetchAPI();
  renderRecipeCard();
};

const getRecipeDetails = (e) => {
  e.preventDefault;
  if (e.target.classList.contains("btn-recipe")) {
    console.log("containssss");
    let mealItem = e.target.parentElement.parentElement;
    console.log(mealItem);
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then((response) => response.json())
      .then((data) => renderRecipeModal(data.meals));
  }
};

// create a modal
const renderRecipeModal = (meal) => {
  console.log(meal);
  meal = meal[0];
  let html = `<h2 class = "recipe-title">${meal.strMeal}</h2>
              <p class = "recipe-category-name">${meal.strCategory}</p>
              <hr>
              <div class = "recipe-instruct">
                <h3>Instructions:</h3>
                <p>${meal.strInstructions}</p>
              </div>
              <a href="${meal.strYoutube}" class="recipe-link" target = "_blank" >
                <p>Watch video</p>
                <img src="${meal.strMealThumb}" alt = "">
              </a>`;
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add("show-recipe");
};

const renderError = () => {
  recipeCardHTML = "";
  recipeCardHTML += `<div class="alert alert-danger text-align w-100" role="alert">
                      There are no results that match your search.
                    </div>`;
  recipeCardsSection.innerHTML = recipeCardHTML;
};

const closeModal = () => {
  mealDetailsContent.parentElement.classList.remove("show-recipe");
};

searchBtn.addEventListener("click", getBySearching);
recipeCardsSection.addEventListener("click", getRecipeDetails);
recipeCategories.addEventListener("click", getByCategory);
recipeCloseBtn.addEventListener("click", closeModal);
mealDetailsContent.parentElement.parentElement.parentElement.addEventListener(
  "click",
  closeModal
);
