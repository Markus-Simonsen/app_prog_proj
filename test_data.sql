-- Insert users into shitter table
INSERT INTO "shitter" ("shitterid", "email", "password", "firstname", "lastname") VALUES
(1, 'john.doe@example.com', 'hashed_password_abc123', 'John', 'Doe'),
(2, 'jane.smith@example.com', 'hashed_password_def456', 'Jane', 'Smith'),
(3, 'bob.wilson@example.com', 'hashed_password_ghi789', 'Bob', 'Wilson'),
(4, 'alice.jones@example.com', 'hashed_password_jkl012', 'Alice', 'Jones'),
(5, 'charlie.brown@example.com', 'hashed_password_mno345', 'Charlie', 'Brown');

-- Insert toilets into toilet table
INSERT INTO "toilet" ("toiletid", "location") VALUES
(101, 1),
(102, 2),
(103, 3),
(104, 4),
(105, 5);

-- Insert reviews into a_shit table
INSERT INTO "ashit" ("shitid", "shitterid", "toiletid", "time", "rating", "review") VALUES
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