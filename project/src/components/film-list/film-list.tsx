import { Film } from '../../types/films';
import FilmCard from '../../components/film-card/film-card';
import { useAppDispatch } from '../../hooks';
import { showMoreFilms } from '../../store/actions';
import { memo } from 'react';

type FilmListProps = {
  films: Film[],
  hasMoreFilmsToShow: boolean,
}

function FilmList({
  films,
  hasMoreFilmsToShow,
}: FilmListProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="catalog__films-list">
        {
          films.map((film) => <FilmCard key={film.id} film={film} />)
        }
      </div>

      {hasMoreFilmsToShow &&
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

export default memo(FilmList);
