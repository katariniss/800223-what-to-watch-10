import { Fragment, useState } from 'react';

function ReviewForm(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState('');

  return (
    <form action="#" className="add-review__form">
      <div className="rating">
        <div className="rating__stars">
          {
            Array.from(Array(10), (value, index) => index + 1)
              // .sort((a, b) => a - b)
              .reverse()
              .map((number) => (
                <Fragment key={number}>
                  <input
                    className="rating__input"
                    id={`star-${number}`}
                    type="radio" name="rating"
                    value={number}
                    onChange={(evt) => setUserRating(Number(evt.target.value))}
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
          value={userReview}
          onChange={(evt) => setUserReview(evt.target.value)}
        />
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">Post</button>
        </div>

      </div>
    </form>
  );
}

export default ReviewForm;
