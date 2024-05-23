import express from 'express';
// import moment from 'moment';
const router = express.Router();

import * as model from '../model/dbInterface.js';


let reviewsNavigation = async function (req, res) {

    // split the req.originalURL to get the navigateTo and eventID
    const eventID = req.originalUrl.split('/')[4];
    const navigateTo = req.originalUrl.split('/')[2];

    // check the query string to see if we have a highlighted review
    const highlightedReview = req.query.hr;
    console.log("highlightedReview: ", highlightedReview);

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
                    let eventInfo = {};
                    let earliestDate;
                    let latestDate;
                    eventInfo.locations = eventShowsInfo[0].city;
                    eventInfo.dates = '';

                    for (let i in eventShowsInfo) {
                        eventDate = new Date(eventShowsInfo[i].show_date);
                        formattedDate = eventDate.getDate().toString().padStart(2, '0') + '-' + (eventDate.getMonth() + 1).toString().padStart(2, '0') + '-' + eventDate.getFullYear().toString();
                        eventShowsInfo[i].show_date = formattedDate;
                    }

                    earliestDate = eventShowsInfo[0].show_date;
                    latestDate = eventShowsInfo[eventShowsInfo.length - 1].show_date;
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
                    model.getEventAverageScore(eventID, (err, avrgScore) => {
                        if (err) {
                            console.log("Failed to get average score from the database");
                            res.json({ error: err });
                        }
                        else {
                            const averageScore = Number(avrgScore[0].average_score).toFixed(2);
                            
                            // if we have a highlighted review, we need to find the review object
                            // otherwise, we will just pass the first review object
                            let selected_review = { ...reviewList[0] };
                            if (highlightedReview) {
                                reviewList.forEach(review => {
                                    if (review.reviewID == highlightedReview) {
                                        // copy the review object to a new object
                                        selected_review = { ...review };
                                    }
                                });
                            }
                            res.render('reviews', { averageScore, selected_review, reviewList, eventID, eventInfo });
                        }
                    });
                }
            });

        }
    });

}

router.get('/reviews/', reviewsNavigation);

export { router as reviewsRouter }

