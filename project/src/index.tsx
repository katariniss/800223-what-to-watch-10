import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './components/app/app';
import ErrorMessage from './components/error-message/error-message';
import {checkAuthAction, fetchFilmAction} from './store/api-actions';

store.dispatch(fetchFilmAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const promoFilm = {
  id: 1,
  name: 'The Grand Budapest Hotel',
  genre: 'Drama',
  year: 2014,
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App
        promoFilm={promoFilm}
      />
    </Provider>
  </React.StrictMode>,
);
