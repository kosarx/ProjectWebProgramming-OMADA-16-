import express from 'express';
// import { engine } from 'express-handlebars';
import exphbs from 'express-handlebars';
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
const hbs = exphbs.create({
    extname: 'hbs',
    helpers: {
        if_eq: function(a, b, opts) {
            if(a === b)
                return opts.fn(this);
            else
                return opts.inverse(this);
        }
    }
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

let eventNavigation = function (req, res) {
    const navigateTo = req.query.navigates;
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

app.use(router);

router.route('/').get((req, res) => {
    res.render('index');
});

router.get('/navigation', eventNavigation);

// router.route()

const server = app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});