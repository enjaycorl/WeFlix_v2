import { useNavigate } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import { BiChevronLeft, BiChevronRight, BiGlobe, BiEnvelope, BiShield, BiFile } from 'react-icons/bi';
import SEO from './SEO';

const APP_VERSION = '1.0.0';

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center justify-between gap-4 px-4 py-4">
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.05] text-brand-400">
        <Icon className="text-lg" />
      </span>
      <span className="text-sm text-gray-300">{label}</span>
    </div>
    <span className="text-sm font-medium text-white text-right">{value}</span>
  </div>
);

const LinkRow = ({ icon: Icon, label, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-between gap-4 px-4 py-4 transition-colors hover:bg-white/[0.03]"
  >
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.05] text-brand-400">
        <Icon className="text-lg" />
      </span>
      <span className="text-sm text-gray-300">{label}</span>
    </div>
    <BiChevronRight className="text-xl text-gray-500" />
  </a>
);

const Divider = () => <div className="mx-4 h-px bg-white/[0.06]" />;

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="pirtv-glow min-h-screen">
      <SEO title="About PirTV" description="About PirTV by Opiar — app version, developer info, website, support, and policies." />

      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-white/[0.06] bg-plum-900/80 px-4 py-4 backdrop-blur">
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="flex h-9 w-9 items-center justify-center rounded-full text-gray-300 transition-colors hover:bg-white/10"
        >
          <BiChevronLeft className="text-2xl" />
        </button>
        <h1 className="text-lg font-bold">About</h1>
      </header>

      <div className="mx-auto max-w-md px-5 pb-16 pt-8">
        {/* Brand */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-lg shadow-brand-700/40 ring-1 ring-white/10">
            <FaPlay className="ml-0.5 text-xl text-white" />
          </div>
          <h2 className="text-3xl font-black tracking-tight">
            Pir<span className="text-brand-500">TV</span>
          </h2>
          <p className="mt-2 text-sm text-gray-400 text-balance">
            Unlimited Movies &amp; TV Series &ndash; Watch Anytime, Anywhere
          </p>
        </div>

        {/* App info card */}
        <section className="mt-8 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
          <p className="px-4 pt-4 text-[11px] font-bold uppercase tracking-[0.22em] text-gray-500">
            Application
          </p>
          <div className="mt-1">
            <InfoRow icon={BiFile} label="App Version" value={APP_VERSION} />
            <Divider />
            <InfoRow icon={FaPlay} label="Developer" value="Opiar" />
            <Divider />
            <LinkRow icon={BiGlobe} label="Website" href="https://www.opiar.dev" />
            <Divider />
            <LinkRow icon={BiEnvelope} label="Support" href="mailto:support@opiar.dev" />
          </div>
        </section>

        {/* Legal card */}
        <section className="mt-5 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
          <p className="px-4 pt-4 text-[11px] font-bold uppercase tracking-[0.22em] text-gray-500">
            Legal
          </p>
          <div className="mt-1">
            <LinkRow icon={BiShield} label="Privacy Policy" href="https://www.opiar.dev/privacy" />
            <Divider />
            <LinkRow icon={BiFile} label="Terms of Service" href="https://www.opiar.dev/terms" />
          </div>
        </section>

        {/* Re-open welcome screen */}
        <button
          onClick={() => navigate('/welcome')}
          className="mt-5 w-full rounded-2xl border border-brand-500/40 bg-brand-500/10 py-3.5 text-sm font-bold text-brand-400 transition-colors hover:bg-brand-500/20"
        >
          View Welcome Screen
        </button>

        <p className="mt-8 text-center text-[11px] text-gray-500">
          Developed by <span className="font-semibold text-gray-300">Opiar</span>
          <br />© {new Date().getFullYear()} PirTV. All rights reserved.
        </p>
      </div>
    </div>
  );
}
