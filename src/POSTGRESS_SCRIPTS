-- Database role creation
CREATE ROLE ants WITH
	LOGIN
	SUPERUSER
	CREATEDB
	CREATEROLE
	INHERIT
	REPLICATION
	CONNECTION LIMIT -1
	PASSWORD 'barelyAnt';
COMMENT ON ROLE ants IS 'administrator for node.js rest api database';

-- TABLE Users CREATION
CREATE TABLE public."Users"
(
    id serial NOT NULL,
    login character varying(30) NOT NULL,
    password character varying(30) NOT NULL,
    age integer NOT NULL,
    "isDeleted" boolean NOT NULL DEFAULT false,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public."Users"
    OWNER to ants;
    