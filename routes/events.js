import express from 'express';
const router = express.Router();

import * as eventsController from '../controllers/eventsController.mjs';

let eventNavigation = async function (req, res, next) {
    try {
        const navigateTo = req.params.type;
        if (navigateTo === 'theater') {
            eventsController.theaterEvents(navigateTo, req, res, next);
        }
        else if (navigateTo === 'music') {
            eventsController.musicEvents(navigateTo, req, res, next);
        }
        else if (navigateTo === 'cinema') {
            eventsController.cinemaEvents(navigateTo, req, res, next);
        }
        else {
            throw new Error('Invalid event type to navigate to.');
        }
    }
    catch (error) {
        console.error(error);
        next(error);
    }
};

router.get('/:type/', eventNavigation);


export { router as eventsRouter }