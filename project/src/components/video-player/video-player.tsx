import { Film } from '../../types/films';

type FilmPlayer = {
  player: Film;
};

function VideoPlayer(props: FilmPlayer): JSX.Element {
  const { player } = props;

  return (
    <video
      className="player__video"
      autoPlay
      muted
      src={player.videoLink}
      poster={player.previewImage}
    >
    </video>
  );
}

export default VideoPlayer;
