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

--this is to make shitterid in shitter table auto-generate and assign new ids whenever a new user signs in. This helps with page-signup.
CREATE SEQUENCE IF NOT EXISTS shitter_shitterid_seq OWNED BY "shitter"."shitterid";
ALTER TABLE "shitter" ALTER COLUMN "shitterid" SET DEFAULT nextval('shitter_shitterid_seq');
SELECT setval('shitter_shitterid_seq', (SELECT MAX(shitterid) FROM shitter));

-- the same for ashit table. This is to help the page-user-input.
CREATE SEQUENCE IF NOT EXISTS ashit_shitid_seq OWNED BY "ashit"."shitid";
ALTER TABLE "ashit" ALTER COLUMN "shitid" SET DEFAULT nextval('ashit_shitid_seq');
SELECT setval('ashit_shitid_seq', (SELECT MAX(shitid) FROM ashit));

-- and then toilet table.
CREATE SEQUENCE IF NOT EXISTS toilet_toiletid_seq OWNED BY "toilet"."toiletid";
ALTER TABLE "toilet" ALTER COLUMN "toiletid" SET DEFAULT nextval('toilet_toiletid_seq');
SELECT setval('toilet_toiletid_seq', (SELECT MAX(toiletid) FROM toilet));
