import express from 'express';
// import moment from 'moment';
const router = express.Router();

import * as model from '../../model/dbInterface.js';


let reviewsNavigation = async function (req, res) {

    // split the req.originalURL to get the navigateTo and eventID
    const eventID = req.originalUrl.split('/')[4];
    const navigateTo = req.originalUrl.split('/')[2];

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
                review.username = review.username.replace(/\s/g, '');

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
                    let eventInfo= {};
                    let earliestDate;
                    let latestDate;
                    eventInfo.locations = eventShowsInfo[0].city;
                    eventInfo.dates ='';

                    for (let i in eventShowsInfo) {
                        eventDate = new Date(eventShowsInfo[i].show_date);
                        formattedDate = eventDate.getDate().toString().padStart(2, '0') + '-' + (eventDate.getMonth() + 1).toString().padStart(2, '0') + '-' + eventDate.getFullYear().toString();
                        eventShowsInfo[i].show_date = formattedDate;
                    }

                    earliestDate = eventShowsInfo[0].show_date;
                    latestDate = eventShowsInfo[eventShowsInfo.length-1].show_date;
                    if (earliestDate != latestDate) {
                        eventInfo.dates = earliestDate + ' - ' + latestDate;
                    }
                    else {
                        eventInfo.dates = earliestDate
                    }
                    eventInfo.title = eventShowsInfo[0].title;
                    eventInfo.description = eventShowsInfo[0].description;
                    eventInfo.imageURL = eventShowsInfo[0].imageURL;

                    
                    for (let i in eventShowsInfo) {
                        if (!eventInfo.locations.includes(eventShowsInfo[i].city)) {
                            eventInfo.locations = eventInfo.locations + ', ' + eventShowsInfo[i].city;
                        }
                    }

                    console.log(eventInfo);
                    res.render('reviews', {reviewList, eventID, eventInfo });
                }
            }
            )

        }
    })


}

router.get('/reviews/', reviewsNavigation);

export { router as reviewRouter}

