import { useState } from 'react';

import { Film } from '../../types/films';
import { SingleReview } from '../../types/films';
import { FilmTabName } from '../../const';

import FilmDetails from '../film-details/film-details';
import FilmOverview from '../film-overview/film-overview';
import FilmReviews from '../film-reviews/film-reviews';

type FilmTabsProps = {
  film: Film,
  filmReviews: SingleReview[]
}

function FilmTabs({ film, filmReviews }: FilmTabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState(FilmTabName.Overview);

  const renderTabs = (tab: FilmTabName): JSX.Element => {
    switch (tab) {
      case FilmTabName.Overview:
        return <FilmOverview film={film} />;
      case FilmTabName.Details:
        return <FilmDetails film={film} />;
      default:
        return <FilmReviews filmReviews={filmReviews} />;
    }
  };

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className={`film-nav__item ${activeTab === FilmTabName.Overview && 'film-nav__item--active' }`}>
            <a
              className="film-nav__link"
              onClick={() => setActiveTab(FilmTabName.Overview)}
            >
              Overview
            </a>
          </li>
          <li className={`film-nav__item ${activeTab === FilmTabName.Details && 'film-nav__item--active' }`}>
            <a
              className="film-nav__link"
              onClick={() => setActiveTab(FilmTabName.Details)}
            >
              Details
            </a>
          </li>
          <li className={`film-nav__item ${activeTab === FilmTabName.Reviews && 'film-nav__item--active' }`}>
            <a
              className="film-nav__link"
              onClick={() => setActiveTab(FilmTabName.Reviews)}
            >
              Reviews
            </a>
          </li>
        </ul>
      </nav>
      {renderTabs(activeTab)}
    </div>
  );
}

export default FilmTabs;
