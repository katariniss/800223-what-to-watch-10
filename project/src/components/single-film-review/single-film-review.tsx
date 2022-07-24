import { SingleReview } from '../../types/films';

type SingleFilmReviewProps = {
  review: SingleReview
}

function SingleFilmReview({review}: SingleFilmReviewProps): JSX.Element {
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{review.content}</p>
        <footer className="review__details">
          <cite className="review__author">{review.author}</cite>
          <time className="review__date" dateTime={review.reviewDate.toISOString()}>{review.reviewDate.toLocaleDateString('en-US')}</time>
        </footer>
      </blockquote>
      <div className="review__rating">{review.rating}</div>
    </div>
  );
}

export default SingleFilmReview;
