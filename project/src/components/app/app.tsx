import MainPage from '../../pages/main-page/main-page';

type AppProps = {
  filmsNumberToRender: number;
  promoFilm: {
    name: string;
    genre: string;
    year: number;
  }
}

function App({filmsNumberToRender, promoFilm}: AppProps): JSX.Element {
  return <MainPage filmsNumberToRender={filmsNumberToRender} promoFilm={promoFilm} />;
}

export default App;
