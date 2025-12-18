import React, { useState } from 'react';
import { AppView } from './types';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import NavBar from './components/NavBar';
import ChatView from './components/ChatView';
import SearchView from './components/SearchView';
import LegalView from './components/LegalView';
import CalendarView from './components/CalendarView';

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.CHAT);

  const renderView = () => {
    switch (currentView) {
      case AppView.CHAT:
        return <ChatView />;
      case AppView.SEARCH:
        return <SearchView />;
      case AppView.LEGAL:
        return <LegalView />;
      case AppView.CALENDAR:
        return <CalendarView />;
      default:
        return <ChatView />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-green-50 overflow-hidden">
      <Header />
      
      {/* Main container takes remaining space. overflow-hidden prevents body scroll. 
          flex-col allows children to use flex-1 to fill height. */}
      <main className="flex-1 relative w-full max-w-3xl mx-auto overflow-hidden flex flex-col">
        {renderView()}
      </main>
      
      <NavBar currentView={currentView} onChangeView={setCurrentView} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;