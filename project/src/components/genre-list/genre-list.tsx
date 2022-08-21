import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeGenre } from '../../store/actions';
import { Film } from '../../types/films';
import { ALL_GENRES } from '../../const';

type GenreListProps = {
  films: Film[];
};

function GenreList({ films }: GenreListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const currentGenre = useAppSelector((state) => state.genre);

  const allGenres = [ALL_GENRES, ...new Set(films.map(({ genre }) => genre))];

  return (
    <ul className="catalog__genres-list">
      {
        allGenres.map((genre, index) => (
          <li
            onClick={(e) => {
              e.preventDefault();
              onGenreClick(index === 0 ? undefined : genre);
            }}
            key={genre}
            className={`catalog__genres-item ${(index === 0 ? !currentGenre : genre === currentGenre)
              ? 'catalog__genres-item--active'
              : ''}`}
          >
            <a href="/" className="catalog__genres-link">{genre}</a>
          </li>
        ))
      }
    </ul>
  );

  function onGenreClick(genre?: string) {
    dispatch(changeGenre(genre));
  }
}

export default GenreList;
