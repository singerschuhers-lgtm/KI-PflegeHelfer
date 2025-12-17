export enum AppView {
  CHAT = 'CHAT',
  SEARCH = 'SEARCH',
  LEGAL = 'LEGAL',
  CALENDAR = 'CALENDAR'
}

export type Language = 'ru' | 'de';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface CareService {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
  phone: string;
}

export interface LegalTopic {
  id: string;
  titleRU: string;
  titleDE: string;
  lawReference: string; // e.g., "§36 SGB XI"
  contentRU: string;
  contentDE: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'doctor' | 'medication' | 'consultation' | 'other';
}