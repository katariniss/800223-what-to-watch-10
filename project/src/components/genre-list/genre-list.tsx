import { memo } from 'react';
import { useAppDispatch } from '../../hooks';
import { changeGenre } from '../../store/actions';

type GenreListProps = {
  genres: string[];
  currentGenre: string;
};

function GenreList({
  genres,
  currentGenre,
}: GenreListProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <ul className="catalog__genres-list">
      {
        genres.map((genre, index) => (
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

export default memo(GenreList);
