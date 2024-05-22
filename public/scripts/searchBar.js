let allEvents;

// Get all events
fetch('/api/getScheduledEventShows')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        allEvents = data;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation: ', error);
    });

document.getElementById('search-input').addEventListener('input', (e) => {
    const searchResults = document.getElementById('search-results');
    searchResults.style.display = 'block';

    // Populate searchResults with the search results
    const data = allEvents.filter((item) => {
        const lowerTitle = item.title.toLowerCase();
        const lowerGenre = item.genre?.toLowerCase(); // potential undefined
        const lowerVenue = item.venue_name?.toLowerCase(); //potential undefined
        const lowerType = item.event_type?.toLowerCase(); //potential undefined
        const lowerCity = item.city?.toLowerCase(); //potential undefined
        
        userInput = e.target.value.toLowerCase();
        // Check if input matches any of the relevant fields (title, genre, venue)
        return (
          lowerTitle.includes(userInput) ||
          (lowerGenre && lowerGenre.includes(userInput)) ||
          (lowerVenue && lowerVenue.includes(userInput)) ||
            (lowerType && lowerType.includes(userInput)) ||
            (lowerCity && lowerCity.includes(userInput))
        );
      });
    // clear searchResults
    searchResults.innerHTML = '';
    // populate searchResults
    // copy of data
    data_copy = JSON.parse(JSON.stringify(data));
    data_copy.forEach((item) => {
        const div = document.createElement('div');
        div.classList.add('dropdown-item');
        // go through the data attributes, truncate them
        for (let key in item) {
            if (key === 'imageURL' || key === 'showID' || key === 'eventID') {
                continue;
            }
            else if (key === 'title') {
                if (item[key].length > 30)
                    item[key] = item[key].slice(0, 10) + '...';
            }
            else if (key === 'venue_name') {
                if (item[key].length > 15)
                    item[key] = item[key].slice(0, 10) + '...';
            }
            else if (key === 'show_time') {
                item[key] = item[key].slice(0, 5);
            }
            else {
                if (item[key].length > 15)
                    item[key] = item[key].slice(0, 10) + '...';
            }

        }
        const content = `
        <div data-event-id="${item.eventID}">
            <div class="row gx-2">
                <div class="col-md-5 col-lg-4 col-xl-3 event-img-cols">
                <img src="${item.imageURL}" class="card-img rounded event-img img-fluid" alt="${item.title} image">
                </div>
                <div class="col-md-7 col-lg-8 col-xl-9">
                <div class="event-card-body">
                    <div class="row">
                    <div class="col">
                        <h5 class="event-card-title">${item.title}</h5>
                        <p class="event-card-date">
                        ${item.show_date} ${item.show_time}
                        </p>
                        <p class="event-card-location">${item.city},
                        <span> ${item.venue_name}</span>,
                        <span class='event-card-genre'> ${item.genre}</span>,
                        <span class='event-card-type'> ${item.event_type}</span>
                        </p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        `;
        div.innerHTML = content;
        searchResults.appendChild(div);
        
    });
});

var hasFocus = false;

document.getElementById('search-input').addEventListener('focus', () => {
  hasFocus = true;
});

document.getElementById('search-input').addEventListener('blur', () => {
  hasFocus = false;
});

document.getElementById('search-results').addEventListener('mouseout', (e) => {
  // Ensure the user isn't hovering over the search results or input
  if (!hasFocus && !e.relatedTarget?.matches('#search-input, #search-results *')) {
    const searchResults = document.getElementById('search-results');
    searchResults.style.display = 'none';
  }
});

let hiddenEventID = '';
let hiddenEventType = '';

document.getElementById('search-results').addEventListener('click', (e) => {
    let cardClickedElement = e.target;
    // find the eventID of the clicked card
    while (!cardClickedElement.dataset.eventId) {
        cardClickedElement = cardClickedElement.parentElement;
    }
    const eventID = cardClickedElement.dataset.eventId;
    hiddenEventID = eventID;
    
    // find the event type of the clicked card
    let eventType = '';
    allEvents.forEach((event) => {
        if (event.eventID == eventID) {
            eventType = event.event_type.toLowerCase();
            hiddenEventType = eventType;
        }
    });

    // const formElement = document.querySelector('#search-form');    
    // formElement.action=`/type/${eventType}/events/${eventID}/`;
    // formElement.submit();
    // window.location.href = `/type/${eventType}/events/${eventID}`;
    
    let finalText = '';
    const selectedResult = document.querySelector(`[data-event-id="${eventID}"]`);
    // find the title from allEvents
    allEvents.forEach((event) => {
        if (event.eventID == eventID) {
            finalText = `${event.title} - ${event.genre} - ${event.event_type}`;
        }
    });

    document.querySelector('#search-input').value = finalText;
});

document.getElementById('search-btn').addEventListener('click', (e) => {
    e.preventDefault();
    if (hiddenEventID === '' || hiddenEventType === '') {
        return;
    }
    const searchResults = document.getElementById('search-results');
    searchResults.style.display = 'none';

    url=`/type/${hiddenEventType}/events/${hiddenEventID}`;
    window.location.href = url;
});