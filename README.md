# reservarepo

## Instroduccion

El proyecto esta realizado usando 

Frontend
  *React
  *Redux

Backend
  *Node
  *Express

Base de datos
  *mySQL

## Instalacion

El proyecto esta dividido en la carpeta del front y la carpeta del backend. Una vez decargado hay que instalar los paquetes del backend y el frontend.

```bash
$ npm install
```

## Correr el proyecto

### base de datos
En la carpeta /backend se encuentra el archivo .sql que contiene la base de datos que fue realizada con MySQL.
Primero debe instalarse en el ordenador de prueba. Una vez instalado estara listo para ser conectado con el backend en node (de tener el manejador de base de datos con una contrasena debera ser agregada al archivo /backend/db.js

### frontend

```bash
$ npm start
```

### backend
```bash
$ nodemon app.js
```

### Uso

La base de datos contiene unos datos de prueba que pueden ser usados, en este caso
```bash
email: luisa@guerra.com
contraseña: contra
```

Tambien es posible crear un usuario administrador con postman haciendo uso del endpoint

```bash
http://localhost:4000/generarAdmin
```

Realizando una consulta POST con la siguiente estructura

```bash
{
    "nombre": "Luis",
    "apellido": "Guerra",
    "email": "luisa@guerra.com",
    "contrasena": "contra"
}
```
