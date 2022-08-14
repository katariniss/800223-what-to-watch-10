import FilmCard from '../../components/film-card/film-card';
import { useAppSelector } from '../../hooks';

function FilmList(): JSX.Element {
  const {
    films,
    genre: currentGenre
  } = useAppSelector((state) => state);

  return (
    <div className="catalog__films-list">
      {
        films
          .filter((film) => !currentGenre || film.genre === currentGenre)
          .slice(0, 4)
          .map((film) => <FilmCard key={film.id} film={film} />)
      }
    </div>
  );
}

export default FilmList;
