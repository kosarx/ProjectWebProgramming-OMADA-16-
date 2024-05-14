import express from 'express';
const router = express.Router();

import * as model from '../../model/dbInterface.js';


let eventNavigation = async function (req, res) {
    const navigateTo = req.params.type;
    let site_header = 'EVENTS';
    if (navigateTo === 'theater'){
        site_header = 'THEATER';
        model.getAllTheater((err, data) =>{        
            const theaterEvents = {};
            data.forEach(event => {
                const { theaterID:eventID, title, ...otherDetails } = event;
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
            res.render('events', {site_header, eventList });
        });
    }
    else if (navigateTo === 'music') {
        site_header = 'MUSIC';
        model.getAllMusic((err, data) =>{            
            const musicEvents = {};
            data.forEach(event => {
                const { musicID:eventID, title, ...otherDetails } = event;
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
            res.render('events', {site_header, eventList });
            
        });
    }
    else if (navigateTo === 'cinema') {
        site_header = 'CINEMA';
        model.getAllCinema((err, data) =>{
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
            res.render('events', {site_header, eventList });
            
        });
    }
    else {
        // raise Error
        res.json({error: 'Invalid navigation'});
    }
};

router.get('/:type/', eventNavigation);

router.get('/:type/events/:id', (req, res) => {
    const eventID = req.params.id;
    let events;
    model.getCinemaEventInfo(eventID, (err, data) => {
        if (err) {
            console.log(data)
            res.json({error: err});
        }
        else {
            events = data;
            res.send(events)
        }

    });

});

export { router as eventsRouter}