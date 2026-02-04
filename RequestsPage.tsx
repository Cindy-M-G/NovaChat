
import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

const initialRequests = [
  { id: 1, name: 'Sirius', username: 'sirius_blackhole', avatar: 'https://picsum.photos/id/20/200/200' },
  { id: 2, name: 'Vega', username: 'vega_star', avatar: 'https://picsum.photos/id/21/200/200' },
  { id: 3, name: 'Orion', username: 'orion_nebula', avatar: 'https://picsum.photos/id/22/200/200' },
];

const RequestsPage: React.FC = () => {
  const { t } = useLanguage();
  const [requests, setRequests] = useState(initialRequests);

  const handleRequest = (id: number, accepted: boolean) => {
    if (accepted) {
      const acceptedRequest = requests.find(req => req.id === id);
      if (acceptedRequest) {
        const storedContacts = JSON.parse(localStorage.getItem('novaChatContacts') || '{}');
        const newContact = {
          id: `user_${acceptedRequest.id}_${Date.now()}`,
          name: acceptedRequest.name,
          username: acceptedRequest.username,
          avatar: acceptedRequest.avatar,
          bio: 'Un nuevo amigo en NovaChat!',
          online: false,
        };
        storedContacts[newContact.id] = newContact;
        localStorage.setItem('novaChatContacts', JSON.stringify(storedContacts));
        window.dispatchEvent(new Event('storage'));
      }
      alert('Solicitud aceptada. El usuario ahora está en tu lista de chats.');
    } else {
      alert('Solicitud rechazada.');
    }
    setRequests(requests.filter(req => req.id !== id));
  };

  return (
    <div className="p-8 h-full overflow-y-auto">
      <h1 className="text-3xl font-cinzel font-bold mb-8 text-gray-800">{t('requests.title')}</h1>
      <div className="max-w-2xl mx-auto space-y-4">
        {requests.length > 0 ? (
          requests.map((req) => (
            <div key={req.id} className="bg-white p-4 rounded-lg flex items-center justify-between shadow-sm animate-fade-in border border-gray-200">
              <div className="flex items-center space-x-4">
                <img src={req.avatar} alt="avatar" className="h-12 w-12 rounded-full" />
                <div>
                  <h3 className="font-semibold text-gray-900">{req.name}</h3>
                  <p className="text-sm text-gray-500">@{req.username}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button onClick={() => handleRequest(req.id, true)} className="bg-green-600 hover:bg-green-500 p-2 rounded-full text-white transition-colors">
                  <Check size={20} />
                </button>
                <button onClick={() => handleRequest(req.id, false)} className="bg-red-600 hover:bg-red-500 p-2 rounded-full text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No tienes nuevas solicitudes de mensajes.</p>
        )}
      </div>
    </div>
  );
};

export default RequestsPage;