import express from 'express';
const router = express.Router();

import * as reviewsController from '../controllers/reviewsController.mjs';

router.get('/reviews/', reviewsController.reviewsNavigation);

export { router as reviewsRouter }

