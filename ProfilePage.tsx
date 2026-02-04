
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Camera } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  
  const [name, setName] = useState(user?.displayName || '');
  const [username, setUsername] = useState(user?.username || '');
  const [bio, setBio] = useState(user?.bio || '');

  const handleSave = () => {
    // In a real app, you'd update the user in context/localStorage here
    // For now, it just saves the visual state.
    setIsEditing(false);
  };
  
  // Revert changes if editing is cancelled
  const handleCancel = () => {
    setName(user?.displayName || '');
    setUsername(user?.username || '');
    setBio(user?.bio || '');
    setIsEditing(false);
  }

  return (
    <div className="p-8 h-full overflow-y-auto flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 text-gray-800">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <img 
              src={user?.photoURL || `https://i.pravatar.cc/150?u=${user?.uid}`}
              alt="Profile" 
              className="h-32 w-32 rounded-full object-cover border-4 border-purple-500"
            />
            {isEditing && (
              <button className="absolute bottom-0 right-0 bg-purple-600 hover:bg-purple-500 p-2 rounded-full text-white">
                <Camera size={20} />
              </button>
            )}
          </div>
          
          {isEditing ? (
            <div className="w-full space-y-4">
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full text-center border-gray-300 border bg-gray-50 p-2 rounded-md text-3xl font-cinzel font-bold focus:outline-none focus:ring-2 focus:ring-purple-500"/>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full text-center border-gray-300 border bg-gray-50 p-2 rounded-md text-lg text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500" />
              <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="w-full text-center border-gray-300 border bg-gray-50 p-2 rounded-md h-24 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-cinzel font-bold">{name}</h1>
              <p className="text-lg text-purple-600">@{username}</p>
              <p className="mt-4 text-center text-gray-600">{bio}</p>
            </>
          )}

          <div className="mt-8">
            {isEditing ? (
              <div className="flex space-x-4">
                <button onClick={handleSave} className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-lg transition-colors">{t('profile.save')}</button>
                <button onClick={handleCancel} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-lg transition-colors">{t('profile.cancel')}</button>
              </div>
            ) : (
              <button onClick={() => setIsEditing(true)} className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-lg transition-colors">{t('profile.edit')}</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
