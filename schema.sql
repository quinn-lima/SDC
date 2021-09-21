CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE SCHEMA reviews_schema
AUTHORIZATION quinnlima

    CREATE TABLE reviews (
        reviews_key UUID DEFAULT uuid_generate_v4 (),
        id serial NOT NULL UNIQUE,
        product_id INT NOT NULL,
        rating INT NOT NULL,
        date NUMERIC,
        summary VARCHAR(150),
        body VARCHAR(1000),
        recommend BOOLEAN,
        reported BOOLEAN,
        reviewer_name varchar(50),
        reviewer_email varchar(60),
        response varchar(300),
        helpfulness NUMERIC,
        Primary Key (id)
    )
    CREATE INDEX ON reviews(product_id)

    CREATE TABLE characteristics (
        characteristics_key UUID DEFAULT uuid_generate_v4 (),
        id serial NOT NULL UNIQUE,
        product_id INT NOT NULL,
        name VARCHAR (15),
        Primary Key (id)
    )
    CREATE INDEX ON characteristics(product_id)
  
    CREATE TABLE reviews_photos (
        reviews_photos_key UUID DEFAULT uuid_generate_v4 (),
        id serial NOT NULL UNIQUE,
        review_id INT REFERENCES reviews (id),
        url TEXT,
        Primary Key (id)
    )
    CREATE INDEX ON reviews_photos(review_id)

    CREATE TABLE characteristics_reviews (
        characteristics_reviews_key UUID DEFAULT uuid_generate_v4 (),
        id serial NOT NULL UNIQUE,
        characteristic_id INT REFERENCES characteristics (id),
        review_id INT REFERENCES reviews (id),
        value INT NOT NULL,
        Primary Key (id)
    )
    CREATE INDEX ON characteristics_reviews(characteristic_id)





