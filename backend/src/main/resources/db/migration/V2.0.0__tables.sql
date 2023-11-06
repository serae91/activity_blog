CREATE TABLE activity
(
    activity_id     bigint                      NOT NULL,
    title           character varying(255)      NOT NULL,
    description     character varying(255)      DEFAULT '',
    post_time       timestamp without time zone NOT NULL,
    CONSTRAINT activity_pkey PRIMARY KEY (activity_id)
);

CREATE TABLE person
(
    person_id       bigint                      NOT NULL,
    first_name      character varying(255)      NOT NULL,
    last_name       character varying(255)      NOT NULL,
    birthday        DATE                        NOT NULL,
    CONSTRAINT person_pkey PRIMARY KEY (person_id)
);

CREATE TABLE location
(
    location_id     bigint                      NOT NULL,
    name            character varying(255)      NOT NULL,
    country         character varying(255)      NOT NULL,
    city            character varying(255)      DEFAULT '',
    street          character varying(255)      DEFAULT '',
    street_number   smallint,
    postal_code     smallint,
    CONSTRAINT location_pkey PRIMARY KEY (location_id)
);

CREATE TABLE activity_person
(
    activity_person_id  bigint                  NOT NULL,
    activity_id         bigint                  NOT NULL,
    person_id           bigint                  NOT NULL ,
    CONSTRAINT activity_person_pkey     PRIMARY KEY (activity_id),
    CONSTRAINT activity_fkey            FOREIGN KEY (activity_id)
        REFERENCES activity (activity_id),
    CONSTRAINT person_fkey              FOREIGN KEY (person_id)
        REFERENCES person (person_id),
    CONSTRAINT activity_person_unique   UNIQUE (activity_id, person_id)
);

CREATE TABLE activity_location
(
    activity_location_id bigint                  NOT NULL,
    activity_id          bigint                  NOT NULL,
    location_id          bigint                  NOT NULL,
    CONSTRAINT activity_location_pkey   PRIMARY KEY (activity_location_id),
    CONSTRAINT activity_fkey            FOREIGN KEY (activity_id)
        REFERENCES activity (activity_id),
    CONSTRAINT location_fkey            FOREIGN KEY (location_id)
        REFERENCES person (location_id),
    CONSTRAINT activity_location_unique UNIQUE (activity_id, location_id)
);
