import express from 'express';
const router = express.Router();

import * as reviewsController from '../controllers/reviewsController.mjs';
import * as logInController from '../controllers/logInController.mjs';

router.get('/reviews/', reviewsController.reviewsNavigation);
router.post('/reviews/', logInController.checkAuthenticated, reviewsController.postReview)

export { router as reviewsRouter }

