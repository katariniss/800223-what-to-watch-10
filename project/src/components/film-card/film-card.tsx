import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { TIMEOUT_TO_PLAY_PREVIEW } from '../../const';
import { Film } from '../../types/films';
import VideoPlayer from '../video-player/video-player';

type FilmCardProps = {
  film: Film;
};

function FilmCard(props: FilmCardProps): JSX.Element {

  const { film } = props;
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);

  return (
    <article className="small-film-card catalog__films-card"
      onMouseEnter={() => {
        setTimeout(() => {
          setIsPreviewPlaying((prevState) => !prevState);
        }, TIMEOUT_TO_PLAY_PREVIEW);
      }}
      onMouseLeave={() => {
        setIsPreviewPlaying(!isPreviewPlaying);
      }}
    >
      <div className="small-film-card__image">
        {isPreviewPlaying ? (
          <VideoPlayer player={film} />
        ) : (
          <img
            src={film.posterImage}
            alt={film.name}
            width="280"
            height="175"
          />
        )}
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${film.id}`}>
          {film.name}
        </Link>
      </h3>
    </article>
  );
}

export default memo(FilmCard, (prevFilm, nextFilm) => prevFilm.film.id === nextFilm.film.id);
