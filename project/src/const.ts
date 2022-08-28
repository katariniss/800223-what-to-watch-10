export enum AuthorizationStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN'
}

export enum FilmTabName {
    Overview = 'OVERVIEW',
    Details = 'DETAILS',
    Reviews = 'REVIEWS'
}

export const ALL_GENRES = 'All genres';

export const FILMS_PER_STEP_COUNT = 8;

export enum APIRoute {
    Films = '/films',
    Login = '/login',
    Logout = '/logout',
    Reviews = '/comments',
    PromoFilm = '/promo',
}

export const TIMEOUT_SHOW_ERROR = 2000;

export const USER_COMMENT_MIN_LENGTH = 50;
export const USER_COMMENT_MAX_LENGTH = 400;
