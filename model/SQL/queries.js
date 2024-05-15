const getAllEvents = `
SELECT *
FROM "EVENT" e
WHERE EXISTS (
    SELECT 1
    FROM "EVENT_SHOW" es
    WHERE e."eventID" = es."eventID"
      AND es.show_date >= CURRENT_DATE
      AND es.status != 'CANCELED'
)
ORDER BY e."eventID";
`

const getAllTheaters = `
SELECT t."theaterID", e.title, e.description, e."imageURL", v.city, MIN(es.show_date) as earliest_date, MAX(es.show_date) as latest_date 
FROM "EVENT" e
JOIN "THEATER" t ON e."eventID" = t."theaterID"
JOIN "EVENT_SHOW" es ON e."eventID" = es."eventID"
JOIN "VENUE" v ON es."venueID" = v."venueID"
WHERE EXISTS (
    SELECT 1
    FROM "EVENT_SHOW" es
    WHERE e."eventID" = es."eventID"
      AND es.show_date >= CURRENT_DATE
      AND es.status = 'SCHEDULED'
) AND es.status = 'SCHEDULED'
GROUP BY t."theaterID", e.title, e.description, e."imageURL", v.city
ORDER BY earliest_date, latest_date;
`

const getAllMusics = `
SELECT m."musicID", e.title, e.description, e."imageURL", v.city, MIN(es.show_date) as earliest_date, MAX(es.show_date) as latest_date 
FROM "EVENT" e
JOIN "MUSIC" m ON e."eventID" = m."musicID"
JOIN "EVENT_SHOW" es ON e."eventID" = es."eventID"
JOIN "VENUE" v ON es."venueID" = v."venueID"
WHERE EXISTS (
    SELECT 1
    FROM "EVENT_SHOW" es
    WHERE e."eventID" = es."eventID"
      AND es.show_date >= CURRENT_DATE
      AND es.status = 'SCHEDULED'
) AND es.status = 'SCHEDULED'
GROUP BY m."musicID", e.title, e.description, e."imageURL", v.city
ORDER BY earliest_date, latest_date;
`

const getAllCinemas = `
SELECT c."cinemaID", e.title, e.description, e."imageURL", v.city, MIN(es.show_date) as earliest_date, MAX(es.show_date) as latest_date 
FROM "EVENT" e
JOIN "CINEMA" c ON e."eventID" = c."cinemaID"
JOIN "EVENT_SHOW" es ON e."eventID" = es."eventID"
JOIN "VENUE" v ON es."venueID" = v."venueID"
WHERE EXISTS (
    SELECT 1
    FROM "EVENT_SHOW" es
    WHERE e."eventID" = es."eventID"
      AND es.show_date >= CURRENT_DATE
      AND es.status = 'SCHEDULED'
) AND es.status = 'SCHEDULED'
GROUP BY c."cinemaID", e.title, e.description, e."imageURL", v.city
ORDER BY earliest_date, latest_date;
`

// const getEventShows2 = `
// SELECT e."eventID", e.title, e.description, e."imageURL", e.genre, e.duration, r."reviewID", r.score, r.comment, r."userID" as "userID_of_review", r.date_written, es."showID", es.show_date, es.show_time, es.status, v."venueID", v.venue_name, v.city, v.address
// FROM "EVENT" e
// JOIN "REVIEW" r ON r."eventID" = e."eventID"
// JOIN "EVENT_SHOW" es ON e."eventID" = es."eventID"
// JOIN "VENUE" v ON v."venueID" = es."venueID"
// WHERE e."eventID" = $1;
// `

// const getEventShows1 = `SELECT e."eventID", e.title, e.description, e."imageURL", e.genre, e.duration, es."showID", es.show_date, es.show_time, es.status, v."venueID", v.venue_name, v.city, v.address
// FROM "EVENT" e
// JOIN "EVENT_SHOW" es ON e."eventID" = es."eventID"
// JOIN "VENUE" v ON v."venueID" = es."venueID"
// WHERE e."eventID" = $1;`


