import * as model from '../model/dbInterface.js';
// import { formatDate } from '../public/scripts/formatDate.js';
// import { formatTime } from '../public/scripts/formatTime.js';
// import { groupDataByShow } from '../public/scripts/groupDataByShow.js';

let reviewsNavigation = async function (req, res, next) {
    try {
        // split the req.originalURL to get the navigateTo and eventID
        const eventID = req.originalUrl.split('/')[4];
        const navigateTo = req.originalUrl.split('/')[2];

        // check the query string to see if we have a highlighted review
        const highlightedReview = req.query.hr;

        model.getEventReviews(eventID, (err, reviewList) => {
            if (err) {
                const error_comment = "Could not get reviews from the database"
                // pass the comment to the session?
                console.error(error_comment);
                next(err);
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
                        const error_comment = "Could not get event info from the database";
                        // pass the comment to the session?
                        console.error(error_comment);
                        next(err);
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
                                const comment_error = "Failed to get average score from the database";
                                // pass the comment to the session?
                                console.error(comment_error);
                                next(err);
                            }
                            else {
                                const averageScore = Number(avrgScore[0].average_score).toFixed(2);
                                
                                // if we have a highlighted review, we need to find the review object
                                // otherwise, we will just pass the first review object
                                let selected_review;
                                if (highlightedReview) {
                                    for (let i in reviewList) {
                                        if (reviewList[i].reviewID == highlightedReview) {
                                            selected_review = { ...reviewList[i] };
                                            // remove the highlighted review from the reviewList
                                            reviewList.splice(i, 1);
                                            break;
                                        }
                                    }
                                }
                                res.render('reviews', { averageScore, selected_review, reviewList, eventID, eventInfo });
                            }
                        });
                    }
                });

            }
        });

    } catch (error) {
        console.error(error);
        next(error);
    }

}

export { reviewsNavigation };