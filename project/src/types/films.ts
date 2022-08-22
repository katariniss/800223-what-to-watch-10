export type Film = {
  id: number;
  name: string;
  posterImage: string;
  previewImage: string;
  backgroundImage: string;
  videoLink: string;
  previewVideoLink: string;
  description: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: string[];
  runTime: number;
  genre: string;
  released: number;
  isFavorite: boolean;
  mark: string
};

export type FilmReview = {
  id: number,
  user: {
    id: number,
    name: string,
  },
  date: Date,
  rating: number,
  comment: string
};

export type UserInfo = {
  avatarUrl: string;
  name: string;
}
