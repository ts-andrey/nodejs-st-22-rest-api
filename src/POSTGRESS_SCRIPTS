-- Install uuid extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    login character varying(30) NOT NULL,
    password character varying(30) NOT NULL,
    age integer NOT NULL,
    "isDeleted" boolean NOT NULL DEFAULT false,
    PRIMARY KEY (id),
    CONSTRAINT unique_fields UNIQUE (login),
    CONSTRAINT age_check CHECK (age >= 4 and age <= 130) NOT VALID
);

ALTER TABLE IF EXISTS public."Users"
    OWNER to ants;

COMMENT ON CONSTRAINT unique_fields ON public."Users"
    IS 'protection from overwriting existing resource';

COMMENT ON CONSTRAINT age_check ON public."Users"
    IS 'Age must be between 4 and 130';

-- Insert predifined user into the table
    
INSERT INTO public."Users" (login, password, age) VALUES ('EvilDead_1981', 'evil', 41);
INSERT INTO public."Users" (login, password, age) VALUES ('EvilDead_1987', 'veryEvil', 35);
INSERT INTO public."Users" (login, password, age) VALUES ('DarknessArmy_1993', 'veryManyEvil', 29);		