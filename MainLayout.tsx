
import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { MessageSquare, Bell, Search, UserCircle, Settings, LogOut } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useAuth } from '../hooks/useAuth';

const MainLayout: React.FC = () => {
  const { t } = useLanguage();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const navItems = [
    { name: t('main.chats'), path: '/chats', icon: MessageSquare },
    { name: t('main.requests'), path: '/requests', icon: Bell },
    { name: t('main.search'), path: '/search', icon: Search },
    { name: t('main.profile'), path: '/profile', icon: UserCircle },
    { name: t('main.settings'), path: '/settings', icon: Settings },
  ];

  const activeLinkClass = "bg-purple-800 bg-opacity-50 text-white";
  const inactiveLinkClass = "text-purple-200 hover:bg-purple-700 hover:bg-opacity-30";

  return (
    <div className="flex h-screen w-screen bg-gray-900 text-white font-body">
      {/* Sidebar */}
      <nav className="w-20 lg:w-64 bg-gradient-to-b from-gray-900 to-black p-4 flex flex-col justify-between border-r border-purple-900 shadow-lg">
        <div>
          <div className="flex items-center justify-center lg:justify-start mb-10 p-2">
            <svg viewBox="0 0 100 100" className="h-10 text-white flex-shrink-0 animate-glow">
                <path d="M50 0 L61.2 35.5 L98.1 38.2 L70.5 64.5 L78.4 99 L50 79.5 L21.6 99 L29.5 64.5 L1.9 38.2 L38.8 35.5 Z" fill="currentColor"/>
            </svg>
            <h1 className="hidden lg:block text-2xl font-cinzel font-bold ml-3 tracking-widest">NovaChat</h1>
          </div>
          <ul className="space-y-3">
            {navItems.map(item => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `flex items-center p-3 rounded-lg transition-colors duration-200 ${isActive ? activeLinkClass : inactiveLinkClass}`}
                >
                  <item.icon className="h-6 w-6 flex-shrink-0" />
                  <span className="hidden lg:block ml-4 font-semibold">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className={`flex items-center p-3 w-full rounded-lg transition-colors duration-200 ${inactiveLinkClass}`}
          >
            <LogOut className="h-6 w-6 flex-shrink-0" />
            <span className="hidden lg:block ml-4 font-semibold">{t('main.logout')}</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 text-gray-800">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;