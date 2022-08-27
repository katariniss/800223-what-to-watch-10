import { createAction } from '@reduxjs/toolkit';
import { Film, FilmReview, UserInfo } from '../types/films';
import { AuthorizationStatus } from '../const';

export const changeGenre = createAction(
  'films/changeGenre',
  (name = '') => ({ payload: name })
);

export const showMoreFilms = createAction('main/showMoreFilms');

export const loadFilms = createAction<Film[]>('data/loadFilms');

export const loadPromoFilm = createAction<Film>('data/loadPromoFilm');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setUserInfo = createAction<UserInfo>('user/setUserInfo');

export const setError = createAction<string | null>('film/setError');

export const redirectToRoute = createAction<string>('film/redirectToRoute');

export const setDataLoadedStatus = createAction<boolean>('data/setDataLoadedStatus');

export const setAuthLoadedStatus = createAction<boolean>('data/setAuthLoadedStatus');

export const loadCurrentFilm = createAction<Film>('data/loadCurrentFilm');

export const loadSimilarFilms = createAction<Film[]>('data/loadSimilarFilms');

export const loadReviews = createAction<FilmReview[]>('data/loadReviews');

export const postReview = createAction<FilmReview[]>('data/postReview');

export const toggleFavorite = createAction<Film>('data/toggleFavorite');

export const loadFavoriteFilms = createAction<Film[]>('data/loadFavoriteFilms');
