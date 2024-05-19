// Fetch and insert the navbar
// fetch('navbar.html')
//     .then(response => response.text())
//     .then(data => {
//         document.getElementById('navbar-placeholder').innerHTML = data;
//     });

// Fetch and insert the footer
// fetch('footer.html')
//     .then(response => response.text())
//     .then(data => {
//         document.getElementById('footer-placeholder').innerHTML = data;
//     });

// ----------------- EVENTS -----------------

// function ticketNavigation(link) {
//     console.log('ticketNavigation');
//     location.href = link;
// }




document.querySelectorAll('.event-card').forEach(item => {
    item.addEventListener('click', event => {
        if (window.location.href.includes('reviews')) {
            // location.href
            const navigateTo = location.href.split('type/')[1].split('/')[0];
            location.href = `/type/${navigateTo}/events/${item.id}`;
        }
        else {
            location.href = `events/${item.id}`;
        }

    });
});




var carouselItems = document.querySelectorAll('.carousel-item');

// Add click event listener to each carousel item
carouselItems.forEach(item => {
    item.querySelector('.carousel-caption').addEventListener('click', () => {
        const eventID = item.getAttribute('data-eventid');
        if (eventID) {
            location.href = 'events/' + eventID;
        }
    });
});


// ----------------- BOOKING -----------------

function setEventShowBackgroundImage(url) {
    console.log(url);
    document.querySelector('.event-image').style.backgroundImage = `url(${url})`;
    // use fetch API
    // fetch(url)
    //     .then(response => response.blob())
    //     .then(blob => {
    //         document.querySelector('.event-image').style.backgroundImage = `url(${url})`;
    //     });
};

// add event listener to review cards in bookings page
document.addEventListener("DOMContentLoaded", function () {
    // Get the current URL
    const currentUrl = window.location.href;
    // Construct the new URL for the reviews page
    const newUrl = `${currentUrl}/reviews`;
    // Set the href attribute of the link
    // document.getElementById('reviews-link').href = newUrl;
    document.querySelectorAll('#review-row a, .bookings-reviews-title a').forEach(item => {
        item.href = newUrl;

    });
});



// ----------------- Modal - Ticket Selection -----------------
var ticketsClicked = 0;

// Fix the ticket numbers when a ticket is removed
function rewriteTicketNumbers() {
    let ticketNumber = 1;
    document.querySelectorAll('.tickets-selected').forEach(item => {
        item.querySelector('.ticket-number').textContent = `TICKET #${ticketNumber}`;
        item.id = `ticket${ticketNumber}`;
        ticketNumber++;
    });
    ticketsClicked = ticketNumber - 1;
}



// Reset the content of the modal by removing all the selected tickets when closed
document.querySelectorAll('.close-encaps>.p-1>.x-close1').forEach(item => {
    item.addEventListener('click', event => {
        document.querySelectorAll('.tickets-selected').forEach(item => {
            item.remove();
        });
        ticketsClicked = 0;
    });
});

// Re-calculate the ticket price when the discount is changed
function addDiscountListener(ticketElement) {
    const selectElement = ticketElement.querySelector('select');
    selectElement.addEventListener('change', event => {
        const selectedOption = event.target.options[selectElement.selectedIndex];

        // Get the discount percentage from the selected option
        const discount = parseInt(selectedOption.textContent.split(',')[1]);

        const parentElement = ticketElement.parentElement;
        const baseCategoryPrice = parseFloat(parentElement.querySelector('.base-category-price').textContent);
        if (discount) {
            ticketElement.querySelector('.ticket-price').textContent = `${(baseCategoryPrice - discount / 100 * baseCategoryPrice).toFixed(2)}€`;
        }
        else {
            ticketElement.querySelector('.ticket-price').textContent = `${baseCategoryPrice.toFixed(2)}€`;
        }
        calculateFinalPrice();
    });
}


