console.log('Patitas: recursos estáticos cargados.');

const carrusel = document.querySelector('[data-carrusel]');

if (carrusel) {
  const diapositivas = [...carrusel.querySelectorAll('.diapositiva')];
  const indicador = carrusel.querySelector('[data-indice]');
  let actual = 0;

  function mostrar(indice) {
    diapositivas[actual].classList.remove('activa');
    actual = (indice + diapositivas.length) % diapositivas.length;
    diapositivas[actual].classList.add('activa');
    indicador.textContent = actual + 1;
  }

  carrusel.querySelector('[data-anterior]').addEventListener('click', () => mostrar(actual - 1));
  carrusel.querySelector('[data-siguiente]').addEventListener('click', () => mostrar(actual + 1));
}
