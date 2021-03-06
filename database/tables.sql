CREATE DATABASE "banco_projeto16";

CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "createAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "links" (
    "id" SERIAL PRIMARY KEY,
    "shortUrl" TEXT NOT NULL UNIQUE,
    "url" TEXT NOT NULL,
    "visitCount" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL REFERENCES "users"("id"),
    "createAt" TIMESTAMP NOT NULL DEFAULT NOW()
);