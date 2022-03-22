// card

const recipeCategories = document.querySelector(".recipe-categories");
const recipeCategory = document.querySelectorAll(".recipe-category");
const recipeCard = document.querySelector(".recipe-card");
const recipeCardsSection = document.querySelector(".recipe-cards");
const recipeBtn = document.querySelector(".btn-recipe");
const searchInput = document.querySelector(".search-form");
const searchBtn = document.querySelector(".search-btn");

url = "https://www.themealdb.com/api/json/v1/1/filter.php?c=breakfast";
let recipes = [];
let recipeCardHTML = "";

const fetchAPI = () => {
  fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
      console.log(data);
      recipes = data.meals;
      console.log(recipes);
      if (recipes) {
        if (recipes.length > 0) {
          renderRecipeCard();
        } else {
          console.log("no results");
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
    recipeCardHTML += `<div class="col-md-12 col-md-4 recipe-card">
              <img src="${recipeImg}" alt="Recipe image" />
              <div class="recipe-desc">
                <p>${recipeTitle}</p>
                <a href="" class="btn-recipe">Get Recipe</a>
              </div>
            </div>
         `;
  });
  recipeCardsSection.innerHTML = recipeCardHTML;
};

const getByCategory = (e) => {
  const selectedCategory = e.target.innerText;
  url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
  fetchAPI();
};

recipeCategories.addEventListener("click", getByCategory);

const getBySearching = (e) => {
  e.preventDefault();
  const keyword = searchInput.value;
  url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`;
  fetchAPI();
  renderRecipeCard();
};

searchBtn.addEventListener("click", getBySearching);

const getRecipeDetails = async (e) => {
  recipeCard = document.querySelector(".recipe-card");
  let recipeId = await e.target;
  console.log(recipeId);
  // url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
  // fetchAPI();
};

recipeCard.addEventListener("click", (event) => {
  getRecipeDetails;
});

const renderError = () => {
  recipeCardHTML = "";
  console.log("something has occured....");
  recipeCardHTML += `<div class="alert alert-danger text-align w-100" role="alert">
  There are no results that match your search.
</div>`;
  recipeCardsSection.innerHTML = recipeCardHTML;
};
