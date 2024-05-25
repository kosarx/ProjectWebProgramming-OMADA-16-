import * as model from '../model/dbInterface.js';
import { formatDate } from '../public/scripts/formatDate.js';

let profileNavigation = async function (req, res, next) {

    const userID = req.session.loggedUserId;
    model.getUserInfo(userID, (err, userArr) => {
        if (err) {
            const error_comment = "Could not get user info from the database";
            console.error(error_comment);
            next(err);
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
                    const error_comment = "Could not get reviews from the database";
                    console.error(error_comment);
                    next(err);
                }
                else {

                    for (let i in reviewList) {
                        const { dayName, formattedDate } = formatDate(reviewList[i].date_written);
                        reviewList[i].date_written = formattedDate;
                    }

                    model.getUsersTickets(userID, (err, ticketList) => {
                        if (err) {
                            const error_comment = "Could not get tickets from the database";
                            console.error(error_comment);
                            next(err);
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
                    });


                }
            });


        }
    });

}

export { profileNavigation }