import { FilmReview } from '../../types/films';
import { format } from 'date-fns';

type SingleFilmReviewProps = {
  review: FilmReview
}

function SingleFilmReview({
  review: {
    date,
    comment,
    user,
    rating
  }
}: SingleFilmReviewProps): JSX.Element {
  const dateToFormat = new Date(date);

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>
        <footer className="review__details">
          <cite className="review__author">{user.name}</cite>
          <time className="review__date" dateTime={dateToFormat.toISOString()}>{format(dateToFormat, 'MMMM dd, yyyy')}</time>
        </footer>
      </blockquote>
      <div className="review__rating">{rating}</div>
    </div>
  );
}

export default SingleFilmReview;
