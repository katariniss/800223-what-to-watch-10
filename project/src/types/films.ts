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
  mark: string;
};

export type Films = Film[];

export type SingleReview = {
  id: string,
  author: string,
  reviewDate: Date,
  rating: number,
  content: string,
}

export type FilmReview = {
  filmId: string,
  review: SingleReview[],
}
