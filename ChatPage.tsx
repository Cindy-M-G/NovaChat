
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Info, MessageSquare, Send, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const mockContact = {
    id: 'user1',
    name: 'Andromeda',
    username: 'andromeda_galaxy',
    avatar: 'https://picsum.photos/id/10/200/200',
    bio: 'Stargazer and dream weaver. Exploring the cosmos one chat at a time.',
    online: true,
};

const initialMessages = [
    { id: 1, sender: 'user1', text: 'Hey, how\'s it going?' },
    { id: 2, sender: 'me', text: 'Pretty good! Just working on this chat app. It\'s looking really cool with the galactic theme. What do you think?', avatar: 'https://picsum.photos/id/11/200/200' },
];

const UserInfoModal = ({ user, onClose }) => (
    <div className="absolute top-16 right-4 z-20 w-64 bg-white border border-gray-200 rounded-lg shadow-xl p-4 flex flex-col items-center text-center text-gray-800">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
            <X size={20} />
        </button>
        <img src={user.avatar} alt="avatar" className="h-20 w-20 rounded-full border-2 border-purple-500 mb-2" />
        <h3 className="font-bold text-lg font-cinzel">{user.name}</h3>
        <p className="text-sm text-purple-600">@{user.username}</p>
        <p className="text-xs text-gray-500 mt-2">{user.bio}</p>
    </div>
);

