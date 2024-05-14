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
// import * as routers from './controllers/routes/booking.js';

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
    const person1 = {
        firstname: 'Κοσμάς',
        lastname: 'Αρχοντής',
        email: 'up1084020@ac.upatras.gr',
        image: 'https://scontent.fath4-2.fna.fbcdn.net/v/t1.6435-9/174398297_1204704813314662_5312831307506383803_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFp2q0gHHkQNVruyOp6R7-ptwKwkHAkXAO3ArCQcCRcA7xAmcrMVHw2CPme94DhtTtqe6I_ehr62mHou6V7SQqF&_nc_ohc=XNT8E6yo1tkQ7kNvgGDNKga&_nc_ht=scontent.fath4-2.fna&oh=00_AYD7AaOYPz2751q8Fv9tVLdfSW-YAPgIRSzk1lYhg9-m8Q&oe=666742CE',	
        description: 'Φοιτητής Ηλεκτρολόγων Μηχανικών και Τεχνολογίας Υπολογιστών στο Πανεπιστήμιο Πατρών. Του αρέσουν οι υπολογιστές, ο εξετασμένος βίος και το θέατρο. Τα ενδιαφέροντά του κυμαίνονται μεταξύ της κατασκευής προγραμμάτων σε Python έως και την υπερ-οργάνωση των αρχείων στο desktop του. Λάτρης της ιστορίας, μαθαίνει Ισπανικά στον ελεύθερο του χρόνο του. Κρύφα θα ήθελε να γίνει αγρότης.'
    };
    const person2 = {
        firstname: 'Μαρία',
        lastname: 'Ασπιώτη',
        email: 'up1083881@ac.upatras.gr',
        image: 'https://scontent.fath4-2.fna.fbcdn.net/v/t39.30808-6/306479751_3162069207456588_8761988868333755129_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEdHZeVeIW3OEO2DZ5BxnGVFAy9fOK8WWAUDL184rxZYIE1AMKxNPLAo1ln_aSlNZAG8eSkh43K_EfnC-0zSRzf&_nc_ohc=L1jQv1n1V3gQ7kNvgGLnqx3&_nc_ht=scontent.fath4-2.fna&oh=00_AYC84Xo9ISov9zuZ1yUzUhAgEBGjrKzoD7kbN3Szp--sDw&oe=6645A13E',	
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Erat pellentesque adipiscing commodo elit at. Vitae suscipit tellus mauris a diam maecenas sed. At consectetur lorem donec massa sapien. Cursus euismod quis viverra nibh cras pulvinar mattis.'
    };
    const persons = [person1, person2];
    // res.json(person);
    res.render('about_us', {persons});
});

// app.use(':type/events/:id/', routers.bookingRouter);


const server = app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});