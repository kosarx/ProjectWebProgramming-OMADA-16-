
CREATE TABLE IF NOT EXISTS "USER" (
    "userID" SERIAL PRIMARY KEY,
    "username" VARCHAR(50),
    "password" VARCHAR(255),
    "salt" VARCHAR(255),
    "full_name" VARCHAR(100),
    "email" VARCHAR(255),
    "registration_date" DATE,
    "profile_imageURL" VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS "EVENT" (
    "eventID" SERIAL PRIMARY KEY,
    "title" VARCHAR(255),
    "description" TEXT,
    "imageURL" VARCHAR(255),
    "genre" VARCHAR(50),
    "duration" INTERVAL
);

CREATE TABLE IF NOT EXISTS "MUSIC" (
    "musicID" SERIAL PRIMARY KEY,
    "artists" VARCHAR(255),
    "opening_act" VARCHAR(255),
    FOREIGN KEY ("musicID") REFERENCES "EVENT" ("eventID")
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "CINEMA" (
    "cinemaID" SERIAL PRIMARY KEY,
    "movie_title" VARCHAR(255),
    "director" VARCHAR(100),
    "lead_roles" VARCHAR(255),
    "rating" VARCHAR(50),
    FOREIGN KEY ("cinemaID") REFERENCES "EVENT" ("eventID")
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "THEATER" (
    "theaterID" SERIAL PRIMARY KEY,
    "play_title" VARCHAR(255),
    "director" VARCHAR(100),
    "scriptwriter" VARCHAR(100),
    "lead_roles" VARCHAR(255),
    FOREIGN KEY ("theaterID") REFERENCES "EVENT" ("eventID")
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "EVENT_SHOW" (
    "showID" SERIAL PRIMARY KEY,
    "eventID" INTEGER,
    "show_date" DATE,
    "show_time" TIME,
    "status" VARCHAR(50),
    "venueID" INTEGER,
    FOREIGN KEY ("eventID") REFERENCES "EVENT" ("eventID")
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    FOREIGN KEY ("venueID") REFERENCES "VENUE" ("venueID")
        ON UPDATE CASCADE
        ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS "REVIEW" (
	"reviewID" SERIAL PRIMARY KEY,
	"score" INTEGER,
	"comment" TEXT,
	"userID" INTEGER,
	"date_written" TIMESTAMP,
	"eventID" INTEGER,
	FOREIGN KEY ("userID") REFERENCES "USER" ("userID")
            ON UPDATE CASCADE
            ON DELETE NO ACTION,
	FOREIGN KEY ("eventID") REFERENCES "EVENT" ("eventID")
            ON UPDATE CASCADE
            ON DELETE NO ACTION
);


CREATE TABLE IF NOT EXISTS "VENUE" (
    "venueID" SERIAL PRIMARY KEY,
    "venue_name" VARCHAR(100),
    "city" VARCHAR(50),
    "address" VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS "TICKET" (
    "ticketID" SERIAL PRIMARY KEY,
    "ticket_number" INTEGER,
    "status" VARCHAR(50),
    "categoryID" INTEGER,
    "userID" INTEGER,
    "date_booked" TIME,
    "discountID" INTEGER,
    "showID" INTEGER,
    FOREIGN KEY ("categoryID") REFERENCES "SEAT_CATEGORY"("categoryID")
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    FOREIGN KEY ("userID") REFERENCES "USER"("userID")
        ON UPDATE CASCADE
        ON DELETE NO ACTION,
    FOREIGN KEY ("discountID") REFERENCES "DISCOUNT_CATEGORY"("discountID")
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    FOREIGN KEY ("showID") REFERENCES "EVENT_SHOW"("showID")
        ON UPDATE CASCADE
        ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS "SEAT_CATEGORY" (
    "categoryID" SERIAL PRIMARY KEY,
    "category_name" VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS "DISCOUNT_CATEGORY" (
    "discountID" SERIAL PRIMARY KEY,
    "discount_type" VARCHAR(50),
    "discount_percentage" FLOAT
);

CREATE TABLE IF NOT EXISTS "Venue_HAS_Seat_Cat" (
    "venueID" INTEGER,
    "categoryID" INTEGER,
    "seat_num" INTEGER,
    PRIMARY KEY ("venueID", "categoryID"),
    FOREIGN KEY ("venueID") REFERENCES "VENUE" ("venueID")
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY ("categoryID") REFERENCES "SEAT_CATEGORY" ("categoryID")
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Sets_Price" (
    "showID" INTEGER,
    "categoryID" INTEGER,
    "seat_price" FLOAT,
    PRIMARY KEY ("showID", "categoryID"),
    FOREIGN KEY ("showID") REFERENCES "EVENT_SHOW" ("showID")
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY ("categoryID") REFERENCES "SEAT_CATEGORY" ("categoryID")
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

---- VIEWS ----
CREATE OR REPLACE VIEW "TICKET_Final_Price" AS
SELECT 
    T."ticketID",
    S.seat_price,
    D.discount_percentage,
    (S.seat_price * (1 - COALESCE(D.discount_percentage, 0) / 100)) AS final_price
FROM 
    "TICKET" T
JOIN 
    "Sets_Price" S ON T."showID" = S."showID" AND T."categoryID" = S."categoryID"
LEFT JOIN 
    "DISCOUNT_CATEGORY" D ON T."discountID" = D."discountID";

CREATE VIEW "VENUE_Total_Capacity" AS
SELECT 
    V."venueID",
    V.venue_name,
    SUM(VS.seat_num) AS total_capacity
FROM 
    "VENUE" V
JOIN 
    "Venue_HAS_Seat_Cat" VS ON V."venueID" = VS."venueID"
GROUP BY 
    V."venueID", V.venue_name, V.city, V.address
ORDER BY
	V."venueID";


CREATE VIEW "EVENT_SHOW_Remaining_Capacity" AS
SELECT 
    ES."showID",
    ES."venueID",
	VTC.total_capacity,
    VTC.total_capacity - COALESCE(SUM(CASE WHEN T.status = 'BOOKED' THEN 1 ELSE 0 END), 0) AS remaining_capacity
FROM 
    "EVENT_SHOW" ES
JOIN 
    "VENUE_Total_Capacity" VTC ON ES."venueID" = VTC."venueID"
LEFT JOIN 
    "TICKET" T ON ES."showID" = T."showID"
GROUP BY 
    ES."showID", ES."eventID", ES.show_date, ES.show_time, ES.status, ES."venueID", VTC.total_capacity;

CREATE VIEW "EVENT_Average_Review_Score" AS
SELECT 
    E."eventID",
    E.title,
    AVG(R.score) AS average_score
FROM 
    "EVENT" E
LEFT JOIN 
    "REVIEW" R ON E."eventID" = R."eventID"
GROUP BY 
    E."eventID", E.title
ORDER BY
	E."eventID";



