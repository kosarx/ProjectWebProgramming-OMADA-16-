import express from 'express';
// import { engine } from 'express-handlebars';
import exphbs from 'express-handlebars';
import path from "path";
import session from "express-session";

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// connect controller with model -- interface with the database
import * as routers from './controllers/routes/events.js';

// Create a new express application
const app = express();
const indexRouter = express.Router();
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

app.use('/type/', routers.eventsRouter);

app.use('/', indexRouter);
indexRouter.get('/',(req, res) => {
    res.render('index');
});

indexRouter.get('/aboutUs',(req, res) => {
    person1 = {
        firstname: 'Κοσμάς',
        lastname: 'Αρχοντής',
        title: 'CEO',
        email: 'domain.com'	
    };
    person2 = {
        name: 'Jane Doe',
        title: 'CTO',
        email: 'domain.com'
    };
    res.render('about_us', {person1, person2});
});

const server = app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});