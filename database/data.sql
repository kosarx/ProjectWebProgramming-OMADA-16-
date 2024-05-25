--
-- TOC entry 4916 (class 0 OID 17431)
-- Dependencies: 224
-- Data for Name: CINEMA; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."CINEMA" VALUES (1, 'The Matrix', 'The Wachowski Brothers', 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss', 'R – Restricted');
INSERT INTO public."CINEMA" VALUES (4, '12 Angry Men', 'Sidney Lumet', 'Henry Fonda, Lee J. Cobb, Martin Balsam', 'NR – Not Rated');
INSERT INTO public."CINEMA" VALUES (7, 'The Great Gatsby', 'Baz Luhrmann', 'Leonardo DiCaprio, Tobey Maguire, Carey Mulligan', 'PG-13');
INSERT INTO public."CINEMA" VALUES (10, 'The Godfather', 'Francis Ford Coppola', 'Marlon Brando, Al Pacino, James Caan', 'R – Restricted');
INSERT INTO public."CINEMA" VALUES (13, 'The Shawshank Redemption', 'Frank Darabont', 'Tim Robbins, Morgan Freeman, Bob Gunton', 'R – Restricted');


--
-- TOC entry 4926 (class 0 OID 17490)
-- Dependencies: 234
-- Data for Name: DISCOUNT_CATEGORY; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."DISCOUNT_CATEGORY" VALUES (1, 'Regular', 0);
INSERT INTO public."DISCOUNT_CATEGORY" VALUES (2, 'Student', 25);
INSERT INTO public."DISCOUNT_CATEGORY" VALUES (3, 'Senior (>65)', 25);
INSERT INTO public."DISCOUNT_CATEGORY" VALUES (4, 'Child (<12)', 50);


--
-- TOC entry 4910 (class 0 OID 17389)
-- Dependencies: 218
-- Data for Name: EVENT; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."EVENT" VALUES (1, 'The Matrix', 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.', '/images/events/the_matrix.jpg', 'Action', '02:30:00');
INSERT INTO public."EVENT" VALUES (2, 'Marx in Soho', 'Marx in Soho is a play on the life of Karl Marx, written by Howard Zinn. The play revolves around Marx''s return to Earth, where he confronts the consequences of his ideas.', '/images/events/marx_in_soho.jpg', 'Drama', '02:16:00');
INSERT INTO public."EVENT" VALUES (3, 'The Eras Tour', ' The Eras Tour is a concert tour by Taylor Swift. It began on March 17, 2023, in Arizona, USA, and is set to conclude on December 8, 2024, in Vancouver, Canada.', '/images/events/the_eras_tour.webp', 'Pop Country Folk', '02:30:00');
INSERT INTO public."EVENT" VALUES (4, '12 Angry Men', 'The jury in a New York City murder trial is frustrated by a single member whose skeptical caution forces them to more carefully consider the evidence before jumping to a hasty verdict.', '/images/events/12_angry_men.jpg', 'Drama', '01:36:00');
INSERT INTO public."EVENT" VALUES (5, 'Hamlet', 'Hamlet, prince of Denmark, returns home to learn that his father, the king, has died under mysterious circumstances. The ghost of his father appears to Hamlet, revealing that he was murdered by his brother, Claudius, who has since seized the throne and married Hamlet''s mother.', '/images/events/hamlet.jpg', 'Drama', '03:00:00');
INSERT INTO public."EVENT" VALUES (6, 'Coldplay: Music of the Spheres World Tour', 'Coldplay takes their latest album, Music of the Spheres, on a global tour filled with dazzling visuals, singalong anthems, and a focus on sustainability.', '/images/events/coldplay_music_of_the_spheres.jpeg', 'Rock', '02:30:00');
INSERT INTO public."EVENT" VALUES (7, 'The Great Gatsby', 'A Midwestern war veteran finds himself drawn to the past and lifestyle of his millionaire neighbor.', '/images/events/the_great_gatsby.jpg', 'Drama', '02:24:00');
INSERT INTO public."EVENT" VALUES (8, 'A Midsummer Night''s Dream', 'Shakespeare''s beloved comedy about four young Athenian lovers and a group of mischievous fairies who entangle them in a web of love and illusion.', '/images/events/a_midsummers_night_dream.webp', 'Comedy', '02:15:00');
INSERT INTO public."EVENT" VALUES (9, 'Carmen', 'Georges Bizet''s passionate opera tells the story of Carmen, a fiery gypsy woman who captivates the heart of Don José, a soldier. Their love is ultimately destructive, leading to tragic consequences.', '/images/events/carmen.jpg', 'Opera', '03:15:00');
INSERT INTO public."EVENT" VALUES (10, 'The Godfather', 'The Godfather is a 1972 American crime film directed by Francis Ford Coppola, who co-wrote the screenplay with Mario Puzo, based on Puzo''s 1969 novel of the same name.', '/images/events/the_godfather.jpg', 'Crime Drama', '02:55:00');
INSERT INTO public."EVENT" VALUES (11, 'Don Camillo', 'Don Camillo is a theatrical adaptation of the stories by Giovannino Guareschi. The play follows the humorous and heartwarming interactions between a Catholic priest and the upcoming leftist mayor in a small Italian village.', '/images/events/don_camillo.jpg', 'Comedy', '02:30:00');
INSERT INTO public."EVENT" VALUES (12, 'The Phantom of the Opera', 'Andrew Lloyd Webber''s iconic musical follows the story of a disfigured musical genius who haunts the Paris Opera House. When he falls in love with a young soprano, he devotes himself to nurturing her talent, but his obsession leads to tragedy.', '/images/events/phantom_of_the_opera.jpg', 'Musical', '02:30:00');
INSERT INTO public."EVENT" VALUES (13, 'The Shawshank Redemption', 'The Shawshank Redemption is a 1994 American drama film directed and written by Frank Darabont, based on the 1982 Stephen King novella of the same name.', '/images/events/the_shawshank_redemption.jpg', 'Drama', '02:00:00');
INSERT INTO public."EVENT" VALUES (14, 'Death of a Salesman', 'Arthur Miller''s Pulitzer Prize-winning drama tells the story of Willy Loman, a failing salesman who grapples with his fading relevance and shattered dreams.', '/images/events/death_of_a_salesman.jpg', 'Drama', '02:00:00');
INSERT INTO public."EVENT" VALUES (15, 'The Nutcracker', 'The Nutcracker is a two-act ballet, originally choreographed by Marius Petipa and Lev Ivanov with a score by Pyotr Ilyich Tchaikovsky. The ballet is based on the story ''The Nutcracker and the Mouse King'' by E. T. A. Hoffmann.', '/images/events/the_nutcracker.webp', 'Ballet', '02:15:00');


--
-- TOC entry 4922 (class 0 OID 17466)
-- Dependencies: 230
-- Data for Name: EVENT_SHOW; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."EVENT_SHOW" VALUES (1, 1, '2024-05-26', '16:30:00', 'SCHEDULED', 1);
INSERT INTO public."EVENT_SHOW" VALUES (2, 1, '2024-05-27', '19:15:00', 'CANCELED', 2);
INSERT INTO public."EVENT_SHOW" VALUES (3, 1, '2024-05-28', '11:30:00', 'CANCELED', 6);
INSERT INTO public."EVENT_SHOW" VALUES (4, 1, '2024-05-29', '19:00:00', 'SCHEDULED', 2);
INSERT INTO public."EVENT_SHOW" VALUES (5, 2, '2024-06-08', '19:30:00', 'CANCELED', 3);
INSERT INTO public."EVENT_SHOW" VALUES (6, 2, '2024-06-09', '19:30:00', 'CANCELED', 11);
INSERT INTO public."EVENT_SHOW" VALUES (7, 2, '2024-06-10', '16:15:00', 'CANCELED', 12);
INSERT INTO public."EVENT_SHOW" VALUES (8, 2, '2024-06-11', '12:30:00', 'SCHEDULED', 1);
INSERT INTO public."EVENT_SHOW" VALUES (9, 3, '2024-06-24', '21:15:00', 'SCHEDULED', 7);
INSERT INTO public."EVENT_SHOW" VALUES (10, 3, '2024-06-25', '13:30:00', 'SCHEDULED', 2);
INSERT INTO public."EVENT_SHOW" VALUES (11, 3, '2024-06-26', '21:15:00', 'SCHEDULED', 2);
INSERT INTO public."EVENT_SHOW" VALUES (12, 3, '2024-06-27', '10:15:00', 'SCHEDULED', 8);
INSERT INTO public."EVENT_SHOW" VALUES (13, 4, '2024-06-19', '12:00:00', 'SCHEDULED', 1);
INSERT INTO public."EVENT_SHOW" VALUES (14, 4, '2024-06-20', '19:30:00', 'SCHEDULED', 9);
INSERT INTO public."EVENT_SHOW" VALUES (15, 4, '2024-06-21', '15:00:00', 'SCHEDULED', 3);
INSERT INTO public."EVENT_SHOW" VALUES (16, 4, '2024-06-22', '18:45:00', 'SCHEDULED', 9);
INSERT INTO public."EVENT_SHOW" VALUES (17, 5, '2024-06-24', '22:00:00', 'CANCELED', 4);
INSERT INTO public."EVENT_SHOW" VALUES (18, 5, '2024-06-25', '15:15:00', 'SCHEDULED', 7);
INSERT INTO public."EVENT_SHOW" VALUES (19, 5, '2024-06-26', '18:15:00', 'SCHEDULED', 10);
INSERT INTO public."EVENT_SHOW" VALUES (20, 5, '2024-06-27', '21:30:00', 'CANCELED', 12);
INSERT INTO public."EVENT_SHOW" VALUES (21, 6, '2024-07-13', '20:00:00', 'CANCELED', 9);
INSERT INTO public."EVENT_SHOW" VALUES (22, 6, '2024-07-14', '13:45:00', 'CANCELED', 1);
INSERT INTO public."EVENT_SHOW" VALUES (23, 6, '2024-07-15', '17:00:00', 'SCHEDULED', 1);
INSERT INTO public."EVENT_SHOW" VALUES (24, 6, '2024-07-16', '20:30:00', 'SCHEDULED', 7);
INSERT INTO public."EVENT_SHOW" VALUES (25, 7, '2024-07-30', '15:45:00', 'SCHEDULED', 9);
INSERT INTO public."EVENT_SHOW" VALUES (26, 7, '2024-07-31', '14:45:00', 'SCHEDULED', 1);
INSERT INTO public."EVENT_SHOW" VALUES (27, 7, '2024-08-01', '17:15:00', 'SCHEDULED', 1);
INSERT INTO public."EVENT_SHOW" VALUES (28, 7, '2024-08-02', '11:30:00', 'SCHEDULED', 4);
INSERT INTO public."EVENT_SHOW" VALUES (29, 8, '2024-08-15', '15:45:00', 'SCHEDULED', 6);
INSERT INTO public."EVENT_SHOW" VALUES (30, 8, '2024-08-16', '20:30:00', 'SCHEDULED', 10);
INSERT INTO public."EVENT_SHOW" VALUES (31, 8, '2024-08-17', '19:30:00', 'CANCELED', 4);
INSERT INTO public."EVENT_SHOW" VALUES (32, 8, '2024-08-18', '16:45:00', 'CANCELED', 4);
INSERT INTO public."EVENT_SHOW" VALUES (33, 9, '2024-08-12', '20:15:00', 'CANCELED', 9);
INSERT INTO public."EVENT_SHOW" VALUES (34, 9, '2024-08-13', '19:45:00', 'SCHEDULED', 11);
INSERT INTO public."EVENT_SHOW" VALUES (35, 9, '2024-08-14', '10:30:00', 'SCHEDULED', 5);
INSERT INTO public."EVENT_SHOW" VALUES (36, 9, '2024-08-15', '20:15:00', 'SCHEDULED', 1);
INSERT INTO public."EVENT_SHOW" VALUES (37, 10, '2024-08-26', '10:15:00', 'SCHEDULED', 5);
INSERT INTO public."EVENT_SHOW" VALUES (38, 10, '2024-08-27', '19:00:00', 'SCHEDULED', 2);
INSERT INTO public."EVENT_SHOW" VALUES (39, 10, '2024-08-28', '21:00:00', 'CANCELED', 6);
INSERT INTO public."EVENT_SHOW" VALUES (40, 10, '2024-08-29', '17:45:00', 'SCHEDULED', 5);
INSERT INTO public."EVENT_SHOW" VALUES (41, 11, '2024-08-23', '12:00:00', 'CANCELED', 11);
INSERT INTO public."EVENT_SHOW" VALUES (42, 11, '2024-08-24', '16:00:00', 'CANCELED', 12);
INSERT INTO public."EVENT_SHOW" VALUES (43, 11, '2024-08-25', '10:45:00', 'SCHEDULED', 12);
INSERT INTO public."EVENT_SHOW" VALUES (44, 11, '2024-08-26', '18:45:00', 'SCHEDULED', 5);
INSERT INTO public."EVENT_SHOW" VALUES (45, 12, '2024-09-04', '18:00:00', 'SCHEDULED', 7);
INSERT INTO public."EVENT_SHOW" VALUES (46, 12, '2024-09-05', '21:00:00', 'CANCELED', 10);
INSERT INTO public."EVENT_SHOW" VALUES (47, 12, '2024-09-06', '14:00:00', 'CANCELED', 11);
INSERT INTO public."EVENT_SHOW" VALUES (48, 12, '2024-09-07', '17:00:00', 'CANCELED', 6);
INSERT INTO public."EVENT_SHOW" VALUES (49, 13, '2024-09-03', '18:30:00', 'SCHEDULED', 8);
INSERT INTO public."EVENT_SHOW" VALUES (50, 13, '2024-09-04', '18:30:00', 'CANCELED', 8);
INSERT INTO public."EVENT_SHOW" VALUES (51, 13, '2024-09-05', '18:30:00', 'SCHEDULED', 11);
INSERT INTO public."EVENT_SHOW" VALUES (52, 13, '2024-09-06', '10:00:00', 'CANCELED', 8);
INSERT INTO public."EVENT_SHOW" VALUES (53, 14, '2024-09-07', '21:00:00', 'CANCELED', 11);
INSERT INTO public."EVENT_SHOW" VALUES (54, 14, '2024-09-08', '20:00:00', 'CANCELED', 5);
INSERT INTO public."EVENT_SHOW" VALUES (55, 14, '2024-09-09', '13:00:00', 'CANCELED', 6);
INSERT INTO public."EVENT_SHOW" VALUES (56, 14, '2024-09-10', '20:30:00', 'CANCELED', 9);
INSERT INTO public."EVENT_SHOW" VALUES (57, 15, '2024-09-03', '20:15:00', 'SCHEDULED', 6);
INSERT INTO public."EVENT_SHOW" VALUES (58, 15, '2024-09-04', '22:45:00', 'SCHEDULED', 7);
INSERT INTO public."EVENT_SHOW" VALUES (59, 15, '2024-09-05', '20:15:00', 'CANCELED', 7);
INSERT INTO public."EVENT_SHOW" VALUES (60, 15, '2024-09-06', '16:00:00', 'CANCELED', 9);


--
-- TOC entry 4914 (class 0 OID 17417)
-- Dependencies: 222
-- Data for Name: MUSIC; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."MUSIC" VALUES (3, 'Taylor Swift', 'Paramore');
INSERT INTO public."MUSIC" VALUES (6, 'Chris Martin, Johnny Buckland, Guy Berryman, Will Champion', 'PinkPantheress, Emmanuel Kelly');
INSERT INTO public."MUSIC" VALUES (9, 'Antonello Manacorda, Grisha Martirosyan, Liana Aleksanyan, Piotr Beczala, Blaise Malaba, Aigul Akhmetshina', NULL);
INSERT INTO public."MUSIC" VALUES (12, 'Jon Robyns, Lily Kerhoas, Joe Griffiths-Brown', NULL);
INSERT INTO public."MUSIC" VALUES (15, 'Peter Wright, Roland John Wiley, Alexander Agadzhanov, Darcey Bussell', NULL);


--
-- TOC entry 4912 (class 0 OID 17398)
-- Dependencies: 220
-- Data for Name: REVIEW; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."REVIEW" VALUES (1, 2, 'A truly outstanding experience! Everything from the lighting to the costumes to the acting was top-notch. I would highly recommend it to anyone looking for a memorable night out.', 1, '2024-04-26 00:00:00', 4);
INSERT INTO public."REVIEW" VALUES (2, 1, 'Great experience!', 8, '2024-04-08 00:00:00', 10);
INSERT INTO public."REVIEW" VALUES (3, 2, 'The show was fantastic, with stunning visuals and amazing performances by all the actors. The storyline kept me on the edge of my seat throughout, and I can''t wait to see it again!', 3, '2024-04-28 00:00:00', 9);
INSERT INTO public."REVIEW" VALUES (4, 4, 'Could be better.', 2, '2024-04-16 00:00:00', 4);
INSERT INTO public."REVIEW" VALUES (5, 1, 'Best show I''ve seen!', 8, '2024-04-25 00:00:00', 12);
INSERT INTO public."REVIEW" VALUES (6, 2, 'The performance was average, and the plot was somewhat confusing. Some of the actors delivered great performances, but others seemed uninterested. The set design, however, was quite impressive.', 1, '2024-04-09 00:00:00', 10);
INSERT INTO public."REVIEW" VALUES (7, 1, 'Amazing performance!', 10, '2024-04-20 00:00:00', 3);
INSERT INTO public."REVIEW" VALUES (8, 5, 'Average experience.', 3, '2024-04-26 00:00:00', 2);
INSERT INTO public."REVIEW" VALUES (9, 1, 'Absolutely terrible.', 10, '2024-04-07 00:00:00', 5);
INSERT INTO public."REVIEW" VALUES (10, 1, 'Wouldn''t recommend.', 2, '2024-04-14 00:00:00', 1);
INSERT INTO public."REVIEW" VALUES (11, 4, 'Average experience.', 1, '2024-04-20 00:00:00', 15);
INSERT INTO public."REVIEW" VALUES (12, 5, 'Average experience.', 4, '2024-04-29 00:00:00', 8);
INSERT INTO public."REVIEW" VALUES (13, 2, 'The performance was average, and the plot was somewhat confusing. Some of the actors delivered great performances, but others seemed uninterested. The set design, however, was quite impressive.', 8, '2024-04-23 00:00:00', 4);
INSERT INTO public."REVIEW" VALUES (14, 4, 'Average experience.', 1, '2024-04-13 00:00:00', 4);
INSERT INTO public."REVIEW" VALUES (15, 1, 'The show was fantastic, with stunning visuals and amazing performances by all the actors. The storyline kept me on the edge of my seat throughout, and I can''t wait to see it again!', 4, '2024-04-24 00:00:00', 15);
INSERT INTO public."REVIEW" VALUES (16, 1, 'The performance was average, and the plot was somewhat confusing. Some of the actors delivered great performances, but others seemed uninterested. The set design, however, was quite impressive.', 9, '2024-05-07 00:00:00', 7);
INSERT INTO public."REVIEW" VALUES (17, 5, 'Could be better.', 8, '2024-04-09 00:00:00', 3);
INSERT INTO public."REVIEW" VALUES (18, 5, 'Not what I expected.', 6, '2024-05-03 00:00:00', 6);
INSERT INTO public."REVIEW" VALUES (19, 3, 'Amazing performance!', 10, '2024-04-11 00:00:00', 1);
INSERT INTO public."REVIEW" VALUES (20, 1, 'Amazing performance!', 9, '2024-05-02 00:00:00', 5);
INSERT INTO public."REVIEW" VALUES (21, 1, 'Amazing performance!', 6, '2024-04-16 00:00:00', 14);
INSERT INTO public."REVIEW" VALUES (22, 2, 'A truly outstanding experience! Everything from the lighting to the costumes to the acting was top-notch. I would highly recommend it to anyone looking for a memorable night out.', 7, '2024-05-06 00:00:00', 15);
INSERT INTO public."REVIEW" VALUES (23, 2, 'The show was too loud and felt a bit chaotic at times. While there were a few standout moments, overall, it didn''t meet my expectations. It could be improved with better pacing and clearer narrative structure.', 6, '2024-04-23 00:00:00', 10);
INSERT INTO public."REVIEW" VALUES (24, 4, 'The show was fantastic, with stunning visuals and amazing performances by all the actors. The storyline kept me on the edge of my seat throughout, and I can''t wait to see it again!', 5, '2024-04-16 00:00:00', 4);
INSERT INTO public."REVIEW" VALUES (25, 2, 'Wouldn''t recommend.', 4, '2024-05-06 00:00:00', 5);
INSERT INTO public."REVIEW" VALUES (26, 5, 'A truly outstanding experience! Everything from the lighting to the costumes to the acting was top-notch. I would highly recommend it to anyone looking for a memorable night out.', 10, '2024-04-16 00:00:00', 5);
INSERT INTO public."REVIEW" VALUES (27, 3, 'The show was too loud and felt a bit chaotic at times. While there were a few standout moments, overall, it didn''t meet my expectations. It could be improved with better pacing and clearer narrative structure.', 1, '2024-04-11 00:00:00', 12);
INSERT INTO public."REVIEW" VALUES (28, 3, 'The show was too loud and felt a bit chaotic at times. While there were a few standout moments, overall, it didn''t meet my expectations. It could be improved with better pacing and clearer narrative structure.', 2, '2024-04-22 00:00:00', 7);
INSERT INTO public."REVIEW" VALUES (29, 1, 'Amazing performance!', 10, '2024-04-21 00:00:00', 9);
INSERT INTO public."REVIEW" VALUES (30, 2, 'Absolutely terrible.', 9, '2024-04-20 00:00:00', 5);
INSERT INTO public."REVIEW" VALUES (31, 2, 'Amazing performance!', 7, '2024-05-01 00:00:00', 5);
INSERT INTO public."REVIEW" VALUES (32, 5, 'Could be better.', 4, '2024-04-21 00:00:00', 14);
INSERT INTO public."REVIEW" VALUES (33, 1, 'Could be better.', 3, '2024-05-03 00:00:00', 1);
INSERT INTO public."REVIEW" VALUES (34, 3, 'The performance was average, and the plot was somewhat confusing. Some of the actors delivered great performances, but others seemed uninterested. The set design, however, was quite impressive.', 3, '2024-05-06 00:00:00', 14);
INSERT INTO public."REVIEW" VALUES (35, 5, 'Amazing performance!', 2, '2024-04-19 00:00:00', 11);
INSERT INTO public."REVIEW" VALUES (36, 4, 'The show was too loud and felt a bit chaotic at times. While there were a few standout moments, overall, it didn''t meet my expectations. It could be improved with better pacing and clearer narrative structure.', 7, '2024-04-10 00:00:00', 3);
INSERT INTO public."REVIEW" VALUES (37, 3, 'Not what I expected.', 10, '2024-04-13 00:00:00', 7);
INSERT INTO public."REVIEW" VALUES (38, 4, 'Absolutely terrible.', 4, '2024-04-07 00:00:00', 12);
INSERT INTO public."REVIEW" VALUES (39, 5, 'A truly outstanding experience! Everything from the lighting to the costumes to the acting was top-notch. I would highly recommend it to anyone looking for a memorable night out.', 1, '2024-04-29 00:00:00', 14);
INSERT INTO public."REVIEW" VALUES (40, 5, 'The performance was average, and the plot was somewhat confusing. Some of the actors delivered great performances, but others seemed uninterested. The set design, however, was quite impressive.', 5, '2024-04-12 00:00:00', 13);
INSERT INTO public."REVIEW" VALUES (41, 1, 'Not what I expected.', 5, '2024-04-29 00:00:00', 14);
INSERT INTO public."REVIEW" VALUES (42, 3, 'The show was too loud and felt a bit chaotic at times. While there were a few standout moments, overall, it didn''t meet my expectations. It could be improved with better pacing and clearer narrative structure.', 4, '2024-04-07 00:00:00', 1);
INSERT INTO public."REVIEW" VALUES (43, 4, 'Best show I''ve seen!', 9, '2024-04-07 00:00:00', 1);
INSERT INTO public."REVIEW" VALUES (44, 5, 'Could be better.', 7, '2024-04-07 00:00:00', 12);
INSERT INTO public."REVIEW" VALUES (45, 2, 'The show was fantastic, with stunning visuals and amazing performances by all the actors. The storyline kept me on the edge of my seat throughout, and I can''t wait to see it again!', 3, '2024-05-03 00:00:00', 6);
INSERT INTO public."REVIEW" VALUES (46, 1, 'A truly outstanding experience! Everything from the lighting to the costumes to the acting was top-notch. I would highly recommend it to anyone looking for a memorable night out.', 2, '2024-04-11 00:00:00', 10);
INSERT INTO public."REVIEW" VALUES (47, 2, 'The show was fantastic, with stunning visuals and amazing performances by all the actors. The storyline kept me on the edge of my seat throughout, and I can''t wait to see it again!', 3, '2024-04-16 00:00:00', 13);
INSERT INTO public."REVIEW" VALUES (48, 3, 'Great experience!', 4, '2024-04-10 00:00:00', 13);
INSERT INTO public."REVIEW" VALUES (49, 4, 'Not what I expected.', 3, '2024-04-22 00:00:00', 14);
INSERT INTO public."REVIEW" VALUES (50, 5, 'Great experience!', 9, '2024-04-20 00:00:00', 9);


--
-- TOC entry 4924 (class 0 OID 17483)
-- Dependencies: 232
-- Data for Name: SEAT_CATEGORY; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."SEAT_CATEGORY" VALUES (1, 'Standard Seating');
INSERT INTO public."SEAT_CATEGORY" VALUES (2, 'VIP Seating');
INSERT INTO public."SEAT_CATEGORY" VALUES (3, 'Love Seats');
INSERT INTO public."SEAT_CATEGORY" VALUES (4, 'General Admission (GA)');
INSERT INTO public."SEAT_CATEGORY" VALUES (5, 'Seated Admission');
INSERT INTO public."SEAT_CATEGORY" VALUES (6, 'Box Seats');
INSERT INTO public."SEAT_CATEGORY" VALUES (7, 'Pit Seating');
INSERT INTO public."SEAT_CATEGORY" VALUES (8, 'Orchestra');
INSERT INTO public."SEAT_CATEGORY" VALUES (9, 'Mezzanine');
INSERT INTO public."SEAT_CATEGORY" VALUES (10, 'Balcony');


--
-- TOC entry 4930 (class 0 OID 17538)
-- Dependencies: 238
-- Data for Name: Sets_Price; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Sets_Price" VALUES (1, 1, 38);
INSERT INTO public."Sets_Price" VALUES (1, 2, 108);
INSERT INTO public."Sets_Price" VALUES (1, 9, 55);
INSERT INTO public."Sets_Price" VALUES (2, 1, 29);
INSERT INTO public."Sets_Price" VALUES (2, 2, 110);
INSERT INTO public."Sets_Price" VALUES (2, 9, 67);
INSERT INTO public."Sets_Price" VALUES (3, 1, 33);
INSERT INTO public."Sets_Price" VALUES (3, 2, 100);
INSERT INTO public."Sets_Price" VALUES (3, 10, 48);
INSERT INTO public."Sets_Price" VALUES (4, 1, 27);
INSERT INTO public."Sets_Price" VALUES (5, 2, 103);
INSERT INTO public."Sets_Price" VALUES (5, 8, 99);
INSERT INTO public."Sets_Price" VALUES (5, 9, 60);
INSERT INTO public."Sets_Price" VALUES (5, 10, 40);
INSERT INTO public."Sets_Price" VALUES (6, 1, 32);
INSERT INTO public."Sets_Price" VALUES (6, 2, 110);
INSERT INTO public."Sets_Price" VALUES (6, 3, 74);
INSERT INTO public."Sets_Price" VALUES (7, 1, 27);
INSERT INTO public."Sets_Price" VALUES (8, 6, 124);
INSERT INTO public."Sets_Price" VALUES (8, 8, 90);
INSERT INTO public."Sets_Price" VALUES (8, 10, 41);
INSERT INTO public."Sets_Price" VALUES (9, 2, 103);
INSERT INTO public."Sets_Price" VALUES (9, 6, 120);
INSERT INTO public."Sets_Price" VALUES (9, 8, 98);
INSERT INTO public."Sets_Price" VALUES (9, 9, 60);
INSERT INTO public."Sets_Price" VALUES (9, 10, 39);
INSERT INTO public."Sets_Price" VALUES (10, 1, 30);
INSERT INTO public."Sets_Price" VALUES (10, 2, 109);
INSERT INTO public."Sets_Price" VALUES (10, 10, 49);
INSERT INTO public."Sets_Price" VALUES (11, 8, 92);
INSERT INTO public."Sets_Price" VALUES (11, 10, 49);
INSERT INTO public."Sets_Price" VALUES (12, 1, 29);
INSERT INTO public."Sets_Price" VALUES (12, 2, 108);
INSERT INTO public."Sets_Price" VALUES (12, 10, 50);
INSERT INTO public."Sets_Price" VALUES (13, 2, 105);
INSERT INTO public."Sets_Price" VALUES (13, 8, 86);
INSERT INTO public."Sets_Price" VALUES (13, 9, 69);
INSERT INTO public."Sets_Price" VALUES (13, 10, 49);
INSERT INTO public."Sets_Price" VALUES (14, 1, 32);
INSERT INTO public."Sets_Price" VALUES (14, 2, 109);
INSERT INTO public."Sets_Price" VALUES (14, 3, 73);
INSERT INTO public."Sets_Price" VALUES (15, 2, 101);
INSERT INTO public."Sets_Price" VALUES (15, 6, 128);
INSERT INTO public."Sets_Price" VALUES (15, 8, 100);
INSERT INTO public."Sets_Price" VALUES (15, 9, 57);
INSERT INTO public."Sets_Price" VALUES (15, 10, 41);
INSERT INTO public."Sets_Price" VALUES (16, 2, 99);
INSERT INTO public."Sets_Price" VALUES (16, 6, 127);
INSERT INTO public."Sets_Price" VALUES (16, 8, 93);
INSERT INTO public."Sets_Price" VALUES (16, 10, 36);
INSERT INTO public."Sets_Price" VALUES (17, 2, 105);
INSERT INTO public."Sets_Price" VALUES (17, 8, 88);
INSERT INTO public."Sets_Price" VALUES (17, 9, 63);
INSERT INTO public."Sets_Price" VALUES (17, 10, 46);
INSERT INTO public."Sets_Price" VALUES (18, 1, 38);
INSERT INTO public."Sets_Price" VALUES (18, 2, 98);
INSERT INTO public."Sets_Price" VALUES (18, 3, 85);
INSERT INTO public."Sets_Price" VALUES (19, 1, 37);
INSERT INTO public."Sets_Price" VALUES (19, 2, 103);
INSERT INTO public."Sets_Price" VALUES (19, 10, 38);
INSERT INTO public."Sets_Price" VALUES (20, 8, 93);
INSERT INTO public."Sets_Price" VALUES (20, 10, 47);
INSERT INTO public."Sets_Price" VALUES (21, 2, 108);
INSERT INTO public."Sets_Price" VALUES (21, 6, 123);
INSERT INTO public."Sets_Price" VALUES (21, 8, 95);
INSERT INTO public."Sets_Price" VALUES (21, 9, 59);
INSERT INTO public."Sets_Price" VALUES (21, 10, 45);
INSERT INTO public."Sets_Price" VALUES (22, 8, 93);
INSERT INTO public."Sets_Price" VALUES (22, 10, 43);
INSERT INTO public."Sets_Price" VALUES (23, 8, 89);
INSERT INTO public."Sets_Price" VALUES (23, 10, 41);
INSERT INTO public."Sets_Price" VALUES (24, 2, 97);
INSERT INTO public."Sets_Price" VALUES (24, 6, 127);
INSERT INTO public."Sets_Price" VALUES (24, 8, 96);
INSERT INTO public."Sets_Price" VALUES (24, 10, 40);
INSERT INTO public."Sets_Price" VALUES (25, 1, 27);
INSERT INTO public."Sets_Price" VALUES (25, 2, 95);
INSERT INTO public."Sets_Price" VALUES (25, 10, 41);
INSERT INTO public."Sets_Price" VALUES (26, 2, 101);
INSERT INTO public."Sets_Price" VALUES (26, 6, 122);
INSERT INTO public."Sets_Price" VALUES (26, 8, 92);
INSERT INTO public."Sets_Price" VALUES (26, 9, 69);
INSERT INTO public."Sets_Price" VALUES (26, 10, 41);
INSERT INTO public."Sets_Price" VALUES (27, 8, 86);
INSERT INTO public."Sets_Price" VALUES (27, 10, 45);
INSERT INTO public."Sets_Price" VALUES (28, 1, 32);
INSERT INTO public."Sets_Price" VALUES (28, 2, 106);
INSERT INTO public."Sets_Price" VALUES (28, 9, 61);
INSERT INTO public."Sets_Price" VALUES (29, 2, 95);
INSERT INTO public."Sets_Price" VALUES (29, 6, 125);
INSERT INTO public."Sets_Price" VALUES (29, 8, 90);
INSERT INTO public."Sets_Price" VALUES (29, 9, 67);
INSERT INTO public."Sets_Price" VALUES (29, 10, 43);
INSERT INTO public."Sets_Price" VALUES (30, 1, 31);
INSERT INTO public."Sets_Price" VALUES (30, 2, 104);
INSERT INTO public."Sets_Price" VALUES (30, 10, 49);
INSERT INTO public."Sets_Price" VALUES (31, 1, 28);
INSERT INTO public."Sets_Price" VALUES (31, 2, 101);
INSERT INTO public."Sets_Price" VALUES (31, 3, 80);
INSERT INTO public."Sets_Price" VALUES (32, 2, 106);
INSERT INTO public."Sets_Price" VALUES (32, 4, 25);
INSERT INTO public."Sets_Price" VALUES (32, 5, 40);
INSERT INTO public."Sets_Price" VALUES (32, 6, 121);
INSERT INTO public."Sets_Price" VALUES (33, 2, 108);
INSERT INTO public."Sets_Price" VALUES (33, 6, 118);
INSERT INTO public."Sets_Price" VALUES (33, 8, 85);
INSERT INTO public."Sets_Price" VALUES (33, 10, 48);
INSERT INTO public."Sets_Price" VALUES (34, 2, 95);
INSERT INTO public."Sets_Price" VALUES (34, 4, 33);
INSERT INTO public."Sets_Price" VALUES (34, 5, 30);
INSERT INTO public."Sets_Price" VALUES (34, 6, 128);
INSERT INTO public."Sets_Price" VALUES (35, 1, 34);
INSERT INTO public."Sets_Price" VALUES (35, 2, 105);
INSERT INTO public."Sets_Price" VALUES (35, 9, 69);
INSERT INTO public."Sets_Price" VALUES (36, 2, 103);
INSERT INTO public."Sets_Price" VALUES (36, 4, 22);
INSERT INTO public."Sets_Price" VALUES (36, 5, 42);
INSERT INTO public."Sets_Price" VALUES (36, 6, 125);
INSERT INTO public."Sets_Price" VALUES (37, 1, 40);
INSERT INTO public."Sets_Price" VALUES (37, 2, 97);
INSERT INTO public."Sets_Price" VALUES (37, 3, 79);
INSERT INTO public."Sets_Price" VALUES (38, 1, 40);
INSERT INTO public."Sets_Price" VALUES (38, 2, 95);
INSERT INTO public."Sets_Price" VALUES (38, 10, 48);
INSERT INTO public."Sets_Price" VALUES (39, 1, 32);
INSERT INTO public."Sets_Price" VALUES (39, 2, 104);
INSERT INTO public."Sets_Price" VALUES (39, 9, 69);
INSERT INTO public."Sets_Price" VALUES (40, 2, 101);
INSERT INTO public."Sets_Price" VALUES (40, 6, 115);
INSERT INTO public."Sets_Price" VALUES (40, 8, 88);
INSERT INTO public."Sets_Price" VALUES (40, 10, 43);
INSERT INTO public."Sets_Price" VALUES (41, 6, 120);
INSERT INTO public."Sets_Price" VALUES (41, 8, 96);
INSERT INTO public."Sets_Price" VALUES (41, 10, 37);
INSERT INTO public."Sets_Price" VALUES (42, 1, 27);
INSERT INTO public."Sets_Price" VALUES (42, 2, 103);
INSERT INTO public."Sets_Price" VALUES (42, 3, 84);
INSERT INTO public."Sets_Price" VALUES (43, 1, 35);
INSERT INTO public."Sets_Price" VALUES (43, 2, 107);
INSERT INTO public."Sets_Price" VALUES (43, 3, 80);
INSERT INTO public."Sets_Price" VALUES (44, 2, 105);
INSERT INTO public."Sets_Price" VALUES (44, 6, 121);
INSERT INTO public."Sets_Price" VALUES (44, 8, 87);
INSERT INTO public."Sets_Price" VALUES (44, 9, 59);
INSERT INTO public."Sets_Price" VALUES (44, 10, 38);
INSERT INTO public."Sets_Price" VALUES (45, 1, 30);
INSERT INTO public."Sets_Price" VALUES (46, 2, 106);
INSERT INTO public."Sets_Price" VALUES (46, 6, 123);
INSERT INTO public."Sets_Price" VALUES (46, 8, 87);
INSERT INTO public."Sets_Price" VALUES (46, 9, 60);
INSERT INTO public."Sets_Price" VALUES (46, 10, 37);
INSERT INTO public."Sets_Price" VALUES (47, 2, 97);
INSERT INTO public."Sets_Price" VALUES (47, 6, 116);
INSERT INTO public."Sets_Price" VALUES (47, 8, 90);
INSERT INTO public."Sets_Price" VALUES (47, 9, 66);
INSERT INTO public."Sets_Price" VALUES (47, 10, 39);
INSERT INTO public."Sets_Price" VALUES (48, 8, 93);
INSERT INTO public."Sets_Price" VALUES (48, 10, 50);
INSERT INTO public."Sets_Price" VALUES (49, 8, 91);
INSERT INTO public."Sets_Price" VALUES (49, 10, 49);
INSERT INTO public."Sets_Price" VALUES (50, 2, 100);
INSERT INTO public."Sets_Price" VALUES (50, 4, 25);
INSERT INTO public."Sets_Price" VALUES (50, 5, 37);
INSERT INTO public."Sets_Price" VALUES (50, 6, 118);
INSERT INTO public."Sets_Price" VALUES (51, 2, 100);
INSERT INTO public."Sets_Price" VALUES (51, 6, 125);
INSERT INTO public."Sets_Price" VALUES (51, 8, 90);
INSERT INTO public."Sets_Price" VALUES (51, 10, 39);
INSERT INTO public."Sets_Price" VALUES (52, 1, 30);
INSERT INTO public."Sets_Price" VALUES (52, 2, 105);
INSERT INTO public."Sets_Price" VALUES (52, 3, 71);
INSERT INTO public."Sets_Price" VALUES (53, 6, 115);
INSERT INTO public."Sets_Price" VALUES (53, 8, 96);
INSERT INTO public."Sets_Price" VALUES (53, 10, 40);
INSERT INTO public."Sets_Price" VALUES (54, 1, 34);
INSERT INTO public."Sets_Price" VALUES (54, 2, 97);
INSERT INTO public."Sets_Price" VALUES (54, 10, 44);
INSERT INTO public."Sets_Price" VALUES (55, 8, 97);
INSERT INTO public."Sets_Price" VALUES (55, 10, 48);
INSERT INTO public."Sets_Price" VALUES (56, 1, 33);
INSERT INTO public."Sets_Price" VALUES (56, 2, 102);
INSERT INTO public."Sets_Price" VALUES (56, 9, 69);
INSERT INTO public."Sets_Price" VALUES (57, 1, 37);
INSERT INTO public."Sets_Price" VALUES (58, 2, 107);
INSERT INTO public."Sets_Price" VALUES (58, 8, 95);
INSERT INTO public."Sets_Price" VALUES (58, 9, 68);
INSERT INTO public."Sets_Price" VALUES (58, 10, 39);
INSERT INTO public."Sets_Price" VALUES (59, 1, 39);
INSERT INTO public."Sets_Price" VALUES (59, 2, 101);
INSERT INTO public."Sets_Price" VALUES (59, 10, 47);
INSERT INTO public."Sets_Price" VALUES (60, 6, 115);
INSERT INTO public."Sets_Price" VALUES (60, 8, 92);
INSERT INTO public."Sets_Price" VALUES (60, 10, 37);


--
-- TOC entry 4918 (class 0 OID 17445)
-- Dependencies: 226
-- Data for Name: THEATER; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."THEATER" VALUES (2, 'Marx in Soho', 'John Doyle', 'Howard Zinn', 'Bob Weick');
INSERT INTO public."THEATER" VALUES (5, 'Hamlet', 'Robert Icke', 'William Shakespeare', 'Andrew Scott,Barry Aird, Elliot Barnes-Worrell, Jessica Brown Findlay, Marty Cruickshank');
INSERT INTO public."THEATER" VALUES (8, 'A Midsummer Night''s Dream', 'Nicholas Hytner', 'William Shakespeare', 'Oliver Chris, Gwendoline Christie, David Moorst');
INSERT INTO public."THEATER" VALUES (11, 'Don Camillo', 'Manikas P.', 'Sotiris Patatzis', 'G. Mataragkas, P. Xekoukis, St. Tzelepis, El. Filini');
INSERT INTO public."THEATER" VALUES (14, 'Death of a Salesman', 'Miranda Cromwell', 'Arthur Miller', 'Wendell Pierce, Sharon D. Clarke');


--
-- TOC entry 4928 (class 0 OID 17497)
-- Dependencies: 236
-- Data for Name: TICKET; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."TICKET" VALUES (1, 5485938, 'BOOKED', 1, 8, '13:12:15', 2, 1);
INSERT INTO public."TICKET" VALUES (2, 6109002, 'BOOKED', 9, 7, '11:05:15', 3, 1);
INSERT INTO public."TICKET" VALUES (3, 4237964, 'BOOKED', 1, 10, '23:11:54', 2, 1);
INSERT INTO public."TICKET" VALUES (4, 1196067, 'CANCELED', 1, 10, '04:43:53', 3, 1);
INSERT INTO public."TICKET" VALUES (5, 9444348, 'CANCELED', 2, 3, '14:46:18', 2, 1);
INSERT INTO public."TICKET" VALUES (6, 3528132, 'CANCELED', 2, 1, '13:52:12', 4, 1);
INSERT INTO public."TICKET" VALUES (7, 5469229, 'CANCELED', 2, 3, '15:30:05', 4, 1);
INSERT INTO public."TICKET" VALUES (8, 4362845, 'BOOKED', 9, 8, '01:16:50', 4, 1);
INSERT INTO public."TICKET" VALUES (9, 1296394, 'CANCELED', 1, 8, '20:58:03', 1, 1);
INSERT INTO public."TICKET" VALUES (10, 3999201, 'CANCELED', 1, 7, '09:54:26', 4, 1);
INSERT INTO public."TICKET" VALUES (11, 9230677, 'CANCELED', 9, 6, '09:39:20', 4, 2);
INSERT INTO public."TICKET" VALUES (12, 6832217, 'BOOKED', 10, 3, '07:53:25', 2, 3);
INSERT INTO public."TICKET" VALUES (13, 9225164, 'CANCELED', 2, 3, '19:32:46', 2, 3);
INSERT INTO public."TICKET" VALUES (14, 9215259, 'CANCELED', 2, 4, '07:23:08', 3, 3);
INSERT INTO public."TICKET" VALUES (15, 8184215, 'CANCELED', 2, 9, '13:58:30', 4, 3);
INSERT INTO public."TICKET" VALUES (16, 8994192, 'CANCELED', 2, 8, '17:37:34', 3, 3);
INSERT INTO public."TICKET" VALUES (17, 6505665, 'BOOKED', 1, 4, '06:12:26', 1, 4);
INSERT INTO public."TICKET" VALUES (18, 9051045, 'BOOKED', 1, 6, '07:50:48', 1, 4);
INSERT INTO public."TICKET" VALUES (19, 3299717, 'CANCELED', 9, 4, '15:35:21', 3, 5);
INSERT INTO public."TICKET" VALUES (20, 9093770, 'BOOKED', 8, 3, '09:39:07', 4, 5);
INSERT INTO public."TICKET" VALUES (21, 5028657, 'BOOKED', 8, 7, '05:23:27', 2, 5);
INSERT INTO public."TICKET" VALUES (22, 3836424, 'CANCELED', 9, 7, '00:50:48', 4, 5);
INSERT INTO public."TICKET" VALUES (23, 4705549, 'BOOKED', 8, 5, '23:30:02', 2, 5);
INSERT INTO public."TICKET" VALUES (24, 9268198, 'BOOKED', 9, 9, '06:42:32', 3, 5);
INSERT INTO public."TICKET" VALUES (25, 4314080, 'CANCELED', 10, 7, '20:02:59', 2, 5);
INSERT INTO public."TICKET" VALUES (26, 9708905, 'CANCELED', 9, 7, '20:09:16', 2, 5);
INSERT INTO public."TICKET" VALUES (27, 9797393, 'CANCELED', 2, 9, '12:44:49', 2, 6);
INSERT INTO public."TICKET" VALUES (28, 3894667, 'CANCELED', 3, 7, '00:31:14', 4, 6);
INSERT INTO public."TICKET" VALUES (29, 7488828, 'BOOKED', 1, 2, '04:00:43', 1, 6);
INSERT INTO public."TICKET" VALUES (30, 7448143, 'BOOKED', 2, 8, '22:36:34', 3, 6);
INSERT INTO public."TICKET" VALUES (31, 6367715, 'BOOKED', 1, 3, '13:04:04', 1, 6);
INSERT INTO public."TICKET" VALUES (32, 2277806, 'BOOKED', 1, 9, '09:56:04', 4, 7);
INSERT INTO public."TICKET" VALUES (33, 2883835, 'BOOKED', 1, 6, '18:49:07', 1, 7);
INSERT INTO public."TICKET" VALUES (34, 1610569, 'BOOKED', 1, 3, '19:32:24', 4, 7);
INSERT INTO public."TICKET" VALUES (35, 4423940, 'BOOKED', 1, 2, '22:09:30', 4, 7);
INSERT INTO public."TICKET" VALUES (36, 6678214, 'BOOKED', 8, 7, '19:33:33', 4, 8);
INSERT INTO public."TICKET" VALUES (37, 2009415, 'BOOKED', 6, 5, '23:21:48', 3, 8);
INSERT INTO public."TICKET" VALUES (38, 6240676, 'BOOKED', 10, 4, '09:40:35', 2, 8);
INSERT INTO public."TICKET" VALUES (39, 4243549, 'BOOKED', 8, 4, '16:48:37', 2, 8);
INSERT INTO public."TICKET" VALUES (40, 8581489, 'BOOKED', 2, 6, '07:22:13', 3, 9);
INSERT INTO public."TICKET" VALUES (41, 2391048, 'BOOKED', 9, 10, '19:45:13', 2, 9);
INSERT INTO public."TICKET" VALUES (42, 6280060, 'CANCELED', 6, 9, '08:07:38', 4, 9);
INSERT INTO public."TICKET" VALUES (43, 3898521, 'BOOKED', 2, 10, '13:06:11', 3, 9);
INSERT INTO public."TICKET" VALUES (44, 3835458, 'CANCELED', 10, 6, '15:27:04', 1, 9);
INSERT INTO public."TICKET" VALUES (45, 3357497, 'BOOKED', 10, 6, '22:39:42', 2, 10);
INSERT INTO public."TICKET" VALUES (46, 1700185, 'CANCELED', 2, 7, '04:20:29', 3, 10);
INSERT INTO public."TICKET" VALUES (47, 3462312, 'CANCELED', 10, 7, '22:54:45', 4, 10);
INSERT INTO public."TICKET" VALUES (48, 5029252, 'CANCELED', 1, 6, '20:26:18', 4, 10);
INSERT INTO public."TICKET" VALUES (49, 4394305, 'BOOKED', 2, 10, '14:18:58', 3, 10);
INSERT INTO public."TICKET" VALUES (50, 6075993, 'BOOKED', 10, 10, '15:05:49', 2, 11);
INSERT INTO public."TICKET" VALUES (51, 1544367, 'BOOKED', 10, 9, '21:04:21', 3, 11);
INSERT INTO public."TICKET" VALUES (52, 9785031, 'CANCELED', 8, 10, '01:56:05', 3, 11);
INSERT INTO public."TICKET" VALUES (53, 2449641, 'BOOKED', 8, 2, '22:37:35', 3, 11);
INSERT INTO public."TICKET" VALUES (54, 6689575, 'CANCELED', 8, 7, '13:16:49', 1, 11);
INSERT INTO public."TICKET" VALUES (55, 2391062, 'BOOKED', 8, 1, '05:37:50', 2, 11);
INSERT INTO public."TICKET" VALUES (56, 1379004, 'BOOKED', 10, 7, '03:12:31', 3, 12);
INSERT INTO public."TICKET" VALUES (57, 1527878, 'CANCELED', 9, 9, '11:26:59', 3, 13);
INSERT INTO public."TICKET" VALUES (58, 5906105, 'BOOKED', 2, 2, '11:11:29', 3, 13);
INSERT INTO public."TICKET" VALUES (59, 8181171, 'BOOKED', 1, 7, '12:49:38', 3, 14);
INSERT INTO public."TICKET" VALUES (60, 1194766, 'BOOKED', 2, 2, '14:05:24', 3, 14);
INSERT INTO public."TICKET" VALUES (61, 3859302, 'BOOKED', 2, 8, '06:54:42', 4, 14);
INSERT INTO public."TICKET" VALUES (62, 3935521, 'CANCELED', 3, 7, '19:09:14', 4, 14);
INSERT INTO public."TICKET" VALUES (63, 9111704, 'BOOKED', 2, 1, '13:07:31', 1, 14);
INSERT INTO public."TICKET" VALUES (64, 8642613, 'BOOKED', 3, 4, '06:28:34', 2, 14);
INSERT INTO public."TICKET" VALUES (65, 8066727, 'BOOKED', 2, 10, '10:08:25', 4, 14);
INSERT INTO public."TICKET" VALUES (66, 1363778, 'CANCELED', 2, 7, '23:23:37', 2, 14);
INSERT INTO public."TICKET" VALUES (67, 5496040, 'BOOKED', 2, 6, '23:06:00', 1, 15);
INSERT INTO public."TICKET" VALUES (68, 8269501, 'BOOKED', 10, 9, '02:50:09', 2, 15);
INSERT INTO public."TICKET" VALUES (69, 9422263, 'CANCELED', 8, 6, '08:40:46', 3, 15);
INSERT INTO public."TICKET" VALUES (70, 8132343, 'BOOKED', 10, 5, '08:25:56', 3, 16);
INSERT INTO public."TICKET" VALUES (71, 3030269, 'CANCELED', 2, 3, '07:51:20', 3, 16);
INSERT INTO public."TICKET" VALUES (72, 2925868, 'CANCELED', 2, 6, '18:22:17', 1, 16);
INSERT INTO public."TICKET" VALUES (73, 7925184, 'BOOKED', 10, 7, '00:48:09', 4, 16);
INSERT INTO public."TICKET" VALUES (74, 6045562, 'BOOKED', 2, 4, '08:41:22', 1, 16);
INSERT INTO public."TICKET" VALUES (75, 1511115, 'CANCELED', 8, 8, '04:10:03', 1, 16);
INSERT INTO public."TICKET" VALUES (76, 8900075, 'CANCELED', 2, 10, '12:07:13', 1, 16);
INSERT INTO public."TICKET" VALUES (77, 1077438, 'CANCELED', 8, 2, '18:05:40', 1, 16);
INSERT INTO public."TICKET" VALUES (78, 7720713, 'CANCELED', 9, 5, '10:19:31', 2, 17);
INSERT INTO public."TICKET" VALUES (79, 9586858, 'BOOKED', 9, 9, '08:18:09', 2, 17);
INSERT INTO public."TICKET" VALUES (80, 7863671, 'BOOKED', 2, 2, '18:53:23', 1, 17);
INSERT INTO public."TICKET" VALUES (81, 2408611, 'BOOKED', 10, 9, '13:06:01', 3, 17);
INSERT INTO public."TICKET" VALUES (82, 9486842, 'BOOKED', 2, 4, '20:24:08', 2, 17);
INSERT INTO public."TICKET" VALUES (83, 5606379, 'CANCELED', 9, 4, '08:03:54', 4, 17);
INSERT INTO public."TICKET" VALUES (84, 6760781, 'BOOKED', 8, 9, '02:01:14', 2, 17);
INSERT INTO public."TICKET" VALUES (85, 1577811, 'BOOKED', 3, 2, '13:43:28', 2, 18);
INSERT INTO public."TICKET" VALUES (86, 2955326, 'BOOKED', 1, 4, '18:15:00', 1, 18);
INSERT INTO public."TICKET" VALUES (87, 7438862, 'CANCELED', 3, 9, '03:00:10', 3, 18);
INSERT INTO public."TICKET" VALUES (88, 9147735, 'CANCELED', 2, 1, '05:50:36', 4, 18);
INSERT INTO public."TICKET" VALUES (89, 1528925, 'BOOKED', 1, 2, '16:50:34', 3, 18);
INSERT INTO public."TICKET" VALUES (90, 2430144, 'CANCELED', 2, 7, '15:23:03', 3, 18);
INSERT INTO public."TICKET" VALUES (91, 5718358, 'BOOKED', 2, 8, '03:48:20', 2, 18);
INSERT INTO public."TICKET" VALUES (92, 4227503, 'CANCELED', 1, 2, '12:27:55', 3, 18);
INSERT INTO public."TICKET" VALUES (93, 2580721, 'BOOKED', 1, 9, '07:27:21', 2, 18);
INSERT INTO public."TICKET" VALUES (94, 9661291, 'BOOKED', 1, 7, '16:08:38', 3, 18);
INSERT INTO public."TICKET" VALUES (95, 7117826, 'BOOKED', 10, 2, '15:28:06', 2, 19);
INSERT INTO public."TICKET" VALUES (96, 9361297, 'BOOKED', 1, 1, '10:25:36', 2, 19);
INSERT INTO public."TICKET" VALUES (97, 6600641, 'CANCELED', 10, 5, '23:04:57', 3, 20);
INSERT INTO public."TICKET" VALUES (98, 2928492, 'CANCELED', 10, 10, '15:23:55', 2, 20);
INSERT INTO public."TICKET" VALUES (99, 4776688, 'CANCELED', 10, 10, '13:10:33', 1, 20);
INSERT INTO public."TICKET" VALUES (100, 7379271, 'BOOKED', 8, 10, '00:36:14', 4, 20);
INSERT INTO public."TICKET" VALUES (101, 4501561, 'CANCELED', 8, 1, '21:19:10', 2, 20);
INSERT INTO public."TICKET" VALUES (102, 2502445, 'CANCELED', 8, 4, '05:52:22', 2, 20);
INSERT INTO public."TICKET" VALUES (103, 3409258, 'CANCELED', 10, 7, '02:01:01', 3, 20);
INSERT INTO public."TICKET" VALUES (104, 1007215, 'BOOKED', 10, 3, '23:57:28', 4, 21);
INSERT INTO public."TICKET" VALUES (105, 7382354, 'CANCELED', 2, 6, '04:32:09', 3, 21);
INSERT INTO public."TICKET" VALUES (106, 2736007, 'CANCELED', 9, 2, '11:54:58', 3, 21);
INSERT INTO public."TICKET" VALUES (107, 4815642, 'CANCELED', 2, 6, '15:12:08', 3, 21);
INSERT INTO public."TICKET" VALUES (108, 8919869, 'CANCELED', 6, 6, '06:27:42', 3, 21);
INSERT INTO public."TICKET" VALUES (109, 3374585, 'BOOKED', 6, 3, '05:20:56', 2, 21);
INSERT INTO public."TICKET" VALUES (110, 1271697, 'BOOKED', 8, 5, '23:05:40', 3, 22);
INSERT INTO public."TICKET" VALUES (111, 5808460, 'BOOKED', 8, 5, '22:52:26', 3, 22);
INSERT INTO public."TICKET" VALUES (112, 2446008, 'BOOKED', 8, 10, '14:32:38', 2, 23);
INSERT INTO public."TICKET" VALUES (113, 4296231, 'CANCELED', 10, 10, '19:20:15', 1, 23);
INSERT INTO public."TICKET" VALUES (114, 2055174, 'CANCELED', 8, 6, '06:46:29', 3, 23);
INSERT INTO public."TICKET" VALUES (115, 2790644, 'BOOKED', 10, 10, '14:09:59', 1, 23);
INSERT INTO public."TICKET" VALUES (116, 7706455, 'BOOKED', 10, 4, '05:12:10', 2, 23);
INSERT INTO public."TICKET" VALUES (117, 7079700, 'BOOKED', 2, 3, '01:12:46', 3, 24);
INSERT INTO public."TICKET" VALUES (118, 4440979, 'CANCELED', 1, 1, '02:35:01', 2, 25);
INSERT INTO public."TICKET" VALUES (119, 4501856, 'BOOKED', 2, 1, '22:48:27', 4, 25);
INSERT INTO public."TICKET" VALUES (120, 9386700, 'CANCELED', 2, 6, '23:26:21', 1, 25);
INSERT INTO public."TICKET" VALUES (121, 1948774, 'CANCELED', 8, 6, '10:25:08', 4, 26);
INSERT INTO public."TICKET" VALUES (122, 7394587, 'CANCELED', 10, 6, '00:11:14', 4, 26);
INSERT INTO public."TICKET" VALUES (123, 3311200, 'CANCELED', 10, 4, '02:15:38', 2, 26);
INSERT INTO public."TICKET" VALUES (124, 6634361, 'CANCELED', 6, 4, '14:06:30', 4, 26);
INSERT INTO public."TICKET" VALUES (125, 3075226, 'CANCELED', 8, 2, '11:25:19', 3, 26);
INSERT INTO public."TICKET" VALUES (126, 5524088, 'BOOKED', 2, 3, '02:11:56', 2, 26);
INSERT INTO public."TICKET" VALUES (127, 1376815, 'CANCELED', 10, 1, '13:06:54', 4, 27);
INSERT INTO public."TICKET" VALUES (128, 7895085, 'CANCELED', 8, 3, '13:24:55', 2, 27);
INSERT INTO public."TICKET" VALUES (129, 9187225, 'BOOKED', 8, 9, '09:56:51', 4, 27);
INSERT INTO public."TICKET" VALUES (130, 9460206, 'BOOKED', 9, 2, '11:56:53', 1, 28);
INSERT INTO public."TICKET" VALUES (131, 9292066, 'CANCELED', 9, 1, '10:40:26', 2, 29);
INSERT INTO public."TICKET" VALUES (132, 5481666, 'CANCELED', 9, 3, '03:19:56', 2, 29);
INSERT INTO public."TICKET" VALUES (133, 2021134, 'BOOKED', 10, 9, '23:25:42', 3, 29);
INSERT INTO public."TICKET" VALUES (134, 5582761, 'CANCELED', 9, 5, '10:53:38', 3, 29);
INSERT INTO public."TICKET" VALUES (135, 3673220, 'CANCELED', 2, 1, '06:57:06', 3, 29);
INSERT INTO public."TICKET" VALUES (136, 4257800, 'CANCELED', 8, 10, '21:40:26', 3, 29);
INSERT INTO public."TICKET" VALUES (137, 8229059, 'CANCELED', 6, 7, '06:08:38', 2, 29);
INSERT INTO public."TICKET" VALUES (138, 6747556, 'BOOKED', 2, 6, '00:53:00', 3, 29);
INSERT INTO public."TICKET" VALUES (139, 7662159, 'BOOKED', 1, 5, '13:44:34', 4, 30);
INSERT INTO public."TICKET" VALUES (140, 5099138, 'CANCELED', 1, 7, '10:44:19', 2, 30);
INSERT INTO public."TICKET" VALUES (141, 8417369, 'CANCELED', 2, 2, '02:17:30', 1, 30);
INSERT INTO public."TICKET" VALUES (142, 2542599, 'CANCELED', 1, 8, '09:33:26', 2, 30);
INSERT INTO public."TICKET" VALUES (143, 2072055, 'CANCELED', 10, 2, '17:07:11', 2, 30);
INSERT INTO public."TICKET" VALUES (144, 8765364, 'BOOKED', 2, 10, '23:43:37', 3, 30);
INSERT INTO public."TICKET" VALUES (145, 8140735, 'BOOKED', 10, 4, '23:16:27', 3, 30);
INSERT INTO public."TICKET" VALUES (146, 7197170, 'BOOKED', 2, 6, '06:08:08', 1, 30);
INSERT INTO public."TICKET" VALUES (147, 9178919, 'BOOKED', 10, 1, '17:06:24', 1, 30);
INSERT INTO public."TICKET" VALUES (148, 4655067, 'CANCELED', 10, 2, '00:58:27', 4, 30);
INSERT INTO public."TICKET" VALUES (149, 4277471, 'CANCELED', 3, 6, '11:53:05', 2, 31);
INSERT INTO public."TICKET" VALUES (150, 4069913, 'CANCELED', 1, 6, '04:06:18', 1, 31);
INSERT INTO public."TICKET" VALUES (151, 9664440, 'CANCELED', 3, 2, '21:10:03', 3, 31);
INSERT INTO public."TICKET" VALUES (152, 5371944, 'BOOKED', 1, 1, '11:02:04', 2, 31);
INSERT INTO public."TICKET" VALUES (153, 3584255, 'BOOKED', 3, 4, '20:01:05', 1, 31);
INSERT INTO public."TICKET" VALUES (154, 8296446, 'CANCELED', 2, 1, '05:25:01', 1, 31);
INSERT INTO public."TICKET" VALUES (155, 3898506, 'CANCELED', 2, 10, '19:55:47', 2, 32);
INSERT INTO public."TICKET" VALUES (156, 8765917, 'CANCELED', 2, 3, '02:32:41', 1, 32);
INSERT INTO public."TICKET" VALUES (157, 8753241, 'BOOKED', 2, 10, '15:39:34', 3, 32);
INSERT INTO public."TICKET" VALUES (158, 6778179, 'CANCELED', 6, 4, '14:44:35', 1, 32);
INSERT INTO public."TICKET" VALUES (159, 9490684, 'CANCELED', 6, 6, '16:36:31', 3, 33);
INSERT INTO public."TICKET" VALUES (160, 3840111, 'CANCELED', 2, 3, '16:19:21', 3, 33);
INSERT INTO public."TICKET" VALUES (161, 2817448, 'BOOKED', 6, 2, '14:06:44', 2, 33);
INSERT INTO public."TICKET" VALUES (162, 5201698, 'CANCELED', 6, 6, '09:44:32', 1, 33);
INSERT INTO public."TICKET" VALUES (163, 5197106, 'CANCELED', 10, 2, '04:15:22', 1, 33);
INSERT INTO public."TICKET" VALUES (164, 4622415, 'BOOKED', 6, 5, '19:08:44', 2, 33);
INSERT INTO public."TICKET" VALUES (165, 6294461, 'BOOKED', 6, 2, '20:48:13', 4, 33);
INSERT INTO public."TICKET" VALUES (166, 5333933, 'CANCELED', 8, 1, '17:47:34', 1, 33);
INSERT INTO public."TICKET" VALUES (167, 8715986, 'CANCELED', 6, 7, '02:41:10', 3, 33);
INSERT INTO public."TICKET" VALUES (168, 2723524, 'CANCELED', 6, 8, '09:35:05', 4, 34);
INSERT INTO public."TICKET" VALUES (169, 6943226, 'CANCELED', 2, 2, '08:44:39', 2, 35);
INSERT INTO public."TICKET" VALUES (170, 9103773, 'BOOKED', 9, 9, '07:20:55', 3, 35);
INSERT INTO public."TICKET" VALUES (171, 7466719, 'BOOKED', 9, 9, '21:20:38', 3, 35);
INSERT INTO public."TICKET" VALUES (172, 9383921, 'BOOKED', 2, 4, '17:57:36', 1, 35);
INSERT INTO public."TICKET" VALUES (173, 7517457, 'BOOKED', 2, 8, '06:22:00', 3, 36);
INSERT INTO public."TICKET" VALUES (174, 6572129, 'CANCELED', 5, 3, '14:50:17', 4, 36);
INSERT INTO public."TICKET" VALUES (175, 6761326, 'BOOKED', 6, 6, '10:57:01', 1, 36);
INSERT INTO public."TICKET" VALUES (176, 6900506, 'CANCELED', 2, 7, '09:59:02', 3, 36);
INSERT INTO public."TICKET" VALUES (177, 4427856, 'CANCELED', 5, 1, '06:16:23', 2, 36);
INSERT INTO public."TICKET" VALUES (178, 4314360, 'BOOKED', 3, 5, '14:02:25', 1, 37);
INSERT INTO public."TICKET" VALUES (179, 7029795, 'CANCELED', 1, 8, '15:08:38', 1, 37);
INSERT INTO public."TICKET" VALUES (180, 6899552, 'BOOKED', 3, 5, '19:47:01', 2, 37);
INSERT INTO public."TICKET" VALUES (181, 2560405, 'BOOKED', 2, 8, '15:33:22', 4, 37);
INSERT INTO public."TICKET" VALUES (182, 7880794, 'CANCELED', 1, 7, '16:16:35', 3, 37);
INSERT INTO public."TICKET" VALUES (183, 3683554, 'BOOKED', 1, 4, '04:00:49', 2, 37);
INSERT INTO public."TICKET" VALUES (184, 2655499, 'BOOKED', 10, 2, '21:03:53', 1, 38);
INSERT INTO public."TICKET" VALUES (185, 9416231, 'CANCELED', 1, 6, '09:36:25', 3, 39);
INSERT INTO public."TICKET" VALUES (186, 2497195, 'CANCELED', 1, 2, '18:43:36', 1, 39);
INSERT INTO public."TICKET" VALUES (187, 6171125, 'CANCELED', 2, 3, '12:23:44', 1, 39);
INSERT INTO public."TICKET" VALUES (188, 1348934, 'CANCELED', 9, 2, '03:59:17', 1, 39);
INSERT INTO public."TICKET" VALUES (189, 4164958, 'CANCELED', 1, 8, '04:40:38', 2, 39);
INSERT INTO public."TICKET" VALUES (190, 6859490, 'CANCELED', 9, 4, '17:57:17', 1, 39);
INSERT INTO public."TICKET" VALUES (191, 1806942, 'BOOKED', 2, 7, '17:32:24', 1, 39);
INSERT INTO public."TICKET" VALUES (192, 2653974, 'BOOKED', 1, 5, '00:41:51', 4, 39);
INSERT INTO public."TICKET" VALUES (193, 8988415, 'CANCELED', 9, 2, '05:46:15', 2, 39);
INSERT INTO public."TICKET" VALUES (194, 3119254, 'BOOKED', 10, 1, '05:13:05', 1, 40);
INSERT INTO public."TICKET" VALUES (195, 1243041, 'BOOKED', 2, 2, '07:46:57', 2, 40);
INSERT INTO public."TICKET" VALUES (196, 4833460, 'CANCELED', 10, 4, '13:53:41', 3, 40);
INSERT INTO public."TICKET" VALUES (197, 4049572, 'CANCELED', 10, 1, '23:48:36', 2, 41);
INSERT INTO public."TICKET" VALUES (198, 6647034, 'CANCELED', 8, 1, '01:20:07', 2, 41);
INSERT INTO public."TICKET" VALUES (199, 8293416, 'BOOKED', 8, 3, '11:42:35', 4, 41);
INSERT INTO public."TICKET" VALUES (200, 7458206, 'BOOKED', 6, 7, '01:53:49', 3, 41);
INSERT INTO public."TICKET" VALUES (201, 3511410, 'CANCELED', 10, 2, '18:58:17', 4, 41);
INSERT INTO public."TICKET" VALUES (202, 4734254, 'BOOKED', 3, 10, '14:06:33', 4, 42);
INSERT INTO public."TICKET" VALUES (203, 7205947, 'BOOKED', 1, 7, '22:10:06', 4, 42);
INSERT INTO public."TICKET" VALUES (204, 2289225, 'BOOKED', 1, 2, '13:03:14', 2, 42);
INSERT INTO public."TICKET" VALUES (205, 4339519, 'CANCELED', 3, 2, '07:58:22', 4, 42);
INSERT INTO public."TICKET" VALUES (206, 6963039, 'CANCELED', 1, 5, '17:38:53', 2, 43);
INSERT INTO public."TICKET" VALUES (207, 6110248, 'CANCELED', 2, 1, '02:18:39', 2, 43);
INSERT INTO public."TICKET" VALUES (208, 6868784, 'CANCELED', 2, 9, '08:39:15', 4, 43);
INSERT INTO public."TICKET" VALUES (209, 9851950, 'CANCELED', 2, 6, '01:10:47', 4, 43);
INSERT INTO public."TICKET" VALUES (210, 3982216, 'CANCELED', 3, 4, '04:01:19', 2, 43);
INSERT INTO public."TICKET" VALUES (211, 6251007, 'BOOKED', 10, 7, '13:31:22', 1, 44);
INSERT INTO public."TICKET" VALUES (212, 6549036, 'CANCELED', 8, 10, '23:53:46', 2, 44);
INSERT INTO public."TICKET" VALUES (213, 9651408, 'CANCELED', 2, 3, '20:58:07', 2, 44);
INSERT INTO public."TICKET" VALUES (214, 6939566, 'BOOKED', 2, 10, '21:47:40', 2, 44);
INSERT INTO public."TICKET" VALUES (215, 9796522, 'BOOKED', 6, 10, '10:13:05', 4, 44);
INSERT INTO public."TICKET" VALUES (216, 2002011, 'CANCELED', 8, 6, '19:15:09', 4, 44);
INSERT INTO public."TICKET" VALUES (217, 6243446, 'BOOKED', 2, 2, '21:35:56', 3, 44);
INSERT INTO public."TICKET" VALUES (218, 6087210, 'BOOKED', 2, 6, '04:51:26', 4, 44);
INSERT INTO public."TICKET" VALUES (219, 3425343, 'BOOKED', 6, 1, '06:21:37', 4, 44);
INSERT INTO public."TICKET" VALUES (220, 9245981, 'CANCELED', 6, 7, '15:48:15', 1, 44);
INSERT INTO public."TICKET" VALUES (221, 4072009, 'BOOKED', 1, 2, '01:54:53', 2, 45);
INSERT INTO public."TICKET" VALUES (222, 1199740, 'CANCELED', 1, 8, '07:53:24', 4, 45);
INSERT INTO public."TICKET" VALUES (223, 7867905, 'BOOKED', 1, 5, '21:24:04', 4, 45);
INSERT INTO public."TICKET" VALUES (224, 7883708, 'BOOKED', 1, 8, '04:52:47', 2, 45);
INSERT INTO public."TICKET" VALUES (225, 7641830, 'BOOKED', 1, 10, '06:03:45', 2, 45);
INSERT INTO public."TICKET" VALUES (226, 4153684, 'BOOKED', 1, 5, '16:12:43', 4, 45);
INSERT INTO public."TICKET" VALUES (227, 6490703, 'BOOKED', 1, 2, '05:17:04', 4, 45);
INSERT INTO public."TICKET" VALUES (228, 3391729, 'CANCELED', 1, 6, '07:46:33', 1, 45);
INSERT INTO public."TICKET" VALUES (229, 1425087, 'BOOKED', 1, 7, '17:21:59', 4, 45);
INSERT INTO public."TICKET" VALUES (230, 7926740, 'BOOKED', 10, 10, '22:35:14', 4, 46);
INSERT INTO public."TICKET" VALUES (231, 3912750, 'CANCELED', 9, 2, '12:27:29', 1, 46);
INSERT INTO public."TICKET" VALUES (232, 5621497, 'BOOKED', 6, 1, '23:10:40', 4, 46);
INSERT INTO public."TICKET" VALUES (233, 1965921, 'BOOKED', 10, 7, '14:37:56', 3, 46);
INSERT INTO public."TICKET" VALUES (234, 4294704, 'BOOKED', 6, 1, '18:04:55', 2, 46);
INSERT INTO public."TICKET" VALUES (235, 2074002, 'BOOKED', 8, 1, '00:59:38', 3, 46);
INSERT INTO public."TICKET" VALUES (236, 8927263, 'BOOKED', 8, 3, '21:57:36', 4, 46);
INSERT INTO public."TICKET" VALUES (237, 3166659, 'CANCELED', 6, 2, '16:26:58', 1, 46);
INSERT INTO public."TICKET" VALUES (238, 7605910, 'BOOKED', 10, 8, '04:37:04', 4, 46);
INSERT INTO public."TICKET" VALUES (239, 1133122, 'BOOKED', 8, 10, '22:32:41', 4, 46);
INSERT INTO public."TICKET" VALUES (240, 8074832, 'CANCELED', 9, 1, '20:05:04', 4, 47);
INSERT INTO public."TICKET" VALUES (241, 2453657, 'CANCELED', 6, 4, '03:00:45', 3, 47);
INSERT INTO public."TICKET" VALUES (242, 9803382, 'CANCELED', 9, 1, '19:31:15', 3, 47);
INSERT INTO public."TICKET" VALUES (243, 3864862, 'CANCELED', 2, 4, '23:01:39', 4, 47);
INSERT INTO public."TICKET" VALUES (244, 4955609, 'CANCELED', 6, 10, '12:28:21', 2, 47);
INSERT INTO public."TICKET" VALUES (245, 5713858, 'BOOKED', 8, 5, '17:31:09', 4, 48);
INSERT INTO public."TICKET" VALUES (246, 2545120, 'BOOKED', 8, 3, '13:46:23', 4, 48);
INSERT INTO public."TICKET" VALUES (247, 6185832, 'BOOKED', 10, 3, '22:22:59', 3, 48);
INSERT INTO public."TICKET" VALUES (248, 5421226, 'CANCELED', 8, 6, '07:58:39', 3, 48);
INSERT INTO public."TICKET" VALUES (249, 4464205, 'BOOKED', 10, 1, '06:03:27', 1, 48);
INSERT INTO public."TICKET" VALUES (250, 9623993, 'CANCELED', 8, 7, '19:56:04', 3, 48);
INSERT INTO public."TICKET" VALUES (251, 6117191, 'CANCELED', 10, 10, '00:49:49', 1, 48);
INSERT INTO public."TICKET" VALUES (252, 6934959, 'CANCELED', 10, 4, '00:04:24', 2, 48);
INSERT INTO public."TICKET" VALUES (253, 7449121, 'CANCELED', 8, 4, '02:48:10', 3, 48);
INSERT INTO public."TICKET" VALUES (254, 6405024, 'CANCELED', 10, 10, '20:54:44', 3, 48);
INSERT INTO public."TICKET" VALUES (255, 4128700, 'CANCELED', 8, 7, '10:11:23', 1, 49);
INSERT INTO public."TICKET" VALUES (256, 5017476, 'CANCELED', 8, 9, '04:18:39', 2, 49);
INSERT INTO public."TICKET" VALUES (257, 2014984, 'BOOKED', 2, 4, '02:12:07', 3, 50);
INSERT INTO public."TICKET" VALUES (258, 2450428, 'CANCELED', 2, 2, '22:50:28', 1, 50);
INSERT INTO public."TICKET" VALUES (259, 7217693, 'BOOKED', 2, 10, '06:36:39', 3, 50);
INSERT INTO public."TICKET" VALUES (260, 7134686, 'CANCELED', 5, 8, '08:31:50', 4, 50);
INSERT INTO public."TICKET" VALUES (261, 6130490, 'BOOKED', 4, 8, '11:08:44', 3, 50);
INSERT INTO public."TICKET" VALUES (262, 8508535, 'CANCELED', 6, 9, '02:53:51', 2, 50);
INSERT INTO public."TICKET" VALUES (263, 2496752, 'CANCELED', 6, 3, '16:04:30', 2, 50);
INSERT INTO public."TICKET" VALUES (264, 4935190, 'BOOKED', 2, 5, '06:22:59', 4, 50);
INSERT INTO public."TICKET" VALUES (265, 6813715, 'BOOKED', 4, 6, '16:06:15', 3, 50);
INSERT INTO public."TICKET" VALUES (266, 8226978, 'BOOKED', 6, 9, '08:17:05', 3, 51);
INSERT INTO public."TICKET" VALUES (267, 1306236, 'BOOKED', 6, 5, '21:08:14', 1, 51);
INSERT INTO public."TICKET" VALUES (268, 7852050, 'CANCELED', 6, 10, '23:39:46', 1, 51);
INSERT INTO public."TICKET" VALUES (269, 6617972, 'CANCELED', 10, 10, '22:21:46', 2, 51);
INSERT INTO public."TICKET" VALUES (270, 3612235, 'CANCELED', 6, 3, '23:58:31', 1, 51);
INSERT INTO public."TICKET" VALUES (271, 9042632, 'CANCELED', 10, 2, '15:53:32', 1, 51);
INSERT INTO public."TICKET" VALUES (272, 2094243, 'BOOKED', 2, 1, '20:59:20', 4, 51);
INSERT INTO public."TICKET" VALUES (273, 3041789, 'CANCELED', 2, 3, '06:40:19', 3, 52);
INSERT INTO public."TICKET" VALUES (274, 9123214, 'BOOKED', 2, 5, '05:17:33', 1, 52);
INSERT INTO public."TICKET" VALUES (275, 5521177, 'CANCELED', 3, 4, '22:41:05', 3, 52);
INSERT INTO public."TICKET" VALUES (276, 1653650, 'BOOKED', 1, 3, '16:16:38', 4, 52);
INSERT INTO public."TICKET" VALUES (277, 9765782, 'BOOKED', 3, 9, '17:17:03', 4, 52);
INSERT INTO public."TICKET" VALUES (278, 3178833, 'CANCELED', 3, 6, '13:03:31', 4, 52);
INSERT INTO public."TICKET" VALUES (279, 3720889, 'CANCELED', 1, 6, '18:51:28', 1, 52);
INSERT INTO public."TICKET" VALUES (280, 7343087, 'CANCELED', 10, 7, '04:49:57', 2, 53);
INSERT INTO public."TICKET" VALUES (281, 7584072, 'BOOKED', 8, 10, '21:12:10', 1, 53);
INSERT INTO public."TICKET" VALUES (282, 3028471, 'CANCELED', 10, 1, '13:15:56', 2, 53);
INSERT INTO public."TICKET" VALUES (283, 3562475, 'BOOKED', 8, 3, '01:38:41', 4, 53);
INSERT INTO public."TICKET" VALUES (284, 4961016, 'BOOKED', 8, 6, '08:00:09', 1, 53);
INSERT INTO public."TICKET" VALUES (285, 3879965, 'BOOKED', 10, 6, '23:08:52', 1, 53);
INSERT INTO public."TICKET" VALUES (286, 8756297, 'BOOKED', 8, 1, '03:59:59', 3, 53);
INSERT INTO public."TICKET" VALUES (287, 6071153, 'CANCELED', 10, 4, '10:20:29', 4, 53);
INSERT INTO public."TICKET" VALUES (288, 8771137, 'CANCELED', 8, 10, '06:34:28', 3, 53);
INSERT INTO public."TICKET" VALUES (289, 9793716, 'CANCELED', 2, 6, '21:34:31', 2, 54);
INSERT INTO public."TICKET" VALUES (290, 3184513, 'BOOKED', 10, 9, '04:44:36', 3, 55);
INSERT INTO public."TICKET" VALUES (291, 9064465, 'CANCELED', 8, 8, '01:58:51', 2, 55);
INSERT INTO public."TICKET" VALUES (292, 5556521, 'CANCELED', 10, 9, '03:11:03', 1, 55);
INSERT INTO public."TICKET" VALUES (293, 7011689, 'CANCELED', 8, 9, '00:01:07', 3, 55);
INSERT INTO public."TICKET" VALUES (294, 6554699, 'CANCELED', 10, 9, '00:20:00', 1, 55);
INSERT INTO public."TICKET" VALUES (295, 2467984, 'BOOKED', 10, 9, '12:28:30', 4, 55);
INSERT INTO public."TICKET" VALUES (296, 4994649, 'BOOKED', 10, 2, '21:58:25', 3, 55);
INSERT INTO public."TICKET" VALUES (297, 9221597, 'BOOKED', 10, 5, '18:46:40', 1, 55);
INSERT INTO public."TICKET" VALUES (298, 1065275, 'BOOKED', 10, 9, '12:33:43', 2, 55);
INSERT INTO public."TICKET" VALUES (299, 2605156, 'BOOKED', 1, 6, '02:40:27', 2, 56);
INSERT INTO public."TICKET" VALUES (300, 3752077, 'CANCELED', 2, 3, '21:21:47', 4, 56);
INSERT INTO public."TICKET" VALUES (301, 1578944, 'BOOKED', 1, 6, '19:16:49', 3, 56);
INSERT INTO public."TICKET" VALUES (302, 4996795, 'BOOKED', 1, 2, '03:50:12', 1, 56);
INSERT INTO public."TICKET" VALUES (303, 3714511, 'CANCELED', 1, 4, '23:51:40', 1, 56);
INSERT INTO public."TICKET" VALUES (304, 6262260, 'BOOKED', 2, 9, '11:58:11', 3, 56);
INSERT INTO public."TICKET" VALUES (305, 1273496, 'BOOKED', 2, 7, '11:13:02', 2, 56);
INSERT INTO public."TICKET" VALUES (306, 1801009, 'BOOKED', 9, 9, '21:32:49', 1, 56);
INSERT INTO public."TICKET" VALUES (307, 4713270, 'CANCELED', 1, 8, '00:24:07', 3, 57);
INSERT INTO public."TICKET" VALUES (308, 6091969, 'BOOKED', 1, 6, '11:07:37', 3, 57);
INSERT INTO public."TICKET" VALUES (309, 3068314, 'CANCELED', 1, 5, '17:20:39', 2, 57);
INSERT INTO public."TICKET" VALUES (310, 9484303, 'CANCELED', 1, 7, '07:36:51', 4, 57);
INSERT INTO public."TICKET" VALUES (311, 4517531, 'BOOKED', 1, 4, '18:29:05', 2, 57);
INSERT INTO public."TICKET" VALUES (312, 4817170, 'CANCELED', 1, 2, '11:16:31', 3, 57);
INSERT INTO public."TICKET" VALUES (313, 8522625, 'BOOKED', 1, 3, '18:06:52', 1, 57);
INSERT INTO public."TICKET" VALUES (314, 9143322, 'CANCELED', 1, 6, '03:57:58', 1, 57);
INSERT INTO public."TICKET" VALUES (315, 6202469, 'BOOKED', 2, 5, '07:53:46', 1, 58);
INSERT INTO public."TICKET" VALUES (316, 6647103, 'BOOKED', 2, 8, '12:01:06', 1, 58);
INSERT INTO public."TICKET" VALUES (317, 5041829, 'CANCELED', 8, 4, '08:49:54', 3, 58);
INSERT INTO public."TICKET" VALUES (318, 2701570, 'BOOKED', 9, 7, '12:10:36', 4, 58);
INSERT INTO public."TICKET" VALUES (319, 2420288, 'BOOKED', 10, 3, '07:21:19', 2, 58);
INSERT INTO public."TICKET" VALUES (320, 6681484, 'CANCELED', 8, 4, '16:32:47', 3, 58);
INSERT INTO public."TICKET" VALUES (321, 1971874, 'CANCELED', 2, 8, '13:19:30', 2, 59);
INSERT INTO public."TICKET" VALUES (322, 6165735, 'BOOKED', 10, 2, '06:00:03', 2, 59);
INSERT INTO public."TICKET" VALUES (323, 1043385, 'CANCELED', 1, 10, '20:57:22', 4, 59);
INSERT INTO public."TICKET" VALUES (324, 2968525, 'BOOKED', 2, 8, '07:49:11', 2, 59);
INSERT INTO public."TICKET" VALUES (325, 4871016, 'BOOKED', 10, 10, '15:37:22', 2, 60);
INSERT INTO public."TICKET" VALUES (326, 9056168, 'BOOKED', 8, 4, '09:46:27', 1, 60);
INSERT INTO public."TICKET" VALUES (327, 1557047, 'BOOKED', 10, 8, '07:56:48', 2, 60);


--
-- TOC entry 4908 (class 0 OID 17380)
-- Dependencies: 216
-- Data for Name: USER; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."USER" VALUES (1, 'john_doe', '$2b$10$rWNEVL11gwNf9YVedBNrIuCSAM1w3Kty25W4uDV5o4KUeKV1azi3q', 'John Doe', 'john.doe@example.com', '2022-01-15', '/images/users/user1.jpg');
INSERT INTO public."USER" VALUES (2, 'jane_smith', '$2b$10$Ky0yYoVmnd7ioYy4B6QFEuw9s/kVTy1JmpELBvvL9Ms4I7E6Qs2FS', 'Jane Smith', 'jane.smith@example.com', '2022-03-22', '/images/users/user2.jpg');
INSERT INTO public."USER" VALUES (3, 'michael_jones', '$2b$10$pSNjPvnOUsXnCAZ3oosLTeLV5itv/DtTjGMuyusMrMJZcayHpqrW2', 'Michael Jones', 'michael.jones@example.com', '2022-04-10', '/images/users/user3.jpg');
INSERT INTO public."USER" VALUES (4, 'emily_davis', '$2b$10$vb77kYi0H20iMRYdA.rgq.PAq/n8NCBjGbhsKkilZBH.QA1ty9fxO', 'Emily Davis', 'emily.davis@example.com', '2022-06-30', '/images/users/user4.jpg');
INSERT INTO public."USER" VALUES (5, 'william_brown', '$2b$10$FDyuVeTefCrFxhYkVHXyLunKPuQx3GhKr8mS594iakFgzHZpTIIyi', 'William Brown', 'william.brown@example.com', '2022-07-15', '/images/users/user5.jpg');
INSERT INTO public."USER" VALUES (6, 'sophia_wilson', '$2b$10$NVMcDdz02GMkpiZMg.Md3Okw9r5oy0hrAAXEDeDKlwk5dbYbiJnH2', 'Sophia Wilson', 'sophia.wilson@example.com', '2022-09-01', '/images/users/user6.jpg');
INSERT INTO public."USER" VALUES (7, 'oliver_moore', '$2b$10$1VPrlF8Afja5AJQuON7WIOi6mZtfgfbwp5Yj5lLDcRfK8cS3VveKG', 'Oliver Moore', 'oliver.moore@example.com', '2022-11-20', '/images/users/user7.jpg');
INSERT INTO public."USER" VALUES (8, 'amelia_taylor', '$2b$10$yfnrYHUCewvjx5xvaUufyeSxfY377HAh0784JBueYAL2I3sAunQRi', 'Amelia Taylor', 'amelia.taylor@example.com', '2023-01-05', '/images/users/user8.jpg');
INSERT INTO public."USER" VALUES (9, 'lucas_thompson', '$2b$10$yfnrYHUCewvjx5xvaUufyeSxfY377HAh0784JBueYAL2I3sAunQRi', 'Lucas Thompson', 'lucas.thompson@example.com', '2023-02-14', '/images/users/user9.jpg');
INSERT INTO public."USER" VALUES (10, 'mia_white', '$2b$10$B422Kqf5tLyp.RZNfu5aHuzhtIpBnLCLm3dqZ8mOr..84bcjH.N5m', 'Mia White', 'mia.white@example.com', '2023-03-20', '/images/users/user10.jpg');


--
-- TOC entry 4920 (class 0 OID 17459)
-- Dependencies: 228
-- Data for Name: VENUE; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."VENUE" VALUES (1, 'Megaron - The Athens Concert Hall', 'Athens', 'Vasilissis Sofias Ave. & Kokkali 1');
INSERT INTO public."VENUE" VALUES (2, 'Odeon of Herodes Atticus', 'Athens', 'Dionysiou Areopagitou St.');
INSERT INTO public."VENUE" VALUES (3, 'Stavros Niarchos Foundation Cultural Center (SNFCC)', 'Athens', '364 Pireos Street');
INSERT INTO public."VENUE" VALUES (4, 'National Theatre of Greece', 'Athens', 'Agatharchou 25');
INSERT INTO public."VENUE" VALUES (5, 'Pallas Theatre', 'Athens', '5 Boukourestiou Street');
INSERT INTO public."VENUE" VALUES (6, 'National Theatre οf Northern Greece', 'Thessaloniki', '2 Ethnikis Amynis St.');
INSERT INTO public."VENUE" VALUES (7, 'Concert Hall of Thessaloniki', 'Thessaloniki', '25th of March Street');
INSERT INTO public."VENUE" VALUES (8, 'Ancient Theater of Epidaurus', 'Epidaurus', 'Ancient Theater of Epidaurus');
INSERT INTO public."VENUE" VALUES (9, 'OAKA Spyros Louis Olympic Stadium', 'Athens', '37 Kifisias Ave.');
INSERT INTO public."VENUE" VALUES (10, 'Village Cinemas Athens Mall', 'Athens', 'Kifissias Ave. 48');
INSERT INTO public."VENUE" VALUES (11, 'Odeon Kosmopolis', 'Thessaloniki', '23 Dimitriou Gounari');
INSERT INTO public."VENUE" VALUES (12, 'Ster Cinemas Vouliagmeni', 'Vouliagmeni (Athens Area)', '1 Asklipiou & Poseidonos Ave.');


--
-- TOC entry 4929 (class 0 OID 17523)
-- Dependencies: 237
-- Data for Name: Venue_HAS_Seat_Cat; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Venue_HAS_Seat_Cat" VALUES (1, 6, 50);
INSERT INTO public."Venue_HAS_Seat_Cat" VALUES (1, 8, 900);
INSERT INTO public."Venue_HAS_Seat_Cat" VALUES (1, 10, 800);
INSERT INTO public."Venue_HAS_Seat_Cat" VALUES (2, 1, 2500);
INSERT INTO public."Venue_HAS_Seat_Cat" VALUES (2, 2, 680);
INSERT INTO public."Venue_HAS_Seat_Cat" VALUES (2, 10, 1500);
INSERT INTO public."Venue_HAS_Seat_Cat" VALUES (3, 2, 400);
INSERT INTO public."Venue_HAS_Seat_Cat" VALUES (3, 8, 400);
INSERT INTO public."Venue_HAS_Seat_Cat" VALUES (3, 9, 200);
INSERT INTO public."Venue_HAS_Seat_Cat" VALUES (3, 10, 200);
INSERT INTO public."Venue_HAS_Seat_Cat" VALUES (4, 6, 100);
INSERT INTO public."Venue_HAS_Seat_Cat" VALUES (4, 7, 100);
INSERT INTO public."Venue_HAS_Seat_Cat" VALUES (4, 8, 400);
INSERT INTO public."Venue_HAS_Seat_Cat" VALUES (4, 10, 400);
INSERT INTO public."Venue_HAS_Seat_Cat" VALUES (5, 2, 200);
INSERT INTO public."Venue_HAS_Seat_Cat" VALUES (5, 6, 100);
INSERT INTO public."Venue_HAS_Seat_Cat" VALUES (5, 8, 400);
INSERT INTO public."Venue_HAS_Seat_Cat" VALUES (5, 9, 400);
INSERT INTO public."Venue_HAS_Seat_Cat" VALUES (5, 10, 378);
INSERT INTO public."Venue_HAS_Seat_Cat" VALUES (6, 8, 551);
INSERT INTO public."Venue_HAS_Seat_Cat" VALUES (6, 10, 140);
INSERT INTO public."Venue_HAS_Seat_Cat" VALUES (7, 2, 108);
INSERT INTO public."Venue_HAS_Seat_Cat" VALUES (7, 6, 32);
INSERT INTO public."Venue_HAS_Seat_Cat" VALUES (7, 8, 820);
INSERT INTO public."Venue_HAS_Seat_Cat" VALUES (7, 10, 300);
INSERT INTO public."Venue_HAS_Seat_Cat" VALUES (8, 1, 5000);
INSERT INTO public."Venue_HAS_Seat_Cat" VALUES (8, 2, 1000);
INSERT INTO public."Venue_HAS_Seat_Cat" VALUES (8, 9, 5000);
INSERT INTO public."Venue_HAS_Seat_Cat" VALUES (9, 2, 1000);
INSERT INTO public."Venue_HAS_Seat_Cat" VALUES (9, 4, 6000);
INSERT INTO public."Venue_HAS_Seat_Cat" VALUES (9, 5, 2000);
INSERT INTO public."Venue_HAS_Seat_Cat" VALUES (9, 6, 500);
INSERT INTO public."Venue_HAS_Seat_Cat" VALUES (10, 1, 250);
INSERT INTO public."Venue_HAS_Seat_Cat" VALUES (10, 2, 250);
INSERT INTO public."Venue_HAS_Seat_Cat" VALUES (10, 3, 70);
INSERT INTO public."Venue_HAS_Seat_Cat" VALUES (11, 1, 220);
INSERT INTO public."Venue_HAS_Seat_Cat" VALUES (12, 1, 200);
INSERT INTO public."Venue_HAS_Seat_Cat" VALUES (12, 2, 100);
INSERT INTO public."Venue_HAS_Seat_Cat" VALUES (12, 3, 30);