import pg from "pg";
import dotenv from "dotenv";

import * as sql from "./SQL/queries.js";

dotenv.config();
// console.log(process.env)
console.log('database..', process.env.DATABASE_URL)

// const pool = new pg.Pool({
//     connectionString: process.env.DATABASE_URL, //μεταβλητή περιβάλλοντος
//     // ssl: {
//     //     rejectUnauthorized: false
//     // }
//     ssl: process.env.DATABASE_URL ? true : false
// });


const pool = new pg.Pool({
    user: process.env.DB_USER, ///username,
    host: process.env.DB_HOST, ///localhost,
    database: process.env.DB_NAME, ///database name
    password: process.env.DB_PASSWORD, /// password,
    port: process.env.DB_PORT, ///port
})

async function connect() {
    try {
        const client = await pool.connect();
        return client
    }
    catch (e) {
        console.error(`Failed to connect ${e}`)
    }
}

// async function getAllEvents(callback) {
//     try {
//         const client = await connect();
//         const res = await client.query(sql.getAllEvents)
//         await client.release()
//         callback(null, res.rows)
//     }
//     catch (err) {
//         callback(err, null);
//     }
// }


async function getAllTheater(callback) {
    
    try {
        const client = await connect();
        const res = await client.query(sql.getAllTheaters)
        await client.release()
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
        await client.release()
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
        await client.release()
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
        await client.release();
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

export { getAllTheater, getAllMusic, getAllCinema, getEventReviews, getCinemaEventInfo, getMusicEventInfo, getTheaterEventInfo, getShowInfo, getModalInfo, getEventInReviewsInfo }