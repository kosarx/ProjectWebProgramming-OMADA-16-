import * as model from '../model/dbInterface.js';
import { formatDate } from '../public/scripts/formatDate.js';
import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';

import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

//get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function processPayment(req, res, next) {
    // this is a dummy function for
    // the payment processing
    // return false;
    return true;
}

async function getBookingInit(req, res, next) {
    try {
        // retrieve the entire query string
        const query = req.query;
        const bookingToken = uuidv4();
        req.session.bookingToken = bookingToken;

        const newQuery = { ...query, bookingToken };
        // URL encode the query string
        const queryString = new URLSearchParams(newQuery).toString();
        // Redirect to booking-complete page with query parameters
        res.redirect(`/booking/complete?${queryString}`); 
    }
    catch (err) {
        const error_comment = "Failed to initialize booking";
        req.session.error_comment = error_comment;
        console.error(error_comment);
        next(err);
    }
}

async function getBookingComplete(req, res, next) {
    const showID = req.query.showID;
    const bookingToken = req.query.bookingToken;
    const tickets = JSON.parse(decodeURIComponent(req.query.tickets));

    if (req.session.bookingToken !== bookingToken) {
        const error_comment = "Booking token mismatch, invalid or expired.";
        console.error(error_comment);
        next(new Error(error_comment));
    }
    else {
        // get show details
        model.getES_E_V(showID, async (err, result) => {
            if (err) {
                const error_comment = "Failed to get show details";
                req.session.error_comment = error_comment;
                console.error(error_comment);
                next(err);
            }
            else {
                let eventShowInfo = result[0];
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
                totalAmount = totalAmount.toFixed(2);

                const success = processPayment(req, res, next); // dummy function
                let bookingInfo;
                if (success) {
                    // store the tickets in the database
                    for (const ticket of tickets) {
                        try {
                            console.log("Storing ticket in the database");
                
                            // get the discountID from the discount category
                            let discountCategoryName = ticket.discountCategory;
                            if (ticket.discountCategory !== "Regular") {
                                discountCategoryName = ticket.discountCategory.split(',')[0];
                            }
                            const discountCategory = await model.getDiscountFromType(discountCategoryName);
                            const discountID = discountCategory[0].discountID;
                
                            // get the categoryID from the seating category
                            const seatCategory = await model.getSeatCategoryFromName(ticket.seatingCategory);
                            const categoryID = seatCategory[0].categoryID;
                
                            // get current timestamp
                            const date_booked = new Date().toISOString().slice(0, 19).replace('T', ' ');
                            // console.log("discountID", discountID, "categoryID", categoryID, "showID", showID, "date_booked", date_booked, "userID", req.session.loggedUserId);
                            
                            const lastInsertedTicketID = await model.insertTicket(ticket.ticketNumber, 'BOOKED', categoryID, req.session.loggedUserId, date_booked, discountID, showID);
                            // destroy the booking token
                            ticket.ticketID = lastInsertedTicketID;
                            console.log("Ticket stored in the database", ticket.ticketID);
                        } catch (err) {
                            const error_comment = "Failed to store ticket in the database";
                            console.error(error_comment);
                            next(err);
                        }
                    }

                    eventShowInfo = {
                        success: success,
                        eventID: eventShowInfo.eventID,
                        imageURL: eventShowInfo.imageURL,
                        title: eventShowInfo.title,
                        showDate: eventShowInfo.show_date,
                        showTime: eventShowInfo.show_time,
                        venueName: eventShowInfo.venue_name,
                        venueCity: eventShowInfo.city,
                        venueAddress: eventShowInfo.address,
                        description: eventShowInfo.description,
                    };
                    
                    bookingInfo = tickets.map(ticket => ({
                        ticketID: ticket.ticketID,
                        userID: req.session.loggedUserId,
                        ticketNumber: ticket.ticketNumber,
                        seatingCategory: ticket.seatingCategory,
                        discountCategory: ticket.discountCategory,
                        finalPrice: ticket.finalPrice,
                        downloadLink: ticket.downloadLink,
                        ...eventShowInfo,
                    }));

                    bookingInfo.forEach(ticket => {
                        // check if ticket.discountCategory contains '%' Causes problems with URL encoding
                        if (ticket.discountCategory.includes('%')) {
                            // change it to '%25'
                            ticket.discountCategory = ticket.discountCategory.replace('%', '%25');
                        }
                        // URL enconde the bookingInfo object
                        const bookingInfoEncoded = encodeURIComponent(JSON.stringify(ticket));
                        // create a download link for the tickets
                        const downloadLink = `/booking/complete/download?bookingInfo=${bookingInfoEncoded}`;
                        ticket.downloadLink = downloadLink;

                        // revert the change to '%'
                        if (ticket.discountCategory.includes('%25')) {
                            ticket.discountCategory = ticket.discountCategory.replace('%25', '%');
                        }
                    });
                }
                let error_comment;
                let error_message;
                if (!success) {
                    error_comment = "Network error while processing payment."; // generic dummy comment
                    error_message = "Payment processing failed. Please try again."; // generic dummy message
                }
                req.session.bookingToken = "Token used";
                res.render('booking_complete', {success: bookingInfo[0].success, eventInfo: eventShowInfo, tickets: bookingInfo, totalAmount, error_comment, error_message});
            }
        });
    }
}

