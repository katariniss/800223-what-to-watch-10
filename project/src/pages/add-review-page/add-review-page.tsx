import { Link, useParams } from 'react-router-dom';
import { Film } from '../../types/films';
import Logo from '../../components/logo/logo';
import ReviewForm from '../../components/review-form/review-form';
import { buildFilmPath } from '../../routing/redirect-service';
import UserBlock from '../../components/user-block/user-block';
import { useAppSelector } from '../../hooks';

function AddReviewPage(): JSX.Element {
  const params = useParams();

  const {
    films,
  } = useAppSelector((state) => state);

  const currentFilm = films.find(
    (film) => film.id === Number(params.id)
  ) as Film;

  const {
    id,
    name,
    posterImage,
    backgroundImage
  } = currentFilm;

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={backgroundImage} alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo />
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={buildFilmPath(id)} className="breadcrumbs__link">{name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <UserBlock />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={posterImage} alt={`${name} posterImage`} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <ReviewForm />
      </div>
    </section>
  );
}

export default AddReviewPage;
