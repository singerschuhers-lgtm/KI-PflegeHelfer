import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="bg-white shadow-md border-b-4 border-red-600 sticky top-0 z-40 transition-all duration-300">
      <div className="max-w-3xl mx-auto px-4 py-3 relative">
        
        {/* Language Switcher - Positioned Absolutely at top right */}
        <div className="absolute top-4 right-4 flex flex-col sm:flex-row gap-1 bg-gray-50 p-1 rounded-lg border border-gray-100 z-50 shadow-sm">
          <button 
            onClick={() => setLanguage('ru')}
            className={`px-3 py-1 text-xs font-bold rounded-md transition-all flex items-center justify-center ${
              language === 'ru' 
              ? 'bg-red-600 text-white shadow-sm' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span>RU</span>
          </button>
          <button 
            onClick={() => setLanguage('de')}
            className={`px-3 py-1 text-xs font-bold rounded-md transition-all flex items-center justify-center ${
              language === 'de' 
              ? 'bg-red-600 text-white shadow-sm' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span>DE</span>
          </button>
        </div>

        {/* Centered Logo and Title */}
        <div className="flex flex-col items-center justify-center pt-1">
            {/* Logo Image - Optimized size (w-28 h-28) to save screen space while keeping it prominent */}
            <div className="w-28 h-28 rounded-2xl flex items-center justify-center overflow-hidden shadow-lg border-2 border-green-50 mb-2 bg-white">
                <img 
                  src="/image.png" 
                  alt="PflegeHelfer Logo" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to text if image is missing
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                        e.currentTarget.style.display = 'none';
                        parent.innerText = 'PH';
                        parent.classList.add('text-3xl', 'font-bold', 'text-green-600');
                    }
                  }}
                />
            </div>
            
            <h1 className="text-xl font-bold text-gray-800 leading-tight tracking-tight text-center">{t('appTitle')}</h1>
            <p className="text-[10px] text-green-700 font-bold tracking-widest uppercase mt-0.5 bg-green-50 px-3 py-0.5 rounded-full">{t('appSubtitle')}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;