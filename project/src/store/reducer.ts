import { createReducer } from '@reduxjs/toolkit';
import { FILMS_PER_STEP_COUNT } from '../const';
import { Film, UserInfo } from '../types/films';
import {
  changeGenre,
  showMoreFilms,
  requireAuthorization,
  loadFilms,
  setError,
  setDataLoadedStatus,
  setUserInfo,
} from './actions';
import { AuthorizationStatus } from '../const';

export const DEFAULT_GENRE = 'All genres';

type FilmsStateType = {
  genre: string;
  films: Film[];
  numberOfFilmsToShow: number,
  authorizationStatus: AuthorizationStatus,
  userInfo: UserInfo,
  error: string | null,
  isDataLoaded: boolean,
}

const initialState: FilmsStateType = {
  genre: '',
  films: [],
  numberOfFilmsToShow: FILMS_PER_STEP_COUNT,
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: {
    avatarUrl: '',
    name: ''
  },
  error: null,
  isDataLoaded: false,
};

const reducer = createReducer(initialState, ((builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
      state.numberOfFilmsToShow = FILMS_PER_STEP_COUNT;
    })
    .addCase(showMoreFilms, (state, action) => {
      state.numberOfFilmsToShow += FILMS_PER_STEP_COUNT;
    })
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserInfo, (state, action) => {
      state.userInfo = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
}));

export { reducer };
