import express from 'express';
const router = express.Router();

import * as logInController from '../controllers/logInController.mjs';

router.get('/login', logInController.showLogInForm);
router.post('/login', logInController.doLogin);
router.get('/logout', logInController.doLogout);
router.get('/signup', logInController.showSignUpForm);
router.post('/signup', logInController.doSignUp);

export { router as logInSignUpRouter };