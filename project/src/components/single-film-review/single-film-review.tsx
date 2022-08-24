import { FilmReview } from '../../types/films';

type SingleFilmReviewProps = {
  review: FilmReview
}

function SingleFilmReview({ review }: SingleFilmReviewProps): JSX.Element {
  const { date, comment, user, rating } = review;
  const dateToFormat = new Date(date);

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>
        <footer className="review__details">
          <cite className="review__author">{user.name}</cite>
          <time className="review__date" dateTime={dateToFormat.toISOString()}>{dateToFormat.toLocaleDateString('en-US')}</time>
        </footer>
      </blockquote>
      <div className="review__rating">{rating}</div>
    </div>
  );
}

export default SingleFilmReview;
