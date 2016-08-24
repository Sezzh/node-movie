CREATE DATABASE index_example;

\c index_example;

CREATE TABLE movie(
   id serial primary key,
   title varchar(255) not null,
   year integer not null
);
