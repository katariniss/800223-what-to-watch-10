import { Film } from '../../types/films';

type FilmOverviewProps = {
  film: Film
}

function FilmOverview({ film }: FilmOverviewProps): JSX.Element {
  const {
    rating,
    scoresCount,
    description,
    director,
    starring,
  } = film;

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{calculateMark(rating)}</span>
          <span className="film-rating__count">{`${scoresCount} ratings`}</span>
        </p>
      </div>
      <div className="film-card__text">
        <p>{description}</p>
        <p className="film-card__director"><strong>{`Director: ${director}`}</strong></p>
        <p className="film-card__starring"><strong>{`Starring: ${starring}`}</strong></p>
      </div>
    </>
  );
}

function calculateMark(rating: number) {
  if (rating < 3) {
    return 'Bad';
  } else if (rating >= 3 && rating < 5) {
    return 'Normal';
  } else if (rating >= 5 && rating < 8) {
    return 'Good';
  } else if (rating >= 8 && rating < 10) {
    return 'Very Good';
  } else {
    return 'Awesome';
  }
}

export default FilmOverview;
