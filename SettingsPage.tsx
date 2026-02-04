
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { Language } from '../../context/LanguageContext';
import { useAuth } from '../../hooks/useAuth';

// Fix: Define an interface for a blocked user for type safety.
interface BlockedUser {
  id: string;
  name: string;
  avatar: string;
}

const SettingsPage: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const { user } = useAuth();

  // State for password change
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // State for blocked users
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([]);

  useEffect(() => {
    const loadBlockedUsers = () => {
      const storedBlocked = JSON.parse(localStorage.getItem('blockedUsers') || '{}');
      const blockedList = Object.entries(storedBlocked).map(([id, userData]) => ({ id, ...(userData as { name: string; avatar: string }) }));
      setBlockedUsers(blockedList);
    };

    // Add a listener to update blocked users when storage changes
    const handleStorageChange = () => {
        loadBlockedUsers();
    };
    window.addEventListener('storage', handleStorageChange);
    loadBlockedUsers(); // Initial load
    
    return () => {
        window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordMessage('');

    const allUsers = JSON.parse(localStorage.getItem('novaChatUsers') || '{}');
    const currentUserData = allUsers[user.uid];

    if (currentUserData.password !== currentPassword) {
      setPasswordError('La contraseña actual es incorrecta.');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('La nueva contraseña debe tener al menos 6 caracteres.');
      return;
    }

    currentUserData.password = newPassword;
    allUsers[user.uid] = currentUserData;
    localStorage.setItem('novaChatUsers', JSON.stringify(allUsers));
    
    setPasswordMessage('Contraseña actualizada con éxito.');
    setCurrentPassword('');
    setNewPassword('');
  };
  
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
  };

  const handleUnblock = (userId: string) => {
    if (window.confirm('¿Estás seguro de que quieres desbloquear a este usuario?')) {
        const storedBlocked = JSON.parse(localStorage.getItem('blockedUsers') || '{}');
        delete storedBlocked[userId];
        localStorage.setItem('blockedUsers', JSON.stringify(storedBlocked));
        setBlockedUsers(blockedUsers.filter(u => u.id !== userId));
        // Manually dispatch a storage event so other components can update if needed
        window.dispatchEvent(new Event('storage'));
    }
  };
  
  return (
    <div className="p-8 h-full overflow-y-auto">
      <h1 className="text-3xl font-cinzel font-bold mb-8 text-gray-800">{t('settings.title')}</h1>
      <div className="max-w-4xl mx-auto space-y-12">
        <section>
          <h2 className="text-2xl font-semibold text-purple-700 mb-4 font-cinzel">{t('settings.privacyAndSecurity')}</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm space-y-6 border border-gray-200">
            <div>
              <h3 className="text-lg font-semibold mb-2">{t('settings.changePassword')}</h3>
              <form onSubmit={handlePasswordChange} className="space-y-4 max-w-sm">
                {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                {passwordMessage && <p className="text-green-600 text-sm">{passwordMessage}</p>}
                <div className="relative">
                  <input 
                    type={showCurrentPassword ? 'text' : 'password'} 
                    placeholder={t('settings.currentPassword')} 
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
                  />
                  <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-purple-600">
                    {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <div className="relative">
                  <input 
                    type={showNewPassword ? 'text' : 'password'} 
                    placeholder={t('settings.newPassword')}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
                  />
                   <button type="button" onClick={() => setNewPassword(!showNewPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-purple-600">
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">{t('settings.updateButton')}</button>
              </form>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">{t('settings.blockedUsers')}</h3>
              <div className="space-y-3">
                {blockedUsers.length > 0 ? blockedUsers.map(bu => (
                  <div key={bu.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <img src={bu.avatar} alt="avatar" className="h-10 w-10 rounded-full" />
                      <span className="font-medium text-gray-800">{bu.name}</span>
                    </div>
                    <button onClick={() => handleUnblock(bu.id)} className="border border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white text-sm py-1 px-3 rounded-md transition-colors">{t('settings.unblock')}</button>
                  </div>
                )) : (
                  <p className="text-gray-500 text-sm">No tienes usuarios bloqueados.</p>
                )}
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-purple-700 mb-4 font-cinzel">{t('settings.language')}</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="max-w-sm">
              <select 
                value={language} 
                onChange={handleLanguageChange} 
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="en">{t('settings.languages.en')}</option>
                <option value="es">{t('settings.languages.es')}</option>
                <option value="fr">{t('settings.languages.fr')}</option>
              </select>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
