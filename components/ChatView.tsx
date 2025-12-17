import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { generateAIResponse } from '../services/geminiService';
import { useLanguage } from '../contexts/LanguageContext';

const ChatView: React.FC = () => {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [initialized, setInitialized] = useState(false);

  // Initialize and update welcome message when language changes
  useEffect(() => {
    if (!initialized) {
      setMessages([{
        id: 'welcome',
        role: 'model',
        text: t('chatWelcome')
      }]);
      setInitialized(true);
    } else {
      // If language changes, update the welcome message text in-place
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === 'welcome' ? { ...msg, text: t('chatWelcome') } : msg
        )
      );
    }
  }, [language, t, initialized]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');

    // Add user message
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: userText
    };

    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    try {
      // Prepare history for Gemini
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      // Pass language context to AI service
      const responseText = await generateAIResponse(userText, history, language);

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: language === 'ru' ? 'Простите, произошла ошибка связи.' : 'Entschuldigung, ein Verbindungsfehler ist aufgetreten.',
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-4 text-lg leading-relaxed shadow-sm ${
                msg.role === 'user'
                  ? 'bg-green-600 text-white rounded-br-none'
                  : 'bg-white border-2 border-green-100 text-gray-800 rounded-bl-none'
              } ${msg.isError ? 'bg-red-100 border-red-300 text-red-800' : ''}`}
            >
              <div className="whitespace-pre-wrap">{msg.text}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border-2 border-green-100 rounded-2xl rounded-bl-none p-4 shadow-sm flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Sticky above navbar */}
      <div className="bg-white p-4 border-t border-green-200">
        <div className="flex gap-2 max-w-3xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={t('chatPlaceholder')}
            className="flex-1 border-2 border-green-300 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors placeholder-gray-400"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-red-600 text-white rounded-xl px-4 py-3 font-bold text-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all active:scale-95"
          >
            {t('chatSend')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatView;