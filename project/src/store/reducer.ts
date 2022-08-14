import { createReducer } from '@reduxjs/toolkit';
import { FILMS_PER_STEP_COUNT } from '../const';
import { Film } from '../types/films';
import { changeGenre, fetchFilms, showMoreFilms } from './actions';

export const DEFAULT_GENRE = 'All genres';

type FilmsStateType = {
  genre: string;
  films: Film[];
  filmsPerStep: number,
}

const initialState: FilmsStateType = {
  genre: '',
  films: [],
  filmsPerStep: FILMS_PER_STEP_COUNT,
};

const reducer = createReducer(initialState, ((builder) => {
  builder
    .addCase(fetchFilms, (state, action) => {
      state.films = action.payload;
      state.filmsPerStep = FILMS_PER_STEP_COUNT;
    })
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(showMoreFilms, (state, action) => {
      state.filmsPerStep = action.payload;
    });
}));

export {reducer};
