import e from 'express';
import * as model from '../model/dbInterface.js';
import { formatDate } from '../public/scripts/formatDate.js';

function processPayment(req, res, next) {
    // this is a dummy function for
    // the payment processing
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

            res.render('booking_complete', {success, eventInfo: eventShowInfo, tickets: tickets, totalAmount})
        }
    });
}

export { getBookingComplete };