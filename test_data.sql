CREATE TABLE "shitter"(
    "id" BIGINT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "firstname" VARCHAR(255) NOT NULL,
    "lastname" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "shitter" ADD PRIMARY KEY("id");
CREATE TABLE "a_shit"(
    "Shit ID" BIGINT NOT NULL,
    "user ID" BIGINT NOT NULL,
    "Toilet ID" BIGINT NOT NULL,
    "Time" DATE NOT NULL,
    "Rating" BIGINT NOT NULL,
    "Review" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "a_shit" ADD PRIMARY KEY("Shit ID");
CREATE TABLE "toilet"(
    "Toilet ID" BIGINT NOT NULL,
    "Location" BIGINT NOT NULL
);
ALTER TABLE
    "toilet" ADD PRIMARY KEY("Toilet ID");
ALTER TABLE
    "a_shit" ADD CONSTRAINT "a_shit_user id_foreign" FOREIGN KEY("user ID") REFERENCES "shitter"("id");
ALTER TABLE
    "a_shit" ADD CONSTRAINT "a_shit_toilet id_foreign" FOREIGN KEY("Toilet ID") REFERENCES "toilet"("Toilet ID");