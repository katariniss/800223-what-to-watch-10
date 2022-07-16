export enum AppRoute {
    Main = '/',
    Login = '/login',
    Film = '/films/:id',
    MyList = '/my-list',
    AddReview = '/films/:id/review',
    Player = '/player/:id'
}

export enum AuthorizationStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN',
}
