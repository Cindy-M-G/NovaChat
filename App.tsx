
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthContext, AuthState, User } from './context/AuthContext';
import { LanguageContext, Language } from './context/LanguageContext';
import translations from './utils/translations';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import MainLayout from './components/MainLayout';
import Spinner from './components/common/Spinner';

import ChatPage from './pages/main/ChatPage';
import RequestsPage from './pages/main/RequestsPage';
import SearchPage from './pages/main/SearchPage';
import ProfilePage from './pages/main/ProfilePage';
import SettingsPage from './pages/main/SettingsPage';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<Language>('es'); // Default language set to Spanish

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('novaChatUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('novaChatUser');
    }
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    localStorage.setItem('novaChatUser', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('novaChatUser');
    setUser(null);
  };

  const t = useCallback((key: string) => {
    const keys = key.split('.');
    let result: any = translations[language];
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        return key;
      }
    }
    return result;
  }, [language]);

  const authContextValue: AuthState = useMemo(() => ({ user, loading, login, logout }), [user, loading]);
  const languageContextValue = useMemo(() => ({ language, setLanguage, t }), [language, t]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-gray-900">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      <LanguageContext.Provider value={languageContextValue}>
        <HashRouter>
          <Routes>
            {!user ? (
              <>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            ) : (
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Navigate to="/chats" replace />} />
                <Route path="chats" element={<ChatPage />} />
                {/* Updated route to handle selected chat */}
                <Route path="chats/:chatId" element={<ChatPage />} />
                <Route path="requests" element={<RequestsPage />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="*" element={<Navigate to="/chats" />} />
              </Route>
            )}
          </Routes>
        </HashRouter>
      </LanguageContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
