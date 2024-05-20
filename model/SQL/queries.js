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

const getCinemaEventInfo = `SELECT e."eventID", e."title", e."imageURL", e."description", e."genre", e."duration", c."movie_title", c."director", c."lead_roles", c."rating"
FROM "EVENT" e
JOIN "CINEMA" c ON c."cinemaID" = e."eventID"
WHERE e."eventID" = $1`


const getMusicEventInfo = `SELECT e."eventID", e."title", e."imageURL", e."description", e."genre", e."duration", m."artists", m."opening_act"
FROM "EVENT" e
JOIN "MUSIC" m ON m."musicID" = e."eventID"
WHERE e."eventID" = $1`

const getTheaterEventInfo = `SELECT e."eventID", e."title", e."imageURL", e."description", e."genre", e."duration", t."play_title", t."director", t."scriptwriter", t."lead_roles"
FROM "EVENT" e
JOIN "THEATER" t ON t."theaterID" = e."eventID"
WHERE e."eventID" = $1`

const getEventReviews = `SELECT r."reviewID", u."userID", r."eventID", r."score", r."comment", r."date_written", u."username"
FROM "REVIEW" r
JOIN "USER" u ON r."userID" = u."userID"
WHERE r."eventID" = $1`

const getShowInfo = `SELECT es."showID", es."eventID" ,v."venueID", es."show_date", es."show_time", es."status", v."venue_name", v."city", v."address", MIN(sp.seat_price) as minimum_price
FROM "EVENT_SHOW" es
JOIN "Sets_Price" sp ON es."showID" = sp."showID"
JOIN "VENUE" v ON es."venueID" = v."venueID"
JOIN "Venue_HAS_Seat_Cat" vsc ON vsc."venueID" = v."venueID"
WHERE es."eventID" = $1 and es."status" = 'SCHEDULED'
GROUP BY es."showID", v."venueID", es."show_date", es."show_time", es."status", v."venue_name", v."city", v."address"
ORDER BY es."show_date"
`

const getModalInfo = `SELECT es."eventID", es."showID", es."venueID", sp."categoryID", sp."seat_price", sc."category_name"
FROM "EVENT_SHOW" es 
JOIN "Sets_Price" sp ON sp."showID" = es."showID"
JOIN "SEAT_CATEGORY" sc ON sc."categoryID" = sp."categoryID"
WHERE es."eventID" = $1 AND es."status" = 'SCHEDULED'`

const getEventInReviewsInfo = `SELECT *
FROM "EVENT" e
JOIN "EVENT_SHOW" es ON es."eventID" = e."eventID"
JOIN "VENUE" v ON v."venueID" = es."venueID"
WHERE e."eventID" = $1 AND es."status" = 'SCHEDULED'
ORDER BY es."show_date"`

// `SELECT es."showID", es."venueID", cat."categoryID", es."status", vsc."seat_num", sp."seat_price", cat."category_name"
// FROM "EVENT_SHOW" es 
// JOIN "Venue_HAS_Seat_Cat" vsc ON es."venueID" = vsc."venueID"
// JOIN "SEAT_CATEGORY" cat ON cat."categoryID" = vsc."categoryID"
// JOIN "Sets_Price" sp ON es."showID" = sp."showID" --AND cat."categoryID" = sp."categoryID"
// WHERE es."showID" = 4 and es."status" = 'SCHEDULED'`


const getUserInfo = `SELECT * FROM "USER" u
WHERE u."userID" = $1`

const getUsersReviews = `SELECT r."reviewID", e."eventID", r."score", r."comment", r."date_written", e."title"
FROM "REVIEW" r
JOIN "EVENT" e ON r."eventID" = e."eventID"
WHERE r."userID" = $1
ORDER BY r."date_written"`

const getUsersTickets = `SELECT t."ticketID", t."status" as ticket_status, t."discountID", es."show_date", es."show_time", e."title", es."status" as show_status, v."venue_name" , v."address"
FROM "TICKET" t 
JOIN "EVENT_SHOW" es ON t."showID" = es."showID" 
JOIN "EVENT" e ON e."eventID" = es."eventID" 
JOIN "VENUE" v ON v."venueID" = es."venueID" 
WHERE t."userID" = $1 `

export { getAllEvents, getAllTheaters, getAllMusics, getAllCinemas, getEventReviews, getCinemaEventInfo, getMusicEventInfo, getTheaterEventInfo, getShowInfo, getModalInfo, getEventInReviewsInfo, getUserInfo, getUsersReviews, getUsersTickets }