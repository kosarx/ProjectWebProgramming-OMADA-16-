import express from 'express';
const router = express.Router();

import * as model from '../model/dbInterface.js';
import { formatDate } from '../public/scripts/formatDate.js';

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
                                eventInfo.locations = showList[0].city;
                                const { dayName, formattedDate } = formatDate(showList[0].show_date);
                                eventInfo.dates = formattedDate;
                                for (let i in showList) {

                                    const { dayName, formattedDate } = formatDate(showList[i].show_date);
                                    showList[i].show_date = formattedDate;
                                    showList[i].show_day = dayName;

                                    let timeString = showList[i].show_time;

                                    // Split the time string into hours, minutes, and seconds
                                    let [hours, minutes, seconds] = timeString.split(':');

                                    // Convert the hours to a 12-hour format with AM/PM indication
                                    let ampm = hours >= 12 ? 'pm' : 'am';
                                    hours = (hours % 12) || 12;

                                    // Construct the formatted time string
                                    let formattedTime = hours + ':' + minutes + ' ' + ampm;

                                    showList[i].show_time = formattedTime;

                                    if (showList[i].venue_name == showList[i].address) {
                                        showList[i].venue_name_address = showList[i].venue_name + ', ' + showList[i].city;
                                    }
                                    else {
                                        showList[i].venue_name_address = showList[i].venue_name + ', ' + showList[i].address + ', ' + showList[i].city;
                                    }

                                    if (!eventInfo.locations.includes(showList[i].city)) {
                                        eventInfo.locations = eventInfo.locations + ', ' + showList[i].city;
                                    }
                                    if (!eventInfo.dates.includes(showList[i].show_date)) {
                                        eventInfo.dates = eventInfo.dates + ', ' + showList[i].show_date;
                                    }


                                }

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
                                eventInfo.locations = showList[0].city;
                                const { dayName, formattedDate } = formatDate(showList[0].show_date);
                                eventInfo.dates = formattedDate;
                                for (let i in showList) {
                                    showList[i].minimum_price = parseFloat(showList[i].minimum_price).toFixed(2);

                                    const { dayName, formattedDate } = formatDate(showList[i].show_date);
                                    
                                    showList[i].show_date = formattedDate;
                                    showList[i].show_day = dayName;

                                    
                                    let timeString = showList[i].show_time;

                                    // Split the time string into hours, minutes, and seconds
                                    let [hours, minutes, seconds] = timeString.split(':');

                                    // Convert the hours to a 12-hour format with AM/PM indication
                                    let ampm = hours >= 12 ? 'pm' : 'am';
                                    hours = (hours % 12) || 12;

                                    // Construct the formatted time string
                                    let formattedTime = hours + ':' + minutes + ' ' + ampm;

                                    showList[i].show_time = formattedTime;

                                    if (showList[i].venue_name == showList[i].address) {
                                        showList[i].venue_name_address = showList[i].venue_name + ', ' + showList[i].city;
                                    }
                                    else {
                                        showList[i].venue_name_address = showList[i].venue_name + ', ' + showList[i].address + ', ' + showList[i].city;
                                    }

                                    if (!eventInfo.locations.includes(showList[i].city)) {
                                        eventInfo.locations = eventInfo.locations + ', ' + showList[i].city;
                                    }
                                    if (!eventInfo.dates.includes(showList[i].show_date)) {
                                        eventInfo.dates = eventInfo.dates + ', ' + showList[i].show_date;
                                    }
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
                                eventInfo.locations = showList[0].city;
                                const { dayName, formattedDate } = formatDate(showList[0].show_date);
                                eventInfo.dates = formattedDate;
                                for (let i in showList) {
                                    showList[i].minimum_price = parseFloat(showList[i].minimum_price).toFixed(2);

                                    const { dayName, formattedDate } = formatDate(showList[i].show_date);

                                    showList[i].show_date = formattedDate;
                                    showList[i].show_day = dayName;

                                    let timeString = showList[i].show_time;

                                    // Split the time string into hours, minutes, and seconds
                                    let [hours, minutes, seconds] = timeString.split(':');

                                    // Convert the hours to a 12-hour format with AM/PM indication
                                    let ampm = hours >= 12 ? 'pm' : 'am';
                                    hours = (hours % 12) || 12;

                                    // Construct the formatted time string
                                    let formattedTime = hours + ':' + minutes + ' ' + ampm;

                                    showList[i].show_time = formattedTime;

                                    if (showList[i].venue_name == showList[i].address) {
                                        showList[i].venue_name_address = showList[i].venue_name + ', ' + showList[i].city;
                                    }
                                    else {
                                        showList[i].venue_name_address = showList[i].venue_name + ', ' + showList[i].address + ', ' + showList[i].city;
                                    }

                                    if (!eventInfo.locations.includes(showList[i].city)) {
                                        eventInfo.locations = eventInfo.locations + ', ' + showList[i].city;
                                    }
                                    if (!eventInfo.dates.includes(showList[i].show_date)) {
                                        eventInfo.dates = eventInfo.dates + ', ' + showList[i].show_date;
                                    }


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

function groupDataByShow(data) {
    return data.reduce((acc, item) => {
        let show = acc.find(show => show.showID === item.showID);
        if (!show) {
            show = {
                showID: item.showID,
                venueID: item.venueID,
                categories: []
            };
            acc.push(show);
        }
        show.categories.push({
            categoryID: item.categoryID,
            seat_price: item.seat_price,
            category_name: item.category_name
        });
        return acc;
    }, []);
}


router.get('/:type/events/:id', bookTicketsNavigation);

import * as reviewsRouter from './reviews.js';
router.use('/:type/events/:id/', reviewsRouter.reviewsRouter);

export { router as bookingRouter }

