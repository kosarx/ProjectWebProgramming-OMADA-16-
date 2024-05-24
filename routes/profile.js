import express from 'express';
// import moment from 'moment';
const router = express.Router();

import * as model from '../model/dbInterface.js';
import { formatDate } from '../public/scripts/formatDate.js';

let profileNavigation = async function (req, res) {

    const userID = req.params.userid;
    model.getUserInfo(userID, (err, userArr) => {
        if (err) {
            console.log("user")
            res.json({ error: err });
        }
        else {
            let user;

            user = userArr[0];

            const { dayName, formattedDate } = formatDate(user.registration_date);
            user.registration_date = formattedDate;
            user.username = '@' + user.username;
            user.username = user.username.replace(/\s/g, '');

            model.getUsersReviews(userID, (err, reviewList) => {
                if (err) {
                    console.log("reviews")
                    res.json({ error: err });
                }
                else {

                    for (let i in reviewList) {
                        const { dayName, formattedDate } = formatDate(reviewList[i].date_written);
                        reviewList[i].date_written = formattedDate;
                    }

                    model.getUsersTickets(userID, (err, ticketList) => {
                        if (err) {
                            console.log("reviews")
                            res.json({ error: err });
                        }
                        else {

                            for (let i in ticketList) {

                                const { dayName, formattedDate } = formatDate(ticketList[i].show_date);
                                ticketList[i].show_date = formattedDate;
                                ticketList[i].show_day = dayName;

                                let timeString = ticketList[i].show_time;

                                // Split the time string into hours, minutes, and seconds
                                let [hours, minutes, seconds] = timeString.split(':');

                                // Convert the hours to a 12-hour format with AM/PM indication
                                let ampm = hours >= 12 ? 'pm' : 'am';
                                hours = (hours % 12) || 12;

                                // Construct the formatted time string
                                let formattedTime = hours + ':' + minutes + ' ' + ampm;

                                ticketList[i].show_time = formattedTime;

                                if (ticketList[i].venue_name == ticketList[i].address) {
                                    ticketList[i].venue_name_address = ticketList[i].venue_name;
                                }
                                else {
                                    ticketList[i].venue_name_address = ticketList[i].venue_name + ', ' + ticketList[i].address;
                                }

                                ticketList[i].final_price = parseFloat(ticketList[i].final_price).toFixed(2);

                            }

                            res.render('profile', { user, reviewList, ticketList });
                        }
                    })


                }
            })


        }
    })

}



router.get('/:userid', profileNavigation);


export { router as profileRouter }