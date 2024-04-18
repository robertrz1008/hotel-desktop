-- Active: 1700335799467@@127.0.0.1@3300@hoteldb
create table clientes(
    id int AUTO_INCREMENT,
    cedula VARCHAR(20) NOT NULL,
    nombre VARCHAR(25) NOT NULL,
    apellido VARCHAR(25) not NULL,
    direccion VARCHAR(45) DEFAULT "desconocido",
    telefono VARCHAR(20) NOT NULL, 
    PRIMARY KEY(id)
)

create Table habitaciones(
    id int AUTO_INCREMENT,
    descripcion VARCHAR(50) not null,
    montoDia DOUBLE not NULL,
    observacion VARCHAR(35) NOT NULL,
    PRIMARY KEY(id)
);
SELECT MAX(id) from clientes;

create table estadias(
    id int AUTO_INCREMENT,
    cli_id int NOT NULL,
    hab_id int not null,
    entrada TIMESTAMP DEFAULT  CURRENT_TIMESTAMP,
    total DOUBLE not NULL, 
    salida TIMESTAMP,
    estado int not null,
    observacion varchar(100),
    Foreign Key (cli_id) REFERENCES clientes(id),
    Foreign Key (hab_id) REFERENCES habitaciones(id),
    PRIMARY KEY(id)
);


create table detalles(
    id int AUTO_INCREMENT,
    estadia_id int NOT NULL,
    servicio_id int NOT NULL,
    costo DOUBLE NOT null,
    subtotal DOUBLE not NULL, 
    cantidad int,
    Foreign Key (servicio_id) REFERENCES servicios(id),
    PRIMARY KEY(id)
);
drop table detalles;

create TABLE configuracion(
    id int AUTO_INCREMENT,
    empresa VARCHAR(45) not NULL,
    telefono VARCHAR(45) NOT NULL,
    direccion VARCHAR(45) NOT NULL,
    PRIMARY key(id)
)

select 
    es.id, 
    cli.nombre, 
    cli.apellido, 
    cli.cedula, 
    hab.descripcion, 
    es.entrada, 
    es.estado, 
    es.entrada, 
    es.salida, 
    es.observacion AS "est_observacion",
    es.total
from estadias as es 
    JOIN clientes as cli
on es.cli_id = cli.id
    JOIN habitaciones as hab 
on es.hab_id = hab.id;

select * from detalles;

select 