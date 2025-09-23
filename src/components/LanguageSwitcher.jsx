import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const handleChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="flex items-center space-x-2">
      <select
        value={language}
        onChange={handleChange}
        className="p-2 border rounded-md text-sm"
      >
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
        <option value="te">తెలుగు</option>
      </select>
    </div>
  );
}