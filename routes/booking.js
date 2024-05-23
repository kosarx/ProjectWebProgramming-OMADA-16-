import express from 'express';
const router = express.Router();

import * as model from '../model/dbInterface.js';
import { formatDate } from '../public/scripts/formatDate.js';
import { formatTime } from '../public/scripts/formatTime.js';
import { groupDataByShow } from '../public/scripts/groupDataByShow.js';

let bookTicketsNavigation = async function (req, res) {
    const navigateTo = req.params.type;
    const eventID = req.params.id;
    if (navigateTo === 'cinema') {
        model.getCinemaEventInfo(eventID, (err, eventInfo) => {
            if (err) {
                console.log("event")
                res.json({ error: err });
            }
            else {
                eventInfo = eventInfo[0];
                eventInfo.titleUpperCase = eventInfo.title.toUpperCase();
                eventInfo.type = navigateTo;
                model.getEventReviews(eventID, (err, reviewList) => {
                    if (err) {
                        console.log("reviews")
                        res.json({ error: err });
                    }
                    else {
                        reviewList = reviewList.slice(0, 3);

                        reviewList.forEach(review => {
                            review.username = '@' + review.username;
                            review.username = review.username.replace(/\s/g, '');
                            if (review.comment.length > 210) {
                                review.comment = review.comment.slice(0, 210) + ' . . .';
                                review.readmore = 1;
                            }
                        });

                        model.getShowInfo(eventID, (err, showList) => {
                            if (err) {
                                console.log("show")

                                res.json({ error: err });
                            }
                            else {
                                eventInfo.locationsArr = [];
                                eventInfo.datesArr = [];
                                for (let i in showList) {

                                    showList[i].minimum_price = parseFloat(showList[i].minimum_price).toFixed(2);

                                    const { dayName, formattedDate } = formatDate(showList[i].show_date);
                                    showList[i].show_date = formattedDate;
                                    showList[i].show_day = dayName;

                                    showList[i].show_time = formatTime(showList[i].show_time);

                                    if (showList[i].venue_name == showList[i].address) {
                                        showList[i].venue_name_address = showList[i].venue_name + ', ' + showList[i].city;
                                    }
                                    else {
                                        showList[i].venue_name_address = showList[i].venue_name + ', ' + showList[i].address + ', ' + showList[i].city;
                                    }

                                    if (!eventInfo.locationsArr.includes(showList[i].city)) {
                                        eventInfo.locationsArr.push(showList[i].city);
                                    }

                                    if (!eventInfo.datesArr.includes(showList[i].show_date)) {
                                        eventInfo.datesArr.push(showList[i].show_date)
                                    }

                                }

                                if (eventInfo.datesArr.length > 1) {
                                    eventInfo.dates = eventInfo.datesArr[0] + ' - ' + eventInfo.datesArr[eventInfo.datesArr.length - 1];
                                }
                                else {
                                    eventInfo.dates = eventInfo.datesArr[0];
                                }

                                eventInfo.locations = eventInfo.locationsArr[0];

                                for (let i = 1; i < eventInfo.locationsArr.length; i++) {
                                    if (i > 1) {
                                        eventInfo.locations = eventInfo.locations + ' and more ...';
                                        break;
                                    }
                                    eventInfo.locations = eventInfo.locations + ', ' + eventInfo.locationsArr[i];
                                    
                                }
                                // eventInfo.locations = eventInfo.locationsArr[0] + ', ' + eventInfo.locationsArr[1];
                                // if (eventInfo.locationsArr.length > 2) { 
                                //     eventInfo.locations = eventInfo.locations + ' and more ...';

                                // }

                                model.getModalInfo(eventID, (err, seatingCatList) => {
                                    if (err) {
                                        console.log("modal")
                                        res.json({ error: err });
                                    }
                                    else {
                                        let titleAndArtist = eventInfo.title + ' - ' + eventInfo.lead_roles;
                                        if (titleAndArtist.length > 58) {
                                            titleAndArtist = titleAndArtist.slice(0, 40) + '...';
                                        }

                                        eventInfo.titleAndArtist = titleAndArtist;
                                        let showCategoryList = groupDataByShow(seatingCatList);
                                        for (let i in showCategoryList) {
                                            for (let j in showCategoryList[i].categories) {
                                                showCategoryList[i].categories[j].seat_price = parseFloat(showCategoryList[i].categories[j].seat_price).toFixed(2);
                                            }
                                        }

                                        res.render('booking', { eventInfo, reviewList, showList, showCategoryList });

                                    }
                                }
                                )
                            }
                        })

                    }
                })
            }

        });

    }
    else if (navigateTo === 'music') {
        model.getMusicEventInfo(eventID, (err, eventInfo) => {
            if (err) {
                console.log("event")
                res.json({ error: err });
            }
            else {
                eventInfo = eventInfo[0];
                eventInfo.titleUpperCase = eventInfo.title.toUpperCase();
                eventInfo.type = navigateTo;
                model.getEventReviews(eventID, (err, reviewList) => {
                    if (err) {
                        console.log("reviews")
                        res.json({ error: err });
                    }
                    else {
                        reviewList = reviewList.slice(0, 3);

                        reviewList.forEach(review => {
                            review.username = '@' + review.username;
                            review.username = review.username.replace(/\s/g, '');

                            if (review.comment.length > 210) {
                                review.comment = review.comment.slice(0, 210) + ' . . .';
                                review.readmore = 1;
                            }
                        });

                        model.getShowInfo(eventID, (err, showList) => {
                            if (err) {
                                console.log("show")

                                res.json({ error: err });
                            }
                            else {
                                eventInfo.locationsArr = [];
                                eventInfo.datesArr = [];

                                for (let i in showList) {
                                    showList[i].minimum_price = parseFloat(showList[i].minimum_price).toFixed(2);

                                    const { dayName, formattedDate } = formatDate(showList[i].show_date);

                                    showList[i].show_date = formattedDate;
                                    showList[i].show_day = dayName;


                                    showList[i].show_time = formatTime(showList[i].show_time);

                                    if (showList[i].venue_name == showList[i].address) {
                                        showList[i].venue_name_address = showList[i].venue_name + ', ' + showList[i].city;
                                    }
                                    else {
                                        showList[i].venue_name_address = showList[i].venue_name + ', ' + showList[i].address + ', ' + showList[i].city;
                                    }

                                    if (!eventInfo.locationsArr.includes(showList[i].city)) {
                                        eventInfo.locationsArr.push(showList[i].city);
                                    }
                                    if (!eventInfo.datesArr.includes(showList[i].show_date)) {
                                        eventInfo.datesArr.push(showList[i].show_date)
                                    }

                                }
                                if (eventInfo.datesArr.length > 1) {
                                    eventInfo.dates = eventInfo.datesArr[0] + ' - ' + eventInfo.datesArr[eventInfo.datesArr.length - 1];
                                }
                                else {
                                    eventInfo.dates = eventInfo.datesArr[0];
                                }

                                eventInfo.locations = eventInfo.locationsArr[0];

                                for (let i = 1; i < eventInfo.locationsArr.length; i++) {
                                    if (i > 1) {
                                        eventInfo.locations = eventInfo.locations + ' and more ...';
                                        break;
                                    }
                                    eventInfo.locations = eventInfo.locations + ', ' + eventInfo.locationsArr[i];
                                    
                                }

                                model.getModalInfo(eventID, (err, seatingCatList) => {
                                    if (err) {
                                        console.log("modal")
                                        res.json({ error: err });
                                    }
                                    else {
                                        let titleAndArtist = eventInfo.title + ' - ' + eventInfo.artists;
                                        if (titleAndArtist.length > 58) {
                                            titleAndArtist = titleAndArtist.slice(0, 40) + '...';
                                        }

                                        eventInfo.titleAndArtist = titleAndArtist;

                                        let showCategoryList = groupDataByShow(seatingCatList);
                                        for (let i in showCategoryList) {
                                            for (let j in showCategoryList[i].categories) {
                                                showCategoryList[i].categories[j].seat_price = parseFloat(showCategoryList[i].categories[j].seat_price).toFixed(2);
                                            }
                                        }
                                        res.render('booking', { eventInfo, reviewList, showList, showCategoryList });

                                    }
                                }
                                )
                            }
                        })

                    }
                })
            }

        });

    }
    else if (navigateTo === 'theater') {
        model.getTheaterEventInfo(eventID, (err, eventInfo) => {
            if (err) {
                console.log("event")
                res.json({ error: err });
            }
            else {
                eventInfo = eventInfo[0];
                eventInfo.titleUpperCase = eventInfo.title.toUpperCase();
                eventInfo.type = navigateTo;
                model.getEventReviews(eventID, (err, reviewList) => {
                    if (err) {
                        console.log("reviews")
                        res.json({ error: err });
                    }
                    else {
                        reviewList = reviewList.slice(0, 3);
                        reviewList.forEach(review => {
                            review.username = '@' + review.username;
                            review.username = review.username.replace(/\s/g, '');
                            if (review.comment.length > 210) {
                                review.comment = review.comment.slice(0, 210) + ' . . .';
                                review.readmore = 1;
                            }
                        });

                        model.getShowInfo(eventID, (err, showList) => {
                            if (err) {
                                console.log("show")

                                res.json({ error: err });
                            }
                            else {
                                eventInfo.locationsArr = [];
                                eventInfo.datesArr = [];

                                for (let i in showList) {
                                    showList[i].minimum_price = parseFloat(showList[i].minimum_price).toFixed(2);

                                    const { dayName, formattedDate } = formatDate(showList[i].show_date);

                                    showList[i].show_date = formattedDate;
                                    showList[i].show_day = dayName;

                                    showList[i].show_time = formatTime(showList[i].show_time);

                                    if (showList[i].venue_name == showList[i].address) {
                                        showList[i].venue_name_address = showList[i].venue_name + ', ' + showList[i].city;
                                    }
                                    else {
                                        showList[i].venue_name_address = showList[i].venue_name + ', ' + showList[i].address + ', ' + showList[i].city;
                                    }

                                    if (!eventInfo.locationsArr.includes(showList[i].city)) {
                                        eventInfo.locationsArr.push(showList[i].city);
                                    }
                                    if (!eventInfo.datesArr.includes(showList[i].show_date)) {
                                        eventInfo.datesArr.push(showList[i].show_date)
                                    }

                                }
                                if (eventInfo.datesArr.length > 1) {
                                    eventInfo.dates = eventInfo.datesArr[0] + ' - ' + eventInfo.datesArr[eventInfo.datesArr.length - 1];
                                }
                                else {
                                    eventInfo.dates = eventInfo.datesArr[0];
                                }

                                eventInfo.locations = eventInfo.locationsArr[0];

                                for (let i = 1; i < eventInfo.locationsArr.length; i++) {
                                    if (i > 1) {
                                        eventInfo.locations = eventInfo.locations + ' and more ...';
                                        break;
                                    }
                                    eventInfo.locations = eventInfo.locations + ', ' + eventInfo.locationsArr[i];
                                    
                                }

                                model.getModalInfo(eventID, (err, seatingCatList) => {
                                    if (err) {
                                        console.log("error when getting modal info");
                                        res.json({ error: err });
                                    }
                                    else {
                                        let titleAndArtist = eventInfo.title + ' - ' + eventInfo.lead_roles;
                                        if (titleAndArtist.length > 58) {
                                            titleAndArtist = titleAndArtist.slice(0, 40) + '...';
                                        }

                                        eventInfo.titleAndArtist = titleAndArtist;
                                        let showCategoryList = groupDataByShow(seatingCatList);
                                        for (let i in showCategoryList) {
                                            for (let j in showCategoryList[i].categories) {
                                                showCategoryList[i].categories[j].seat_price = parseFloat(showCategoryList[i].categories[j].seat_price).toFixed(2);
                                            }


                                        }
                                        res.render('booking', { eventInfo, reviewList, showList, showCategoryList });

                                    }
                                });
                            }
                        });

                    }
                });
            }

        });

    }

}


router.get('/:type/events/:id', bookTicketsNavigation);

import * as reviewsRouter from './reviews.js';
router.use('/:type/events/:id/', reviewsRouter.reviewsRouter);

export { router as bookingRouter }

