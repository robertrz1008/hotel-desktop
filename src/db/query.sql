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