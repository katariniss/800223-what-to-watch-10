import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { redirectToRoute } from '../../store/actions';
import { fetchCurrentFilmAction } from '../../store/api-actions';

function PlayerPage(): JSX.Element {

  const {
    currentFilm,
  } = useAppSelector((state) => state);

  const { id } = useParams();

  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchCurrentFilmAction(id));
    setIsLoading(false);
  }, [id]);

  const handleFullScreenClick = () => videoRef.current?.requestFullscreen();

  return (
    <>
      {isLoading && <span>Video is loading</span>}
      {
        !isLoading && currentFilm && (
          <div className="player">
            <video
              src={currentFilm.videoLink}
              ref={videoRef}
              className="player__video"
              poster={currentFilm.posterImage}
            >
            </video>

            <button type="button" className="player__exit" onClick={()=> dispatch(redirectToRoute(`/films/${id}`))}>
              Exit
            </button>

            <div className="player__controls">
              <div className="player__controls-row">
                <div className="player__time">
                  <progress
                    className="player__progress"
                    value="30"
                    max="100"
                  >
                  </progress>
                  <div className="player__toggler" style={{ left: '30%' }}>
                    Toggler
                  </div>
                </div>
                <div className="player__time-value">1:30:29</div>
              </div>

              <div className="player__controls-row">
                <button type="button" className="player__play">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <div className="player__name">{currentFilm.name}</div>

                <button type="button" className="player__full-screen" onClick={handleFullScreenClick}>
                  <svg viewBox="0 0 27 27" width="27" height="27">
                    <use xlinkHref="#full-screen"></use>
                  </svg>
                  <span>Full screen</span>
                </button>
              </div>
            </div>
          </div>
        )
      }

    </>
  );
}

export default PlayerPage;
