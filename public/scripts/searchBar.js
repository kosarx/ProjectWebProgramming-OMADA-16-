let allEvents = [];

// Get all events
fetch('/api/allEvents')
    .then(response => response.json())
    .then(data => {
        allEvents = data;
    });


document.getElementById('search-input').addEventListener('input', (e) => {
    const searchResults = document.getElementById('search-results');
    searchResults.style.display = 'block';
    // Populate searchResults with the search results
    console.log('Searching for ' + e.target.value);
    // create example data
    const data = [
        {name: 'John Doe', email: 'email@domain.com'},
        {name: 'Jane Doe', email: 'email@domain.com'},
        {name: 'John Smith', email: 'email@domain.com'},
        {name: 'Jane Smith', email: 'email@domain.com'},
    ];  
    // clear searchResults
    searchResults.innerHTML = '';
    // populate searchResults
    data.forEach((item) => {
        const div = document.createElement('div');
        div.innerHTML = item.name;
        div.classList.add('dropdown-item');
        searchResults.appendChild(div);
    });
});

document.getElementById('search-input').addEventListener('blur', (e) => {
    const searchResults = document.getElementById('search-results');
    searchResults.style.display = 'none';
});