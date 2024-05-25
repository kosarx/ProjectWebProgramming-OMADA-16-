import pg from "pg";
import dotenv from "dotenv";

import * as sql from "./SQL/queries.js";
import bcrypt from 'bcrypt';

dotenv.config();

const pool_url_string = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

const pool_local = new pg.Pool({
    user: process.env.LOCAL_DB_USER, ///username,
    host: process.env.LOCAL_DB_HOST, ///localhost,
    database: process.env.LOCAL_DB_NAME, ///database name
    password: process.env.LOCAL_DB_PASSWORD, /// password,
    port: process.env.LOCAL_DB_PORT, ///port
})

let pool = null;
let other_pool = null;
if (process.env.LOCAL === 'true') {
    pool = pool_local;
    other_pool = pool_url_string;
}
else {
    pool = pool_url_string;
    other_pool = pool_local;
}

async function connect() {
    try {
        const client = await pool.connect();
        return client
    }
    catch (e) {
        console.error(`Failed to connect ${e}`)
        console.log("Trying to connect to the other pool")
        try {
            const client = await other_pool.connect();
            return client
        }
        catch (e) {
            console.error(`Failed to connect ${e}, with the second pool`);
        }

    }
}

async function getAllScheduledEvents(callback) {
    try {
        const client = await connect();
        const res = await client.query(sql.getAllScheduledEvents)
        client.release()
        callback(null, res.rows)
    }
    catch (err) {
        callback(err, null);
    }
}

async function getAllScheduledEventShows(callback) {
    try {
        const client = await connect();
        const res = await client.query(sql.getAllScheduledEventShows)
        client.release()
        callback(null, res.rows)
    }
    catch (err) {
        callback(err, null);
    }
}

async function getAllTheater(callback) {

    try {
        const client = await connect();
        const res = await client.query(sql.getAllTheaters)
        client.release()
        callback(null, res.rows)
    }
    catch (err) {
        callback(err, null);
    }
}

async function getAllMusic(callback) {
    try {
        const client = await connect();
        const res = await client.query(sql.getAllMusics)
        client.release()
        callback(null, res.rows)
    }
    catch (err) {
        callback(err, null);
    }
}

async function getAllCinema(callback) {
    try {
        const client = await connect();
        const res = await client.query(sql.getAllCinemas)
        client.release()
        callback(null, res.rows)
    }
    catch (err) {
        callback(err, null);
    }
}


// async function getEventShows(eventID, callback) {
//     try {
//         const client = await connect();
//         const res = await client.query(sql.getEventShows, [eventID])
//         await client.release()
//         callback(null, res.rows)
//     }
//     catch (err) {
//         callback(err, null);
//     }
// }

async function getEventReviews(eventID, callback) {
    try {
        const client = await connect();
        const res = await client.query(sql.getEventReviews, [eventID]);
        client.release();
        callback(null, res.rows);
    }
    catch (err) {
        callback(err, null);
    }
}


async function getCinemaEventInfo(eventID, callback) {
    try {
        const client = await connect();
        const res = await client.query(sql.getCinemaEventInfo, [eventID]);
        client.release();
        callback(null, res.rows);
    }
    catch (err) {
        callback(err, null);
    }
}

async function getMusicEventInfo(eventID, callback) {
    try {
        const client = await connect();
        const res = await client.query(sql.getMusicEventInfo, [eventID]);
        client.release();
        callback(null, res.rows);
    }
    catch (err) {
        callback(err, null);
    }
}

async function getTheaterEventInfo(eventID, callback) {
    try {
        const client = await connect();
        const res = await client.query(sql.getTheaterEventInfo, [eventID]);
        client.release();
        callback(null, res.rows);
    }
    catch (err) {
        callback(err, null);
    }
}

async function getShowInfo(eventID, callback) {
    try {
        const client = await connect();
        const res = await client.query(sql.getShowInfo, [eventID]);
        client.release();
        callback(null, res.rows);
    }
    catch (err) {
        callback(err, null);
    }
}

