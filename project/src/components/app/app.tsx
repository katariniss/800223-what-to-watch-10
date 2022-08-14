import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { AppRoute } from '../../routing/app-route';
import PrivateRoute from '../private-route/private-route';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FilmPage from '../../pages/film-page/film-page';
import MyListPage from '../../pages/my-list-page/my-list-page';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import PlayerPage from '../../pages/player-page/player-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { Films, FilmReviews } from '../../types/films';
import ResetFilmList from '../../utils/resetFilmList';

type AppProps = {
  promoFilm: {
    name: string;
    genre: string;
    year: number;
  };
  films: Films;
  filmsReviews: FilmReviews;
}

function App({ promoFilm, films, filmsReviews }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <ResetFilmList />
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage films={films} promoFilm={promoFilm} />}
        />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.Film} element={<FilmPage films={films} filmsReviews={filmsReviews} />} />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <MyListPage films={films} />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.AddReview}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <AddReviewPage films={films} />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Player} element={<PlayerPage film={films[0]} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