// Set ticket information in the modal
document.querySelectorAll('#tickets-col .card-body').forEach(item => {
    item.addEventListener('click', event => {
        let cardClickedElement = event.target;
        while (!(cardClickedElement.id.includes('event-show'))) {
            cardClickedElement = cardClickedElement.parentElement;
        }

        // Get the information from the card
        // const eventDate = cardClickedElement.querySelector('.event-date').textContent;
        // const eventDay = cardClickedElement.querySelector('.event-day').textContent;
        // const eventHour = cardClickedElement.querySelector('.event-hour').textContent;
        // const eventTitleArtists = cardClickedElement.querySelector('.event-title-artists').textContent;
        // const eventVenueNameAddress = cardClickedElement.querySelector('.event-venue-name-address').textContent;

        // // Set the information in the modal
        // TODO
        const modalInfoElement = document.querySelectorAll('#modal-info-1'); // modal-info-{{showID}}!
        // modalInfoElement.querySelector('.event-date').textContent = eventDate;
        // modalInfoElement.querySelector('.event-day').textContent = eventDay;
        // modalInfoElement.querySelector('.event-hour').textContent = eventHour;
        // modalInfoElement.querySelector('.event-title-artists').textContent = eventTitleArtists;
        // modalInfoElement.querySelector('.event-venue-name-address').textContent = eventVenueNameAddress;
        // const showCategories = JSON.parse(cardClickedElement.getAttribute('data-show-seat-categories'));
        // console.log("showcategoris", showCategories)
        // const categoriesContainer = document.querySelector('.seating-category-select-rows');
        // categoriesContainer.innerHTML = ''; // Clear existing categories
        // showCategories.forEach(category => {
        //     console.log("category",category)
        //     const categoryRow = document.createElement('div');
        //     categoryRow.classList.add('row', 'seating-category-row', 'py-2');
        //     categoryRow.innerHTML = `
        //         <div class="col-md-9 text-overlay mb-2">
        //             ${category.category_name.toUpperCase()}
        //         </div>
        //         <div class="col-2 text-overlay mt-1">
        //             <p class="base-category-price text-end">${Number(category.seat_price).toFixed(2)}€</p>
        //         </div>
        //         <div class="col-auto">
        //             <img src="/svgs/Plus.svg" class="plus-icon" alt="+">
        //         </div>
        //     `;
        //     categoriesContainer.appendChild(categoryRow);
        // });

        


        // Set the ticket price in the modal
        modalInfoElement.querySelector('.modal #final-price').textContent = `${Number(0).toFixed(2)}€`;
    });

});




// Add a ticket when the plus icon is clicked
document.querySelectorAll('.seating-category-row .plus-icon').forEach(item => {
    item.addEventListener('click', async event => {
        const categoryRow = item.parentElement.parentElement;
        ticketsClicked++;

        // Load the content of the modal
        const content = await fetch('/partials/ticketsModal.hbs').then(response => response.text())
            .then(data => { return data; });
        // Add it to the category row              
        categoryRow.insertAdjacentHTML('beforeend', content);

        // Set the ticket id, ticket number and price
        categoryRow.querySelector('.tickets-selected:last-child').id = `ticket${ticketsClicked}`;
        const ticketElement = document.querySelector(`#ticket${ticketsClicked}`);
        ticketElement.querySelector('.ticket-number').textContent = `TICKET #${ticketsClicked}`;
        ticketElement.querySelector('.ticket-price').textContent = `${parseFloat(categoryRow.querySelector('.base-category-price').textContent).toFixed(2)}€`;

        // Add the event listener for the close button
        document.querySelectorAll('.tickets-selected .close-encaps .x-close0').forEach(item => {
            item.addEventListener('click', event => {
                item.parentElement.parentElement.parentElement.remove();
                rewriteTicketNumbers();
                calculateFinalPrice();
            });
            // Change the color of the close button when hovered
            item.addEventListener('mouseover', event => {
                item.src = "/svgs/BlackX.svg";
            });
            item.addEventListener('mouseout', event => {
                item.src = "/svgs/GrayX.svg";
            });
        });

        // Add the event listener for the discount selector
        addDiscountListener(ticketElement);

        // Recalculate the final price
        calculateFinalPrice();
    });
});


