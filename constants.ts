import { CareService, LegalTopic } from './types';

export const SYSTEM_INSTRUCTION = `
You are "PflegeHelfer", a helpful, empathetic, and patient medical assistant for elderly Russian-speaking patients living in Germany.
Your goal is to explain German care laws (SGB XI) simply and clearly in Russian (with German terms in brackets where necessary).

Key Knowledge Areas:
1. Körperbezogene Pflegeleistungen (§36 SGB XI) - Professional care at home.
2. Pflegegeld (§37 SGB XI) - Cash benefits for care.
3. Verhinderungspflege (§39 SGB XI) - Respite care (up to 6 weeks/year).
4. Entlastungsbetrag (§45b SGB XI) - Relief amount (125€/month).

Tone:
- Use large, clear structure.
- Be very polite and respectful (use "Вы").
- If asked about medical emergencies, tell them to call 112 immediately.
- Keep answers concise but informative.
`;

// Helper to generate mock data based on region
export const getMockServices = (zip: string): CareService[] => {
  const zipPrefix = zip.substring(0, 2);
  
  // Dresden (PLZ starts with 01)
  if (zipPrefix === '01') {
    return [
      {
        id: 'd1',
        name: 'Pflegedienst Elbflorenz',
        address: 'Prager Straße 10, 01069 Dresden',
        distance: '0.2 km',
        rating: 4.9,
        phone: '0351 9876543'
      },
      {
        id: 'd2',
        name: 'Seniorenhilfe Dresden',
        address: 'Altmarkt 5, 01067 Dresden',
        distance: '0.4 km',
        rating: 4.6,
        phone: '0351 1234567'
      },
      {
        id: 'd3',
        name: 'Caritasverband Dresden',
        address: 'Schweriner Str. 27, 01067 Dresden',
        distance: '0.6 km',
        rating: 4.7,
        phone: '0351 498110'
      },
      {
        id: 'd4',
        name: 'Pflege mit Herz Sachsen',
        address: 'Königsbrücker Str. 50, 01099 Dresden',
        distance: '0.9 km',
        rating: 4.5,
        phone: '0351 5566778'
      }
    ];
  }
  
  // Berlin default (PLZ starts with 10, 11, 12, 13, 14 or others for demo)
  return [
    {
      id: '1',
      name: 'Pflegedienst Sonnenschein',
      address: 'Hauptstraße 12, 10115 Berlin',
      distance: '0.3 km',
      rating: 4.8,
      phone: '030 12345678'
    },
    {
      id: '2',
      name: 'Caritas Sozialstation',
      address: 'Bergmannstraße 5, 10961 Berlin',
      distance: '0.8 km',
      rating: 4.5,
      phone: '030 98765432'
    },
    {
      id: '3',
      name: 'Diakonie Pflege Zuhause',
      address: 'Oranienstraße 20, 10999 Berlin',
      distance: '1.5 km',
      rating: 4.7,
      phone: '030 55566677'
    },
    {
      id: '4',
      name: 'Ambulanter Pflegedienst Müller',
      address: 'Karl-Marx-Allee 90, 10243 Berlin',
      distance: '2.0 km',
      rating: 4.2,
      phone: '030 11122233'
    }
  ];
};

export const MOCK_SERVICES: CareService[] = getMockServices('10'); // Default export for backwards compatibility if needed

export const LEGAL_TOPICS: LegalTopic[] = [
  {
    id: 'p36',
    titleRU: 'Уход на дому (Sachleistungen)',
    titleDE: 'Pflegesachleistungen',
    lawReference: '§36 SGB XI',
    contentRU: 'Профессиональный уход на дому, предоставляемый службами (Pflegedienst). Оплачивается кассой по уходу напрямую службе.',
    contentDE: 'Häusliche Pflegehilfe durch ambulante Pflegedienste. Die Abrechnung erfolgt direkt mit der Pflegekasse.'
  },
  {
    id: 'p37',
    titleRU: 'Деньги по уходу (Pflegegeld)',
    titleDE: 'Pflegegeld',
    lawReference: '§37 SGB XI',
    contentRU: 'Выплачивается, если уход осуществляют родственники. Требует регулярных консультаций (Beratungseinsatz).',
    contentDE: 'Geldleistung für die Pflege durch Angehörige. Voraussetzung sind regelmäßige Beratungseinsätze.'
  },
  {
    id: 'p39',
    titleRU: 'Замена ухода (Verhinderungspflege)',
    titleDE: 'Verhinderungspflege',
    lawReference: '§39 SGB XI',
    contentRU: 'Если основной опекун заболел или в отпуске, касса оплачивает замену до 6 недель в год.',
    contentDE: 'Bei Krankheit oder Urlaub der Pflegeperson übernimmt die Kasse die Kosten für eine Ersatzpflege für bis zu 6 Wochen.'
  },
  {
    id: 'p45b',
    titleRU: 'Сумма разгрузки (Entlastungsbetrag)',
    titleDE: 'Entlastungsbetrag',
    lawReference: '§45b SGB XI',
    contentRU: '125 евро в месяц для всех степеней ухода. Можно использовать на помощь по хозяйству или группы поддержки.',
    contentDE: '125 Euro pro Monat für alle Pflegegrade. Nutzbar für Haushaltshilfe oder Betreuungsgruppen.'
  }
];