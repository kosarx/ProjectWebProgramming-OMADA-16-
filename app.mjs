import express from 'express';
import { engine } from 'express-handlebars';
import path from "path";
import session from "express-session";

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// connect controller with model -- interface with the database
import * as model from './model/dbInterface.js';

// Create a new express application
const app = express();
const router = express.Router();
const port = process.env.PORT || '3000';

// For serving static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

// Set up the express app to use handlebars
app.engine('hbs', engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');


let eventNavigation = function (req, res) {
    const navigateTo = req.query.navigates;
    let site_header = 'EVENTS';
    let dd = null;
    if (navigateTo === 'theater'){
        site_header = 'THEATER';
        model.getAllTheater((err, data) =>{        
            const theaterEvents = {};
            theaterEvents.site_header = site_header;
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
                theaterEvents[theaterID].cities.push(event.city);
              });
            const eventList = Object.values(theaterEvents);
            // res.json(eventList);
            res.render('events', { eventList });
            
        });
    }
    else if (navigateTo === 'music') {
        site_header = 'MUSIC';
        model.getAllMusic((err, data) =>{            
            const musicEvents = {};
            musicEvents.site_header = site_header;
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
                musicEvents[musicID].cities.push(event.city);
              });
            const eventList = Object.values(musicEvents);
            res.json(eventList);
            // res.render('events', { eventList });
            
        });
    }
    else if (navigateTo === 'cinema') {
        site_header = 'CINEMA';
        model.getAllCinema((err, data) =>{
            const cinemaEvents = {};
            cinemaEvents.site_header = site_header;
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
                cinemaEvents[cinemaID].cities.push(event.city);
              });
            const eventList = Object.values(cinemaEvents);
            res.json(eventList);
            // res.render('events', { eventList });
            
        });
    }
    else {
        
    }
    // const eventsObject = {
    //     site_header: site_header,
    // };
    // res.render('events', eventsObject);
};

app.use(router);

router.route('/').get((req, res) => {
    res.render('index');
});

router.route('/navigation').get(eventNavigation);

const server = app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});