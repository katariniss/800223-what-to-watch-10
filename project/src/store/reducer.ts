import { createReducer } from '@reduxjs/toolkit';
import { FILMS_PER_STEP_COUNT } from '../const';
import {
  Film,
  FilmReviews,
  Films,
  UserInfo
} from '../types/films';
import {
  changeGenre,
  showMoreFilms,
  requireAuthorization,
  loadFilms,
  setError,
  setDataLoadedStatus,
  setUserInfo,
  loadCurrentFilm,
  loadSimilarFilms,
  loadReviews,
} from './actions';
import { AuthorizationStatus } from '../const';

export const DEFAULT_GENRE = 'All genres';

type FilmsStateType = {
  genre: string;
  currentFilm: Film,
  films: Film[];
  numberOfFilmsToShow: number,
  authorizationStatus: AuthorizationStatus,
  userInfo: UserInfo,
  error: string | null,
  isDataLoaded: boolean,
  isCurrentFilmDataLoaded: boolean,
  reviews: FilmReviews,
  similarFilms: Films,
}

const initialState: FilmsStateType = {
  genre: '',
  films: [],
  currentFilm: {} as Film,
  numberOfFilmsToShow: FILMS_PER_STEP_COUNT,
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: {
    avatarUrl: '',
    name: ''
  },
  error: null,
  isDataLoaded: false,
  isCurrentFilmDataLoaded: false,
  similarFilms: [],
  reviews: [],
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
    .addCase(loadCurrentFilm, (state, action) => {
      state.currentFilm = action.payload;
    })
    // .addCase(setCurrentFilmDataLoadedStatus, (state, action) => {
    //   state.isCurrentFilmDataLoaded = action.payload;
    // })
    .addCase(loadSimilarFilms, (state, action) => {
      state.similarFilms = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
}));

export { reducer };
