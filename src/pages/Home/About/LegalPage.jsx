import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';

const CONTENT = {
  privacy: {
    title: 'Privacy Policy',
    intro:
      'This is a placeholder policy. Replace it with your reviewed legal text before publishing PirTV.',
    sections: [
      ['What we store', 'Your watchlist, watch history and language preference are kept on your device. If you create an account, they sync to your profile.'],
      ['What we send', 'Title and search queries are sent to TMDB to return catalogue results. We do not sell personal data.'],
      ['Analytics', 'Aggregate, non-identifying usage metrics help us understand which screens need work.'],
      ['Your control', 'You can clear your history and watchlist at any time from Settings, or email support to request account deletion.'],
    ],
  },
  terms: {
    title: 'Terms of Service',
    intro:
      'This is a placeholder agreement. Replace it with your reviewed legal text before publishing PirTV.',
    sections: [
      ['The service', 'PirTV is a discovery app for films and television. It provides catalogue information, official trailers, and links to licensed services.'],
      ['No hosting', 'PirTV does not host, upload, proxy or distribute films or episodes. Playback of full titles happens on the licensed service you are linked to, under that service\u2019s own terms.'],
      ['Acceptable use', 'Do not use PirTV to scrape the catalogue at scale, resell data, or circumvent the access controls of any third-party service.'],
      ['Attribution', 'Catalogue data comes from TMDB. Availability data comes from JustWatch. PirTV is not endorsed or certified by either.'],
      ['Changes', 'These terms may be updated. Continued use after an update means you accept the revision.'],
    ],
  },
};

function LegalPage({ kind }) {
  const navigate = useNavigate();
  const doc = CONTENT[kind];

  return (
    <main className="min-h-screen bg-ink text-white">
      <header className="sticky top-0 z-30 flex items-center gap-3 px-4 py-3 bg-ink/90 backdrop-blur border-b border-ink-line">
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <BiArrowBack className="text-xl" />
        </button>
        <h1 className="text-base font-bold">{doc.title}</h1>
      </header>

      <div className="max-w-2xl mx-auto px-5 py-8">
        <p className="rounded-xl bg-amber-500/10 ring-1 ring-amber-500/30 px-4 py-3 text-xs text-amber-400 leading-relaxed">
          {doc.intro}
        </p>

        <div className="mt-8 flex flex-col gap-6">
          {doc.sections.map(([heading, body]) => (
            <section key={heading}>
              <h2 className="text-sm font-bold mb-1.5">{heading}</h2>
              <p className="text-sm text-gray-400 leading-relaxed">{body}</p>
            </section>
          ))}
        </div>

        <p className="mt-10 text-[11px] text-gray-600">
          Last updated {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} · PirTV by Opiar
        </p>
      </div>
    </main>
  );
}

LegalPage.propTypes = {
  kind: PropTypes.oneOf(['privacy', 'terms']).isRequired,
};

export default LegalPage;
