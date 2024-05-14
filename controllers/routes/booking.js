import express from 'express';
const router = express.Router();

import * as model from '../../model/dbInterface.js';

let bookingTicketNavigation = async function(req, res) {
    const eventID = req.params.id;
    let events;
    model.getCinemaEventInfo(eventID, (err, data) => {
        if (err) {
            console.log(data)
            res.json({error: err});
        }
        else {
            // const event = data;
            // let event_date = new Date(event.date);
            // let formattedDate = event_date.toISOString().split('T')[0];
            // event.date = formattedDate;
            // console.log(event);
            // res.redirect('/');
            events = data;
            // res.send('EVENT SHOWS');
            res.send(events)
        }

    });
    
}
// router.get('/:type/', bookingTicketNavigation);
// router.get('/:type/events/:id');

// export { router as bookingRouter}
