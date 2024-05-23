import express from 'express';
const router = express.Router();

import * as bookingController from '../controllers/bookingController.mjs';

let bookTicketsNavigation = async function (req, res, next) {

    try {
        const navigateTo = req.params.type;
        const eventID = req.params.id;
        console.log(eventID, navigateTo)
        if (navigateTo === 'theater') {
            bookingController.bookingTheater(req, res, eventID);
        }
        else if (navigateTo === 'music') {
            bookingController.bookingMusic(req, res, eventID);
        }
        else if (navigateTo === 'cinema') {
            bookingController.bookingCinema(req, res, eventID);
        }
    }
    catch (error) {
        console.error(error);
        res.json({ error: 'An error occurred' });
    }

}


router.get('/:type/events/:id', bookTicketsNavigation);

import * as reviewsRouter from './reviews.js';
router.use('/:type/events/:id/', reviewsRouter.reviewsRouter);

export { router as bookingRouter }

