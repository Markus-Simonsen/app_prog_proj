CREATE TABLE "shitter"(
    "shitterid" BIGINT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "firstname" VARCHAR(255) NOT NULL,
    "lastname" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "shitter" ADD PRIMARY KEY("shitterid");
CREATE TABLE "ashit"(
    "shitid" BIGINT NOT NULL,
    "shitterid" BIGINT NOT NULL,
    "toiletid" BIGINT NOT NULL,
    "time" DATE NOT NULL,
    "rating" BIGINT NOT NULL,
    "review" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "ashit" ADD PRIMARY KEY("shitid");
CREATE TABLE "toilet"(
    "toiletid" BIGINT NOT NULL,
    "location" BIGINT NOT NULL
);
ALTER TABLE
    "toilet" ADD PRIMARY KEY("toiletid");
ALTER TABLE
    "ashit" ADD CONSTRAINT "ashit_shitterid_foreign" FOREIGN KEY("shitterid") REFERENCES "shitter"("shitterid");
ALTER TABLE
    "ashit" ADD CONSTRAINT "ashit_toiletid_foreign" FOREIGN KEY("toiletid") REFERENCES "toilet"("toiletid");