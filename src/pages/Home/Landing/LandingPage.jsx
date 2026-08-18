import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BiBadgeCheck, BiBookmarkHeart, BiSearchAlt, BiFilm, BiCameraMovie, BiGlobe } from 'react-icons/bi';
import { fetchTrending } from '../Fetcher';
import Logo from '../reused/Logo';

const POSTER_BASE = 'https://image.tmdb.org/t/p/w342';
const LANDING_SEEN_KEY = 'pirtv:landing-seen';

const BENEFITS = [
  { icon: BiBadgeCheck,    title: 'Official Trailers',  copy: 'Publisher-uploaded trailers in full HD.' },
  { icon: BiGlobe,         title: 'Where To Watch',     copy: 'See which licensed services carry a title.' },
  { icon: BiBookmarkHeart, title: 'Your Watchlist',     copy: 'Save titles and pick up where you left off.' },
];

const FEATURES = [
  { icon: BiSearchAlt,   title: 'Powerful Search',   copy: 'Filter by year, genre, rating and language to find exactly what you are after.' },
  { icon: BiFilm,        title: 'Deep Detail Pages', copy: 'Synopsis, cast and crew, runtime, ratings, trailers and similar titles.' },
  { icon: BiCameraMovie, title: 'Endless Browsing',  copy: 'Trending, latest, popular series and curated categories with infinite scroll.' },
];

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

function LandingPage() {
  const navigate = useNavigate();
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    let cancelled = false;
    Promise.all([fetchTrending('movie', 1, 'week'), fetchTrending('tv', 1, 'week')])
      .then(([movies, tv]) => {
        if (cancelled) return;
        const merged = [...(movies ?? []), ...(tv ?? [])]
          .filter((m) => m.poster_path)
          .slice(0, 18);
        setPosters(merged);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const enter = (path) => {
    try { localStorage.setItem(LANDING_SEEN_KEY, '1'); } catch { /* storage may be blocked */ }
    navigate(path);
  };

  return (
    <main className="min-h-screen bg-ink text-white overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="relative px-6 pt-16 pb-12 text-center">
        {/* ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_top,rgba(245,145,58,0.18),transparent_65%)]"
        />

        <motion.div variants={fade} initial="hidden" animate="show" className="relative">
          <Logo className="text-5xl sm:text-6xl justify-center" />
          <p className="mt-5 text-base sm:text-lg text-gray-300 leading-relaxed max-w-md mx-auto text-balance">
            Unlimited Movies &amp; TV Series — Discover Anytime, Anywhere
          </p>
        </motion.div>

        {/* ── POSTER WALL ── */}
        <motion.div
          variants={fade}
          initial="hidden"
          animate="show"
          custom={1}
          className="relative mt-10 -mx-6"
        >
          <div className="relative h-56 sm:h-72 overflow-hidden">
            <div className="flex gap-3 px-6 animate-[drift_40s_linear_infinite] w-max">
              {(posters.length ? [...posters, ...posters] : Array.from({ length: 14 })).map((p, i) => (
                <div
                  key={p ? `${p.id}-${i}` : i}
                  className="w-28 sm:w-36 aspect-2/3 rounded-xl overflow-hidden bg-ink-soft ring-1 ring-white/10 shrink-0"
                  style={{ transform: `translateY(${(i % 3) * 14}px)` }}
                >
                  {p && (
                    <img
                      src={`${POSTER_BASE}${p.poster_path}`}
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
            {/* edge fades */}
            <div aria-hidden="true" className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink to-transparent" />
            <div aria-hidden="true" className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink to-transparent" />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* ── BENEFIT TILES ── */}
      <section className="px-6 pb-4">
        <h2 className="text-center text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-5">
          Featured Benefits
        </h2>
        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
          {BENEFITS.map(({ icon: Icon, title, copy }, i) => (
            <motion.div
              key={title}
              variants={fade}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              className="flex flex-col items-center gap-2 rounded-2xl bg-ink-soft ring-1 ring-ink-line px-3 py-4 text-center"
            >
              <Icon className="text-2xl text-amber-500" />
              <span className="text-[11px] font-bold leading-tight">{title}</span>
              <span className="text-[10px] text-gray-500 leading-snug">{copy}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTAs ── */}
      <section className="px-6 pt-8 pb-10 max-w-md mx-auto flex flex-col gap-3">
        <button
          onClick={() => enter('/')}
          className="w-full rounded-full bg-amber-500 hover:bg-amber-600 text-ink font-extrabold tracking-wide py-3.5 transition-colors shadow-[0_8px_30px_rgba(245,145,58,0.35)]"
        >
          GET STARTED
        </button>
        <button
          onClick={() => enter('/movies')}
          className="w-full rounded-full border-2 border-amber-500/70 text-amber-500 hover:bg-amber-500/10 font-extrabold tracking-wide py-3.5 transition-colors"
        >
          BROWSE NOW
        </button>
      </section>

      {/* ── WHAT PIRTV IS ── */}
      <section className="px-6 py-10 border-t border-ink-line">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-black mb-3 text-balance">Everything worth watching, in one place.</h2>
          <p className="text-sm text-gray-400 leading-relaxed mb-8">
            PirTV is a movie and TV discovery app. Browse thousands of titles, watch official trailers,
            build a watchlist, and find out exactly which licensed service is streaming what you want —
            all in a fast, dark, ad-free interface built for your phone.
          </p>

          <div className="flex flex-col gap-3">
            {FEATURES.map(({ icon: Icon, title, copy }, i) => (
              <motion.div
                key={title}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i}
                className="flex gap-4 rounded-2xl bg-ink-soft ring-1 ring-ink-line p-4"
              >
                <Icon className="text-2xl text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold mb-1">{title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{copy}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-6 py-10 border-t border-ink-line text-center">
        <Logo className="text-2xl justify-center" />
        <p className="mt-3 text-xs text-gray-500">
          Developed by <span className="text-gray-300 font-semibold">Opiar</span>
        </p>
        <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-gray-600">
          <Link to="/about" className="hover:text-amber-500 transition-colors">About</Link>
          <span>·</span>
          <a
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-500 transition-colors"
          >
            Data by TMDB
          </a>
        </div>
        <p className="mt-4 text-[10px] text-gray-700">© {new Date().getFullYear()} PirTV by Opiar</p>
      </footer>
    </main>
  );
}

export default LandingPage;
