// set the event image in bookings page
function setEventImage(imageUrl) {
    // Get the element by its class, event-image
    const eventImageContainer = document.querySelector('.page-container .event-image');

    // Set the background image style, including the gradient to make the text easier to read
    eventImageContainer.style.backgroundImage = `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url('${imageUrl}')`;
}