function calculateFinalPrice() {
    let finalPrice = 0;
    document.querySelectorAll('.ticket-price').forEach(item => {
        finalPrice += parseFloat(item.textContent);
    });
    document.querySelector('#final-price').textContent = `${finalPrice.toFixed(2)}€`;
}

// Add check to make sure the button is clickable only when at least one ticket is selected
document.querySelectorAll('.buy-btn').forEach(item => {
    item.addEventListener('click', event => {
        if (ticketsClicked == 0) {
            event.preventDefault();
            // alert('Please select at least one ticket to proceed');
        }
    });
});

// ----------------- REVIEWS -----------------
// Make the Post button unclickable if the textarea is empty
// console.log(document.querySelectorAll('textarea'));
document.querySelectorAll('#review-input').forEach(item => {
    item.addEventListener('input', event => {
        const postButton = document.querySelector('.post-review-btn-pos');
        postButton.disabled = true;
        let hasComment = false;
        if (event.target.value.trim() == '') {
            // postButton.disabled = true;
            hasComment = false;
        }
        else {
            // postButton.disabled = false;
            hasComment = true;
        }

        rating = localStorage.getItem('ratings');
        // rating is a string, so we need to convert it
        if (rating === 'undefined') {
            rating = undefined;
        }
        if (rating && hasComment) {
            postButton.disabled = false;
        }
        else {
            postButton.disabled = true;
        }
    });
});

document.querySelectorAll('.ratings-wrapper .close-encaps .x-close0').forEach(item => {
    item.addEventListener('click', event => {
        const ratingsElement = item.parentElement.parentElement;
        for (let star of ratingsElement.children) {
            star.removeAttribute('data-clicked');
            document.querySelector('.post-review-btn-pos').disabled = true;
        }
    });
    // Change the color of the close button when hovered
    item.addEventListener('mouseover', event => {
        item.src = "/svgs/BlackX.svg";
    });
    item.addEventListener('mouseout', event => {
        item.src = "/svgs/GrayX.svg";
    });
});


// Function to show the message
function showMessage(row) {
    let hoverMessage = row.querySelector('.hover-message');
    if (row.classList.contains("cancelled-by-user")) {
        hoverMessage.textContent = "This ticket was cancelled by you.";
    }
    else if (row.classList.contains("cancelled-show")) {
        hoverMessage.textContent = "This show has been cancelled.";
    }
    else if (row.classList.contains("completed")) {
        hoverMessage.textContent = "This show is over. ";
    }
}

// Function to hide the message
function hideMessage(row) {
    let hoverMessage = element.querySelector('.hover-message');
    hoverMessage.textContent = "";
}

window.onload = function () {
    var images = document.querySelectorAll('.tickets-booked-container .cancelled-by-user img.x-cancel, .tickets-booked-container .cancelled-show img.x-cancel, .tickets-booked-container .completed img.x-cancel ');
    images.forEach(function (img) {
        img.src = '/svgs/GrayX.svg';
    });
}

// change the profile picture when user uploads one
document.querySelectorAll('#uploadProfilePhoto').forEach(item => {
    item.addEventListener('change', function () {
    let profilePic = document.querySelector('#profilePhoto');
    let inputFile = this; // 'this' refers to the element that triggered the event, which is the file input in this case

    profilePic.src = URL.createObjectURL(inputFile.files[0]);
    });
});

// set the event image in bookings page
function setEventImage(imageUrl) {
    // Get the element by its class, event-image
    const eventImageContainer = document.querySelector('.page-container .event-image');

    // Set the background image style, including the gradient to make the text easier to read
    eventImageContainer.style.backgroundImage = `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url('${imageUrl}')`;
}


