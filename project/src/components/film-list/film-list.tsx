import FilmCard from '../../components/film-card/film-card';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { showMoreFilms } from '../../store/actions';

function FilmList(): JSX.Element {
  const dispatch = useAppDispatch();

  const {
    films,
    genre: currentGenre,
    numberOfFilmsToShow,
  } = useAppSelector((state) => state);

  const filmsFilteredByGenre = films.filter((film) => !currentGenre || film.genre === currentGenre);

  return (
    <>
      <div className="catalog__films-list">
        <div className="catalog__films-list">
          {
            filmsFilteredByGenre
              .slice(0, numberOfFilmsToShow)
              .map((film) => <FilmCard key={film.id} film={film} />)
          }
        </div>
      </div>

      {filmsFilteredByGenre.length > numberOfFilmsToShow &&
        (
          <div className="catalog__more">
            <button
              onClick={() => dispatch(showMoreFilms())}
              className="catalog__button"
              type="button"
            >
              Show more
            </button>
          </div>
        )}
    </>
  );
}

export default FilmList;
