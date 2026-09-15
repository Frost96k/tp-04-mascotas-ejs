const path = require('node:path');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { leerMascotas } = require('./archivos');

const app = express();
const PUERTO = process.env.PORT || 3000;
const ESTADOS_VALIDOS = ['En adopción', 'Reservada', 'Adoptada'];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.urlencoded({ extended: false }));

let mascotas = [];

app.get('/', (req, res) => {
  res.status(200).render('inicio', { titulo: 'Mascotas en adopción' });
});

app.get('/mascotas', (req, res) => {
  res.status(200).render('mascotas/lista', {
    titulo: 'Catálogo de mascotas',
    mascotas
  });
});

app.get('/mascotas/nueva', (req, res) => {
  res.status(200).render('mascotas/nueva', {
    titulo: 'Agregar mascota',
    mascota: {},
    error: null,
    estados: ESTADOS_VALIDOS
  });
});

app.get('/mascotas/:id', (req, res) => {
  const id = Number(req.params.id);
  const mascota = mascotas.find((registro) => registro.id === id);

  if (!mascota) {
    return res.status(404).render('no-encontrado', {
      titulo: 'Mascota no encontrada',
      mensaje: 'No encontramos una mascota con el identificador solicitado.'
    });
  }

  return res.status(200).render('mascotas/detalle', {
    titulo: mascota.nombre,
    mascota
  });
});

app.post('/mascotas', (req, res) => {
  const mascota = {
    nombre: (req.body.nombre || '').trim(),
    especie: (req.body.especie || '').trim(),
    edad: req.body.edad,
    estado: req.body.estado || '',
    descripcion: (req.body.descripcion || '').trim()
  };
  const edad = Number(mascota.edad);
  const completa = mascota.nombre && mascota.especie && mascota.edad !== '' && mascota.estado && mascota.descripcion;

  if (!completa || !Number.isFinite(edad) || edad < 0 || !ESTADOS_VALIDOS.includes(mascota.estado)) {
    return res.status(400).render('mascotas/nueva', {
      titulo: 'Agregar mascota',
      mascota,
      error: 'Completá todos los campos con una edad válida (cero o mayor).',
      estados: ESTADOS_VALIDOS
    });
  }

  const proximoId = mascotas.length === 0 ? 1 : Math.max(...mascotas.map((registro) => registro.id)) + 1;
  mascotas.push({ ...mascota, id: proximoId, edad, imagen: '/img/mascota.svg' });
  return res.redirect('/mascotas');
});

leerMascotas()
  .then((datos) => {
    mascotas = datos;
    app.listen(PUERTO, () => console.log(`Servidor disponible en http://localhost:${PUERTO}`));
  })
  .catch((error) => {
    console.error(`No se pudo iniciar la aplicación: ${error.message}`);
    process.exitCode = 1;
  });
