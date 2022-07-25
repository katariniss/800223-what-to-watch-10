import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { films } from './mocks/films';
import { reviews } from './mocks/reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const promoFilm = {
  name: 'The Grand Budapest Hotel',
  genre: 'Drama',
  year: 2014,
};

root.render(
  <React.StrictMode>
    <App
      promoFilm = {promoFilm}
      films={films}
      filmsReviews={reviews}
    />
  </React.StrictMode>,
);
