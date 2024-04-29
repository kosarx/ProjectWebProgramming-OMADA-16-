// Fetch and insert the navbar
fetch('navbar.html')
    .then(response => response.text())
    .then(data => {
    document.getElementById('navbar-placeholder').innerHTML = data;
    });

// Fetch and insert the footer
fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-placeholder').innerHTML = data;
    });

function ticketNavigation() {
    location.href = "booking.html"
    }


// ----------------- Modal - Ticket Selection -----------------
let ticketsClicked = 0;

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

// Add a ticket when the plus icon is clicked
document.querySelectorAll('.seating-category-row .plus-icon').forEach(item => {
    item.addEventListener('click', async event => {
        const categoryRow = item.parentElement.parentElement;
        ticketsClicked++;

        // Load the content of the modal
        const content = await fetch('ticketsModal.html').then(response => response.text())
                            .then(data => {return data; });      
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
                item.src = "svgs/BlackX.svg";
            });
            item.addEventListener('mouseout', event => {
                item.src = "svgs/GrayX.svg";
            });
        });

        // Add the event listener for the discount selector
        addDiscountListener(ticketElement);

        // Recalculate the final price
        calculateFinalPrice();
    });
});

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
            ticketElement.querySelector('.ticket-price').textContent = `${(baseCategoryPrice - discount/100 * baseCategoryPrice).toFixed(2)}€`;
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
        const eventDate = cardClickedElement.querySelector('.event-date').textContent;
        const eventDay = cardClickedElement.querySelector('.event-day').textContent;
        const eventHour = cardClickedElement.querySelector('.event-hour').textContent;
        const eventTitle = cardClickedElement.querySelector('.event-title').textContent;
        const eventArtists = cardClickedElement.querySelector('.event-artists').textContent;
        const eventVenue = cardClickedElement.querySelector('.event-venue').textContent;
        const eventVenueAddress = cardClickedElement.querySelector('.event-venue-address').textContent;
        // const eventBasePrice = parseFloat(cardClickedElement.querySelector('span[name="price"]').textContent);
        
        // Set the information in the modal
        const modalInfoElement = document.querySelector('#modal-info');
        modalInfoElement.querySelector('.event-date').textContent = eventDate;
        modalInfoElement.querySelector('.event-day').textContent = eventDay;
        modalInfoElement.querySelector('.event-hour').textContent = eventHour;
        modalInfoElement.querySelector('.event-title').textContent = eventTitle;
        modalInfoElement.querySelector('.event-artists').textContent = eventArtists;
        modalInfoElement.querySelector('.event-venue').textContent = eventVenue;
        modalInfoElement.querySelector('.event-venue-address').textContent = eventVenueAddress;

        // Set the ticket price in the modal
        modalInfoElement.querySelector('.modal #final-price').textContent = `${Number(0).toFixed(2)}€`;
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
        if (event.target.value.trim() == '') {
            postButton.disabled = true;
        }
        else {
            postButton.disabled = false;
        }
    });
});