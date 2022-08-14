import {createAction} from '@reduxjs/toolkit';
import {films} from '../mocks/films';

export const changeGenre = createAction(
  'films/changeGenre',
  (name = '') => ({payload: name})
);

export const fetchFilms = createAction(
  'films/fetchFilms',
  () => ({payload: films})
);

// export const changeGenre = createAction<string>('film/changeGenre');

// export const getFilmList = createAction('film/getFilmList');
