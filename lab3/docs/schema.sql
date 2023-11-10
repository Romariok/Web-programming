CREATE SEQUENCE gen_seq;
CREATE TABLE IF NOT EXISTS Point (
                                     id serial NOT NULL UNIQUE,
                                     x_4 BOOLEAN NOT NULL ,
                                     x_3 BOOLEAN NOT NULL ,
                                     x_2 BOOLEAN NOT NULL ,
                                     x_1 BOOLEAN NOT NULL ,
                                     x0 BOOLEAN NOT NULL ,
                                     x1 BOOLEAN NOT NULL ,
                                     x2 BOOLEAN NOT NULL ,
                                     x3 BOOLEAN NOT NULL ,
                                     x4 BOOLEAN NOT NULL ,
                                     y DOUBLE PRECISION NOT NULL,
                                     r DOUBLE PRECISION NOT NULL,
                                     coordsStatus BOOLEAN NOT NULL,
                                     bornDate TIMESTAMP NOT NULL
);

CREATE SEQUENCE hibernate_sequence START 1;
CREATE TABLE IF NOT EXISTS Point (
                                     id serial NOT NULL UNIQUE,
                                     x1 DOUBLE PRECISION NOT NULL ,
                                     x1_5 DOUBLE PRECISION NOT NULL ,
                                     x2 DOUBLE PRECISION NOT NULL ,
                                     x2_5 DOUBLE PRECISION NOT NULL ,
                                     x3 DOUBLE PRECISION NOT NULL ,
                                     y DOUBLE PRECISION NOT NULL,
                                     r DOUBLE PRECISION NOT NULL,
                                     coordsStatus BOOLEAN NOT NULL,
                                     bornDate TIMESTAMP NOT NULL
);
