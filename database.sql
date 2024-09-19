-- Don't forget to add your create table SQL 
-- It is also helpful to include some test data

-- id, name, quantity (number BUT can take decimals), unit


CREATE TABLE items (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(80) NOT NULL,
    "quantity" DECIMAL(6, 2),
    "unit" VARCHAR(20),
    "pricePerUnit" DECIMAL(8,2) DEFAULT '0',
    "isPurchased" BOOLEAN DEFAULT FALSE
);

INSERT INTO items ("name", "quantity", "unit", "pricePerUnit")
VALUES ('Milk', '2', 'gallons', '8.50'), ('Eggs', '12', 'cartons', '4.99'), ('Juice', '1', 'bottle', '6.00'), ('Cookies', '4', 'packages', '10.99');

DROP TABLE items;