import FilmCard from '../../components/film-card/film-card';
import { FILMS_PER_STEP_COUNT } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { showMoreFilms } from '../../store/actions';

function FilmList(): JSX.Element {
  const dispatch = useAppDispatch();
  const filmsToShow = useAppSelector((state) => state.filmsPerStep);

  const {
    films,
    genre: currentGenre
  } = useAppSelector((state) => state);

  const filmsFilteredByGenre = films.filter((film) => !currentGenre || film.genre === currentGenre);

  return (
    <>
      <div className="catalog__films-list">
        <div className="catalog__films-list">
          {
            filmsFilteredByGenre
              .slice(0, filmsToShow)
              .map((film) => <FilmCard key={film.id} film={film} />)
          }
        </div>
      </div>

      {filmsFilteredByGenre.length > filmsToShow &&
        (
          <div className="catalog__more">
            <button
              onClick={() => dispatch(showMoreFilms(filmsToShow + FILMS_PER_STEP_COUNT))}
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
