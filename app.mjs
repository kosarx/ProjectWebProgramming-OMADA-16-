import express from 'express';
import { engine } from 'express-handlebars';

const app = express();
const router = express.Router();
const port = process.env.PORT || '3000';

app.use(express.static('public'));

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