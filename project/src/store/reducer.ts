import { createReducer } from '@reduxjs/toolkit';
import { FILMS_PER_STEP_COUNT } from '../const';
import {
  Film,
  FilmReview,
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
  postReview,
  loadPromoFilm,
  toggleFavorite,
  loadFavoriteFilms,
  setAuthLoadedStatus,
} from './actions';
import { AuthorizationStatus } from '../const';

export const DEFAULT_GENRE = 'All genres';

type FilmsStateType = {
  genre: string;
  currentFilm: Film,
  promoFilm: Film,
  films: Film[];
  numberOfFilmsToShow: number,
  authorizationStatus: AuthorizationStatus,
  userInfo: UserInfo,
  error: string | null,
  isAuthLoaded: boolean,
  isDataLoaded: boolean,
  isCurrentFilmDataLoaded: boolean,
  reviews: FilmReview[],
  similarFilms: Film[],
  favoriteFilms: Film[],
}

const initialState: FilmsStateType = {
  genre: '',
  films: [],
  currentFilm: {} as Film,
  promoFilm: {} as Film,
  numberOfFilmsToShow: FILMS_PER_STEP_COUNT,
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: {
    avatarUrl: '',
    name: ''
  },
  error: null,
  isAuthLoaded: false,
  isDataLoaded: false,
  isCurrentFilmDataLoaded: false,
  similarFilms: [],
  reviews: [],
  favoriteFilms: [],
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
    .addCase(setAuthLoadedStatus, (state, action) => {
      state.isAuthLoaded = action.payload;
    })
    .addCase(loadCurrentFilm, (state, action) => {
      state.currentFilm = action.payload;
    })
    .addCase(loadPromoFilm, (state, action) => {
      state.promoFilm = action.payload;
    })
    .addCase(loadSimilarFilms, (state, action) => {
      state.similarFilms = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(postReview, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(loadFavoriteFilms, (state, action) => {
      state.favoriteFilms = action.payload;
    })
    .addCase(toggleFavorite, (state, action) => {
      const filmInListOfAllFilms = state.films.find((film) => film.id === Number(action.payload.id)) as Film;
      filmInListOfAllFilms.isFavorite = action.payload.isFavorite;

      if (state.currentFilm.id === action.payload.id) {
        state.currentFilm.isFavorite = action.payload.isFavorite;
      }

      if (filmInListOfAllFilms.isFavorite) {
        if (state.favoriteFilms.every((film) => film.id !== filmInListOfAllFilms.id)) {
          state.favoriteFilms.push(filmInListOfAllFilms);
        }
      } else {
        const indexInFavoriteFiles = state.favoriteFilms.findIndex((film) => film.id === Number(action.payload.id));

        if (indexInFavoriteFiles !== -1) {
          state.favoriteFilms.splice(indexInFavoriteFiles, 1);
        }
      }
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
}));

export { reducer };
