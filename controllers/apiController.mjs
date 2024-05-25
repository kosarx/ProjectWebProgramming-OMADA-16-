import multer from 'multer';
import * as model from '../model/dbInterface.js';
import { formatDate } from '../public/scripts/formatDate.js';

let getScheduledEvents = async function (req, res, next) {
    model.getAllScheduledEvents((err, data) => {
        if (err) {
            const error_comment = "Could not get scheduled events from the database";
            req.session.error_comment = error_comment;
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
            req.session.error_comment = error_comment;
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
                req.session.error_comment = error_comment;
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
                req.session.error_comment = error_comment;
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

let getLoggedInUser = async function (req, res, next) {
    try {
        if (req.session.loggedUserId) {
            res.json({ userID: req.session.loggedUserId, loggedIn: true});
        } else {
            res.json({ userID: req.session.loggedUserId, loggedIn: false});
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
}

let getUserProfileImage = async function (req, res, next) {
    try {
        const userID = req.params.userid;
        model.getUserProfileImage(userID, (err, data) => {
            if (err) {
                const error_comment = "Could not get profile image from the database";
                req.session.error_comment = error_comment;
                console.error(error_comment);
                next(err);
            }
            res.json(data);
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

let uploadProfileImage = async function (req, res, next) {
    try {
        const userID = req.params.userid;
        const profileImageURL = req.file.path.split('public')[1];
        model.uploadProfileImage(userID, profileImageURL, (err, msg) => {
            if (err) {
                const error_comment = "Could not upload profile image to the database";
                req.session.error_comment = error_comment;
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

let getEventTypeFromEventID = async function (req, res, next) {
    try {
        const eventID = req.params.eventid;
        model.getEventTypeFromEventID(eventID, (err, data) => {
            if (err) {
                const error_comment = "Could not get event type from the database";
                console.error(error_comment);
                req.session.error_comment = error_comment;
                next(err);
            }
            res.json(data);
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

export { getScheduledEvents, getScheduledEventShows, deleteUsersReview, cancelUsersTicket, getUserProfileImage, getLoggedInUser, 
    uploadProfileImage, getEventTypeFromEventID }