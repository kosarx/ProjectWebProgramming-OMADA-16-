import express from 'express';
const router = express.Router();

import path from 'path';
import multer from 'multer';

// Specify the destination and filename for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join('public','images','users'));
    },
    filename: function (req, file, cb) {
        cb(null, `user${req.params.userid}.jpg`);
    }
});

const upload = multer({ storage: storage });

import * as apiController from '../controllers/apiController.mjs';

router.get('/getScheduledEvents', apiController.getScheduledEvents);
router.get('/getScheduledEventShows', apiController.getScheduledEventShows);
router.get('/:userid/delete-review/:reviewid', apiController.deleteUsersReview);
router.get('/:userid/cancel-ticket/:ticketid', apiController.cancelUsersTicket);
router.get('/user/loggedIn', apiController.getLoggedInUser);
router.get('/:userid/getUserProfileImage', apiController.getUserProfileImage);
router.get('/:eventid/getEventType', apiController.getEventTypeFromEventID);
router.post('/:userid/uploadProfileImage', upload.single('profilePhoto') ,apiController.uploadProfileImage);

export { router as apiRouter}