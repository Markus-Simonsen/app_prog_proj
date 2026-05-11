CREATE TABLE "user"(
    "userid" BIGSERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "password" VARCHAR(255) NOT NULL,
    "firstname" VARCHAR(255) NOT NULL,
    "lastname" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "user" ADD PRIMARY KEY("userid");

CREATE TABLE "visit"(
    "visitid" BIGSERIAL NOT NULL,
    "userid" BIGINT NOT NULL,
    "toiletid" BIGINT NOT NULL,
    "time" DATE NOT NULL,
    "rating" BIGINT NOT NULL,
    "review" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "visit" ADD PRIMARY KEY("visitid");

CREATE TABLE "toilet"(
    "toiletid" BIGSERIAL NOT NULL,
    "location" BIGINT NOT NULL
);
ALTER TABLE
    "toilet" ADD PRIMARY KEY("toiletid");

ALTER TABLE
    "visit" ADD CONSTRAINT "visit_userid_foreign" FOREIGN KEY("userid") REFERENCES "user"("userid");
ALTER TABLE
    "visit" ADD CONSTRAINT "visit_toiletid_foreign" FOREIGN KEY("toiletid") REFERENCES "toilet"("toiletid");


CREATE EXTENSION IF NOT EXISTS pgcrypto;