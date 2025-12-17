import React, { useState } from 'react';
import { LEGAL_TOPICS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

const LegalView: React.FC = () => {
  const { t, language } = useLanguage();
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto pb-24 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 px-2">{t('legalTitle')}</h2>
      <p className="text-gray-600 mb-6 px-2 text-lg">{t('legalSubtitle')}</p>
      
      <div className="space-y-4">
        {LEGAL_TOPICS.map((topic) => {
          // Select content based on current language
          const title = language === 'ru' ? topic.titleRU : topic.titleDE;
          const content = language === 'ru' ? topic.contentRU : topic.contentDE;

          return (
            <div key={topic.id} className="bg-white rounded-2xl shadow-sm border border-green-200 overflow-hidden">
              <button
                onClick={() => toggle(topic.id)}
                className="w-full text-left p-5 flex justify-between items-center focus:outline-none group"
              >
                <div className="pr-4">
                  <div className="inline-block bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded mb-2">
                     {topic.lawReference}
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 leading-tight group-hover:text-red-600 transition-colors">
                    {title}
                  </h3>
                </div>
                <div className={`transition-transform duration-300 flex-shrink-0 ${openId === topic.id ? 'rotate-180' : ''}`}>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-green-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </button>
              
              {openId === topic.id && (
                <div className="px-5 pb-5 pt-2 bg-green-50/30">
                   <p className="text-gray-800 text-lg leading-relaxed border-t border-green-100 pt-3">
                     {content}
                   </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 p-4 bg-gray-100 rounded-xl text-xs text-gray-500 text-center">
        {t('legalDisclaimer')}
      </div>
    </div>
  );
};

export default LegalView;