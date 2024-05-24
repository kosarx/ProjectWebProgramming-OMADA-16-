import express from 'express';
const router = express.Router();

import * as apiController from '../controllers/apiController.mjs';

router.get('/getScheduledEvents', apiController.getScheduledEvents);
router.get('/getScheduledEventShows', apiController.getScheduledEventShows);
router.get('/:userid/delete-review/:reviewid', apiController.deleteUsersReview);
router.get('/:userid/cancel-ticket/:ticketid', apiController.cancelUsersTicket);

export { router as apiRouter}