import e from 'express';
import * as model from '../model/dbInterface.js';
import { formatDate } from '../public/scripts/formatDate.js';
import { error } from 'console';

function processPayment(req, res, next) {
    // this is a dummy function for
    // the payment processing
    // return false;
    return true;
}



async function getBookingComplete(req, res, next) {
    const showID = req.query.showID;
    const tickets = JSON.parse(decodeURIComponent(req.query.tickets));

    // get show details
    model.getES_E_V(showID, async (err, result) => {
        if (err) {
            const error_comment = "Failed to get show details";
            console.error(error_comment);
            next(err);
        }
        else {
            const eventShowInfo = result[0];
            eventShowInfo.show_date = formatDate(eventShowInfo.show_date).formattedDate;
            
            // calculate total price
            let totalAmount = 0;
            tickets.forEach(ticket => {
                ticket.finalPrice = Number(ticket.finalPrice.split('€')[0]).toFixed(2);
                totalAmount += Number(ticket.finalPrice);

                // generate a 7-digit random number for the ticket number:
                const ticketNumber = Math.floor(1000000 + Math.random() * 9000000);
                ticket.ticketNumber = ticketNumber;

                // rename key category to seatingCategory and discount to discountCategory
                ticket.seatingCategory = ticket.category;
                ticket.discountCategory = ticket.discount;
            });

            const success = processPayment(req, res, next); // dummy function
            let bookingInfo = {};
            if (success) {
                // store the tickets in the database
                tickets.forEach(ticket => {
                    console.log("Storing ticket in the database", ticket);
                });

                bookingInfo = {
                    success: success,
                    eventID: eventShowInfo.eventID,
                    imageURL: eventShowInfo.imageURL,
                    title: eventShowInfo.title,
                    showDate: eventShowInfo.show_date,
                    showTime: eventShowInfo.show_time,
                    venueName: eventShowInfo.venue_name,
                    venueCity: eventShowInfo.city,
                    venueCountry: eventShowInfo.country,
                    description: eventShowInfo.description,
                    tickets: tickets, //for each, ticketNumber, seatingCategory, discountCategory, finalPrice, downloadLink
                };

                // URL enconde the bookingInfo object
                const bookingInfoEncoded = encodeURIComponent(JSON.stringify(bookingInfo));
                // create a download link for the tickets
                const downloadLink = `/booking-complete/download?bookingInfo=${bookingInfoEncoded}`;
                tickets.forEach(ticket => {
                    ticket.downloadLink = downloadLink;
                });
            }
            let error_comment;
            let error_message;
            if (!success) {
                error_comment = "Network error while processing payment."; // generic dummy comment
                error_message = "Payment processing failed. Please try again."; // generic dummy message
            }

            res.render('booking_complete', {success: bookingInfo.success, eventInfo: eventShowInfo, tickets: tickets, totalAmount, error_comment, error_message});
        }
    });
}

async function downloadTickets(req, res, next) {
    const bookingInfo = JSON.parse(decodeURIComponent(req.query.bookingInfo));
    // res.render('download_tickets', {bookingInfo});
}

export { getBookingComplete };