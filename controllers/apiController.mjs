import e from 'express';
import * as model from '../model/dbInterface.js';
import { formatDate } from '../public/scripts/formatDate.js';


let getScheduledEvents = async function (req, res, next) {
    model.getAllScheduledEvents((err, data) => {
        if (err) {
            const error_comment = "Could not get scheduled events from the database";
            console.error(error_comment);
            next(err);
        }
        res.json(data);
    });
}

let getScheduledEventShows = async function (req, res, next) {
    model.getAllScheduledEventShows((err, data) => {
        if (err) {
            const error_comment = "Could not get scheduled event shows from the database";
            console.error(error_comment);
            next(err);
        }
        data.forEach(event => {
            const dayAndDate = formatDate(event.show_date);
            event.show_date = dayAndDate.formattedDate;
            event.day = dayAndDate.dayName;
        });
        res.json(data);
    });
}


let deleteUsersReview = async function (req, res, next) {
    try {
        const userID = req.params.userid;
        const reviewID = req.params.reviewid;
        model.deleteReview(userID, reviewID, (err, msg) => {
            if (err) {
                const error_comment = "Could not delete review from the database";
                console.error(error_comment);
                next(err);
            }
            console.log(msg);
            res.json({ success: true });
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

let cancelUsersTicket = async function (req, res, next) {
    try {
        const userID = req.params.userid;
        const ticketID = req.params.ticketid;
        model.cancelTicket(userID, ticketID, (err, msg) => {
            if (err) {
                const error_comment = "Could not cancel ticket from the database";
                console.error(error_comment);
                next(err);
            }
            console.log(msg);
            res.json({ success: true });
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

export { getScheduledEvents, getScheduledEventShows, deleteUsersReview, cancelUsersTicket }