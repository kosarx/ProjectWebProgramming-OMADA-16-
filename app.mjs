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
    if (navigateTo === 'theater'){
        res.render('events', { title: 'THEATER' });
    }
    else if (navigateTo === 'music') {
        res.render('events', { title: 'MUSIC' });
    }
    else if (navigateTo === 'cinema') {
        res.render('events', { title: 'CINEMA' });
    }
    else {
        res.render('events');
    }
};

app.use(router);

router.route('/').get((req, res) => {
    res.render('index');
});

router.route('/navigation').get(eventNavigation);

const server = app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});