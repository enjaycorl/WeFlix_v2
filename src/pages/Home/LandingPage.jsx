import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';
import { BiHive } from 'react-icons/bi';
import { MdHighQuality, MdOutlineFileDownload, MdOutlineBlock } from 'react-icons/md';
import { RiTimeLine } from 'react-icons/ri';
import SEO from './SEO';

const API_KEY = import.meta.env.VITE_TMDB_API;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const POSTER = 'https://image.tmdb.org/t/p/w342';

export const LANDING_SEEN_KEY = 'pirtv_seen_landing';

const BENEFITS = [
  { icon: MdHighQuality, label: 'HD Streaming' },
  { icon: MdOutlineFileDownload, label: 'Free Downloads' },
  { icon: MdOutlineBlock, label: 'No Ads' },
  { icon: RiTimeLine, label: 'Offline Mode' },
];

function usePosters() {
  const [posters, setPosters] = useState([]);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const url = new URL(`${BASE_URL}/trending/all/week`);
        url.searchParams.append('api_key', API_KEY);
        url.searchParams.append('language', 'en-US');
        const res = await fetch(url);
        const data = await res.json();
        if (!cancelled) {
          setPosters(
            (data.results ?? [])
              .filter((i) => i.poster_path)
              .map((i) => i.poster_path)
              .slice(0, 12)
          );
        }
      } catch {
        /* ignore */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  return posters;
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function LandingPage() {
  const navigate = useNavigate();
  const posters = usePosters();

  const enter = (path) => {
    try {
      localStorage.setItem(LANDING_SEEN_KEY, '1');
    } catch {
      /* ignore */
    }
    navigate(path);
  };

  // Duplicate posters to guarantee filled collage rows
  const collage = posters.length ? [...posters, ...posters].slice(0, 12) : [];

  return (
    <div className="pirtv-glow min-h-screen w-full text-white flex justify-center">
      <SEO
        title="PirTV — Unlimited Movies & TV Series"
        description="PirTV by Opiar. Unlimited movies and TV series — watch anytime, anywhere. HD streaming, free downloads, offline mode, and no ads."
        noSuffix
      />

      <div className="w-full max-w-md px-6 pt-14 pb-10 flex flex-col items-center">
        {/* Logo + wordmark */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="flex flex-col items-center"
        >
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-lg shadow-brand-700/40 ring-1 ring-white/10 mb-5">
            <FaPlay className="text-white text-lg ml-0.5" />
          </div>
          <h1 className="text-5xl font-black tracking-tight">
            Pir<span className="text-brand-500">TV</span>
          </h1>
          <p className="mt-3 text-center text-sm text-gray-300 leading-relaxed text-balance">
            Unlimited Movies &amp; TV Series &ndash;
            <br />
            Watch Anytime, Anywhere
          </p>
        </motion.div>

        {/* Hero poster collage */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="relative mt-8 w-full overflow-hidden rounded-2xl ring-1 ring-white/10"
        >
          <div className="grid grid-cols-4 gap-1.5 p-1.5">
            {(collage.length ? collage : Array.from({ length: 12 })).map((p, i) => (
              <div
                key={i}
                className="aspect-2/3 overflow-hidden rounded-md bg-plum-700"
              >
                {p && (
                  <img
                    src={`${POSTER}${p}`}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            ))}
          </div>
          {/* Fade mask */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-plum-900 via-transparent to-plum-900/40" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-plum-900 to-transparent" />
        </motion.div>

        {/* Benefits */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-8 w-full"
        >
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.25em] text-gray-500 mb-4">
            Featured Benefits
          </p>
          <div className="grid grid-cols-4 gap-2.5">
            {BENEFITS.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-1 py-3 text-center"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/15 text-brand-400">
                  <Icon className="text-lg" />
                </span>
                <span className="text-[10px] font-medium leading-tight text-gray-300">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-6 text-center text-xs leading-relaxed text-gray-400 text-pretty"
        >
          PirTV brings thousands of movies and TV series to your screen with a fast,
          clean, ad-free experience. Stream in HD, download for offline viewing, and
          pick up right where you left off.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-8 flex w-full flex-col gap-3"
        >
          <button
            onClick={() => enter('/')}
            className="flex items-center justify-center gap-2 rounded-full bg-brand-500 py-3.5 font-bold text-white shadow-lg shadow-brand-700/40 transition-all duration-200 hover:scale-[1.02] hover:bg-brand-400"
          >
            <FaPlay className="text-xs" />
            Get Started
          </button>
          <button
            onClick={() => enter('/movies')}
            className="rounded-full border-2 border-brand-500/70 py-3 font-bold text-brand-400 transition-colors duration-200 hover:bg-brand-500/10"
          >
            Browse Now
          </button>
        </motion.div>

        {/* Footer credit */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={5}
          className="mt-10 flex items-center gap-2 text-[11px] text-gray-500"
        >
          <BiHive className="text-brand-500/70" />
          <span>
            Developed by <span className="font-semibold text-gray-300">Opiar</span>
          </span>
        </motion.div>
      </div>
    </div>
  );
}
