import { useState } from 'react';
import { Film } from '../../types/films';
import FilmCard from '../../components/film-card/film-card';

type FilmListProps = {
  films: Film[]
}

function FilmList({ films }: FilmListProps): JSX.Element {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedFilm, setSelectedFilm] = useState({});

  // const mouseEnterHandler = (id: number) => {
  //   const activeFilm = films.filter((film) => film.id === id);
  //   setSelectedFilm(activeFilm);
  // };

  const mouseEnterHandler = (film: Film) => {
    setSelectedFilm(film);
  };

  return (
    <div className="catalog__films-list">
      {films.map((film) => <FilmCard key={film.id} film={film} mouseEnterHandler={mouseEnterHandler} />)}
    </div>
  );
}

export default FilmList;
