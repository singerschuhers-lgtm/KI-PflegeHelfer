import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { CalendarEvent } from '../types';

const CalendarView: React.FC = () => {
  const { t } = useLanguage();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState<CalendarEvent['type']>('doctor');

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('pflegeEvents');
    if (saved) {
      setEvents(JSON.parse(saved));
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('pflegeEvents', JSON.stringify(events));
  }, [events]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !time) return;

    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title,
      date,
      time,
      type
    };

    const updatedEvents = [...events, newEvent].sort((a, b) => {
      return new Date(a.date + 'T' + a.time).getTime() - new Date(b.date + 'T' + b.time).getTime();
    });

    setEvents(updatedEvents);
    setShowForm(false);
    // Reset form
    setTitle('');
    setDate('');
    setTime('');
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const getTypeColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'doctor': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'medication': return 'bg-red-100 text-red-800 border-red-200';
      case 'consultation': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'doctor': return t('calTypeDoctor');
      case 'medication': return t('calTypeMed');
      case 'consultation': return t('calTypeCons');
      default: return t('calTypeOther');
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto pb-24 h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
           <h2 className="text-2xl font-bold text-gray-800">{t('calTitle')}</h2>
           <p className="text-gray-600 text-sm">{t('calSubtitle')}</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700 transition-transform active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-md border-2 border-green-200 p-5 mb-6 animate-fade-in">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">{t('calEventTitle')}</label>
              <input 
                type="text" 
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 focus:border-green-500 focus:outline-none"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">{t('calDate')}</label>
                <input 
                  type="date" 
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 focus:border-green-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">{t('calTime')}</label>
                <input 
                  type="time" 
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 focus:border-green-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
               <label className="block text-sm font-bold text-gray-700 mb-1">{t('calType')}</label>
               <div className="flex gap-2 overflow-x-auto pb-2">
                 {(['doctor', 'medication', 'consultation', 'other'] as const).map((tVal) => (
                   <button
                    key={tVal}
                    type="button"
                    onClick={() => setType(tVal)}
                    className={`px-3 py-1 rounded-full text-sm font-bold border transition-colors whitespace-nowrap ${
                      type === tVal 
                        ? 'bg-green-600 text-white border-green-600' 
                        : 'bg-white text-gray-600 border-gray-300'
                    }`}
                   >
                     {getTypeLabel(tVal)}
                   </button>
                 ))}
               </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 shadow-md"
            >
              {t('calAddBtn')}
            </button>
          </form>
        </div>
      )}

      {events.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto mb-2 opacity-30">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
          <p>{t('calNoEvents')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {events.map(event => (
            <div key={event.id} className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-green-500 flex justify-between items-center group">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getTypeColor(event.type)}`}>
                    {getTypeLabel(event.type)}
                  </span>
                  <span className="text-sm text-gray-500 font-semibold">
                    {new Date(event.date).toLocaleDateString()} • {event.time}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-800">{event.title}</h3>
              </div>
              <button 
                onClick={() => deleteEvent(event.id)}
                className="text-gray-300 hover:text-red-500 p-2"
                aria-label={t('calDelete')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CalendarView;