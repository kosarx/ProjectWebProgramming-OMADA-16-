import * as model from '../model/dbInterface.js';
import { formatDate } from '../public/scripts/formatDate.js';

async function theaterEvents(req, res, navigateTo) {
    const site_header = 'THEATER';
    model.getAllTheater((err, data) => {
        const theaterEvents = {};
        data.forEach(event => {
            const { theaterID: eventID, title, ...otherDetails } = event;
            if (!theaterEvents[eventID]) {
                theaterEvents[eventID] = {
                    eventID,
                    title,
                    cities: [],
                    earliestEventDate: '',
                    latestEventDate: '',
                    ...otherDetails,
                };
            }
            if (theaterEvents[eventID].earliestEventDate === "") {
                
                const { dayName, formattedDate } = formatDate(theaterEvents[eventID].earliest_date);
                                
                theaterEvents[eventID].earliestEventDate = formattedDate;
                

            }
            let early_date = new Date(theaterEvents[eventID].earliest_date);
            let formattedDate = early_date.toISOString().split('T')[0];
            theaterEvents[eventID].earliest_date = formattedDate;
            let late_date = new Date(theaterEvents[eventID].latest_date);
            formattedDate = late_date.toISOString().split('T')[0];
            theaterEvents[eventID].latest_date = formattedDate;
            const { dayName, formattedDateLatest } = formatDate(theaterEvents[eventID].latest_date);
            theaterEvents[eventID].latestEventDate = formattedDateLatest;
            


            theaterEvents[eventID].cities.push(event.city);
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
    })
}

async function musicEvents(req, res, navigateTo) {
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

async function cinemaEvents(req, res, navigateTo) {
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

export { theaterEvents, musicEvents, cinemaEvents };