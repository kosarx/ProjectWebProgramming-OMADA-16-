
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
    "showID" SERIAL,
    "eventID" INTEGER,
    "show_date" DATE,
    "show_time" TIME,
    "status" VARCHAR(50),
    "venueID" INTEGER,
    PRIMARY KEY ("showID", "eventID", "venueID"),
    FOREIGN KEY ("eventID") REFERENCES "EVENT" ("eventID")
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    FOREIGN KEY ("venueID") REFERENCES "VENUE" ("venueID")
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
    "seat_price" FLOAT,
    PRIMARY KEY ("venueID", "categoryID"),
    FOREIGN KEY ("venueID") REFERENCES "VENUE" ("venueID")
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY ("categoryID") REFERENCES "SEAT_CATEGORY" ("categoryID")
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

