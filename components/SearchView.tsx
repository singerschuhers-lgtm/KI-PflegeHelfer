import React, { useState } from 'react';
import { getMockServices } from '../constants';
import { CareService } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const SearchView: React.FC = () => {
  const { t } = useLanguage();
  const [zipCode, setZipCode] = useState('');
  const [results, setResults] = useState<CareService[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipCode.length < 5) return;

    setLoading(true);
    setHasSearched(false);

    // Simulate API delay
    setTimeout(() => {
      // Get services based on the input zip code
      const services = getMockServices(zipCode);
      setResults(services);
      setHasSearched(true);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto h-full overflow-y-auto pb-24">
      <div className="bg-white rounded-2xl shadow-sm border border-green-200 p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('searchTitle')}</h2>
        <p className="text-gray-600 mb-4 text-lg">{t('searchSubtitle')}</p>
        
        <form onSubmit={handleSearch} className="flex flex-col gap-4">
          <div className="relative">
             <input
              type="tel"
              maxLength={5}
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ''))}
              placeholder="01067"
              className="w-full text-center text-4xl tracking-widest font-bold border-2 border-green-300 rounded-xl py-4 focus:outline-none focus:border-red-500 transition-colors"
            />
            <span className="absolute top-2 right-4 text-xs text-gray-400 font-bold">PLZ</span>
          </div>
         
          <button
            type="submit"
            disabled={zipCode.length !== 5 || loading}
            className="w-full bg-red-600 text-white font-bold text-xl py-4 rounded-xl hover:bg-red-700 disabled:opacity-50 shadow-md transition-all active:scale-95"
          >
            {loading ? t('searchLoading') : t('searchBtn')}
          </button>
        </form>
      </div>

      {hasSearched && (
        <div className="space-y-4 animate-fade-in">
          <h3 className="text-xl font-bold text-gray-700 ml-1">{t('searchResults')} {zipCode}:</h3>
          {results.length > 0 ? (
            results.map((service) => (
              <div key={service.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col gap-2 relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                <div className="flex justify-between items-start">
                  <h4 className="text-lg font-bold text-gray-900">{service.name}</h4>
                  <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-md">{service.distance}</span>
                </div>
                <p className="text-gray-600">{service.address}</p>
                
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
                  <div className="flex items-center text-yellow-500">
                      <span className="font-bold mr-1">{service.rating}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                  </div>
                  <a href={`tel:${service.phone}`} className="flex items-center gap-2 text-red-600 font-bold bg-red-50 px-3 py-2 rounded-lg">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.25V4.5z" clipRule="evenodd" />
                     </svg>
                     {t('searchCall')}
                  </a>
                </div>
              </div>
            ))
          ) : (
             <div className="text-center text-gray-500 py-8">
               <p>Keine Pflegedienste in diesem Bereich gefunden.</p>
               <p className="text-sm mt-1">(Попробуйте индекс 01067 для Дрездена или 10115 для Берлина)</p>
             </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchView;