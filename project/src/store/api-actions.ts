import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { Film, FilmReview, UserReview } from '../types/films';
import {
  loadFilms,
  requireAuthorization,
  setError,
  setDataLoadedStatus,
  redirectToRoute,
  setUserInfo,
  loadCurrentFilm,
  loadSimilarFilms,
  loadReviews,
  loadPromoFilm,
  toggleFavorite,
  loadFavoriteFilms,
  setAuthLoadedStatus,
} from './actions';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { store } from './';
import { AppRoute } from '../routing/app-route';

export const clearErrorAction = createAsyncThunk(
  'film/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchFilmAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFilms',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Film[]>(APIRoute.Films);
    dispatch(setDataLoadedStatus(true));
    dispatch(loadFilms(data));
    dispatch(setDataLoadedStatus(false));
  },
);

export const fetchPromoFilmAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchPromoFilm',
  async (_arg, { dispatch, extra: api }) => {
    const { data: promoFilm } = await api.get<Film>(`${APIRoute.PromoFilm}`);
    dispatch(loadPromoFilm(promoFilm));
  }
);

export const fetchCurrentFilmAction = createAsyncThunk<void, string | undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchCurrentFilm',
  async (id, { dispatch, extra: api }) => {
    const { data: currentFilm } = await api.get<Film>(`${APIRoute.Films}/${id}`);
    const { data: similarFilms } = await api.get<Film[]>(`${APIRoute.Films}/${id}/similar`);
    const { data: reviews } = await api.get<FilmReview[]>(`${APIRoute.Reviews}/${id}`);
    dispatch(loadCurrentFilm(currentFilm));
    dispatch(loadSimilarFilms(similarFilms));
    dispatch(loadReviews(reviews));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setAuthLoadedStatus(true));
    try {
      const {
        data: {
          avatarUrl,
          name,
        }
      } = await api.get<UserData>(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUserInfo({
        avatarUrl,
        name,
      }));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
    dispatch(setAuthLoadedStatus(false));
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const {
      data: {
        token,
        avatarUrl,
        name,
      }
    } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setUserInfo({
      avatarUrl,
      name,
    }));
    dispatch(redirectToRoute(AppRoute.MyList));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);

export const postReviewAction = createAsyncThunk<void, UserReview, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/postReview',
  async ({
    comment,
    rating,
    filmId
  }, {
    dispatch,
    extra: api,
  }) => {
    const {
      data: reviews,
    } = await api.post<FilmReview[]>(`${APIRoute.Reviews}/${filmId}`, {
      comment,
      rating,
    });
    dispatch(loadReviews(reviews));
    dispatch(redirectToRoute(`films/${filmId}`));
  }
);

export const toggleFavoriteAction = createAsyncThunk<void, { id: number | string, add: boolean }, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/toggleFavorite',
  async ({ id, add }, {
    dispatch,
    extra: api,
  }) => {
    const {
      data: film,
    } = await api.post<Film>(`/favorite/${id}/${add ? 1 : 0}`);
    dispatch(toggleFavorite(film));
  }
);

export const fetchFavoriteFilms = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFavoriteFilms',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Film[]>('/favorite');
    dispatch(loadFavoriteFilms(data));
  },
);
