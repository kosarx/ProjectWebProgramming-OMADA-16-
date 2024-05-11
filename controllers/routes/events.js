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
                const { theaterID, title, ...otherDetails } = event;
                if (!theaterEvents[theaterID]) {
                    theaterEvents[theaterID] = {
                    theaterID,
                    title,
                    cities: [],
                    ...otherDetails,
                  };
                }
                let early_date = new Date(theaterEvents[theaterID].earliest_date);
                let formattedDate = early_date.toISOString().split('T')[0];
                theaterEvents[theaterID].earliest_date = formattedDate;
                let late_date = new Date(theaterEvents[theaterID].latest_date);
                formattedDate = late_date.toISOString().split('T')[0];
                theaterEvents[theaterID].latest_date = formattedDate;
                
                theaterEvents[theaterID].cities.push(event.city);
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
                const { musicID, title, ...otherDetails } = event;
                if (!musicEvents[musicID]) {
                    musicEvents[musicID] = {
                    musicID,
                    title,
                    cities: [],
                    ...otherDetails,
                  };
                }
                let early_date = new Date(musicEvents[musicID].earliest_date);
                let formattedDate = early_date.toISOString().split('T')[0];
                musicEvents[musicID].earliest_date = formattedDate;
                let late_date = new Date(musicEvents[musicID].latest_date);
                formattedDate = late_date.toISOString().split('T')[0];
                musicEvents[musicID].latest_date = formattedDate;

                musicEvents[musicID].cities.push(event.city);
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
                const { cinemaID, title, ...otherDetails } = event;
                if (!cinemaEvents[cinemaID]) {
                    cinemaEvents[cinemaID] = {
                    cinemaID,
                    title,
                    cities: [],
                    ...otherDetails,
                  };
                }
                let early_date = new Date(cinemaEvents[cinemaID].earliest_date);
                let formattedDate = early_date.toISOString().split('T')[0];
                cinemaEvents[cinemaID].earliest_date = formattedDate;
                let late_date = new Date(cinemaEvents[cinemaID].latest_date);
                formattedDate = late_date.toISOString().split('T')[0];
                cinemaEvents[cinemaID].latest_date = formattedDate;

                cinemaEvents[cinemaID].cities.push(event.city);
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

export { router as eventsRouter}