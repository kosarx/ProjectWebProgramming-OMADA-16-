ratingSystem();

function ratingSystem() {
    let stars = document.querySelector("#userRating").childNodes;
	// let products = document.querySelectorAll(".ratings");
	// let ratings = [];

    for (let star of stars){
        star.addEventListener("click", function(){
	      
            let children = 	star.parentElement.children;
            for (let child of children ) {
                if (child.getAttribute("data-clicked")){
                    // return false; // This will stop the function from executing further, remove to be able to adjust the rating
                    child.removeAttribute("data-clicked");
                }
            }
            
            this.setAttribute("data-clicked", "true");
            let rating = this.dataset.rating;
            localStorage.setItem("ratings", rating);

            const button = document.querySelector('.post-review-btn-pos');
            if (button) {
                let hasComment = false;
                if (document.querySelector('#review-input').value.trim() == '') {
                    hasComment = false;
                }
                else {
                    hasComment = true;
                }
                if (rating && hasComment) {
                    button.disabled = false;
                }
                else {
                    button.disabled = true;
                }
            }
        });       
    }
}