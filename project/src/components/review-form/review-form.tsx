import { Fragment, useState, FormEvent } from 'react';
import { useAppDispatch } from '../../hooks';
import { postReviewAction } from '../../store/api-actions';
import { useParams } from 'react-router-dom';

function ReviewForm(): JSX.Element {
  type formSubmit = FormEvent<HTMLFormElement>;
  const {
    id: filmId,
  } = useParams();
  const dispatch = useAppDispatch();

  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');
  const isValid = userComment.length >= 50 && userComment.length <= 400 && userRating > 0;
  const [isPosting, setIsPosting] = useState(false);

  const handleFormSubmit = async (evt: formSubmit) => {
    evt.preventDefault();

    const userReview = {
      comment: userComment,
      rating: userRating,
      filmId: filmId as string,
    };
    setIsPosting(true);
    const result = await dispatch(postReviewAction(userReview));
    setIsPosting(false);

    if (result.type === 'data/postReview/rejected') {
      // eslint-disable-next-line no-alert
      alert('Oops! Something went wrong.');
    }
  };

  return (
    <form action="#" className="add-review__form" onSubmit={handleFormSubmit}>
      <div className="rating">
        <div className="rating__stars">
          {
            Array.from(Array(10), (value, index) => index + 1)
              .reverse()
              .map((number) => (
                <Fragment key={number}>
                  <input
                    className="rating__input"
                    id={`star-${number}`}
                    type="radio" name="rating"
                    value={userRating}
                    onChange={(evt) => setUserRating(number)}
                    disabled={isPosting}
                  />
                  <label
                    className="rating__label"
                    htmlFor={`star-${number}`}
                  >
                    Rating {number}
                  </label>
                </Fragment>
              ))
          }
        </div>
      </div>
      <div className="add-review__text">
        <textarea
          className="add-review__textarea"
          name="review-text"
          id="review-text"
          placeholder="Review text"
          value={userComment}
          onChange={(evt) => setUserComment(evt.target.value)}
          disabled={isPosting}
        />
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" disabled={!isValid || isPosting}>Post</button>
        </div>
      </div>
    </form>
  );
}

export default ReviewForm;
