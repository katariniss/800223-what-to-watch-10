import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../routing/app-route';
import PrivateRoute from '../private-route/private-route';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FilmPage from '../../pages/film-page/film-page';
import MyListPage from '../../pages/my-list-page/my-list-page';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import PlayerPage from '../../pages/player-page/player-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { useAppSelector } from '../../hooks';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import LoadingScreen from '../spinner/spinner';

function App(): JSX.Element {
  const {
    authorizationStatus,
    isDataLoaded,
    isAuthLoaded,
  } = useAppSelector((state) => state);

  if (isDataLoaded || isAuthLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage/>}
        />
        <Route path={AppRoute.Login} element={<LoginPage authorizationStatus={authorizationStatus} />} />
        <Route path={AppRoute.Film} element={<FilmPage />} />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <MyListPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.AddReview}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <AddReviewPage />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Player} element={<PlayerPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
