INSERT INTO person VALUES (nextval('person_sequence'), 'Herbert', 'Schuhbauer', '1978-04-01');
INSERT INTO person VALUES (nextval('person_sequence'), 'Melanie', 'Gruber', '1993-11-23');

WITH persons AS (
    SELECT person_id AS id FROM person WHERE first_name='Herbert' AND last_name='Schuhbauer' AND BIRTHDAY='1978-04-01'
    )
INSERT INTO activity VALUES (nextval('activity_sequence'), (SELECT id FROM persons),'New Blog Page App', 'Today I wrote a new Blog Page App, it was fun', CURRENT_TIMESTAMP);

INSERT INTO location VALUES (nextval('location_sequence'), 'Fischbrunnen', 'Germany', 'Munich', 80919, 'Marienplatz', 11);

INSERT INTO activity_person VALUES (currval('activity_sequence'), currval('person_sequence'));

INSERT INTO activity_location VALUES (currval('activity_sequence'), currval('location_sequence'));