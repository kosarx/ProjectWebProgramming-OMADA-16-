import express from 'express';
const router = express.Router();

import * as bookingCompleteController from '../controllers/bookingCompleteController.mjs';

router.get('/', bookingCompleteController.getBookingComplete);
// router.post('/', bookingCompleteController.getBookingComplete);

export { router as bookingCompleteRouter }