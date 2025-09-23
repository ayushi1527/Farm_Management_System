import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, CheckCircle, Shield, BarChart2, Bell, Globe, ChevronDown } from 'lucide-react';

import '../App.css';
import heroImage from '../assets/hero image.avif';

// --- Helper Functions ---

function initials(name) {
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  const chars = parts.length === 1 ? parts.slice(0, 2) : parts.slice(0, 2).map(p => p);
  return chars.join('').toUpperCase();
}

function avatarDataUrl(name, bg = '#e6fff8', fg = '#0f766e') {
  const label = initials(name) || 'U';
  const svg = `<?xml version="1.0" encoding="UTF-8"?><svg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'><rect width='100%' height='100%' fill='${bg}' rx='16' ry='16'/><text x='50%' y='50%' font-family='Inter, Arial, sans-serif' font-size='36' fill='${fg}' dominant-baseline='middle' text-anchor='middle'>${label}</text></svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

// --- Reusable UI Components ---

const FeatureItem = ({ icon, title, description }) => (
  <div className="p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 h-full">
    <div className="flex items-center justify-center w-12 h-12 bg-teal-100 rounded-full mx-auto mb-4 text-teal-700">
      {icon}
    </div>
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
  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center h-full">
    <p className="text-gray-700 italic mb-4 flex-grow">"{quote}"</p>
    <div className="flex items-center space-x-4 mt-auto">
      <img src={avatarDataUrl(name)} alt={name} className="testimonial-avatar" />
      <div>
        <div className="font-semibold text-gray-900">{name}</div>
        <div className="text-sm text-gray-500">{role}</div>
      </div>
    </div>
  </div>
);

// --- Section Components ---

const Header = ({ t, i18n }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'te', label: 'తెలుగు' }
  ];

  const closeAllMenus = () => {
    setMenuOpen(false);
    setLangOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-teal-700">{t('farmguard')}</Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#core-features" className="text-gray-700 hover:text-teal-700 font-medium transition-colors">{t('features')}</a>
          <a href="#how" className="text-gray-700 hover:text-teal-700 font-medium transition-colors">{t('how_it_works')}</a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher t={t} i18n={i18n} languages={languages} langOpen={langOpen} setLangOpen={setLangOpen} />
          <Link to="/login" className="text-gray-700 hover:text-teal-700 font-medium transition-colors">{t('login')}</Link>
          <Link to="/signup" className="btn bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-full transition-colors">{t('signup')}</Link>
        </div>

        <button className="md:hidden z-50" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-0 left-0 w-full h-screen bg-white md:hidden flex flex-col items-center justify-center gap-8 text-xl"
            >
              <a href="#core-features" className="text-gray-700 hover:text-teal-700 font-medium" onClick={closeAllMenus}>{t('features')}</a>
              <a href="#how" className="text-gray-700 hover:text-teal-700 font-medium" onClick={closeAllMenus}>{t('how_it_works')}</a>
              <Link to="/login" className="text-gray-700 hover:text-teal-700 font-medium" onClick={closeAllMenus}>{t('login')}</Link>
              <Link to="/signup" className="btn bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-full" onClick={closeAllMenus}>{t('signup')}</Link>
              <LanguageSwitcher t={t} i18n={i18n} languages={languages} langOpen={langOpen} setLangOpen={setLangOpen} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

const LanguageSwitcher = ({ t, i18n, languages, langOpen, setLangOpen }) => (
  <div className="relative">
    <button
      onClick={() => setLangOpen(!langOpen)}
      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-medium focus:outline-none transition-colors"
      aria-haspopup="listbox"
    >
      <Globe size={16} />
      <span>{languages.find(l => l.code === i18n.language)?.label || t('language')}</span>
      <ChevronDown size={16} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
    </button>
    <AnimatePresence>
      {langOpen && (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
        >
          {languages.map(lang => (
            <li key={lang.code}>
              <button
                onClick={() => { i18n.changeLanguage(lang.code); setLangOpen(false); }}
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${i18n.language === lang.code ? 'bg-teal-50 text-teal-700 font-semibold' : ''}`}
              >
                {lang.label}
              </button>
            </li>
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  </div>
);

const HeroSection = ({ t }) => (
  <header
    className="hero-banner text-white text-center py-24 md:py-48 relative"
    role="banner"
    style={{ backgroundImage: `url(${heroImage})` }}
  >
    <div className="absolute inset-0 bg-black/40"></div>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="container mx-auto px-4 relative z-10"
    >
      <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">{t('digital_biosecurity')}</h1>
      <p className="text-lg md:text-xl font-light max-w-2xl mx-auto mb-8">{t('protect_poultry')}</p>
      <div className="flex justify-center">
        <a className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-full transition-colors cta-pulse" href="#get-started">{t('start_protecting')}</a>
      </div>
    </motion.div>
  </header>
);

const SectionWrapper = ({ children, id, className = '' }) => (
  <motion.section
    id={id}
    className={`py-16 md:py-24 ${className}`}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6 }}
  >
    <div className="container mx-auto px-4 text-center">
      {children}
    </div>
  </motion.section>
);

// --- Main Landing Page Component ---

export function LandingPage() {
  const { t, i18n } = useTranslation();

  // ✅ FIXED: added features data
  const features = [
    { icon: <Shield size={24} />, title: t('biosecurity_checks'), description: t('biosecurity_checks_desc') },
    { icon: <BarChart2 size={24} />, title: t('risk_assessment'), description: t('risk_assessment_desc') },
    { icon: <Bell size={24} />, title: t('real_time_alerts'), description: t('real_time_alerts_desc') },
    { icon: <CheckCircle size={24} />, title: t('compliance_tracking'), description: t('compliance_tracking_desc') }
  ];

  const howItWorksSteps = [
    { step: "1", title: t('assess_farm'), description: t('run_guided_checks') },
    { step: "2", title: t('get_guidance_alerts'), description: t('receive_local_alerts') },
    { step: "3", title: t('track_compliance'), description: t('keep_logs') }
  ];

  // ✅ FIXED: added testimonials data
  const testimonials = [
    { quote: t('testimonial1_quote'), name: "Amit Sharma", role: t('farmer') },
    { quote: t('testimonial2_quote'), name: "Sita Devi", role: t('poultry_owner') },
    { quote: t('testimonial3_quote'), name: "Ravi Kumar", role: t('agriculture_expert') }
  ];

  return (
    <div className="bg-gray-50 font-sans antialiased text-gray-800">
      <Header t={t} i18n={i18n} />
      <HeroSection t={t} />
      
      <main>
        <SectionWrapper id="core-features">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('core_features')}</h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-12">{t('what_we_offer')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureItem key={index} {...feature} />
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper id="how" className="bg-gray-100">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('how_it_works_title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">{t('three_step_process')}</p>
          <div className="how-line">
            {howItWorksSteps.map((step, index) => (
              <HowItWorksStep key={index} {...step} />
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper id="testimonials" className="bg-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">{t('what_our_users_say')}</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <Testimonial key={index} {...testimonial} />
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper id="get-started" className="bg-teal-700 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('join_movement')}</h2>
          <p className="text-gray-200 max-w-3xl mx-auto mb-8">{t('ready_to_control')}</p>
          <Link to="/signup" className="bg-white text-teal-700 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-shadow">{t('start_now')}</Link>
        </SectionWrapper>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <p className="text-center text-gray-500 py-6">{t('footer_text')}</p>
      </footer>
    </div>
  );
}
