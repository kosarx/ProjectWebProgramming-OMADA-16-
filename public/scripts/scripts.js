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


// document.querySelectorAll('.profile-image').forEach(item => {
//     item.addEventListener('click', event => {

//         window.location.href = `/profile/`;


//     });
// });

// add event listener on delete review button, where a get request /delete-review/:reviewID is made to the server and if it is successful the page is reloaded

document.querySelectorAll('#user-reviews-col>.row').forEach(item => {
    let reviewID;

    if (item.id.includes("review-")) {
        reviewID = item.id.split("review-")[1];

        cancelCol = item.querySelector(".cancel-col>a")

        cancelCol.addEventListener('click', async event => {
            let cancelClickedElement = event.target

            while (!(cancelClickedElement.classList.contains('btn-primary'))) {
                cancelClickedElement = cancelClickedElement.parentElement;
            }
            event.preventDefault();  // prevents the default behavior (navigation to another page when clicked ) 

            try {
                userID = window.location.href.split('/')[4];
                const response = await fetch(`/api/${userID}/delete-review/${reviewID}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const result = await response.json();

                if (result.success) {
                    // Reload the window to show the updated reviews
                    window.location.reload();
                } else {
                    console.error('Failed to delete review:', result.error);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }
});


document.querySelectorAll('#booked-tickets-col>.row.scheduled').forEach(item => {
    let ticketID;

    if (item.id.includes("ticket-")) {
        ticketID = item.id.split("ticket-")[1];

        cancelCol = item.querySelector(".cancel-col>a")

        cancelCol.addEventListener('click', async event => {
            let cancelClickedElement = event.target

            while (!(cancelClickedElement.classList.contains('btn-primary'))) {
                cancelClickedElement = cancelClickedElement.parentElement;
            }
            event.preventDefault();  // prevents the default behavior (navigation to another page when clicked ) 

            try {

                userID = window.location.href.split('/')[4];

                const response = await fetch(`/api/${userID}/cancel-ticket/${ticketID}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const result = await response.json();

                if (result.success) {
                    // Reload the window to show the updated reviews
                    window.location.reload();
                } else {
                    console.error('Failed to cancel ticket:', result.error);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }
});



var carouselItems = document.querySelectorAll('.carousel-item');

// Add click event listener to each carousel item
carouselItems.forEach(item => {
    item.addEventListener('click', () => {
        const eventID = item.getAttribute('data-eventid');
        if (eventID) {
            location.href = 'events/' + eventID;
        }
    });
});


// ----------------- BOOKING -----------------

function setEventShowBackgroundImage(url) {
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
var showID = -1;

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
        document.querySelectorAll('.final-price').forEach(item => {
            item.textContent = '0.00€';
        });
        ticketsClicked = 0;
        showID = -1;
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

document.querySelectorAll('#tickets-col .card-body').forEach(item => {
    item.addEventListener('click', event => {
        // Get the card clicked
        let cardClickedElement = event.target;
        while (!(cardClickedElement.id.includes('event-show'))) {
            cardClickedElement = cardClickedElement.parentElement;
        }

        // Get the information from the card
        const eventDate = cardClickedElement.querySelector('.event-date').textContent;
        const eventDay = cardClickedElement.querySelector('.event-day').textContent;
        const eventHour = cardClickedElement.querySelector('.event-hour').textContent;
        const eventTitleArtists = cardClickedElement.querySelector('.event-title-artists').textContent;
        const eventVenueNameAddress = cardClickedElement.querySelector('.event-venue-name-address').textContent;
        // get the show id
        showID = cardClickedElement.id.split('-')[2];

        // Set the information in the modal
        const modalInfoElement = document.querySelector(`.modal-body #modal-info-${showID}`);
        modalInfoElement.querySelector('.event-date').textContent = eventDate;
        modalInfoElement.querySelector('.event-day').textContent = eventDay;
        modalInfoElement.querySelector('.event-hour').textContent = eventHour;
        modalInfoElement.querySelector('.event-title-artists').textContent = eventTitleArtists;
        modalInfoElement.querySelector('.event-venue-name-address').textContent = eventVenueNameAddress;
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
    // for all the final price nodes, update the final price
    const finalPriceNodes = document.querySelectorAll('.final-price');
    finalPriceNodes.forEach(item => {
        const showID = item.id.split('-')[2];
        document.querySelector(`#final-price-${showID}`).textContent = `${finalPrice.toFixed(2)}€`;
    });
}

// Add check to make sure the button is clickable only when at least one ticket is selected
document.querySelectorAll('.buy-btn').forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault();
        if (ticketsClicked == 0) {
            return false;
            // alert('Please select at least one ticket to proceed');
        }
        console.log('ticketsClicked:', ticketsClicked);

        // construct the ticket object with an increasing number, the category and the discount
        let tickets = [];
        for (let i = 1; i <= ticketsClicked; i++) {
            const ticketElement = document.querySelector(`#ticket${i}`);
            const category = ticketElement.parentNode.querySelector('.category-name').textContent.trim();
            const discount = ticketElement.querySelector('.tickets-selected .form-control').value;
            const finalPrice = ticketElement.querySelector('.ticket-price').textContent;
            console.log('category:', category, 'discount:', discount, 'finalPrice:', finalPrice);
            tickets.push({ 'category': category, 'discount': discount, 'finalPrice': finalPrice});
        }
        // Construct query string

        // Serialize tickets data
        const serializedTickets = encodeURIComponent(JSON.stringify(tickets));

        // Construct query string
        const queryString = new URLSearchParams({ showID, tickets: serializedTickets }).toString();
        console.log('queryString:', queryString);
        // Redirect to booking-complete page with query parameters
        window.location.href = `/booking-complete?${queryString}`;
    });
});

// ----------------- REVIEWS -----------------
// Make the Post button unclickable if the textarea is empty
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
        document.getElementById('review-rating').value = '';
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
    let hoverMessage = document.querySelector('.hover-message');
    hoverMessage.textContent = "";
}

window.onload = function () {
    const images = document.querySelectorAll('.tickets-booked-container .cancelled-by-user img.x-cancel, .tickets-booked-container .cancelled-show img.x-cancel, .tickets-booked-container .completed img.x-cancel ');
    images.forEach(function (img) {
        img.src = '/svgs/GrayX.svg';
    });
    const buttons = document.querySelectorAll('.tickets-booked-container .cancelled-by-user .cancel-col .btn, tickets-booked-container .cancelled-show .cancel-col .btn, tickets-booked-container .completed .cancel-col .btn');
    // make the link unclickable
    buttons.forEach(function (button) {
        button.classList.remove('btn');
        button.classList.remove('btn-primary');

        // remove the underline
        button.style.textDecoration = 'none';
        // remove the href
        button.removeAttribute('href');
        // remove the hover effect
        // button.style.cursor = 'default';
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

// review card is clicked, navigate to the reviews page, passing the review id
document.querySelectorAll('#user-reviews-col>.row').forEach(item => {
    const reviewID = item.id.split('-')[1];
    const cardElement = item.querySelector('.card');
    cardElement.addEventListener('click', event => {
        // get the event type and event id from the card attributes data-event-type and data-eventid
        const type = cardElement.getAttribute('data-event-type').toLowerCase();
        const eventID = cardElement.getAttribute('data-eventid');
        location.href = `/type/${type}/events/${eventID}/reviews?hr=${reviewID}`;
    });
    cardElement.addEventListener('mouseover', event => {
        item.style.cursor = 'pointer';
    });
});
