import { createReducer } from '@reduxjs/toolkit';
import { FILMS_PER_STEP_COUNT } from '../const';
import { Film } from '../types/films';
import { changeGenre, fetchFilms, showMoreFilms } from './actions';

export const DEFAULT_GENRE = 'All genres';

type FilmsStateType = {
  genre: string;
  films: Film[];
  numberOfFilmsToShow: number,
}

const initialState: FilmsStateType = {
  genre: '',
  films: [],
  numberOfFilmsToShow: FILMS_PER_STEP_COUNT,
};

const reducer = createReducer(initialState, ((builder) => {
  builder
    .addCase(fetchFilms, (state, action) => {
      state.films = action.payload;
      state.numberOfFilmsToShow = FILMS_PER_STEP_COUNT;
    })
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(showMoreFilms, (state, action) => {
      state.numberOfFilmsToShow += FILMS_PER_STEP_COUNT;
    });
}));

export {reducer};