// Function to generate a PDF document
const generateTicketPDF = async (ticket, res, req, next) => {
    try {
        const doc = new PDFDocument();

        // Stream the PDF to the response
        res.setHeader('Content-disposition', `attachment; filename=ticket-${ticket.ticketNumber}.pdf`);
        res.setHeader('Content-type', 'application/pdf');
        doc.pipe(res);

        // Add content to the PDF
        doc.fontSize(25).text('TicketBuddy', 100, 50);
        // add logo
        doc.image('public/images/logo/favicon-3.jpg', 470, 40, { width: 30 });
        // add divider
        doc.moveTo(100, 70).lineTo(500, 70).stroke();
        // add ticket details
        doc.fontSize(15).text(`Ticket Number: ${ticket.ticketNumber}`, 100, 100);
        doc.fontSize(10).text(`Full Name: ${ticket.user.full_name}`, 100, 125);
        doc.fontSize(10).text(`Email: ${ticket.user.email}`, 100, 150);
        doc.fontSize(10).text(`Event: ${ticket.title}`, 100, 175);
        doc.fontSize(10).text(`Venue: ${ticket.venueName}, ${ticket.venueCity}`, 100, 200);
        doc.fontSize(10).text(`Address: ${ticket.venueAddress}`, 100, 225);
        doc.fontSize(10).text(`Date: ${ticket.showDate}`, 100, 250);
        doc.fontSize(10).text(`Time: ${ticket.showTime}`, 100, 275);
        doc.fontSize(10).text(`Seating Category: ${ticket.seatingCategory}`, 100, 300);
        doc.fontSize(10).text(`Discount: ${ticket.discountCategory}`, 100, 325);
        doc.fontSize(10).text(`Final Price: ${ticket.finalPrice}€`, 100, 350);

        // Generate QR code
        const qrCodeImageUrl = await QRCode.toDataURL(`${ticket.ticketID}-${ticket.userID}-${ticket.ticketNumber}-${ticket.title}-${ticket.venueName}-${ticket.showDate}-${ticket.showTime}-${ticket.seatingCategory}-${ticket.discountCategory}-${ticket.finalPrice}-${ticket.downloadLink}`);
        doc.image(qrCodeImageUrl, {
            fit: [100, 100],
            align: 'center',
            valign: 'center'
        }).moveDown();

        doc.end();

        // store the pdf in /database/ticket-pdf/
        // const directoryPath = path.join(__dirname, '..', 'database', 'ticket-pdfs');
        // doc.pipe(fs.createWriteStream(path.join(directoryPath, `ticket-${ticket.ticketID}-${ticket.ticketNumber}.pdf`)));
    } catch (err) {
        const error_comment = "Failed to generate ticket PDF";
        req.session.error_comment = error_comment;
        console.error(error_comment);
        next(err);
    }
}

async function downloadTickets(req, res, next) {
    try {
        const bookingInfo = JSON.parse(decodeURIComponent(req.query.bookingInfo));
        // get the user who booked the ticket
        const user = await model.getUserFromTicketID(bookingInfo.ticketID);
        bookingInfo.user = user;
        generateTicketPDF(bookingInfo, res, req, next);
    } catch (err) {
        const error_comment = "Failed to download tickets";
        req.session.error_comment = error_comment;
        console.error(error_comment);
        next(err);
    }
}

export { getBookingComplete, downloadTickets, getBookingInit };