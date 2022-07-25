import { Film } from '../../types/films';
import FilmCard from '../../components/film-card/film-card';

type FilmListProps = {
  films: Film[],
  genre?: string
}

function FilmList({ films, genre }: FilmListProps): JSX.Element {
  if (genre) {
    const filmsByGenre = films.filter((film) => film.genre === genre).slice(0, 4);
    films = filmsByGenre;
  }

  return (
    <div className="catalog__films-list">
      {films.map((film) => <FilmCard key={film.id} film={film} />)}
    </div>
  );
}

export default FilmList;
