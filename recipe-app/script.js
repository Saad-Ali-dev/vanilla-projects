const mealsEl = document.getElementById("meals");
const favoriteContainer = document.getElementById("fav-meals");
const mealPopup = document.getElementById("meal-popup");
const mealInfoEl = document.getElementById("meal-info");
const popupCloseBtn = document.getElementById("close-popup");
const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");


getRandomMeal();
fetchFavMeals();

searchBtn.addEventListener("click", async () => {
    // clear the container
    mealsEl.innerHTML = "";

    const search = searchTerm.value;
    const meals = await getMealsBySearch(search);
    if (meals) {
        meals.forEach((meal) => {
        addMeal(meal);
        });
    }
});

async function getMealsBySearch(term){
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    const data = await response.json();
    const meals = data.meals;

    return meals;
}

function addMeal(mealData, random = false){
    console.log(mealData);


    const meal = document.createElement("div");
    meal.classList.add("meal");


    meal.innerHTML = `
        <div class="meal-header">
            ${
                random ? `<span class="random"> Random Recipe </span>`: ""
            }
            <img
                src="${mealData.strMealThumb}"
                alt="${mealData.strMeal}"
            />
        </div>
        <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    `;

    meal.addEventListener("click", () => {
        showMealInfo(mealData);
    });

    mealsEl.appendChild(meal);

    const likeBtn = meal.querySelector(".meal-body .fav-btn");
    likeBtn.addEventListener('click', () => {
        if(likeBtn.classList.contains('active')){
            removeMealFromLS(mealData.idMeal);
            likeBtn.classList.remove('active');
        } else {
            addMealToLS(mealData.idMeal);
            likeBtn.classList.add('active');
        }

        fetchFavMeals();
    })
}

async function getRandomMeal(){
    const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const data = await response.json();
    const randomMeal = data.meals[0];

    addMeal(randomMeal, true);
}

function removeMealFromLS(mealId){
    const mealIds = getMealsFromLS();

    localStorage.setItem(
        "mealIds",
        JSON.stringify(mealIds.filter((id) => id !== mealId))
    );
}

function addMealToLS(mealId){
    const mealIds = getMealsFromLS();
    localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

function getMealsFromLS(){
    const mealIds = JSON.parse(localStorage.getItem("mealIds"));
    return mealIds === null ? [] : mealIds;
}

function fetchFavMeals(){
    // clean the container
    favoriteContainer.innerHTML = "";

    const mealIds = getMealsFromLS();

    mealIds.forEach(async (mealId) => {
        const meal = await getMealById(mealId);
        addMealToFav(meal);
    });
}

async function getMealById(id){
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await response.json();
    const meal = data.meals[0];

    return meal;
}

function addMealToFav(mealData){
    const favMeal = document.createElement("li");

    favMeal.innerHTML = `
        <img
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
        />
        <span>${mealData.strMeal}</span>
        <button class="clear"><i class="fas fa-window-close"></i></button>
    `;

    const btn = favMeal.querySelector(".clear");
    btn.addEventListener("click", () => {
        removeMealFromLS(mealData.idMeal);
        fetchFavMeals();
    });

    favMeal.addEventListener("click", () => {
        showMealInfo(mealData);
    });

    favoriteContainer.appendChild(favMeal);
}

function showMealInfo(mealData){
    mealInfoEl.innerHTML = "";

    // update the meal info
    const mealEl = document.createElement("div");

    const ingredients = [];

    // get ingredients and measures
    for(let i = 1; i <= 20; i++){
        if(mealData[`strIngredient${i}`]){
            ingredients.push(
                `${mealData[`strIngredient${i}`]} - ${mealData[`strMeasure${i}`]}`
            );
        } else {
            break;
        }
    }

    mealEl.innerHTML = `
        <h1>${mealData.strMeal}</h1>
        <img
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
        />
        <p>
            ${mealData.strInstructions}
        </p>
        <h3>Ingredients:</h3>
        <ul>
            ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
        </ul>
    `;

    mealInfoEl.appendChild(mealEl);

    // show the popup
    mealPopup.classList.remove("hidden");
}

popupCloseBtn.addEventListener("click", () => {
    mealPopup.classList.add("hidden");
});