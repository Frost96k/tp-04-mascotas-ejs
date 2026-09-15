const fs = require('node:fs/promises');
const path = require('node:path');

async function leerMascotas() {
  const rutaDatos = path.join(__dirname, '..', 'datos', 'mascotas.json');
  const contenido = await fs.readFile(rutaDatos, 'utf8');
  const mascotas = JSON.parse(contenido);

  if (!Array.isArray(mascotas)) {
    throw new Error('El archivo mascotas.json debe contener un arreglo.');
  }

  return mascotas;
}

module.exports = { leerMascotas };
