-- Insert users into user table
INSERT INTO "user" ("userid", "email", "password", "firstname", "lastname") VALUES
(1, 'john.doe@example.com', crypt('password_abc123', gen_salt('bf')), 'John', 'Doe'),
(2, 'jane.smith@example.com', crypt('password_def456', gen_salt('bf')), 'Jane', 'Smith'),
(3, 'bob.wilson@example.com', crypt('password_ghi789', gen_salt('bf')), 'Bob', 'Wilson'),
(4, 'alice.jones@example.com', crypt('password_jkl012', gen_salt('bf')), 'Alice', 'Jones'),
(5, 'charlie.brown@example.com', crypt('password_mno345', gen_salt('bf')), 'Charlie', 'Brown');

-- Insert toilets into toilet table
INSERT INTO "toilet" ("toiletid", "location") VALUES
(1, 55671259),
(2, 55661259),
(3, 55681255),
(4, 55671256),
(5, 55651261);

-- Insert reviews into a_shit table
INSERT INTO "visit" ("visitid", "userid", "toiletid", "time", "rating", "review") VALUES
(1, 1, 1, '2025-01-15', 4, 'Clean and well maintained'),
(2, 2, 2, '2025-02-20', 2, 'Needs better ventilation'),
(3, 3, 3, '2025-03-10', 5, 'Excellent facilities!'),
(4, 1, 4, '2025-04-05', 3, 'Average condition'),
(5, 4, 5, '2025-05-12', 1, 'Very dirty, avoid if possible'),
(6, 5, 1, '2025-06-18', 4, 'Good overall experience'),
(7, 2, 3, '2025-07-22', 5, 'Best restroom I have used'),
(8, 3, 2, '2025-08-30', 2, 'Out of order sign ignored'),
(9, 4, 4, '2025-09-14', 3, 'Decent but could be cleaner'),
(10, 5, 5, '2025-10-25', 4, 'Surprisingly good for public facility');
