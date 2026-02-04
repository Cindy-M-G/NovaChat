
import React from 'react';
import { Send } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

const SearchPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="p-8 h-full overflow-y-auto">
      <h1 className="text-3xl font-cinzel font-bold mb-8 text-gray-800">{t('search.title')}</h1>
      <div className="max-w-2xl mx-auto">
        <div className="relative mb-8">
          <input
            type="text"
            placeholder={t('search.placeholder')}
            className="w-full bg-white text-gray-900 placeholder-gray-500 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-300"
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
        <div className="space-y-4">
          {/* Search results will be rendered here. Kept empty for now. */}
          <div className="text-center text-gray-500 pt-8">
            <p>Busca a tus amigos por nombre o usuario.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
