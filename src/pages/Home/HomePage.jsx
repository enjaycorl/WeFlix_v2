import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toDetailPath } from './urlUtils';
import { LANDING_SEEN_KEY } from './LandingPage';
import HeroBanner from './HeroBanner';
import TrendingRow from './TrendingRow';
import ContinueWatchingRow from './ContinueWatchingRow';
import PersonalizedRow from './PersonalizedRow';
import SEO from './SEO';

const SectionDivider = ({ label }) => (
  <div className="flex items-center gap-4 px-4 sm:px-6 mb-8 mt-6">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-plum-600" />
    <span className="flex items-center gap-2 text-brand-300 text-[11px] font-bold uppercase tracking-[0.25em]">
      <span className="w-1 h-1 rounded-full bg-brand-500" />
      {label}
    </span>
    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-plum-600" />
  </div>
);

export default function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Show the welcome screen on first launch only.
  useEffect(() => {
    let seen = true;
    try {
      seen = !!localStorage.getItem(LANDING_SEEN_KEY);
    } catch {
      seen = true;
    }
    if (!seen) navigate('/welcome', { replace: true });
  }, [navigate]);

  const handleSelect = (item, type) => {
    const mediaType = item.media_type ?? type;
    const pathname = toDetailPath(mediaType === 'tv' ? 'tv' : 'movie', item.id, item.title || item.name);
    
    let search = '';
    if (mediaType === 'tv' && item.season && item.episode) {
      search = `?season=${item.season}&episode=${item.episode}`;
    }

    navigate(
      { pathname, search },
      { state: { from: location.pathname + location.search } }
    );
  };

  const goMovies = () => navigate('/movies');
  const goSeries = () => navigate('/series');

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
      className="bg-plum-900 min-h-screen"
    >
      <SEO
        title="PirTV — Unlimited Movies & TV Series"
        description="Watch unlimited movies and TV series for free on PirTV by Opiar. Browse trending titles, popular series, and recommendations — watch anytime, anywhere."
        noSuffix
      />
      
      {/* ── Visually Hidden H1 for SEO (Brand Keyword 'PirTV') ── */}
      <h1 className="sr-only">PirTV by Opiar - Free Movie & TV Series Streaming App</h1>

      <HeroBanner />

      <div className="pt-10 pb-8">
        <ContinueWatchingRow onSelect={handleSelect} />
        <PersonalizedRow onSelect={handleSelect} />

        <SectionDivider label="Movies" />

        {/* ── Movies ── */}
        <TrendingRow
          title="Trending"
          type="movie"
          variant="trending"
          accent="#F5842A"
          onSelect={handleSelect}
          onSeeAll={goMovies}
        />
        <TrendingRow
          title="Latest Movies"
          type="movie"
          variant="popular"
          originalLanguage={['en', 'zh', 'ko', 'ja']}
          accent="#F5842A"
          onSelect={handleSelect}
          onSeeAll={goMovies}
        />
        <TrendingRow
          title="Now Playing"
          type="movie"
          variant="now_playing"
          accent="#FB9E4B"
          onSelect={handleSelect}
          onSeeAll={goMovies}
        />

        <SectionDivider label="TV Series" />

        {/* ── TV ── */}
        <TrendingRow
          title="Popular Series"
          type="tv"
          variant="trending"
          accent="#FB9E4B"
          onSelect={handleSelect}
          onSeeAll={goSeries}
        />
        <TrendingRow
          title="Asian TV Series"
          type="tv"
          variant="popular"
          originalLanguage={['ko', 'ja', 'zh']}
          sinceYear={2020}
          accent="#FCB877"
          onSelect={handleSelect}
          onSeeAll={goSeries}
        />
        <TrendingRow
          title="Top 10 Series This Week"
          type="tv"
          variant="trending"
          showRank
          accent="#F5842A"
          onSelect={handleSelect}
          onSeeAll={goSeries}
        />
      </div>
    </motion.div>
  );
}
