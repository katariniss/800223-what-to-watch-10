export {
  buildFilmPath,
  buildFilmReviewPath,
};

type FilmId = string | number;

function buildFilmPath(filmId: FilmId) {
  return `/films/${filmId}`;
}

function buildFilmReviewPath(filmId: FilmId) {
  return `${buildFilmPath(filmId)}/review`;
}
