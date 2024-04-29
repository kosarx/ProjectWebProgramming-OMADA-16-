ratingSystem();

function ratingSystem() {
    let stars = document.querySelectorAll(".ratings span");
	let products = document.querySelectorAll(".ratings");
	let ratings = [];

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
            let productId = this.parentElement.dataset.productid;
            let data = {
                "rating" : rating,
                "product-id" : productId,
            }

            ratings.push(data);
            // localStorage.setItem("ratings", JSON.stringify(ratings));
        });       
    }
}