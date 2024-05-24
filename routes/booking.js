import express from 'express';
const router = express.Router();

import * as bookingController from '../controllers/bookingController.mjs';

let bookTicketsNavigation = async function (req, res, next) {

    try {
        const navigateTo = req.params.type;
        const eventID = req.params.id;
        if (navigateTo === 'theater') {
            bookingController.bookingTheater(eventID, req, res, next);
        }
        else if (navigateTo === 'music') {
            bookingController.bookingMusic(eventID, req, res, next);
        }
        else if (navigateTo === 'cinema') {
            bookingController.bookingCinema(eventID, req, res, next);
        }
        else {
            throw new Error('Invalid event type to navigate to.');
        }
    }
    catch (error) {
        console.error(error);
        next(error);
    }

}


router.get('/:type/events/:id', bookTicketsNavigation);

import * as reviewsRouter from './reviews.js';
router.use('/:type/events/:id/', reviewsRouter.reviewsRouter);

export { router as bookingRouter }

