import { Film } from '../../types/films';
import { Link } from 'react-router-dom';

type FilmCardProps = {
  film: Film;
  mouseEnterHandler(film: Film): void;
};

function FilmCard(props: FilmCardProps): JSX.Element {

  const { film, mouseEnterHandler } = props;

  return (
    <article className="small-film-card catalog__films-card"
      onMouseOver={() => mouseEnterHandler(film)}
    >
      <div className="small-film-card__image">
        <img
          src={film.posterImage}
          alt={film.name}
          width="280"
          height="175"
        />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${film.id}`}>
          {film.name}
        </Link>
      </h3>
    </article>
  );
}

export default FilmCard;
