# Trabajo práctico 04

## Descripción

Aplicación web de mascotas en adopción construida con Express, EJS y `express-ejs-layouts`. Permite consultar el catálogo y agregar registros temporales.

## Instalación

```bash
npm install
```

## Ejecución

```bash
npm start
```

El servidor queda disponible en `http://localhost:3000`. Para revisar sintaxis: `npm run check`.

## Páginas y rutas

- `GET /`: página de inicio.
- `GET /mascotas`: listado de mascotas y estado vacío alternativo.
- `GET /mascotas/nueva`: formulario de alta.
- `GET /mascotas/:id`: detalle; un ID inexistente muestra una página HTML 404.
- `POST /mascotas`: valida y crea un registro en memoria.

## Estructura de vistas

El **layout** (`views/layouts/main.ejs`) contiene la estructura HTML común y el lugar donde se inserta cada página mediante `body`. Una **vista** representa el contenido particular de una ruta, por ejemplo el listado o el detalle. Un **parcial** es una porción reutilizable: encabezado y pie se incluyen en el layout.

Cada ruta entrega los datos necesarios a la vista con `res.render(nombreDeVista, datos)`. EJS los muestra con salida escapada para los datos de las mascotas.

## Recursos estáticos

`express.static` publica el contenido de `public`, por eso CSS, SVG y JavaScript se consultan como `/css/estilos.css`, `/img/mascota.svg` y `/js/app.js`, sin incluir `/public` en la URL.

## Formulario

`express.urlencoded({ extended: false })` interpreta los campos de formulario y los deja disponibles en `req.body`. El POST valida campos completos, edad numérica no negativa y estado permitido. Si hay un error, devuelve el formulario con estado 400, mensaje accesible y valores conservados. Si es válido, agrega la mascota, redirige con 302 a `/mascotas` y ese GET muestra la nueva tarjeta.

## Persistencia de los datos

Los cinco registros iniciales se leen desde `datos/mascotas.json` antes de iniciar el servidor. Las altas sólo se agregan al arreglo en memoria: no se escribe el JSON, de modo que desaparecen cuando se reinicia la aplicación.
