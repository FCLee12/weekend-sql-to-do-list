CREATE TABLE "toDos" (
  "id" serial primary key,
  "task" varchar(250) not null,
  "complete" boolean default false
);

-- Example tasks to insert
INSERT INTO "toDos" ("task") 
VALUES ('Grab tomato sauce'),
('Go to the gym'),
('Check-in meeting at 3:00PM'),
('Lunch with Jane at 11:30AM');

-- Selects all and orders by ID
SELECT * FROM "toDos"
ORDER BY "id" ASC;