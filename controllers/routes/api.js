import express from 'express';
const router = express.Router();

import * as model from '../../model/dbInterface.js';
import { formatDate } from '../../public/scripts/formatDate.js';

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

router.get('/getScheduledEvents', getScheduledEvents);
router.get('/getScheduledEventShows', getScheduledEventShows);

export { router as apiRouter};