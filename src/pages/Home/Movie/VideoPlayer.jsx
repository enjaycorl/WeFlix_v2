import { memo } from 'react';
import PropTypes from 'prop-types';
import WatchOptions from '../reused/WatchOptions';

/**
 * Movie playback surface.
 *
 * Shows the official trailer plus licensed "where to watch" options.
 * PirTV does not host, proxy, or embed full copyrighted films.
 */
const VideoPlayer = ({ movieId, title }) => {
  if (!movieId) return null;

  return <WatchOptions type="movie" id={movieId} title={title} />;
};

VideoPlayer.propTypes = {
  movieId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string,
};

export default memo(VideoPlayer);
