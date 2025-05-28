const searchBtn = document.getElementById("searchBtn");
const randomBtn = document.getElementById("randomBtn");
const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");
const loadingDiv = document.getElementById("loading");
const mobileMenuButton = document.getElementById("mobileMenuButton");
const mobileMenu = document.getElementById("mobileMenu");

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent document click from firing immediately
    const isHidden = mobileMenu.classList.contains("hidden");
    mobileMenu.classList.toggle("hidden");

    mobileMenuButton.setAttribute("aria-expanded", String(isHidden));
  });

  document.addEventListener("click", (e) => {
    if (!mobileMenu.contains(e.target) && e.target !== mobileMenuButton) {
      if (!mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden");
        mobileMenuButton.setAttribute("aria-expanded", "false");
      }
    }
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      mobileMenuButton.setAttribute("aria-expanded", "false");
    });
  });
}

// Event Listeners
searchBtn.addEventListener("click", searchRecipes);
randomBtn.addEventListener("click", fetchRandomRecipe);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchRecipes();
});

// Fetch Recipes from API
async function searchRecipes() {
  const searchTerm = searchInput.value.trim();
  if (!searchTerm) {
    showError("Please enter a recipe name!");
    return;
  }

  showLoading();
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
    );
    const data = await response.json();
    hideLoading();
    displayRecipes(data.meals);
  } catch (error) {
    hideLoading();
    showError("Failed to fetch recipes. Please try again later.");
  }
}

// Fetch Random Recipe
async function fetchRandomRecipe() {
  showLoading();
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const data = await response.json();
    hideLoading();
    displayRecipes(data.meals);
  } catch (error) {
    hideLoading();
    showError("Could not load a random recipe. Try again!");
  }
}

// Display Recipes
function displayRecipes(meals) {
  if (!meals) {
    resultsDiv.innerHTML = `
      <div class="col-span-full text-center py-12 fade-in">
        <i class="fas fa-exclamation-triangle text-4xl text-yellow-500 mb-4"></i>
        <h3 class="text-xl font-semibold mb-2">No recipes found</h3>
        <p class="text-gray-600">Try a different search term.</p>
      </div>
    `;
    return;
  }

  resultsDiv.innerHTML = meals
    .map(
      (meal) => `
      <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition fade-in">
        <img 
          src="${meal.strMealThumb}" 
          alt="${meal.strMeal}" 
          class="w-full h-48 object-cover hover:scale-105 transition duration-300"
          loading="lazy"
        >
        <div class="p-5">
          <div class="flex justify-between items-start mb-2">
            <h3 class="text-lg font-bold">${meal.strMeal}</h3>
            <span class="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
              ${meal.strArea}
            </span>
          </div>
          <p class="text-gray-600 text-sm mb-4">${meal.strCategory}</p>
          <button 
            onclick="showRecipeDetails('${meal.idMeal}')" 
            class="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2"
          >
            <i class="fas fa-book-open"></i> View Recipe
          </button>
        </div>
      </div>
    `
    )
    .join("");
}

// Show Recipe Details
async function showRecipeDetails(mealId) {
  showLoading();
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    const data = await response.json();
    const meal = data.meals[0];
    hideLoading();

    // Extract ingredients
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(
          `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
        );
      }
    }

    // Display details
    resultsDiv.innerHTML = `
      <div class="col-span-full fade-in">
        <button 
          onclick="searchRecipes()" 
          class="mb-6 flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition"
        >
          <i class="fas fa-arrow-left"></i> Back to results
        </button>
        
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <img 
            src="${meal.strMealThumb}" 
            alt="${meal.strMeal}" 
            class="w-full h-64 md:h-80 object-cover"
          >
          <div class="p-6 md:p-8">
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                ${meal.strCategory}
              </span>
              <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                ${meal.strArea}
              </span>
            </div>
            
            <h2 class="text-3xl font-bold mb-4">${meal.strMeal}</h2>
            
            <div class="grid md:grid-cols-2 gap-8">
              <div>
                <h3 class="text-xl font-semibold mb-3">Ingredients</h3>
                <ul class="space-y-2">
                  ${ingredients
                    .map(
                      (ing) => `<li class="flex items-start">
                    <i class="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                    <span>${ing}</span>
                  </li>`
                    )
                    .join("")}
                </ul>
              </div>
              
              <div>
                <h3 class="text-xl font-semibold mb-3">Instructions</h3>
                <div class="prose max-w-none">
                  ${meal.strInstructions
                    .split("\n")
                    .map((p) => `<p>${p}</p>`)
                    .join("")}
                </div>
              </div>
            </div>
            
            ${
              meal.strYoutube
                ? `
              <div class="mt-8">
                <h3 class="text-xl font-semibold mb-3">Video Tutorial</h3>
                <div class="aspect-w-16 aspect-h-9">
                  <iframe 
                    src="https://www.youtube.com/embed/${
                      meal.strYoutube.split("v=")[1]
                    }" 
                    class="w-full h-64 rounded-lg"
                    frameborder="0"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            `
                : ""
            }
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    hideLoading();
    showError("Could not load recipe details. Please try again.");
  }
}

function showLoading() {
  loadingDiv.classList.remove("hidden");
  resultsDiv.classList.add("hidden");
}

function hideLoading() {
  loadingDiv.classList.add("hidden");
  resultsDiv.classList.remove("hidden");
}

function showError(message) {
  resultsDiv.innerHTML = `
    <div class="col-span-full text-center py-12 fade-in">
      <i class="fas fa-exclamation-circle text-4xl text-red-500 mb-4"></i>
      <h3 class="text-xl font-semibold mb-2">Error</h3>
      <p class="text-gray-600">${message}</p>
    </div>
  `;
}
