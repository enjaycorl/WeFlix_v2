import { memo } from 'react';
import PropTypes from 'prop-types';
import WatchOptions from '../reused/WatchOptions';

/**
 * Series playback surface.
 *
 * Shows the official trailer plus licensed "where to watch" options.
 * PirTV does not host, proxy, or embed full copyrighted episodes.
 */
const VideoPlayer = ({ tvId, title }) => {
  if (!tvId) return null;

  return <WatchOptions type="tv" id={tvId} title={title} />;
};

VideoPlayer.propTypes = {
  tvId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  season: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  episode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
};

export default memo(VideoPlayer);
