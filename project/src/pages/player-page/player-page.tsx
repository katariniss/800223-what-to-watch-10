/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { redirectToRoute } from '../../store/actions';
import { fetchCurrentFilmAction } from '../../store/api-actions';
import format from 'format-duration';

function PlayerPage(): JSX.Element {

  const {
    currentFilm,
  } = useAppSelector((state) => state);

  const { id } = useParams();

  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const videoElement = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchCurrentFilmAction(id));
    setIsLoading(false);
  }, [id]);

  const handleFullScreenClick = () => videoElement.current?.requestFullscreen();

  const [playerState, setPlayerState] = useState({
    isPlaying: true,
    progress: 0,
    timeLeftInSec: 0,
    speed: 1,
  });

  const togglePlay = () => {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying,
    });
  };

  useEffect(() => {
    playerState.isPlaying
      ? videoElement!.current!.play()
      : videoElement!.current!.pause();
  }, [playerState.isPlaying, videoElement]);

  const handleOnTimeUpdate = () => {
    const progress = (videoElement!.current!.currentTime / videoElement!.current!.duration) * 100;
    setPlayerState({
      ...playerState,
      progress,
      timeLeftInSec: videoElement!.current!.duration - videoElement!.current!.currentTime,
    });
  };

  return (
    <>
      {isLoading && <span>Video is loading</span>}
      {
        !isLoading && currentFilm && (
          <div className="player">
            <video
              src={currentFilm.videoLink}
              ref={videoElement}
              className="player__video"
              poster={currentFilm.posterImage}
              onClick={() => togglePlay()}
              onTimeUpdate={handleOnTimeUpdate}
              muted
              autoPlay
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
                    value={playerState.progress}
                    max="100"
                  >
                  </progress>
                  <div className="player__toggler" style={{ left: `${playerState.progress}%` }}>
                    Toggler
                  </div>
                </div>
                <div className="player__time-value">{`-${format(playerState.timeLeftInSec * 1000, { leading: true })}`}</div>
              </div>

              <div className="player__controls-row">
                {
                  playerState.isPlaying
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
