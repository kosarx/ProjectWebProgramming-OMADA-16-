import express from 'express';
const router = express.Router();

import * as profileController from '../controllers/profileController.mjs';

router.get('/:userid', profileController.profileNavigation);

export { router as profileRouter }