function capitalizeFirstLetter(str) {
  if (str && typeof str === 'string' && str.length > 0) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  // Si str no está definido, no es una cadena válida o está vacío, devuelve un valor predeterminado o maneja el caso según tus necesidades.
  return ''; // O cualquier otro valor predeterminado que desees
}

export default capitalizeFirstLetter;
