import express from 'express';
const router = express.Router();

import * as logInController from '../controllers/logInController.mjs';

router.get('/login', logInController.showLogInForm);
router.post('/login', logInController.doLogin);
router.get('/logout', logInController.doLogout);
router.get('/signup', logInController.showSignUpForm);
router.post('/signup', logInController.doSignUp);
router.get('/reset-password', logInController.resetPassword);
export { router as logInSignUpRouter };