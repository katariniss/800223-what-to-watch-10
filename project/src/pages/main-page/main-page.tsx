import { useAppDispatch, useAppSelector } from '../../hooks';
import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import FilmList from '../../components/film-list/film-list';
import GenreList from '../../components/genre-list/genre-list';
import UserBlock from '../../components/user-block/user-block';
import { useMemo } from 'react';
import { ALL_GENRES } from '../../const';
import { redirectToRoute } from '../../store/actions';
import ToggleFavorite from '../../components/toggle-favorite/toggle-favorite';

function MainPage(): JSX.Element {
  const {
    films,
    promoFilm,
    genre: currentGenre,
    numberOfFilmsToShow,
  } = useAppSelector((state) => state);

  const getFilmsFilteredByGenre = useMemo(
    () => films.filter((film) => !currentGenre || film.genre === currentGenre),
    [currentGenre, films]
  );

  const getFilmsFilteredByGenreToShow = useMemo(
    () => getFilmsFilteredByGenre.slice(0, numberOfFilmsToShow),
    [getFilmsFilteredByGenre, numberOfFilmsToShow]
  );

  const allGenres = useMemo(
    () => [ALL_GENRES, ...new Set(films.map(({ genre }) => genre))],
    [films]
  );

  const dispatch = useAppDispatch();

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img
            src={promoFilm.backgroundImage}
            alt={promoFilm.name}
          />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo />
          <UserBlock />
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img
                src={promoFilm.posterImage}
                alt={promoFilm.name}
                width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm.genre}</span>
                <span className="film-card__year">{promoFilm.released}</span>
              </p>

              <div className="film-card__buttons">
                <button
                  className="btn btn--play film-card__button"
                  type="button"
                  onClick={() => dispatch(redirectToRoute(`/player/${promoFilm.id}`))}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <ToggleFavorite id={promoFilm.id} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList
            currentGenre={currentGenre}
            genres={allGenres}
          />
          <FilmList
            films={getFilmsFilteredByGenreToShow}
            hasMoreFilmsToShow={getFilmsFilteredByGenre.length > numberOfFilmsToShow}
          />
        </section>
        <Footer />
      </div>
    </>
  );
}

export default MainPage;
