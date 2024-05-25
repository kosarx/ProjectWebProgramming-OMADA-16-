const getAllScheduledEvents = `
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

const getAllScheduledEventShows = `
SELECT
  ES."showID",
  E."eventID",
  E.title,
  E.genre,
  E."imageURL",
  -- Get event type from child tables
  CASE
    WHEN m."musicID" IS NOT NULL THEN 'MUSIC'
    WHEN c."cinemaID" IS NOT NULL THEN 'CINEMA'
    WHEN t."theaterID" IS NOT NULL THEN 'THEATER'
  END AS event_type,
  ES.show_date,
  ES.show_time,
  ES.status,
  V.venue_name,
  V.city
FROM "EVENT" E
LEFT JOIN "MUSIC" m ON E."eventID" = m."musicID"
LEFT JOIN "CINEMA" c ON E."eventID" = c."cinemaID"
LEFT JOIN "THEATER" t ON E."eventID" = t."theaterID"
JOIN "EVENT_SHOW" ES ON E."eventID" = ES."eventID"
JOIN "VENUE" V ON ES."venueID" = V."venueID"
WHERE ES.status != 'CANCELED'
ORDER BY ES.show_date;
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

const getUsersReviews = `SELECT r."reviewID", e."eventID", r."score", r."comment", r."date_written", e."title",
CASE
    WHEN m."musicID" IS NOT NULL THEN 'MUSIC'
    WHEN c."cinemaID" IS NOT NULL THEN 'CINEMA'
    WHEN t."theaterID" IS NOT NULL THEN 'THEATER'
END AS event_type
FROM "REVIEW" r
JOIN "EVENT" e ON r."eventID" = e."eventID"
LEFT JOIN "MUSIC" m ON e."eventID" = m."musicID"
LEFT JOIN "CINEMA" c ON e."eventID" = c."cinemaID"
LEFT JOIN "THEATER" t ON e."eventID" = t."theaterID"
WHERE r."userID" = $1
ORDER BY r."date_written"`

const getUsersTickets = `SELECT t."ticketID", t."status" as ticket_status, t."discountID", es."show_date", es."show_time", e."title", es."status" as show_status, v."venue_name" , v."address", tfp."seat_price", tfp."discount_percentage", tfp."final_price"
FROM "TICKET" t 
JOIN "EVENT_SHOW" es ON t."showID" = es."showID" 
JOIN "EVENT" e ON e."eventID" = es."eventID" 
JOIN "VENUE" v ON v."venueID" = es."venueID" 
JOIN "TICKET_Final_Price" tfp ON tfp."ticketID" = t."ticketID"
WHERE t."userID" = $1 `

const getEventAverageScore = `
SELECT 
	evav."eventID",
	evav."average_score"
FROM
 	"EVENT_Average_Review_Score" evav
WHERE evav."eventID" = $1;
`

const deleteReview = `DELETE FROM "REVIEW" r
WHERE r."userID" = $1 AND r."reviewID" = $2;`

const cancelTicket = `UPDATE "TICKET" 
SET status='CANCELED'
WHERE "userID" = $1  AND "ticketID" = $2;`

const getEventShowWithEventAndVenueDetails =
`SELECT 
    es."showID",
    e."eventID",
    e."imageURL",
    e."title",
    e."description",
    v."venue_name",
    v."city",
    v."address",
    es."show_date",
    es."show_time"
FROM 
    "EVENT_SHOW" es
JOIN 
    "EVENT" e ON es."eventID" = e."eventID"
JOIN 
    "VENUE" v ON es."venueID" = v."venueID"
WHERE 
    es."showID" = $1;

`

const getDiscountFromType = `SELECT * FROM "DISCOUNT_CATEGORY" d
WHERE d."discount_type" = $1`

const signUpUser = `INSERT INTO "USER"(
	username, password, full_name, email, registration_date, "profile_imageURL")
	VALUES ( $1, $2, $3, $4, $5, $6 );`

const findUserByUsernameOrEmail = `SELECT u."userID", u."username", u."email", u."password"
FROM "USER" u
WHERE (u."username" = $1 OR u."email" = $2)
LIMIT 1;`

export { getAllScheduledEvents, getAllScheduledEventShows, getAllTheaters, getAllMusics, getAllCinemas, getEventReviews, 
  getCinemaEventInfo, getMusicEventInfo, getTheaterEventInfo, getShowInfo, getModalInfo, getEventInReviewsInfo, getUserInfo,
   getUsersReviews, getUsersTickets, getEventAverageScore, deleteReview, cancelTicket, getEventShowWithEventAndVenueDetails, getDiscountFromType,
   signUpUser, findUserByUsernameOrEmail }