import * as model from '../model/dbInterface.js';
import { formatDate } from '../public/scripts/formatDate.js';

async function theaterEvents(req, res, navigateTo) {
    try {
        const site_header = 'THEATER';
        model.getAllTheater((err, data) => {
            const theaterEvents = {};
            data.forEach(event => { 
                const { theaterID: eventID, title, earliest_date, ...otherDetails } = event;
                if (!theaterEvents[eventID]) {
                    theaterEvents[eventID] = {
                        eventID,
                        title,
                        cities: [],
                        earliestDate: '',
                        ...otherDetails,
                    };
                }
                
                if (theaterEvents[eventID].earliestDate === '') {
                    const { dayName, formattedDate } = formatDate(event.earliest_date);
                    theaterEvents[eventID].earliestDate = formattedDate;
                }
                
                theaterEvents[eventID].cities.push(event.city);
                const { dayName, formattedDate } = formatDate(event.latest_date);
                theaterEvents[eventID].latestDate = formattedDate;
            });

            for (let key in theaterEvents) {
                theaterEvents[key].cities = theaterEvents[key].cities.join(", ");
                if (theaterEvents[key].description.length > 190) {
                    theaterEvents[key].description = theaterEvents[key].description.slice(0, 190) + ' . . .';
                }
            }
            const eventList = Object.values(theaterEvents);
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
    catch (error) {
        // when error is thrown, the next middleware is called
        // next(new Error('Invalid navigation'));
        console.error(error);
        res.json({ error: 'An error occurred when fetching theater events' });
    }
}

async function musicEvents(req, res, navigateTo) {
    try {
        const site_header = 'MUSIC';
        model.getAllMusic((err, data) => {
            const musicEvents = {};
            data.forEach(event => {
                const { musicID: eventID, title, ...otherDetails } = event;
                if (!musicEvents[eventID]) {
                    musicEvents[eventID] = {
                        eventID,
                        title,
                        cities: [],
                        earliestDate: '',
                        ...otherDetails,
                    };
                }
                
                if (musicEvents[eventID].earliestDate === '') {
                    const { dayName, formattedDate } = formatDate(event.earliest_date);
                    musicEvents[eventID].earliestDate = formattedDate;
                }
                
                musicEvents[eventID].cities.push(event.city);
                const { dayName, formattedDate } = formatDate(event.latest_date);
                musicEvents[eventID].latestDate = formattedDate;
            });

            for (let key in musicEvents) {
                musicEvents[key].cities = musicEvents[key].cities.join(", ");

                if (musicEvents[key].description.length > 190) {
                    musicEvents[key].description = musicEvents[key].description.slice(0, 190) + ' . . .';
                }
            }
            const eventList = Object.values(musicEvents);
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
    catch (error) {
        // when error is thrown, the next middleware is called
        // next(new Error('Invalid navigation'));
        console.error(error);
        res.json({ error: 'An error occurred when fetching music events' });
    }
}

async function cinemaEvents(req, res, navigateTo) {
    try {
        const site_header = 'CINEMA';
        model.getAllCinema((err, data) => {
            const cinemaEvents = {};
            data.forEach(event => {
                const { cinemaID: eventID, title, ...otherDetails } = event;
                if (!cinemaEvents[eventID]) {
                    cinemaEvents[eventID] = {
                        eventID,
                        title,
                        cities: [],
                        earliestDate: '',
                        ...otherDetails,
                    };
                }
                
                if (cinemaEvents[eventID].earliestDate === '') {
                    const { dayName, formattedDate } = formatDate(event.earliest_date);
                    cinemaEvents[eventID].earliestDate = formattedDate;
                }
                
                cinemaEvents[eventID].cities.push(event.city);
                const { dayName, formattedDate } = formatDate(event.latest_date);
                cinemaEvents[eventID].latestDate = formattedDate;


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
    catch (error) {
        // when error is thrown, the next middleware is called
        // next(new Error('Invalid navigation'));
        console.error(error);
        res.json({ error: 'An error occurred when fetching cinema events' });
    }

}

export { theaterEvents, musicEvents, cinemaEvents };