import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './components/app/app';
import ErrorMessage from './components/error-message/error-message';
import { checkAuthAction, fetchFavoriteFilms, fetchFilmAction, fetchPromoFilmAction } from './store/api-actions';

store.dispatch(checkAuthAction());
store.dispatch(fetchFilmAction());
store.dispatch(fetchPromoFilmAction());
store.dispatch(fetchFavoriteFilms());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App />
    </Provider>
  </React.StrictMode>,
);
