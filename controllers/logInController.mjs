import * as model from '../model/dbInterface.js';

import bcrypt from 'bcrypt'

let showLogInForm = function (req, res) {
    res.render('log_in');
}

let showSignUpForm = function (req, res) {
    res.render('sign_up');
}

let doSignUp = async function (req, res) {
    try {
        let fullName = `${req.body.fname} ${req.body.lname}`;

        const event = new Date();
        const year = event.getFullYear();
        const month = String(event.getMonth() + 1).padStart(2, '0');
        const day = String(event.getDate()).padStart(2, '0');

        const registration_date = `${year}-${month}-${day}`;

        let defaultProfileImgURL = "/svgs/profile_page_Avatar.svg";
        const registrationResult = await model.signUpUser(req.body.username, req.body.password, fullName, req.body.email, registration_date, defaultProfileImgURL);
        if (registrationResult.message) {
            res.render('sign_up', { message: registrationResult.message })
        }
        else {
            res.redirect('/login');
        }
    } catch (error) {
        console.error('registration error: ' + error);
        res.render('sign_up', { message: error });
    }
}

let doLogin = async function (req, res) {
    try {
        let user = await model.findUserByUsernameOrEmail(req.body.usernameOrEmail, req.body.usernameOrEmail);

        if (user == undefined || !user.password || !user.userID) {
            res.render('log_in', { message: 'User not found' });
        }
        else {
            const match = await bcrypt.compare(req.body.password, user.password);

            if (match) {

                req.session.loggedUserId = user.userID;

                let redirectTo = req.session.redirectTo || '/';

                delete req.session.redirectTo; // Clear the redirectTo after using it
                if (redirectTo == '/profile/') {
                    redirectTo = redirectTo + req.session.loggedUserId;
                }

                res.redirect(redirectTo);

            }
            else {
                res.render("log_in", { message: 'Wrong Password' })
            }
        }
    } catch (error) {
        console.error('log in error: ' + error);
        res.render('log_in', { message: error });
    }
}

let doLogout = (req, res) => {

    req.session.destroy();
    res.redirect('/');
}

let resetPassword = (req, res) => {

    res.render('reset_password');

}

let checkAuthenticated = function (req, res, next) {
    try {
        if (req.session.loggedUserId) {
            if (req.originalUrl == '/profile/') {
                res.redirect(`/profile/${req.session.loggedUserId}`)

            }
            else {
                next();
            }
        }
        else {
            if ((req.originalUrl === "/login") || (req.originalUrl === "/signup")) {
                next();
            }
            else {
                
                req.session.redirectTo = req.originalUrl;
                res.redirect('/login');
            }
        }
    } catch (error) {
       
        next(error);
    }
}


export { showLogInForm, showSignUpForm, doSignUp, doLogin, doLogout, checkAuthenticated, resetPassword }