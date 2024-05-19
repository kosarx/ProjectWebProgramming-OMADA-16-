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
            model.getEventInReviewsInfo(eventID, (err, eventShowsInfo) => {

                if (err) {
                    console.log("reviews")
                    res.json({ error: err });
                }
                else {
                    let eventDate;
                    let formattedDate;
                    let eventInfo;

                    for (let i in eventShowsInfo) {
                        console.log("before",eventShowsInfo[i].show_date)

                        eventDate = new Date(eventShowsInfo[i].show_date);
                        formattedDate = eventDate.getDate().toString().padStart(2, '0') + '-' + (eventDate.getMonth() + 1).toString().padStart(2, '0') + '-' + eventDate.getFullYear().toString();
                        eventShowsInfo[i].show_date = formattedDate;
                        console.log("after",eventShowsInfo[i].show_date)
                    }
                    console.log("before earliest")
                    // console.log(eventShowsInfo);
                    // let earliestDate = eventShowsInfo[1].show_date;

                    // let latestDate = eventShowsInfo[1].show_date;
                    // // console.log(eventInfo);
                    // for (let i in eventShowsInfo) {
                    //     if (eventShowsInfo[i].show_date < earliestDate) {
                    //         earliestDate = eventShowsInfo[i].show_date;
                    //     }
                    //     if (eventShowsInfo[i].show_date > latestDate) {
                    //         latestDate = eventShowsInfo[i].show_date;
                    //     }
                    //     if (!eventInfo.locations.includes(eventShowsInfo[i].city)) {
                    //         eventInfo.locations = eventInfo.locations + ', ' + eventShowsInfo[i].city;
                    //     }
                    // }
                    // eventInfo.earliestDate = earliestDate;
                    // eventInfo.latestDate = latestDate;
                    
                    res.render('reviews', { reviewList });
                }
            }
            )

        }
    })


}

router.get('/:type/events/:id/reviews', reviewsNavigation);

export { router as reviews }

