import express from 'express';
import exphbs from 'express-handlebars';
import path from "path";
import session from "express-session";

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// connect view with controller with model -- interface with the database, present to the user
import * as eventsRouter from './routes/events.js';
import * as bookingRouter from './routes/booking.js';
import * as profileRouter from './routes/profile.js';
import * as bookingCompleteRouter from './routes/booking-complete.js';
import * as apiRouter from './routes/api.js';
import { logInSignUpRouter } from './routes/logInSignUp.js';
import * as logInController from './controllers/logInController.mjs';
import appSession from './app-setup/app-setup-session.mjs'; 


// Create a new express application
const app = express();
const indexRouter = express.Router();

// For serving static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

// register the appSession middleware to be executed for every incoming request
app.use(appSession)

// Set up the express app to use handlebars
const hbs = exphbs.create({
    extname: 'hbs',
    helpers: {
        if_eq: function(a, b, opts) {
            if(a === b)
                return opts.fn(this);
            else
                return opts.inverse(this);
        },
        incr: function(value, options) {
            return parseInt(value) + 1;
        },
    }
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use('/partials', express.static(path.join(__dirname, 'views/partials')));

app.use((req, res, next) => {
    if (req.session) {
       res.locals.userId = req.session.loggedUserId;
    } else {
       res.locals.userId = 'guest';
    }
    next();
 });

app.use('/type/', eventsRouter.eventsRouter);
app.use('/type/', bookingRouter.bookingRouter);
app.use('/profile/', logInController.checkAuthenticated, profileRouter.profileRouter);
app.use('/api/', apiRouter.apiRouter);
app.use('/booking/', bookingCompleteRouter.bookingCompleteRouter);
app.use('/', logInSignUpRouter);

app.use('/', indexRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500);
    // get comment var from session
    const error_comment = req.session.error_comment;
    res.render('error', { status : 500, message : err.message, comment : error_comment});
 });

indexRouter.get('/',(req, res) => {
    res.render('index');
});

indexRouter.get('/aboutUs',(req, res) => {
    const person1 = {
        firstname: 'Κοσμάς',
        lastname: 'Αρχοντής',
        email: 'up1084020@ac.upatras.gr',
        image: 'https://scontent.fath4-2.fna.fbcdn.net/v/t1.6435-9/174398297_1204704813314662_5312831307506383803_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFp2q0gHHkQNVruyOp6R7-ptwKwkHAkXAO3ArCQcCRcA7xAmcrMVHw2CPme94DhtTtqe6I_ehr62mHou6V7SQqF&_nc_ohc=XNT8E6yo1tkQ7kNvgGDNKga&_nc_ht=scontent.fath4-2.fna&oh=00_AYD7AaOYPz2751q8Fv9tVLdfSW-YAPgIRSzk1lYhg9-m8Q&oe=666742CE',	
        description: 'Φοιτητής Ηλεκτρολόγων Μηχανικών και Τεχνολογίας Υπολογιστών στο Πανεπιστήμιο Πατρών. Του αρέσουν οι υπολογιστές, ο εξετασμένος βίος και το θέατρο. Τα ενδιαφέροντά του κυμαίνονται μεταξύ της κατασκευής προγραμμάτων σε Python έως και την υπερ-οργάνωση των αρχείων στο desktop του. Λάτρης της ιστορίας, μαθαίνει Ισπανικά στον ελεύθερο του χρόνο του. Κρυφά θα ήθελε να γίνει αγρότης.'
    };
    const person2 = {
        firstname: 'Μαρία',
        lastname: 'Ασπιώτη',
        email: 'up1083881@ac.upatras.gr',
        image: 'https://scontent.fath3-4.fna.fbcdn.net/v/t39.30808-6/306479751_3162069207456588_8761988868333755129_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEcJq7fTfCEcRRuYhq8S8xuFAy9fOK8WWAUDL184rxZYHuDn9WusTEbHvcC5xVq-1MnyOWCNPgFzL1Pp-u3F5O0&_nc_ohc=wJOyid9AttAQ7kNvgHXDQxi&_nc_ht=scontent.fath3-4.fna&oh=00_AYAty5GGVfB0Xsgfu5B8TIskSoLhFo2bHoAIiQm8QFFGPw&oe=66553AFE',	
        description: 'Τεταρτοετής φοιτήτρια στο τμήμα των Ηλεκτρολόγων Μηχανικών και Τεχνολογίας Υπολογιστών του Πανεπιστημίου Πατρών. Το ενδιαφέρον της για τον προγραμματισμό ξεκίνησε με την Python και θεμελιώθηκε με την C στο πρώτο έτος των σπουδών της. Θα μιλήσει σε όποια γάτα βρεθεί στον δρόμο της.'
    };
    const persons = [person1, person2];
    res.render('about_us', {persons});
});

app.use('*', (req, res) => {
    res.status(404);
    res.render('error', { message : 'Page not found', status : 404});
});

export {app as application};