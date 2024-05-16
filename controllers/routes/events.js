import express from 'express';
// import moment from 'moment';
const router = express.Router();

import * as model from '../../model/dbInterface.js';


let eventNavigation = async function (req, res) {
    const navigateTo = req.params.type;
    let site_header = 'EVENTS';
    if (navigateTo === 'theater') {
        site_header = 'THEATER';
        model.getAllTheater((err, data) => {
            const theaterEvents = {};
            data.forEach(event => {
                const { theaterID: eventID, title, ...otherDetails } = event;
                if (!theaterEvents[eventID]) {
                    theaterEvents[eventID] = {
                        eventID,
                        title,
                        cities: [],
                        ...otherDetails,
                    };
                }
                let early_date = new Date(theaterEvents[eventID].earliest_date);
                let formattedDate = early_date.toISOString().split('T')[0];
                theaterEvents[eventID].earliest_date = formattedDate;
                let late_date = new Date(theaterEvents[eventID].latest_date);
                formattedDate = late_date.toISOString().split('T')[0];
                theaterEvents[eventID].latest_date = formattedDate;

                theaterEvents[eventID].cities.push(event.city);
            });

            for (let key in theaterEvents) {
                theaterEvents[key].cities = theaterEvents[key].cities.join(", ");
            }
            const eventList = Object.values(theaterEvents);
            // res.json(eventList);
            res.render('events', { site_header, eventList });
        });
    }
    else if (navigateTo === 'music') {
        site_header = 'MUSIC';
        model.getAllMusic((err, data) => {
            const musicEvents = {};
            data.forEach(event => {
                const { musicID: eventID, title, ...otherDetails } = event;
                if (!musicEvents[eventID]) {
                    musicEvents[eventID] = {
                        eventID,
                        title,
                        cities: [],
                        ...otherDetails,
                    };
                }
                let early_date = new Date(musicEvents[eventID].earliest_date);
                let formattedDate = early_date.toISOString().split('T')[0];
                musicEvents[eventID].earliest_date = formattedDate;
                let late_date = new Date(musicEvents[eventID].latest_date);
                formattedDate = late_date.toISOString().split('T')[0];
                musicEvents[eventID].latest_date = formattedDate;

                musicEvents[eventID].cities.push(event.city);
            });

            for (let key in musicEvents) {
                musicEvents[key].cities = musicEvents[key].cities.join(", ");
            }
            const eventList = Object.values(musicEvents);
            // res.json(eventList);
            res.render('events', { site_header, eventList });

        });
    }
    else if (navigateTo === 'cinema') {
        site_header = 'CINEMA';
        model.getAllCinema((err, data) => {
            const cinemaEvents = {};
            data.forEach(event => {
                const { cinemaID: eventID, title, ...otherDetails } = event;
                if (!cinemaEvents[eventID]) {
                    cinemaEvents[eventID] = {
                        eventID,
                        title,
                        cities: [],
                        ...otherDetails,
                    };
                }
                let early_date = new Date(cinemaEvents[eventID].earliest_date);
                let formattedDate = early_date.toISOString().split('T')[0];
                cinemaEvents[eventID].earliest_date = formattedDate;
                let late_date = new Date(cinemaEvents[eventID].latest_date);
                formattedDate = late_date.toISOString().split('T')[0];
                cinemaEvents[eventID].latest_date = formattedDate;

                cinemaEvents[eventID].cities.push(event.city);

            });

            for (let key in cinemaEvents) {
                cinemaEvents[key].cities = cinemaEvents[key].cities.join(", ");
            }
            const eventList = Object.values(cinemaEvents);
            // res.json(eventList);
            res.render('events', { site_header, eventList });

        });
    }
    else {
        // raise Error
        res.json({ error: 'Invalid navigation' });
    }
};

router.get('/:type/', eventNavigation);

