import { createReducer } from '@reduxjs/toolkit';
import { Film } from '../types/films';
import { changeGenre, fetchFilms } from './actions';

export const DEFAULT_GENRE = 'All genres';

type FilmsStateType = {
  genre: string;
  films: Film[];
}

const initialState: FilmsStateType = {
  genre: '',
  films: [],
};

const reducer = createReducer(initialState, ((builder) => {
  builder
    .addCase(fetchFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    });
}));

export {reducer};