const ChatList = ({ contacts, selectedChatId }) => {
    const navigate = useNavigate();
    const handleClick = (contact) => {
        navigate(`/chats/${contact.id}`);
    };
    return (
        <div className="flex flex-col h-full bg-gray-900 text-white">
            <div className="p-4 border-b border-purple-900">
                <input type="text" placeholder="Buscar chats..." className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
            <div className="overflow-y-auto">
                {contacts.map((contact) => (
                    <div key={contact.id} onClick={() => handleClick(contact)} className={`p-4 flex items-center space-x-4 cursor-pointer hover:bg-purple-900/50 ${selectedChatId === contact.id ? 'bg-purple-800/50' : ''}`}>
                        <img src={contact.avatar} alt="avatar" className="h-12 w-12 rounded-full" />
                        <div className="flex-1 overflow-hidden">
                            <div className="flex justify-between items-start">
                                <h3 className="font-semibold truncate">{contact.name}</h3>
                                <span className="text-xs text-gray-400 flex-shrink-0">10:30 PM</span>
                            </div>
                            <p className="text-sm text-gray-400 truncate">{contact.id === 'user1' ? initialMessages[initialMessages.length - 1].text : 'Di hola para empezar!'}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ChatWindow = ({ chat, userAvatar }) => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState(initialMessages);
    const [newMessage, setNewMessage] = useState('');
    const [isInfoOpen, setInfoOpen] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(scrollToBottom, [messages]);
    
    useEffect(() => {
        if (chat.id !== 'user1') {
            setMessages([]);
        } else {
            setMessages(initialMessages);
        }
        const blockedUsers = JSON.parse(localStorage.getItem('blockedUsers') || '{}');
        setIsBlocked(!!blockedUsers[chat.id]);
    }, [chat.id]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;
        const msg = {
            id: Date.now(),
            sender: 'me',
            text: newMessage,
            avatar: userAvatar
        };
        setMessages([...messages, msg]);
        setNewMessage('');
    };

    return (
        <div className="flex flex-col h-full bg-white relative text-gray-800">
            <header className="flex items-center p-4 bg-white border-b border-gray-200">
                <button onClick={() => navigate('/chats')} className="md:hidden mr-2 text-purple-600 hover:text-purple-800">
                    <ArrowLeft size={24} />
                </button>
                <img src={chat.avatar} alt="avatar" className="h-10 w-10 rounded-full" />
                <div className="ml-4 flex-1">
                    <h2 className="font-semibold flex items-center font-cinzel">
                        {chat.name}
                    </h2>
                    <p className="text-xs text-green-500">{chat.online ? 'En línea' : 'Desconectado'}</p>
                </div>
                <div className="flex items-center space-x-4">
                    <button onClick={() => setInfoOpen(!isInfoOpen)} className="text-purple-600 hover:text-purple-800"><Info size={20} /></button>
                </div>
            </header>

            {isInfoOpen && <UserInfoModal user={chat} onClose={() => setInfoOpen(false)} />}

            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-100">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex items-start gap-3 ${msg.sender === 'me' ? 'justify-end' : ''}`}>
                        {msg.sender !== 'me' && <img src={chat.avatar} alt="avatar" className="h-8 w-8 rounded-full" />}
                        <div className={`p-3 rounded-lg ${msg.sender === 'me' ? 'bg-purple-600 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'} max-w-lg shadow`}>
                            <p>{msg.text}</p>
                        </div>
                        {msg.sender === 'me' && <img src={userAvatar} alt="avatar" className="h-8 w-8 rounded-full" />}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <footer className="p-4 bg-white border-t border-gray-200">
                <form onSubmit={handleSendMessage} className="relative">
                    <input
                        type="text"
                        placeholder="Escribe un mensaje..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="w-full bg-gray-100 text-gray-900 placeholder-gray-500 rounded-full py-3 px-6 pr-14 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        disabled={isBlocked}
                    />
                    <button type="submit" disabled={isBlocked} className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-br from-purple-500 to-indigo-600 h-10 w-10 rounded-full flex items-center justify-center hover:from-purple-600 hover:to-indigo-700 disabled:bg-gray-500 disabled:from-gray-500 text-white transition-transform duration-200 hover:scale-110 active:scale-95">
                        <Send size={20} />
                    </button>
                </form>
            </footer>
        </div>
    );
};

const ChatPlaceholder = () => (
    <div className="flex flex-col h-full items-center justify-center bg-gray-100 text-gray-500 text-center p-4">
        <MessageSquare size={64} />
        <h2 className="mt-4 text-xl font-semibold font-cinzel">Selecciona un chat para empezar a chatear</h2>
        <p>Tus conversaciones aparecerán aquí.</p>
    </div>
);

const ChatPage: React.FC = () => {
    const { chatId } = useParams();
    const { user } = useAuth();
    const [contacts, setContacts] = useState<any[]>([]);
    const [selectedChat, setSelectedChat] = useState(null);

    useEffect(() => {
        const loadContacts = () => {
            let storedContacts = JSON.parse(localStorage.getItem('novaChatContacts') || '{}');
            if (Object.keys(storedContacts).length === 0) {
                storedContacts = { [mockContact.id]: mockContact };
                localStorage.setItem('novaChatContacts', JSON.stringify(storedContacts));
            }
            setContacts(Object.values(storedContacts));
        };
        
        loadContacts();
        window.addEventListener('storage', loadContacts);
        return () => {
            window.removeEventListener('storage', loadContacts);
        };
    }, []);

    useEffect(() => {
        if (chatId && contacts.length > 0) {
            const chat = contacts.find(c => c.id === chatId);
            setSelectedChat(chat || null);
        } else {
            setSelectedChat(null);
        }
    }, [chatId, contacts]);

    return (
        <div className="flex h-full overflow-hidden">
            {/* Chat List Panel */}
            <div className={`
                w-full flex-col border-r border-purple-900 
                md:w-1/3 lg:w-1/4 
                ${chatId ? 'hidden md:flex' : 'flex'}
            `}>
                <ChatList contacts={contacts} selectedChatId={chatId} />
            </div>

            {/* Main Chat Area */}
            <div className={`flex-1 flex-col ${selectedChat ? 'flex' : 'hidden md:flex'}`}>
                {selectedChat ? (
                    <ChatWindow chat={selectedChat} userAvatar={user.photoURL} />
                ) : (
                    <ChatPlaceholder />
                )}
            </div>
        </div>
    );
};

export default ChatPage;
    