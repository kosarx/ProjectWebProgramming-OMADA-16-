import express from 'express';
const router = express.Router();

import * as bookingCompleteController from '../controllers/bookingCompleteController.mjs';
import * as logInController from '../controllers/logInController.mjs';

router.get('/init', logInController.checkAuthenticated, bookingCompleteController.getBookingInit);
router.get('/complete', logInController.checkAuthenticated, bookingCompleteController.getBookingComplete);

router.get('/complete/download', bookingCompleteController.downloadTickets);

export { router as bookingCompleteRouter }