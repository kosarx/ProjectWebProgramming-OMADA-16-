import * as model from '../model/dbInterface.js';
// import { formatDate } from '../public/scripts/formatDate.js';
import bcrypt from 'bcrypt'

let showLogInForm = function (req, res) {
    res.render('log_in');
}

let showSignUpForm = function (req, res) {
    res.render('sign_up');
}

let doSignUp = async function (req, res) {
    try {
        let fullName = `${req.body.fname} ${lname}`;
        console.log(fullName)
        
        const registrationResult = await model.signUpUser(req.body.username, req.body.password, fullName, req.body.email, null);
        if (registrationResult.message) {
            res.render('sign_up', { message: registrationResult.message })
        }
        else {
            res.redirect('/log_in');
        }
    } catch (error) {
        console.error('registration error: ' + error);
        res.render('sign_up', { message: error });
    }
}

let doLogin = async function (req, res) {
    //Ελέγχει αν το username και το password είναι σωστά και εκτελεί την
    //συνάρτηση επιστροφής authenticated

    let user = await model.findUserByUsernameOrEmail(req.body.usernameOrEmail, req.body.usernameOrEmail);
    if (user == undefined || !user.password || !user.id) {
        res.render('log_in', { message: 'User not found' });
    }
    else {
        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
            //Θέτουμε τη μεταβλητή συνεδρίας "loggedUserId"
            req.session.loggedUserId = user.userID;
            //Αν έχει τιμή η μεταβλητή req.session.originalUrl, αλλιώς όρισέ τη σε "/" 
            // res.redirect("/");            
            const redirectTo = req.session.originalUrl || "/";

            res.redirect(redirectTo);
        }
        else {
            res.render("log_in", { message: 'Wrong Password' })
        }
    }
}

let doLogout = (req, res) => {
    //Σημειώνουμε πως ο χρήστης δεν είναι πια συνδεδεμένος
    req.session.destroy();
    res.redirect('/');
}

let checkAuthenticated = function (req, res, next) {
    
    if (req.session.loggedUserId) {
        console.log("user is authenticated", req.originalUrl);
        
        next();
    }
    else {
        if ((req.originalUrl === "/login") || (req.originalUrl === "/signup")) {
            next()
        }
        else {

            console.log("not authenticated, redirecting to /login")
            res.redirect('/login');
        }
    }
}

export { showLogInForm, showSignUpForm, doSignUp, doLogin, doLogout, checkAuthenticated }