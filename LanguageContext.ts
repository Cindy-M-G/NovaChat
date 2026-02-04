
import { createContext } from 'react';

export type Language = 'en' | 'es' | 'fr';

export interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageState>({
  language: 'es',
  setLanguage: () => {},
  t: (key: string) => key,
});
