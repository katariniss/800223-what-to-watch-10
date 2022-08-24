import { AppRoute } from '../routing/app-route';
import { store } from '../store';
import { redirectToRoute, setError } from '../store/actions';
import { clearErrorAction } from '../store/api-actions';

export const processErrorHandle = (message: string): void => {
  store.dispatch(setError(message));
  store.dispatch(clearErrorAction());
};

export const processNotFound = (): void => {
  store.dispatch(redirectToRoute(AppRoute.NotFound));
};
