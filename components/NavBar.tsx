import React from 'react';
import { AppView } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface NavBarProps {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
}

const NavBar: React.FC<NavBarProps> = ({ currentView, onChangeView }) => {
  const { t } = useLanguage();

  const getButtonClass = (view: AppView) => {
    const isActive = currentView === view;
    return `flex-1 flex flex-col items-center justify-center py-2 text-[10px] sm:text-xs font-bold transition-colors duration-200 ${
      isActive 
        ? 'bg-red-600 text-white shadow-inner' 
        : 'bg-white text-gray-600 hover:bg-gray-100'
    }`;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-green-200 flex h-[72px] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
      <button 
        onClick={() => onChangeView(AppView.CHAT)}
        className={getButtonClass(AppView.CHAT)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mb-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
        </svg>
        {t('navChat')}
      </button>

      <button 
        onClick={() => onChangeView(AppView.SEARCH)}
        className={getButtonClass(AppView.SEARCH)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mb-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
        {t('navSearch')}
      </button>

      <button 
        onClick={() => onChangeView(AppView.CALENDAR)}
        className={getButtonClass(AppView.CALENDAR)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mb-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
        {t('navCalendar')}
      </button>

      <button 
        onClick={() => onChangeView(AppView.LEGAL)}
        className={getButtonClass(AppView.LEGAL)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mb-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
        {t('navLegal')}
      </button>
    </nav>
  );
};

export default NavBar;