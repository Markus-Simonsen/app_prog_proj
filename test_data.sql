-- Insert users into user table
INSERT INTO "user" ("userid", "email", "password", "firstname", "lastname") VALUES
(1, 'john.doe@example.com', crypt('password_abc123', gen_salt('bf')), 'John', 'Doe'),
(2, 'jane.smith@example.com', crypt('password_def456', gen_salt('bf')), 'Jane', 'Smith'),
(3, 'bob.wilson@example.com', crypt('password_ghi789', gen_salt('bf')), 'Bob', 'Wilson'),
(4, 'alice.jones@example.com', crypt('password_jkl012', gen_salt('bf')), 'Alice', 'Jones'),
(5, 'charlie.brown@example.com', crypt('password_mno345', gen_salt('bf')), 'Charlie', 'Brown');

-- Insert toilets into toilet table
INSERT INTO "toilet" ("toiletid", "location") VALUES
(101, 55671259),
(102, 55661259),
(103, 55681255),
(104, 55671256),
(105, 55651261);

-- Insert reviews into a_shit table
INSERT INTO "visit" ("visitid", "userid", "toiletid", "time", "rating", "review") VALUES
(1001, 1, 101, '2025-01-15', 4, 'Clean and well maintained'),
(1002, 2, 102, '2025-02-20', 2, 'Needs better ventilation'),
(1003, 3, 103, '2025-03-10', 5, 'Excellent facilities!'),
(1004, 1, 104, '2025-04-05', 3, 'Average condition'),
(1005, 4, 105, '2025-05-12', 1, 'Very dirty, avoid if possible'),
(1006, 5, 101, '2025-06-18', 4, 'Good overall experience'),
(1007, 2, 103, '2025-07-22', 5, 'Best restroom I have used'),
(1008, 3, 102, '2025-08-30', 2, 'Out of order sign ignored'),
(1009, 4, 104, '2025-09-14', 3, 'Decent but could be cleaner'),
(1010, 5, 105, '2025-10-25', 4, 'Surprisingly good for public facility');
