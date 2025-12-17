import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="bg-white shadow-md border-b-4 border-red-600 sticky top-0 z-40">
      <div className="max-w-3xl mx-auto px-4 py-4 relative">
        
        {/* Language Switcher - Positioned Absolutely at top right */}
        <div className="absolute top-4 right-4 flex flex-col sm:flex-row gap-1 bg-gray-50 p-1 rounded-lg border border-gray-100 z-50">
          <button 
            onClick={() => setLanguage('ru')}
            className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
              language === 'ru' 
              ? 'bg-red-600 text-white shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            RU
          </button>
          <button 
            onClick={() => setLanguage('de')}
            className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
              language === 'de' 
              ? 'bg-red-600 text-white shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            DE
          </button>
        </div>

        {/* Centered Logo and Title */}
        <div className="flex flex-col items-center justify-center pt-2">
            {/* Logo Image - Large and Centered */}
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center overflow-hidden shadow-lg bg-white border-2 border-green-50 mb-2">
                <img src="image.png" alt="Logo" className="w-full h-full object-cover" onError={(e) => {
                  // Fallback if image missing
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.classList.add('bg-red-600');
                  (e.target as HTMLImageElement).parentElement!.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-12 h-12 text-white"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>`;
                }} />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-800 leading-tight tracking-tight text-center">{t('appTitle')}</h1>
            <p className="text-[10px] text-green-700 font-bold tracking-widest uppercase mt-1 bg-green-50 px-3 py-1 rounded-full">{t('appSubtitle')}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;