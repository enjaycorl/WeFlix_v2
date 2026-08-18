import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BiPlay, BiLinkExternal } from 'react-icons/bi';
import { fetchVideos, fetchWatchProviders } from '../Fetcher';

const LOGO_BASE = 'https://image.tmdb.org/t/p/w92';

const OFFER_LABELS = {
  stream: 'Included with subscription',
  free: 'Free',
  ads: 'Free with ads',
  rent: 'Rent',
  buy: 'Buy',
};

/**
 * Legitimate playback surface for a title:
 *  1. Official publisher-uploaded trailers (YouTube)
 *  2. "Where to watch" — licensed services carrying the full title (JustWatch via TMDB)
 *
 * PirTV does not host, proxy, or embed full copyrighted titles.
 */
const WatchOptions = ({ type, id, title }) => {
  const [videos, setVideos] = useState([]);
  const [activeKey, setActiveKey] = useState(null);
  const [providers, setProviders] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setVideos([]);
    setActiveKey(null);
    setProviders(null);

    Promise.all([fetchVideos(type, id), fetchWatchProviders(type, id)])
      .then(([vids, provs]) => {
        if (cancelled) return;
        setVideos(vids);
        setActiveKey(vids[0]?.key ?? null);
        setProviders(provs);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [type, id]);

  const offerGroups = providers
    ? ['stream', 'free', 'ads', 'rent', 'buy']
        .map((k) => ({ key: k, label: OFFER_LABELS[k], items: providers[k] ?? [] }))
        .filter((g) => g.items.length > 0)
    : [];

  return (
    <div className="w-full flex flex-col gap-5">
      {/* ---------- Official trailer ---------- */}
      <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
        {activeKey ? (
          <iframe
            key={activeKey}
            src={`https://www.youtube-nocookie.com/embed/${activeKey}?rel=0&modestbranding=1`}
            title={`${title} — official trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 w-full h-full border-0"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-6">
            <BiPlay className="text-4xl text-gray-600" />
            <p className="text-sm text-gray-400 font-medium">
              {loading ? 'Loading trailer…' : 'No official trailer available yet'}
            </p>
          </div>
        )}
      </div>

      {/* Trailer switcher */}
      {videos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-none -mx-1 px-1 pb-1">
          {videos.slice(0, 8).map((v) => (
            <button
              key={v.key}
              onClick={() => setActiveKey(v.key)}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeKey === v.key
                  ? 'bg-amber-500 text-ink shadow-md'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {v.type}
            </button>
          ))}
        </div>
      )}

      {/* ---------- Where to watch ---------- */}
      <section className="rounded-2xl bg-ink-soft ring-1 ring-ink-line p-4 sm:p-5">
        <div className="flex items-baseline justify-between gap-3 mb-4">
          <h3 className="text-sm font-bold tracking-wide text-white uppercase">Where to watch</h3>
          {providers?.region && (
            <span className="text-[11px] text-gray-500 font-medium">Region: {providers.region}</span>
          )}
        </div>

        {loading && <p className="text-sm text-gray-500">Checking available services…</p>}

        {!loading && offerGroups.length === 0 && (
          <p className="text-sm text-gray-500 leading-relaxed">
            {'No licensed streaming service currently lists '}
            <span className="text-gray-300 font-medium">{title}</span>
            {' in your region. Check back — availability changes often.'}
          </p>
        )}

        {!loading && offerGroups.length > 0 && (
          <div className="flex flex-col gap-4">
            {offerGroups.map((group) => (
              <div key={group.key}>
                <p className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold mb-2">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((p) => (
                    <a
                      key={`${group.key}-${p.provider_id}`}
                      href={providers.link ?? '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Watch on ${p.provider_name}`}
                      className="group flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-xl bg-white/[0.04] ring-1 ring-white/10 hover:ring-amber-500/60 hover:bg-white/[0.08] transition-all"
                    >
                      {p.logo_path ? (
                        <img
                          src={`${LOGO_BASE}${p.logo_path}`}
                          alt=""
                          loading="lazy"
                          className="w-7 h-7 rounded-lg object-cover"
                        />
                      ) : (
                        <span className="w-7 h-7 rounded-lg bg-white/10" />
                      )}
                      <span className="text-xs font-semibold text-gray-300 group-hover:text-white">
                        {p.provider_name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            ))}

            {providers?.link && (
              <a
                href={providers.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-500 hover:text-amber-400 transition-colors"
              >
                See all options
                <BiLinkExternal className="text-sm" />
              </a>
            )}
          </div>
        )}

        <p className="mt-4 pt-3 border-t border-ink-line text-[11px] text-gray-600 leading-relaxed">
          Availability data provided by JustWatch via TMDB. PirTV is a discovery app — it links you to
          licensed services and does not host any video.
        </p>
      </section>
    </div>
  );
};

WatchOptions.propTypes = {
  type: PropTypes.oneOf(['movie', 'tv']).isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string,
};

WatchOptions.defaultProps = {
  title: 'this title',
};

export default memo(WatchOptions);