// const getCinemaEventInfo = `SELECT e."eventID", v."venueID", es."showID", e."title", e."description", e."imageURL", e."genre", e."duration", es."show_date", es."status", cin."movie_title", cin."director", cin."lead_roles", cin."rating", v."venue_name", v."city", v."address"
// FROM "EVENT" e 
// JOIN "EVENT_SHOW" es ON e."eventID" = es."eventID"
// JOIN "CINEMA" cin ON e."eventID" = "cinemaID"
// JOIN "VENUE" v ON v."venueID" = es."venueID"
// WHERE e."eventID" = $1 and es."status" = 'SCHEDULED'
// `

const getCinemaEventInfo = `SELECT e."eventID", e."title", e."imageURL", e."description", e."genre", e."duration", c."movie_title", c."director", c."lead_roles", c."rating"
FROM "EVENT" e
JOIN "CINEMA" c ON c."cinemaID" = e."eventID"
WHERE e."eventID" = $1`

// const getMusicEventInfo = `SELECT e."eventID", v."venueID", es."showID", e."title", e."description", e."imageURL", e."genre", e."duration", es."show_date",  es."status", music."artists", music."opening_act", v."venue_name", v."city", v."address"
// FROM "EVENT" e 
// JOIN "EVENT_SHOW" es ON e."eventID" = es."eventID"
// JOIN "MUSIC" music ON e."eventID" = "musicID"
// JOIN "VENUE" v ON v."venueID" = es."venueID"
// WHERE e."eventID" = $1 and es."status" = 'SCHEDULED'
// `

const getMusicEventInfo = `SELECT e."eventID", e."title", e."imageURL", e."description", e."genre", e."duration", m."artists", m."opening_act"
FROM "EVENT" e
JOIN "MUSIC" m ON m."musicID" = e."eventID"
WHERE e."eventID" = $1`

// const getTheaterEventInfo = `SELECT e."eventID", v."venueID", es."showID", e."title", e."description", e."imageURL", e."genre", e."duration", es."show_date",  es."status", theater."play_title", theater."director", theater."scriptwriter", theater."lead_roles", v."venue_name", v."city", v."address"
// FROM "EVENT" e 
// JOIN "EVENT_SHOW" es ON e."eventID" = es."eventID"
// JOIN "THEATER" theater ON e."eventID" = "theaterID"
// JOIN "VENUE" v ON v."venueID" = es."venueID"
// WHERE e."eventID" = $1 and es."status" = 'SCHEDULED'
// `


const getTheaterEventInfo = `SELECT e."eventID", e."title", e."imageURL", e."description", e."genre", e."duration", t."play_title", t."director", t."scriptwriter", t."lead_roles"
FROM "EVENT" e
JOIN "THEATER" t ON t."theaterID" = e."eventID"
WHERE e."eventID" = $1`

const getEventReviews = `SELECT r."reviewID", r."score", r."comment", r."date_written", u."username"
FROM "EVENT" e
JOIN "REVIEW" r ON e."eventID" = r."eventID"
JOIN "USER" u ON u."userID" = r."userID"
WHERE e."eventID" = $1;`

const getShowInfo = `SELECT es."showID", v."venueID", es."show_date", es."show_time", es."status", v."venue_name", v."city", v."address", MIN(sp.seat_price) as minimum_price
FROM "EVENT_SHOW" es
JOIN "Sets_Price" sp ON es."showID" = sp."showID"
JOIN "VENUE" v ON es."venueID" = v."venueID"
JOIN "Venue_HAS_Seat_Cat" vsc ON vsc."venueID" = v."venueID"
WHERE es."eventID" = $1 and es."status" = 'SCHEDULED'
GROUP BY es."showID", v."venueID", es."show_date", es."show_time", es."status", v."venue_name", v."city", v."address"
`

const getModalInfo = `SELECT es."showID", es."venueID", cat."categoryID", es."status", vsc."seat_num", sp."seat_price", cat."category_name"
FROM "EVENT_SHOW" es 
JOIN "Venue_HAS_Seat_Cat" vsc ON es."venueID" = vsc."venueID"
JOIN "SEAT_CATEGORY" cat ON cat."categoryID" = vsc."categoryID"
JOIN "Sets_Price" sp ON es."showID" = sp."showID" --AND cat."categoryID" = sp."categoryID"
WHERE es."showID" = 4 and es."status" = 'SCHEDULED'`



export { getAllEvents, getAllTheaters, getAllMusics, getAllCinemas, getEventReviews, getCinemaEventInfo, getMusicEventInfo, getTheaterEventInfo, getShowInfo, getModalInfo }