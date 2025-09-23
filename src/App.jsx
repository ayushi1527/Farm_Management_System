import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './App.css';
import heroImg from './assets/hero image.avif';

// small helper to create an SVG avatar data URL from a name's initials
function initials(name) {
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  const chars = parts.length === 1 ? parts[0].slice(0, 2) : parts.slice(0, 2).map(p => p[0]);
  return chars.join('').toUpperCase();
}

function avatarDataUrl(name, bg = '#e6fff8', fg = '#0f766e') {
  const label = initials(name) || 'U';
  const svg = `<?xml version="1.0" encoding="UTF-8"?><svg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'><rect width='100%' height='100%' fill='${bg}' rx='16' ry='16'/><text x='50%' y='50%' font-family='Inter, Arial, sans-serif' font-size='36' fill='${fg}' dominant-baseline='middle' text-anchor='middle'>${label}</text></svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

// The main App component containing the entire landing page
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { i18n, t } = useTranslation();
  const [langOpen, setLangOpen] = useState(false);
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'te', label: 'తెలుగు' }
  ];

  return (
    <>
      <div className="bg-gray-50 font-sans antialiased text-gray-800">

        {/* Header */}
        <header className="sticky top-0 z-50 bg-white shadow-sm py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="text-xl font-bold text-teal-700">{t('farmguard')}</div>

            {/* Hamburger menu for mobile */}
            <div className="flex items-center gap-4">
              <button
                className={`md:hidden flex flex-col gap-1 w-6 h-6 justify-center items-center ${menuOpen ? 'open' : ''}`}
                aria-controls="primary-navigation"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="bar bg-gray-700 w-full h-0.5 rounded"></span>
                <span className="bar bg-gray-700 w-full h-0.5 rounded"></span>
                <span className="bar bg-gray-700 w-full h-0.5 rounded"></span>
              </button>
            </div>

            <nav
              id="primary-navigation"
              className={`top-nav absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent transition-all duration-300 ${menuOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-4 opacity-0 invisible md:visible md:translate-y-0 md:opacity-100'}`}
              aria-label="Primary"
            >
              <div className="flex flex-col md:flex-row items-center md:space-x-8 p-4 md:p-0">

                {/* Language Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setLangOpen(!langOpen)}
                    className="flex items-center px-3 py-2 bg-[#0e766d] hover:bg-[#0b5e53] text-white rounded-full shadow-sm border border-gray-200 font-medium focus:outline-none"
                    aria-haspopup="listbox"
                    aria-expanded={langOpen}
                    style={{ minWidth: '110px' }}
                  >
                    <span className="mr-2">{languages.find(l => l.code === i18n.language)?.label || t('language')}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {langOpen && (
                    <ul className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      {languages.map(lang => (
                        <li key={lang.code}>
                          <button
                            onClick={() => { i18n.changeLanguage(lang.code); setLangOpen(false); }}
                            className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${i18n.language === lang.code ? 'bg-[#0e766d] text-white font-semibold' : ''}`}
                          >
                            {lang.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Nav Links */}
                <a href="#core-features" className="py-2 text-gray-700 hover:text-teal-700 font-medium" onClick={() => setMenuOpen(false)}>{t('features')}</a>
                <a href="#how" className="py-2 text-gray-700 hover:text-teal-700 font-medium" onClick={() => setMenuOpen(false)}>{t('how_it_works')}</a>

                {/* Login / SignUp Links */}
                <div className="flex gap-2">
                  <Link
                    to="/LoginPage"
                    className="btn bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-full transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                      {t('login')}
                    </Link>
                    <Link
                      to="/signup"
                      className="btn bg-white hover:bg-gray-100 text-teal-700 font-semibold py-2 px-6 rounded-full transition-colors border border-teal-600"
                      onClick={() => setMenuOpen(false)}
                    >
                      {t('signup')}
                    </Link>
                </div>
              </div>
            </nav>
          </div>
        </header>

        {/* Hero Banner */}
        <header
          className="hero-banner text-white text-center py-24 md:py-48"
          role="banner"
          style={{
            backgroundImage: `url(${heroImg})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">{t('digital_biosecurity')}</h1>
            <p className="text-lg md:text-xl font-light max-w-2xl mx-auto mb-8">{t('protect_poultry')}</p>
            <div className="flex justify-center space-x-4">
              <a className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-full transition-colors cta-pulse" href="#get-started">{t('start_protecting')}</a>
            </div>
          </div>
        </header>
        
        <main>
          {/* Core Features */}
          <section id="core-features" className="py-16 md:py-24">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('core_features')}</h2>
              <p className="text-gray-600 max-w-3xl mx-auto mb-12">{t('what_we_offer')}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <FeatureItem
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M7 8h10M7 12h10M7 16h6"/></svg>}
                  title={t('risk_assessment')}
                  description={t('quick_surveys')} />

                <FeatureItem
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0v4l-2 2v1h16v-1l-2-2V8"/></svg>}
                  title={t('real_time_alerts')}
                  description={t('local_alerts')} />

                <FeatureItem
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11"/></svg>}
                  title={t('compliance_training')}
                  description={t('digital_checklists')} />

                <div className="lg:col-span-3 flex justify-center">
                  <div className="w-full max-w-sm">
                    <FeatureItem
                      icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 13l3 3 7-7"/></svg>}
                      title={t('data_decisions')}
                      description={t('simple_dashboards')} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section id="how" className="bg-gray-100 py-16 md:py-24">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('how_it_works_title')}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-12">{t('three_step_process')}</p>
              <div className="how-line">
                <HowItWorksStep step="1" title={t('assess_farm')} description={t('run_guided_checks')} />
                <HowItWorksStep step="2" title={t('get_guidance_alerts')} description={t('receive_local_alerts')} />
                <HowItWorksStep step="3" title={t('track_compliance')} description={t('keep_logs')} />
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-12">{t('what_our_users_say')}</h2>
              <div className="testimonials-grid">
                <Testimonial quote={t('testimonial1')} name="Priya Sharma" role="Poultry Farmer" />
                <Testimonial quote={t('testimonial2')} name="Ramesh Kumar" role="Farm Manager" />
                <Testimonial quote={t('testimonial3')} name="Ananya Gupta" role="Biosecurity Lead" />
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section id="get-started" className="py-16 md:py-24 bg-teal-700 text-white text-center">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('join_movement')}</h2>
              <p className="text-gray-200 max-w-3xl mx-auto mb-8">{t('ready_to_control')}</p>
              <a className="bg-white text-teal-700 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-shadow" href="#">{t('start_now')}</a>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="site-footer">
          <div className="footer-inner">
            <div className="footer-grid">
              <div className="footer-brand">
                <div className="text-2xl font-bold">{t('farmguard')}</div>
                <p className="mt-3 text-sm">{t('protect_poultry')}</p>
                <div className="mt-4 social">
                  <a href="#" aria-label="Facebook"> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 2h-3a4 4 0 0 0-4 4v3H8v4h3v8h4v-8h3l1-4h-4V6a1 1 0 0 1 1-1h3V2z" fill="currentColor"/></svg> </a>
                  <a href="#" aria-label="X"> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23 4.5L19.5 8 23 11.5 20.5 14 17 10.5 13.5 14 11 11.5 14.5 8 11 4.5 13.5 2 17 5.5 20.5 2 23 4.5Z" fill="currentColor"/></svg> </a>
                </div>
              </div>

              <div className="footer-links">
                <h4>{t('features')}</h4>
                <ul>
                  <li><a href="#core-features">{t('features')}</a></li>
                  <li><a href="#how">{t('how_it_works')}</a></li>
                  <li><Link to="/LoginPage">{t('login_signup')}</Link></li>
                </ul>
              </div>

              <div className="footer-links">
                <h4>{t('resources')}</h4>
                <ul>
                  <li><a href="#">{t('guides')}</a></li>
                  <li><a href="#">{t('support')}</a></li>
                  <li><a href="#">{t('privacy_policy')}</a></li>
                </ul>
              </div>

              <div className="footer-contact">
                <h4>{t('get_updates')}</h4>
                <p className="text-sm">{t('subscribe_updates')}</p>
                <form className="newsletter" onSubmit={(e)=>e.preventDefault()}>
                  <input type="email" placeholder={t('email_placeholder')} aria-label="email" />
                  <button className="btn primary" type="submit">{t('subscribe')}</button>
                </form>
                <div className="mt-4 text-sm">{t('contact')}: <a href="mailto:hello@farmguard.example">hello@farmguard.example</a></div>
              </div>
            </div>

            <div className="footer-bottom">
              <div>© {new Date().getFullYear()} {t('farmguard')} — {t('all_rights_reserved')}</div>
              <div className="muted">{t('built_for_smallholders')}</div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

// Sub-components
const FeatureItem = ({ icon, title, description }) => (
  <div className="p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
    <div className="icon mb-4 text-teal-700">{icon}</div>
    <h3 className="font-semibold text-xl mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const HowItWorksStep = ({ step, title, description }) => (
  <div className="how-item" data-step={step}>
    <h3 className="font-semibold text-lg mb-2">{title}</h3>
    <p className="text-gray-600 text-sm text-center">{description}</p>
  </div>
);

const Testimonial = ({ quote, name, role }) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
    <p className="text-gray-700 italic mb-4">"{quote}"</p>
    <div className="flex items-center space-x-4">
      <img src={avatarDataUrl(name)} alt={name} className="testimonial-avatar" />
      <div>
        <div className="font-semibold text-gray-900">{name}</div>
        <div className="text-sm text-gray-500">{role}</div>
      </div>
    </div>
  </div>
);