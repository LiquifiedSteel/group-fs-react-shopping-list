-- Don't forget to add your create table SQL 
-- It is also helpful to include some test data

-- id, name, quantity (number BUT can take decimals), unit


CREATE TABLE items (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(80) NOT NULL,
    "quantity" DECIMAL(6, 2),
    "unit" VARCHAR(20)
);

INSERT INTO items ("name", "quantity", "unit")
VALUES ('Milk', '2', 'gallons'), ('Eggs', '12', 'cartons'), ('Juice', '1', 'bottle'), ('Cookies', '4', 'packages');

DROP TABLE items;