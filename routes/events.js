import express from 'express';
const router = express.Router();


import * as model from '../model/dbInterface.js';
import * as eventsController from '../controllers/eventsController.mjs';
import { formatDate } from '../public/scripts/formatDate.js';

let eventNavigation = async function (req, res) {
    const navigateTo = req.params.type;
    let site_header = 'EVENTS';
    if (navigateTo === 'theater') {
        eventsController.theaterEvents(req, res, navigateTo);
    }
    else if (navigateTo === 'music') {
        eventsController.musicEvents(req, res, navigateTo);
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

                if (cinemaEvents[key].description.length > 190) {
                    cinemaEvents[key].description = cinemaEvents[key].description.slice(0, 190) + ' . . .';
                }

            }
            const eventList = Object.values(cinemaEvents);

            let carouselEventList = eventList.slice(0, 3).map(({ eventID, title, imageURL }) => ({ eventID, title, imageURL }));

            if (carouselEventList.length < 3) {
                for (let i = 0; i < 3 - carouselEventList.length; i++) {
                    carouselEventList[2 - i] = carouselEventList[0];
                }
            }

            for (let i in carouselEventList) {
                carouselEventList[i].index = i;
                carouselEventList[i].titleU = carouselEventList[i].title.toUpperCase();
                carouselEventList[i].type = navigateTo;
            }
            // res.json(eventList);
            res.render('events', { site_header, eventList, carouselEventList });

        });
    }
    else {
        // raise Error
        res.json({ error: 'Invalid navigation' });
    }
};

router.get('/:type/', eventNavigation);


export { router as eventsRouter }