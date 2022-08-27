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

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchCurrentFilmAction(id));
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    isPlaying
      ? videoRef.current?.play()
      : videoRef.current?.pause();
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

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
              onClick={() => setIsPlaying(false)}
            >
            </video>

            <button type="button" className="player__exit" onClick={() => dispatch(redirectToRoute(`/films/${id}`))}>
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
                {
                  isPlaying
                    ? (
                      <button
                        type="button"
                        className="player__play"
                        onClick={() => togglePlay()}
                      >
                        <svg viewBox="0 0 14 21" width="14" height="21">
                          <use xlinkHref="#pause" />
                        </svg>
                        <span>Pause</span>
                      </button>
                    )
                    : (
                      <button
                        type="button"
                        className="player__play"
                        onClick={() => togglePlay()}
                      >
                        <svg viewBox="0 0 19 19" width="19" height="19">
                          <use xlinkHref="#play-s" />
                        </svg>
                        <span>Play</span>
                      </button>
                    )
                }
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
