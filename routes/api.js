import express from 'express';
const router = express.Router();

import * as model from '../model/dbInterface.js';
import { formatDate } from '../public/scripts/formatDate.js';

let getScheduledEvents = async function (req, res) {
    model.getAllScheduledEvents((err, data) => {
        res.json(data);
    });
}

let getScheduledEventShows = async function (req, res) {
    model.getAllScheduledEventShows((err, data) => {
        data.forEach(event => {
            const dayAndDate = formatDate(event.show_date);
            event.show_date = dayAndDate.formattedDate;
            event.day = dayAndDate.dayName;
        });
        res.json(data);
    });
}


let deleteUsersReview = async function (req, res) {
    const userID = req.params.userid;
    const reviewID = req.params.reviewid;
    model.deleteReview(userID, reviewID, (err, msg) => {
        if (err) {
            console.log("Error deleting ");
            return res.json({ error: err });
        }
        console.log(msg);
        res.json({ success: true });
    });

}

let cancelUsersTicket = async function (req, res) {
    const userID = req.params.userid;
    const ticketID = req.params.ticketid;
    model.cancelTicket(userID, ticketID, (err, msg) => {
        if (err) {
            console.log("Error deleting ");
            return res.json({ error: err });
        }
        console.log(msg);
        res.json({ success: true });
    });
}

router.get('/getScheduledEvents', getScheduledEvents);
router.get('/getScheduledEventShows', getScheduledEventShows);
router.get('/:userid/delete-review/:reviewid', deleteUsersReview);
router.get('/:userid/cancel-ticket/:ticketid', cancelUsersTicket);
export { router as apiRouter};