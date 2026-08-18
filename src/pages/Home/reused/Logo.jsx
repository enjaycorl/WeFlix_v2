import PropTypes from 'prop-types';

/**
 * PirTV wordmark. "Pir" in brand amber, "TV" in white.
 */
const Logo = ({ className = '' }) => (
  <span className={`inline-flex items-baseline font-black tracking-tight leading-none ${className}`}>
    <span className="text-amber-500">Pir</span>
    <span className="text-white">TV</span>
  </span>
);

Logo.propTypes = {
  className: PropTypes.string,
};

export default Logo;