async function getModalInfo(eventID, callback) {
    try {
        const client = await connect();
        const res = await client.query(sql.getModalInfo, [eventID]);
        client.release();
        callback(null, res.rows);
    }
    catch (err) {
        callback(err, null);
    }
}

async function getEventInReviewsInfo(eventID, callback) {
    try {
        const client = await connect();
        const res = await client.query(sql.getEventInReviewsInfo, [eventID]);
        client.release();
        callback(null, res.rows);
    }
    catch (err) {
        callback(err, null);
    }
}

async function getUserInfo(userID, callback) {
    try {
        const client = await connect();
        const res = await client.query(sql.getUserInfo, [userID]);
        client.release();
        callback(null, res.rows);
    }
    catch (err) {
        callback(err, null);
    }
}

async function getUsersReviews(userID, callback) {
    try {
        const client = await connect();
        const res = await client.query(sql.getUsersReviews, [userID]);
        client.release();
        callback(null, res.rows);
    }
    catch (err) {
        callback(err, null);
    }
}

async function getUsersTickets(userID, callback) {
    try {
        const client = await connect();
        const res = await client.query(sql.getUsersTickets, [userID]);
        client.release();
        callback(null, res.rows);
    }
    catch (err) {
        callback(err, null);
    }
}

async function getEventAverageScore(eventID, callback) {
    try {
        const client = await connect();
        const res = await client.query(sql.getEventAverageScore, [eventID]);
        client.release();
        callback(null, res.rows);
    }
    catch (err) {
        callback(err, null);
    }
}

async function deleteReview(userID, reviewID, callback) {
    try {
        const client = await connect();
        const res = await client.query(sql.deleteReview, [userID, reviewID]);
        client.release();
        let message = `Review ${reviewID} by User ${userID} deleted succesfully`;
        callback(null, message);
    }
    catch (err) {
        callback(err, null);
    }
}


async function cancelTicket(userID, ticketID, callback) {
    try {
        const client = await connect();
        const res = await client.query(sql.cancelTicket, [userID, ticketID]);
        client.release();
        let message = `Ticket ${ticketID} of User ${userID} canceled succesfully`;
        callback(null, message);
    }
    catch (err) {
        callback(err, null);
    }
}

async function getEventShowWithEventAndVenueDetails(showID, callback) {
    try {
        const client = await connect();
        const res = await client.query(sql.getEventShowWithEventAndVenueDetails, [showID]);
        client.release();
        callback(null, res.rows);
    }
    catch (err) {
        callback(err, null);
    }
}

async function getDiscountFromType(discountType, callback) {
    try {
        const client = await connect();
        const res = await client.query(sql.getDiscountFromType, [discountType]);
        client.release();
        callback(null, res.rows);
    }
    catch (err) {
        callback(err, null);
    }
}

async function signUpUser(username, password, fullName, email, registrationDate, profile_imageURL) {

    const user = await findUserByUsernameOrEmail(username, null);
    if (user != undefined) {
        return { message: "Username is taken." }
    }
    else {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const client = await connect();
            const res = await client.query(sql.signUpUser, [username, hashedPassword, fullName, email, registrationDate, profile_imageURL]);
            client.release();
            let message = `User ${username} created succesfully`;
            return res.rows;
        }
        catch (error) {
            throw error;
        }
    }


}

async function findUserByUsernameOrEmail(username, email) {
    try {
        const client = await connect();
        const res = await client.query(sql.findUserByUsernameOrEmail, [username, email]);
        client.release();
        return res.rows[0];
    }
    catch (error) {
        console.error('Error retrieving user:', error.message);
        throw error;
    }
}

export {
    getAllScheduledEvents, getAllScheduledEventShows, getAllTheater, getAllMusic, getAllCinema, getEventReviews,
    getCinemaEventInfo, getMusicEventInfo, getTheaterEventInfo, getShowInfo, getModalInfo, getEventInReviewsInfo, getUserInfo,
    getUsersReviews, getUsersTickets, getEventAverageScore, deleteReview, cancelTicket, signUpUser, findUserByUsernameOrEmail, 
    getEventShowWithEventAndVenueDetails as getES_E_V, getDiscountFromType };