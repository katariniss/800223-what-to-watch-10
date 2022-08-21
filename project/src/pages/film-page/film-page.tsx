import { FilmReview } from '../../types/films';

import { Link, useParams } from 'react-router-dom';

import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import FilmTabs from '../../components/film-tabs/film-tabs';

import { buildFilmReviewPath } from '../../routing/redirect-service';
import FilmList from '../../components/film-list/film-list';
import UserBlock from '../../components/user-block/user-block';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { fetchCurrentFilmAction } from '../../store/api-actions';

// type FilmPageProps = {
//   films: Film[],
//   filmsReviews: FilmReview[],
// }

function FilmPage(): JSX.Element {
  const {
    currentFilm,
  } = useAppSelector((state) => state);

  const { id } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentFilmAction(id));
  }, [id]);

  const currentFilmReviews = ([] as FilmReview[]).find((review) => review.filmId === id) as FilmReview;
  // const currentFilmReviews = filmsReviews.find((review) => review.filmId === id) as FilmReview;

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img
              src={currentFilm?.backgroundImage}
              alt="The Grand Budapest Hotel"
            />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo />
            <UserBlock/>
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{currentFilm?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{currentFilm?.genre}</span>
                <span className="film-card__year">{currentFilm?.released}</span>
              </p>

              <div className="film-card__buttons">
                <button
                  className="btn btn--play film-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button
                  className="btn btn--list film-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                <Link to={buildFilmReviewPath(id as string)} className="btn film-card__button">
                  Add review
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img
                src={currentFilm?.posterImage}
                alt={currentFilm?.name}
                width="218"
                height="327"
              />
            </div>
            <FilmTabs film={currentFilm} filmReviews={currentFilmReviews?.review}/>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmList />
        </section>
        <Footer />
      </div>
    </>
  );
}

export default FilmPage;
