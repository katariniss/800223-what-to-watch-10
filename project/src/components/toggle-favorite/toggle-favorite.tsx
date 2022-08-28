import { AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleFavoriteAction } from '../../store/api-actions';

function ToggleFavorite({
  id,
}: {
  id: number | string,
}): JSX.Element | null {
  const {
    favoriteFilms,
    authorizationStatus,
  } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  const favoriteFilm = favoriteFilms.find((film) => film.id === id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavoriteAction({
      id,
      add: !favoriteFilm,
    }));
  };

  return authorizationStatus === AuthorizationStatus.Auth ? (
    <button
      className="btn btn--list film-card__button"
      type="button"
      onClick={handleToggleFavorite}
    >
      <svg viewBox="0 0 19 20" width="19" height="20">
        {
          favoriteFilm
            ? <use xlinkHref="#in-list" />
            : <use xlinkHref="#add" />
        }
      </svg>
      <span>My list</span>
      <span className="film-card__count">{favoriteFilms.length}</span>
    </button>
  )
    : null;
}

export default ToggleFavorite;
