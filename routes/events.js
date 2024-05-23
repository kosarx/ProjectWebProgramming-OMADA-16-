import express from 'express';
const router = express.Router();

import * as eventsController from '../controllers/eventsController.mjs';

let eventNavigation = async function (req, res, next) {
    try {
        const navigateTo = req.params.type;
        let site_header = 'EVENTS';
        if (navigateTo === 'theater') {
            eventsController.theaterEvents(req, res, navigateTo);
        }
        else if (navigateTo === 'music') {
            eventsController.musicEvents(req, res, navigateTo);
        }
        else if (navigateTo === 'cinema') {
            eventsController.cinemaEvents(req, res, navigateTo);
        }
        else {
            res.json({ error: 'Invalid navigation' });
        }
    }
    catch (error) {
        console.error(error);
        res.json({ error: 'An error occurred' });
    }
};

router.get('/:type/', eventNavigation);


export { router as eventsRouter }