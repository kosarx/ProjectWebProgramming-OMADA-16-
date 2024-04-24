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