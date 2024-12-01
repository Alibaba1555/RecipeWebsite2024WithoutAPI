document.addEventListener('DOMContentLoaded', function () {
    // Get the id parameter in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id'); // Get the ID of a recipe

    if (!recipeId) {
        alert('Recipe ID is missing!');
        return;
    }

    const ratingInput = document.getElementById('rating');
    const submitRatingBtn = document.getElementById('submit-rating');
    const ratingMessage = document.getElementById('rating-message');
    const averageRatingElement = document.getElementById('average-rating');
    const commentInput = document.getElementById('comment');
    const submitCommentBtn = document.getElementById('submit-comment');
    const commentsList = document.querySelector('#comments-list ul');

    // Get or generate a user ID
    let userId = localStorage.getItem('userId');
    if (!userId) {
        userId = 'user_' + Date.now(); // Generate a unique user ID
        localStorage.setItem('userId', userId);
    }

    // Get or initialize recipe data
    const storageKey = `recipe_${recipeId}`;
    let recipeData = JSON.parse(localStorage.getItem(storageKey)) || { ratings: {}, comments: [] };

    // Check if the user has rated
    if (recipeData.ratings[userId] !== undefined) {
        const userRating = recipeData.ratings[userId];
        ratingMessage.textContent = `You have already rated this recipe: ${userRating}/50`;
        ratingInput.disabled = true;
        submitRatingBtn.disabled = true;
    } else {
        ratingMessage.textContent = 'Please rate this recipe!';
    }

    // Submit Rating
    submitRatingBtn.addEventListener('click', function () {
        const rating = parseInt(ratingInput.value, 10);
        if (rating >= 0 && rating <= 50) {
            // Save rating
            recipeData.ratings[userId] = rating;
            localStorage.setItem(storageKey, JSON.stringify(recipeData));

            ratingMessage.textContent = `You rated this recipe: ${rating}/50`;
            ratingInput.disabled = true;
            submitRatingBtn.disabled = true;

            // Update average rating
            updateAverageRating();
        } else {
            alert('Please enter a rating between 0 and 50.');
        }
    });

    // Calculating and updating average rating
    function updateAverageRating() {
        const ratings = Object.values(recipeData.ratings);
        if (ratings.length > 0) {
            const averageRating = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
            averageRatingElement.textContent = `Average Rating: ${averageRating.toFixed(1)}/50`;
        } else {
            averageRatingElement.textContent = `Average Rating: Not available`;
        }
    }

    // Load initial average rating
    updateAverageRating();

    // Submit a review
    submitCommentBtn.addEventListener('click', function () {
        const commentText = commentInput.value.trim();
        if (commentText) {
            // Add Comment
            recipeData.comments.push({ user: userId, text: commentText });
            localStorage.setItem(storageKey, JSON.stringify(recipeData));

            // Update Comment List
            const commentElement = document.createElement('li');
            commentElement.textContent = `${commentText} (by ${userId})`;
            commentsList.appendChild(commentElement);
            commentInput.value = ''; // Clear the input box
        } else {
            alert('Comment cannot be empty!');
        }
    });

    // Loading Comments
    function loadComments() {
        recipeData.comments.forEach(comment => {
            const commentElement = document.createElement('li');
            commentElement.textContent = `${comment.text} (by ${comment.user})`;
            commentsList.appendChild(commentElement);
        });
    }

    // Initial loading comments
    loadComments();
});
