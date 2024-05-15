import express from 'express';
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

    // let eventInfo;
    // let reviewList;
    let showList;
    let modalInfo;
    if (navigateTo === 'cinema') {
        model.getCinemaEventInfo(eventID, (err, eventInfo) => {
            if (err) {
                console.log("event")
                res.json({ error: err });
            }
            else {

                eventInfo = eventInfo[0];
                eventInfo.title = eventInfo.title.toUpperCase();
                eventInfo.type = "cinema"
                model.getEventReviews(eventID, (err, reviewList) => {
                    if (err) {
                        console.log("reviews")
                        res.json({ error: err });
                    }
                    else {
                        // Assuming reviewList is an array of objects with username properties
                        reviewList.forEach(review => {
                            review.username = '@' + review.username;
                            review.username = review.username.replace(/['\s]/g, '');
                        });

                        // keep the 3 first reviews
                        // reviewList = data.slice(0, 3);
                        // res.send(reviewList)
                        // console.log(reviewList);
                        model.getShowInfo(eventID, (err, showList) => {
                            if (err) {
                                console.log("show")

                                res.json({ error: err });
                            }
                            else {
                                // let stars = [5, 4, 3, 2, 1];
                                let stars = [
                                    { value: 5 },
                                    { value: 4 },
                                    { value: 3 },
                                    { value: 2 },
                                    { value: 1 }
                                ];
                                console.log(stars, typeof stars)
                                console.log(reviewList, typeof reviewList)
                                for (let i in showList) {
                                    // console.log(typeof showList[i].seat_price, typeof parseFloat(showList[i].seat_price).toFixed(2));
                                    showList[i].minimum_price = parseFloat(showList[i].minimum_price).toFixed(2);
                                    // console.log(showList)
                                }
                                
                                res.render('temp', { eventInfo, reviewList, showList, stars });
                                // showList = data;
                            }
                        })

                    }
                })
            }

        });

    }
    else if (navigateTo === 'music') {
        model.getMusicEventInfo(eventID, (err, data) => {
            if (err) {
                console.log("event")
                res.json({ error: err });
            }
            else {
                eventInfo = data;
                // res.send(eventInfo)
            }

        });

    }
    else if (navigateTo === 'theater') {
        model.getTheaterEventInfo(eventID, (err, data) => {
            if (err) {
                console.log("event")
                res.json({ error: err });
            }
            else {
                eventInfo = data;
                // res.send(eventInfo)
            }
        });

    }
    // model.getEventReviews(eventID, (err, data) => {
    //     if (err) {
    //         console.log("reviews")
    //         res.json({ error: err });
    //     }
    //     else {
    //         // keep the 3 first reviews
    //         reviewList = data.slice(0, 3);
    //         // res.send(reviewList)
    //     }
    // })

    // model.getShowInfo(eventID, (err, data) => {
    //     if (err) {
    //         console.log("show")

    //         res.json({ error: err });
    //     }
    //     else {
    //         showList = data;
    //     }
    // })

    // model.getModalInfo(eventID, (err, data) => {
    //     if (err) {
    //         res.json({ error: err });
    //     }
    //     else {
    //         modalInfo = data;
    //     }
    // })

    // res.render('booking', {eventInfo, reviewList, showList, modalInfo });

}

router.get('/:type/events/:id', bookTicketsNavigation);

export { router as eventsRouter }