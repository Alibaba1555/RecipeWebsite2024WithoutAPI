// Get page elements
const addRecipeBtn = document.getElementById("add-recipe-btn");
const recipeForm = document.getElementById("recipe-form");
const recipeList = document.getElementById("recipe-list");
const newRecipeForm = document.getElementById("new-recipe-form");
const cancelBtn = document.getElementById("cancel-btn");
const mainpageLink = document.getElementById("mainpage-link");

// Listening for the "Add New Recipe" button
addRecipeBtn.addEventListener("click", () => {
    recipeForm.classList.remove("hidden");  // Show the recipe form
});

// Listening for the "Cancel" button
cancelBtn.addEventListener("click", () => {
    recipeForm.classList.add("hidden");  // Hide the recipe form
});

// Listening for form submission events
newRecipeForm.addEventListener("submit", (e) => {
    e.preventDefault();  // Prevent the default form submission

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const steps = document.getElementById("steps").value;
    const imageInput = document.getElementById("image");
    const image = imageInput.files[0];  // Get the uploaded image file

    // Create recipe object
    const recipe = {
        name,
        email,
        steps,
        image: image ? URL.createObjectURL(image) : null,
    };

    // Get existing recipes data
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    recipes.push(recipe);
    localStorage.setItem("recipes", JSON.stringify(recipes));  // Save to local storage

    // Clear the form and hide it
    newRecipeForm.reset();
    recipeForm.classList.add("hidden");

    // Render the recipe list
    renderRecipes();
});

// Render the recipe list
function renderRecipes() {
    recipeList.innerHTML = "";  // Clear existing recipe list

    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];

    recipes.forEach((recipe, index) => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");

        const recipeImage = recipe.image ? `<img src="${recipe.image}" alt="${recipe.name}">` : "";
        recipeCard.innerHTML = `
            ${recipeImage}
            <h3><a href="recipe.html?id=${index}">${recipe.name}</a></h3>
            <p><strong>Posted by:</strong> ${recipe.email}</p>
            <p><strong>Steps:</strong></p>
            <p>${recipe.steps}</p>
        `;
        recipeList.appendChild(recipeCard);
    });
}

// Page load: Render recipe list
document.addEventListener("DOMContentLoaded", renderRecipes);

// Click the title to go back to the main page
mainpageLink.addEventListener("click", () => {
    window.location.href = "Mainpage.html";  // Go back to main page
});
