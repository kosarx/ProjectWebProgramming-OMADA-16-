import express from 'express';
// import moment from 'moment';
const router = express.Router();

import * as model from '../../model/dbInterface.js';


let reviewsNavigation = async function (req, res) {

    const eventID = req.params.id;
    const navigateTo = req.params.type;

    model.getEventReviews(eventID, (err, reviewList) => {
        if (err) {
            console.log("reviews")
            res.json({ error: err });
        }
        else {
            let formattedDate;
            let reviewDate;
            reviewList.forEach(review => {
                review.username = '@' + review.username;
                review.username = review.username.replace(/['\s]/g, '');

                // Format the date components
                reviewDate = new Date(review.date_written);

                // Format the date components
                formattedDate = reviewDate.getDate().toString().padStart(2, '0') + '-' + (reviewDate.getMonth() + 1).toString().padStart(2, '0') + '-' + reviewDate.getFullYear().toString();

                review.date_written = formattedDate;


            });
            res.render('reviews', {reviewList});
        }
    })


}

router.get('/:type/events/:id/reviews', reviewsNavigation);

export { router as reviews }

