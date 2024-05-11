import express from 'express';
import { engine } from 'express-handlebars';
import path from "path";
import session from "express-session";

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    let title = 'EVENTS';
    if (navigateTo === 'theater'){
        title = 'THEATER';
    }
    else if (navigateTo === 'music') {
        title = 'MUSIC';
    }
    else if (navigateTo === 'cinema') {
        title = 'CINEMA';
    }
    else {
        
    }
    const eventsObject = {
        title: title,
    };
    res.render('events', eventsObject);
};

app.use(router);

router.route('/').get((req, res) => {
    res.render('index');
});

router.route('/navigation').get(eventNavigation);

const server = app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});