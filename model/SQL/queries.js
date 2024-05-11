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
      AND es.status != 'CANCELED'
)
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
      AND es.status != 'CANCELED'
)
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
      AND es.status != 'CANCELED'
)
GROUP BY c."cinemaID", e.title, e.description, e."imageURL", v.city
ORDER BY earliest_date, latest_date;
`

export { getAllEvents, getAllTheaters, getAllMusics, getAllCinemas }