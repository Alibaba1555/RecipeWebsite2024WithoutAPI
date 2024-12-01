/**
 * recipe website(mainPage)
 * Tianshun
 */
// function draw() {

// }


    function toggleMenu() {
        const menu = document.getElementById('hidden-menu');
        if (menu.style.display === 'block') {
            menu.style.display = 'none';
        } else {
            menu.style.display = 'block';
        }
    }

    document.addEventListener('click', function(event) {
        const menu = document.getElementById('hidden-menu');
        const menuButton = document.getElementById('menu-button');
        if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
            menu.style.display = 'none';
        }
    });

//loading page
function showLoading() {
    document.body.classList.add('loading-active');
    document.getElementById('loading-container').style.display = 'flex';
}

function hideLoading() {
    document.body.classList.remove('loading-active');
    document.getElementById('loading-container').style.display = 'none';
}



    
// GPT API setup
// Show loading animation at the beginning of the request and hide it when the request ends
async function fetchRecipe() {
    const userInput = document.getElementById('searchInput').value;
    // check if it is empty
    if (!userInput.trim()) {
        alert("Please enter ingredients!");
        return; // Exit function to avoid loading animations and API calls
    }

    showLoading(); // Show loading animation

    try {
        // Get the value of the filter condition
        const selectedCategory = categoryFilter.value;
        const isGlutenFree = glutenFree.checked;
        const isVegan = vegan.checked;
        const isDessert = dessert.checked;

        let filterDescription = `Create a recipe with the following conditions:`;

        if (userInput) {
            filterDescription += ` Ingredients: ${userInput}.`;
        }

        if (selectedCategory) {
            filterDescription += ` Category: ${selectedCategory}.`;
        }
        if (isGlutenFree) {
            filterDescription += ` Must be gluten-free.`;
        }
        if (isVegan) {
            filterDescription += ` Must be vegan.`;
        }
        if (isDessert) {
            filterDescription += ` It should be a dessert.`;
        }

        // API setup
        const apiKey = 'API KEY HERE! I have to take off the api unless github wont let me upload.';
        const apiUrl = 'https://api.openai.com/v1/chat/completions';

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        };

        const data = {
            model: "gpt-3.5-turbo",
            messages: [
                { 
                    role: "system", 
                    content: "You are a world-renowned three-star Michelin chef. You will create a recipe based on the ingredients provided by the user. Always assume the user input contains valid ingredients unless explicitly stated otherwise. If no ingredients are given, or the input is unclear, ask the user to provide valid ingredients except if the user says random recipe, then you will generate a random recipe. Include an estimated preparation time and represent the dish using emojis at the end."
                },
                { 
                    role: "user", 
                    content: filterDescription
                }
            ]
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });

        const result = await response.json();
        const recipe = result.choices[0].message.content;
        hideLoading(); // Hide loading animation

        // Generate random time (preparation time, emmm... because gpt cannot separate the preparation time and cooking time, so I can only do this...)
        const estimatedTime = Math.floor(Math.random() * 15) + 20; // 20-35 

        // Split recipe content into steps and generate HTML
        const steps = recipe.split('\n').filter(step => step.trim() !== ''); // Split steps by row

        let stepsHtml = steps.map(step => {
            return `<div class="step">${step}</div>`;
        }).join('');

        // Display recipe results and insert content
        document.getElementById('recipe-result').style.display = 'block';
        document.getElementById('recipe-result').innerHTML = `
            <h2>Recommended recipes：</h2>
            ${stepsHtml}
            <h3>Estimated time to prepare ingredients：${estimatedTime} minutes</h3>
        `;
    } catch (error) {
        console.error('Error fetching recipe:', error);
        document.getElementById('recipe-result').style.display = 'none';
    } finally {
        // Hide loading animation
        document.getElementById('loading-animation').style.display = 'none';
    }
}



// Add an event listener to trigger the search when the user presses the Enter key
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        fetchRecipe();
    }
});


// menu hidden button animation
function toggleMenu() {
    var menu = document.getElementById("hidden-menu");
    if (menu.classList.contains("active")) {
        menu.classList.remove("active"); // Hide the menu and remove the animation class
        setTimeout(function() {
            menu.style.display = "none"; // Hide the menu after the animation is complete
        }, 300); // The animation time is 0.3 second
    } else {
        menu.style.display = "block"; // Show menu
        setTimeout(function() {
            menu.classList.add("active"); 
        }, 10); // Delay a little to make sure display:block takes effect before animating
    }
}


//filter
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const glutenFree = document.getElementById('glutenFree');
const vegan = document.getElementById('vegan');
const dessert = document.getElementById('dessert');

// Get the value of the filter condition
function getFilterConditions() {
    const searchQuery = searchInput.value.trim();
    const selectedCategory = categoryFilter.value;
    const isGlutenFree = glutenFree.checked;
    const isVegan = vegan.checked;
    const isDessert = dessert.checked;

    let filterDescription = `Create a recipe with the following conditions:`;

    if (searchQuery) {
        filterDescription += ` Ingredients: ${searchQuery}.`;
    }

    if (selectedCategory) {
        filterDescription += ` Category: ${selectedCategory}.`;
    }
    if (isGlutenFree) {
        filterDescription += ` Must be gluten-free.`;
    }
    if (isVegan) {
        filterDescription += ` Must be vegan.`;
    }
    if (isDessert) {
        filterDescription += ` It should be a dessert.`;
    }

    return filterDescription;
}


// Show returned recipes
function displayRecipe(recipeContent) {
    const recipeResultContainer = document.getElementById('recipe-result');
    recipeResultContainer.innerHTML = `
        <div class="recipe-content">
            <h2>Recipe:</h2>
            <p>${recipeContent}</p>
        </div>
    `;
}

// Listen for filter changes and request new recipes
searchInput.addEventListener('input', fetchRecipeFromAPI);
categoryFilter.addEventListener('change', fetchRecipeFromAPI);
glutenFree.addEventListener('change', fetchRecipeFromAPI);
vegan.addEventListener('change', fetchRecipeFromAPI);
dessert.addEventListener('change', fetchRecipeFromAPI);





















