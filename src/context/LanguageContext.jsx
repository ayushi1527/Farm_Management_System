import React, { createContext, useContext, useState, ReactNode } from 'react';

const translations = {
  // Navigation
  'dashboard': { en: 'Dashboard', hi: 'डैशबोर्ड', te: 'డాష్‌బోర్డ్' },
  'risk_assessment': { en: 'Risk Assessment', hi: 'जोखिम मूल्यांकन', te: 'ప్రమాద అంచనా' },
  'digital_checklist': { en: 'Digital Checklist', hi: 'डिजिटल चेकलिस्ट', te: 'డిజిటల్ చెక్‌లిస్ట్' },
  'training_modules': { en: 'Training Modules', hi: 'प्रशिक्षण मॉड्यूल', te: 'శిక్షణ మాడ్యూల్స్' },
  'alerts': { en: 'Alerts', hi: 'अलर्ट', te: 'హెచ్చరికలు' },
  'logout': { en: 'Logout', hi: 'लॉगआउट', te: 'లాగ్ అవుట్' },

  // Landing Page
  'app_title': { en: 'FarmSecure Pro', hi: 'फार्मसिक्योर प्रो', te: 'ఫార్మ్ సెక్యూర్ ప్రో' },
  'main_headline': { en: 'Keeping Farms Safe from Diseases', hi: 'फार्मों को बीमारियों से सुरक्षित रखना', te: 'వ్యాధుల నుండి పెంపుడు జంతువులను కాపాడడం' },
  'main_subtitle': { en: 'Comprehensive biosecurity management for pig and poultry farms with real-time monitoring and compliance tracking', hi: 'वास्तविक समय की निगरानी और अनुपालन ट्रैकिंग के साथ सूअर और पोल्ट्री फार्मों के लिए व्यापक बायोसिक्योरिटी प्रबंधन', te: 'నిజ-సమయ పర్యవేక్షణ మరియు కంప్లైయన్స్ ట్రాకింగ్‌తో పిగ్ మరియు పోల్ట్రీ ఫామ్‌లకు సమగ్ర బయోసెక్యూరిటీ నిర్వహణ' },
  'login': { en: 'Login', hi: 'लॉगिन', te: 'లాగిన్' },
  'signup': { en: 'Sign Up', hi: 'साइन अप', te: 'సైన్ అప్' },
  'get_started': { en: 'Get Started', hi: 'शुरू करें', te: 'మొదలుపెట్టండి' },

  // Features
  'feature_risk_title': { en: 'Risk Assessment', hi: 'जोखिम मूल्यांकन', te: 'ప్రమాద అంచనా' },
  'feature_risk_desc': { en: 'Evaluate and monitor your farm\'s biosecurity risks in real-time', hi: 'अपने फार्म की बायोसिक्योरिटी जोखिमों का वास्तविक समय में मूल्यांकन और निगरानी करें', te: 'మీ ఫామ్ యొక్క బయోసెక్యూరిటీ ప్రమాదాలను నిజ-సమయంలో అంచనా వేయండి మరియు పర్యవేక్షించండి' },
  'feature_checklist_title': { en: 'Digital Checklist', hi: 'डिजिटल चेकलिस्ट', te: 'డిజిటల్ చెక్‌లిస్ట్' },
  'feature_checklist_desc': { en: 'Track compliance with government regulations and best practices', hi: 'सरकारी नियमों और बेहतरीन प्रथाओं के अनुपालन को ट्रैक करें', te: 'ప్రభుత్వ నిబంధనలు మరియు ఉత్తమ అభ్యాసాలతో అనుగుణ్యతను ట్రాక్ చేయండి' },
  'feature_training_title': { en: 'Training Modules', hi: 'प्रशिक्षण मॉड्यूल', te: 'శిక్షణ మాడ్యూల్స్' },
  'feature_training_desc': { en: 'Interactive lessons and best practices for farm biosecurity', hi: 'फार्म बायोसिक्योरिटी के लिए इंटरैक्टिव पाठ और बेहतरीन अभ्यास', te: 'ఫామ్ బయోసెక్యూరిటీ కోసం ఇంటరాక్టివ్ పాఠాలు మరియు ఉత్తమ అభ్యాసాలు' },
  'feature_alerts_title': { en: 'Real-Time Alerts', hi: 'रियल-टाइम अलर्ट', te: 'రియల్-టైమ్ అలర్ట్స్' },
  'feature_alerts_desc': { en: 'Get instant notifications about disease outbreaks and regulatory changes', hi: 'रोग प्रकोप और नियामक परिवर्तनों के बारे में तत्काल सूचनाएं प्राप्त करें', te: 'వ్యాధి వ్యాప్తి మరియు నియామక మార్పుల గురించి తక్షణ నోటిఫికేషన్‌లను పొందండి' },

  // Dashboard
  'welcome_back': { en: 'Welcome back', hi: 'वापसी पर स्वागत है', te: 'తిరిగి స్వాగతం' },
  'farm_overview': { en: 'Farm Overview', hi: 'फार्म अवलोकन', te: 'ఫామ్ అవలోకనం' },
  'risk_score': { en: 'Risk Score', hi: 'जोखिम स्कोर', te: 'ప్రమాద స్కోర్' },
  'checklist_progress': { en: 'Checklist Progress', hi: 'चेकलिस्ट प्रगति', te: 'చెక్‌లిస్ట్ ప్రగతి' },
  'training_progress': { en: 'Training Progress', hi: 'प्रशिक्षण प्रगति', te: 'శిక్షణ ప్రగతి' },
  'active_alerts': { en: 'Active Alerts', hi: 'सक्रिय अलर्ट', te: 'క్రియాశీల హెచ్చరికలు' },

  // Risk Assessment
  'current_risk_level': { en: 'Current Risk Level', hi: 'वर्तमान जोखिम स्तर', te: 'ప్రస్తుత ప్రమాద స్థాయి' },
  'low_risk': { en: 'Low Risk', hi: 'कम जोखिम', te: 'తక్కువ ప్రమాదం' },
  'medium_risk': { en: 'Medium Risk', hi: 'मध्यम जोखिम', te: 'మధ్యమ ప్రమాదం' },
  'high_risk': { en: 'High Risk', hi: 'उच्च जोखिम', te: 'అధిక ప్రమాదం' },
  'critical_risk': { en: 'Critical Risk', hi: 'गंभीर जोखिम', te: 'క్రిటికల్ ప్రమాదం' },

  // Common
  'save': { en: 'Save', hi: 'सेव करें', te: 'సేవ్ చేయండి' },
  'cancel': { en: 'Cancel', hi: 'रद्द करें', te: 'రద్దు చేయండి' },
  'submit': { en: 'Submit', hi: 'सबमिट करें', te: 'సబ్మిట్ చేయండి' },
  'loading': { en: 'Loading...', hi: 'लोड हो रहा है...', te: 'లోడవుతోంది...' },
  'error': { en: 'Error', hi: 'त्रुटि', te: 'దోషం' },
  'success': { en: 'Success', hi: 'सफलता', te: 'విజయం' },
};

const LanguageContext = createContext(undefined);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};