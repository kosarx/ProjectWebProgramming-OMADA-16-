// import express from 'express';
// const router = express.Router();

// import * as logInController from './controllers/logInController.mjs';


// router.route('/login').get(logInController.showLogInForm);

// // // //Αυτή η διαδρομή καλείται όταν η φόρμα φτάσει στον εξυπηρετητή με POST στο /login. Διεκπεραιώνει τη σύνδεση (login) του χρήστη
// router.route('/login').post(logInController.doLogin);

// // //Αποσυνδέει το χρήστη
// router.route('/logout').get(logInController.doLogout);

// // //Εγγραφή νέου χρήστη
// router.route('/register').get(logInController.showRegisterForm);


// router.post('/register', logInController.doRegister);

// export { router as logInSignUpRouter }