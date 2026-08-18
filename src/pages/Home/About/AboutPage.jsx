import { Link, useNavigate } from 'react-router-dom';
import { BiArrowBack, BiLinkExternal, BiEnvelope, BiCodeAlt, BiInfoCircle } from 'react-icons/bi';
import Logo from '../reused/Logo';

const APP_VERSION = '1.0.0';
const DEVELOPER = 'Opiar';
const WEBSITE = 'www.opiar.dev';
const SUPPORT_EMAIL = 'support@opiar.dev';

const Row = ({ label, children }) => (
  <div className="flex items-center justify-between gap-4 px-4 py-3.5 border-b border-ink-line last:border-b-0">
    <span className="text-sm text-gray-400">{label}</span>
    <span className="text-sm font-semibold text-right">{children}</span>
  </div>
);

function AboutPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-ink text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center gap-3 px-4 py-3 bg-ink/90 backdrop-blur border-b border-ink-line">
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <BiArrowBack className="text-xl" />
        </button>
        <h1 className="text-base font-bold">About</h1>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">
        {/* Identity */}
        <section className="flex flex-col items-center text-center py-6">
          <Logo className="text-4xl" />
          <p className="mt-2 text-xs text-gray-500">Version {APP_VERSION}</p>
          <p className="mt-4 text-sm text-gray-400 leading-relaxed max-w-sm text-pretty">
            A fast, dark, ad-free app for discovering movies and TV series — official trailers,
            deep detail pages, and a straight answer on where a title is legally streaming.
          </p>
        </section>

        {/* Details */}
        <section className="rounded-2xl bg-ink-soft ring-1 ring-ink-line overflow-hidden">
          <Row label="App version">{APP_VERSION}</Row>
          <Row label="Developer">{DEVELOPER}</Row>
          <Row label="Website">
            <a
              href={`https://${WEBSITE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-amber-500 hover:text-amber-400 transition-colors"
            >
              {WEBSITE}
              <BiLinkExternal />
            </a>
          </Row>
          <Row label="Support">
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="inline-flex items-center gap-1 text-amber-500 hover:text-amber-400 transition-colors"
            >
              <BiEnvelope />
              {SUPPORT_EMAIL}
            </a>
          </Row>
          <Row label="Data provider">
            <a
              href="https://www.themoviedb.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-500 hover:text-amber-400 transition-colors"
            >
              TMDB
            </a>
          </Row>
        </section>

        {/* How it works */}
        <section className="rounded-2xl bg-ink-soft ring-1 ring-ink-line p-4">
          <div className="flex items-center gap-2 mb-2">
            <BiInfoCircle className="text-lg text-amber-500" />
            <h2 className="text-sm font-bold">How PirTV works</h2>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            PirTV is a discovery and catalogue app. It does not host, upload, proxy, or stream any
            film or episode. Trailers are official clips served by their publishers on YouTube, and
            availability listings link out to licensed services that hold the rights in your region.
          </p>
        </section>

        {/* Legal */}
        <section className="rounded-2xl bg-ink-soft ring-1 ring-ink-line overflow-hidden">
          <Link
            to="/privacy"
            className="flex items-center justify-between px-4 py-3.5 border-b border-ink-line hover:bg-white/[0.03] transition-colors"
          >
            <span className="text-sm">Privacy Policy</span>
            <BiLinkExternal className="text-gray-600" />
          </Link>
          <Link
            to="/terms"
            className="flex items-center justify-between px-4 py-3.5 hover:bg-white/[0.03] transition-colors"
          >
            <span className="text-sm">Terms of Service</span>
            <BiLinkExternal className="text-gray-600" />
          </Link>
        </section>

        {/* Credit */}
        <footer className="text-center py-6">
          <div className="inline-flex items-center gap-2 text-xs text-gray-500">
            <BiCodeAlt className="text-amber-500" />
            Developed by <span className="text-gray-300 font-semibold">{DEVELOPER}</span>
          </div>
          <p className="mt-2 text-[10px] text-gray-700">© {new Date().getFullYear()} PirTV</p>
          <Link
            to="/welcome"
            className="mt-4 inline-block text-xs font-semibold text-amber-500 hover:text-amber-400 transition-colors"
          >
            View welcome screen
          </Link>
        </footer>
      </div>
    </main>
  );
}

export default AboutPage;
