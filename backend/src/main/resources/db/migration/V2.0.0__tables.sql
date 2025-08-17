CREATE TABLE person
(
    person_id       bigint                      NOT NULL,
    first_name      character varying(255)      NOT NULL,
    last_name       character varying(255)      NOT NULL,
    birthday        timestamp without time zone NOT NULL,
    CONSTRAINT person_pkey PRIMARY KEY (person_id),
    CONSTRAINT person_attributes_unique   UNIQUE (first_name, last_name, birthday)
);

CREATE TABLE activity
(
    activity_id     bigint                      NOT NULL,
    author_id       bigint                      NOT NULL,
    title           character varying(255)      NOT NULL,
    description     character varying(255)      DEFAULT '',
    post_time       timestamp without time zone NOT NULL,
    CONSTRAINT activity_pkey PRIMARY KEY (activity_id),
    CONSTRAINT author_fkey   FOREIGN KEY (author_id)
        REFERENCES person (person_id)
);
CREATE TABLE location
(
    location_id     bigint                      NOT NULL,
    name            character varying(255)      NOT NULL,
    country         character varying(255)      NOT NULL,
    city            character varying(255)      NOT NULL,
    postal_code     integer                     NOT NULL,
    street          character varying(255)      NOT NULL,
    street_number   integer                     NOT NULL,
    CONSTRAINT location_pkey PRIMARY KEY (location_id),
    CONSTRAINT location_name_unique   UNIQUE (name),
    CONSTRAINT location_attributes_unique   UNIQUE (country, postal_code, street, street_number)
);

CREATE TABLE activity_person
(
    activity_id         bigint                  NOT NULL,
    person_id           bigint                  NOT NULL ,
    CONSTRAINT activity_person_pkey     PRIMARY KEY (activity_id, person_id),
    CONSTRAINT activity_fkey            FOREIGN KEY (activity_id)
        REFERENCES activity (activity_id) ON DELETE CASCADE,
    CONSTRAINT person_fkey              FOREIGN KEY (person_id)
        REFERENCES person (person_id) ON DELETE CASCADE
);

CREATE TABLE activity_location
(
    activity_id          bigint                  NOT NULL,
    location_id          bigint                  NOT NULL,
    CONSTRAINT activity_location_pkey   PRIMARY KEY (activity_id, location_id),
    CONSTRAINT activity_fkey            FOREIGN KEY (activity_id)
        REFERENCES activity (activity_id) ON DELETE CASCADE,
    CONSTRAINT location_fkey            FOREIGN KEY (location_id)
        REFERENCES location (location_id) ON DELETE CASCADE
);