let bookTicketsNavigation = async function (req, res) {
    const navigateTo = req.params.type;
    const eventID = req.params.id;

    let modalInfo;
    if (navigateTo === 'cinema') {
        model.getCinemaEventInfo(eventID, (err, eventInfo) => {
            if (err) {
                console.log("event")
                res.json({ error: err });
            }
            else {
                eventInfo = eventInfo[0];
                eventInfo.titleUpperCase = eventInfo.title.toUpperCase();
                eventInfo.type = navigateTo;
                eventInfo.locations = '';
                eventInfo.dates = '';
                model.getEventReviews(eventID, (err, reviewList) => {
                    if (err) {
                        console.log("reviews")
                        res.json({ error: err });
                    }
                    else {
                        reviewList.forEach(review => {
                            review.username = '@' + review.username;
                            review.username = review.username.replace(/['\s]/g, '');
                        });

                        model.getShowInfo(eventID, (err, showList) => {
                            if (err) {
                                console.log("show")

                                res.json({ error: err });
                            }
                            else {
                                const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                                const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                                let formattedDate;
                                let dayName;
                                let showDate;
                                for (let i in showList) {
                                    showList[i].minimum_price = parseFloat(showList[i].minimum_price).toFixed(2);

                                    // Format the date components

                                    showDate = new Date(showList[i].show_date);

                                    // Format the date components
                                    formattedDate = showDate.getDate().toString().padStart(2, '0') + '-' + (showDate.getMonth() + 1).toString().padStart(2, '0') + '-' + showDate.getFullYear().toString();

                                    // Get the day name
                                    dayName = dayNames[showDate.getDay()];

                                    showList[i].show_date = formattedDate;
                                    showList[i].show_day = dayName;

                                    let timeString = showList[i].show_time;

                                    // Split the time string into hours, minutes, and seconds
                                    let [hours, minutes, seconds] = timeString.split(':');

                                    // Convert the hours to a 12-hour format with AM/PM indication
                                    let ampm = hours >= 12 ? 'pm' : 'am';
                                    hours = (hours % 12) || 12;

                                    // Construct the formatted time string
                                    let formattedTime = hours + ':' + minutes + ' ' + ampm;

                                    showList[i].show_time = formattedTime;

                                    if (showList[i].venue_name == showList[i].address) {
                                        showList[i].venue_name = null;
                                    }

                                    if (!eventInfo.locations.includes(showList[i].city)){
                                        eventInfo.locations = eventInfo.locations + ', ' + showList[i].city;
                                    }
                                    if (!eventInfo.dates.includes(showList[i].show_date)){
                                        eventInfo.dates = eventInfo.dates + ', ' + showList[i].show_date;
                                    }
                                }

                                eventInfo.locations = eventInfo.locations.replace(/^, /, ''); // remove ", " from the beginning of the string
                                eventInfo.dates = eventInfo.dates.replace(/^, /, ''); // remove ", " from the beginning of the string
                                let titleAndArtist = eventInfo.title + ' - ' + eventInfo.lead_roles;
                                if(titleAndArtist.length>58) {
                                    titleAndArtist = titleAndArtist.slice(0,40)+'...';
                                }

                                eventInfo.titleAndArtist = titleAndArtist;

                                reviewList = reviewList.slice(0,3);

                                res.render('booking', { eventInfo, reviewList, showList });
                            }
                        })

                    }
                })
            }

        });

    }
    else if (navigateTo === 'music') {
        model.getMusicEventInfo(eventID, (err, eventInfo) => {
            if (err) {
                console.log("event")
                res.json({ error: err });
            }
            else {
                eventInfo = eventInfo[0];
                eventInfo.titleUpperCase = eventInfo.title.toUpperCase();
                eventInfo.type = navigateTo;
                eventInfo.locations = '';
                eventInfo.dates = '';
                model.getEventReviews(eventID, (err, reviewList) => {
                    if (err) {
                        console.log("reviews")
                        res.json({ error: err });
                    }
                    else {
                        reviewList.forEach(review => {
                            review.username = '@' + review.username;
                            review.username = review.username.replace(/['\s]/g, '');
                        });

                        model.getShowInfo(eventID, (err, showList) => {
                            if (err) {
                                console.log("show")

                                res.json({ error: err });
                            }
                            else {
                                const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                                const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                                let formattedDate;
                                let dayName;
                                let finalFormattedDate;
                                let showDate;
                                for (let i in showList) {
                                    showList[i].minimum_price = parseFloat(showList[i].minimum_price).toFixed(2);

                                    // Format the date components

                                    showDate = new Date(showList[i].show_date);

                                    // Format the date components
                                    formattedDate = showDate.getDate().toString().padStart(2, '0') + '-' + (showDate.getMonth() + 1).toString().padStart(2, '0') + '-' + showDate.getFullYear().toString();

                                    // Get the day name
                                    dayName = dayNames[showDate.getDay()];

                                    showList[i].show_date = formattedDate;
                                    showList[i].show_day = dayName;

                                    let timeString = showList[i].show_time;

                                    // Split the time string into hours, minutes, and seconds
                                    let [hours, minutes, seconds] = timeString.split(':');

                                    // Convert the hours to a 12-hour format with AM/PM indication
                                    let ampm = hours >= 12 ? 'pm' : 'am';
                                    hours = (hours % 12) || 12;

                                    // Construct the formatted time string
                                    let formattedTime = hours + ':' + minutes + ' ' + ampm;

                                    showList[i].show_time = formattedTime;

                                    if (showList[i].venue_name == showList[i].address) {
                                        showList[i].venue_name = null;
                                    }

                                    if (!eventInfo.locations.includes(showList[i].city)){
                                        eventInfo.locations = eventInfo.locations + ', ' + showList[i].city;
                                    }
                                    if (!eventInfo.dates.includes(showList[i].show_date)){
                                        eventInfo.dates = eventInfo.dates + ', ' + showList[i].show_date;
                                    }
                                }

                                eventInfo.locations = eventInfo.locations.replace(/^, /, ''); // remove ", " from the beginning of the string
                                eventInfo.dates = eventInfo.dates.replace(/^, /, ''); // remove ", " from the beginning of the string
                                let titleAndArtist = eventInfo.title + ' - ' + eventInfo.artists;
                                if(titleAndArtist.length>58) {
                                    titleAndArtist = titleAndArtist.slice(0,40)+'...';
                                }

                                eventInfo.titleAndArtist = titleAndArtist;

                                reviewList = reviewList.slice(0,3);

                                res.render('booking', { eventInfo, reviewList, showList });
                            }
                        })

                    }
                })
            }

        });

    }
    else if (navigateTo === 'theater') {
        model.getTheaterEventInfo(eventID, (err, eventInfo) => {
            if (err) {
                console.log("event")
                res.json({ error: err });
            }
            else {
                eventInfo = eventInfo[0];
                eventInfo.titleUpperCase = eventInfo.title.toUpperCase();
                eventInfo.type = navigateTo;
                eventInfo.locations = '';
                eventInfo.dates = '';
                model.getEventReviews(eventID, (err, reviewList) => {
                    if (err) {
                        console.log("reviews")
                        res.json({ error: err });
                    }
                    else {
                        reviewList.forEach(review => {
                            review.username = '@' + review.username;
                            review.username = review.username.replace(/['\s]/g, '');
                        });

                        model.getShowInfo(eventID, (err, showList) => {
                            if (err) {
                                console.log("show")

                                res.json({ error: err });
                            }
                            else {
                                const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                                const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                                let formattedDate;
                                let dayName;
                                let finalFormattedDate;
                                let showDate;
                                for (let i in showList) {
                                    showList[i].minimum_price = parseFloat(showList[i].minimum_price).toFixed(2);

                                    // Format the date components

                                    showDate = new Date(showList[i].show_date);

                                    // Format the date components
                                    formattedDate = showDate.getDate().toString().padStart(2, '0') + '-' + (showDate.getMonth() + 1).toString().padStart(2, '0') + '-' + showDate.getFullYear().toString();

                                    // Get the day name
                                    dayName = dayNames[showDate.getDay()];

                                    showList[i].show_date = formattedDate;
                                    showList[i].show_day = dayName;

                                    let timeString = showList[i].show_time;

                                    // Split the time string into hours, minutes, and seconds
                                    let [hours, minutes, seconds] = timeString.split(':');

                                    // Convert the hours to a 12-hour format with AM/PM indication
                                    let ampm = hours >= 12 ? 'pm' : 'am';
                                    hours = (hours % 12) || 12;

                                    // Construct the formatted time string
                                    let formattedTime = hours + ':' + minutes + ' ' + ampm;

                                    showList[i].show_time = formattedTime;

                                    if (showList[i].venue_name == showList[i].address) {
                                        showList[i].venue_name = null;
                                    }

                                    if (!eventInfo.locations.includes(showList[i].city)){
                                        eventInfo.locations = eventInfo.locations + ', ' + showList[i].city;
                                    }
                                    if (!eventInfo.dates.includes(showList[i].show_date)){
                                        eventInfo.dates = eventInfo.dates + ', ' + showList[i].show_date;
                                    }
                                }

                                eventInfo.locations = eventInfo.locations.replace(/^, /, ''); // remove ", " from the beginning of the string
                                eventInfo.dates = eventInfo.dates.replace(/^, /, ''); // remove ", " from the beginning of the string
                                let titleAndArtist = eventInfo.title + ' - ' + eventInfo.lead_roles;
                                if(titleAndArtist.length>58) {
                                    titleAndArtist = titleAndArtist.slice(0,40)+'...';
                                }

                                eventInfo.titleAndArtist = titleAndArtist;

                                reviewList = reviewList.slice(0,3);

                                res.render('booking', { eventInfo, reviewList, showList });
                            }
                        })

                    }
                })
            }
        });

    }

}



router.get('/:type/events/:id', bookTicketsNavigation);

export { router as eventsRouter }