CREATE TABLE IF NOT EXISTS Point (
                                     id serial NOT NULL UNIQUE,
                                     x DOUBLE PRECISION NOT NULL ,
                                     y DOUBLE PRECISION NOT NULL,
                                     r DOUBLE PRECISION NOT NULL,
                                     coordsStatus BOOLEAN NOT NULL,
                                     bornDate TIMESTAMP NOT NULL
);

CREATE SEQUENCE hibernate_sequence START 1;

drop table point;
drop sequence hibernate_sequence;

select * from point;