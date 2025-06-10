import React, { useState } from 'react';
import { Search, Send, Paperclip, MoreVertical, Phone, Video, Star, Circle } from 'lucide-react';

interface Message {
  id: string;
  sender: 'me' | 'other';
  content: string;
  timestamp: string;
  type: 'text' | 'image';
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
  rating?: number;
}

const MessagingPage: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string>('1');
  const [messageInput, setMessageInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const conversations: Conversation[] = [
    {
      id: '1',
      name: 'sneakerhead_fr',
      avatar: 'S',
      lastMessage: 'Parfait, je vous envoie le colis demain !',
      timestamp: '14:30',
      unread: 0,
      online: true,
      rating: 5
    },
    {
      id: '2',
      name: 'vintage_style',
      avatar: 'V',
      lastMessage: 'Bonjour, l\'article est-il toujours disponible ?',
      timestamp: '12:45',
      unread: 2,
      online: false,
      rating: 4
    },
    {
      id: '3',
      name: 'streetwear_pro',
      avatar: 'S',
      lastMessage: 'Merci pour votre achat !',
      timestamp: 'Hier',
      unread: 0,
      online: true,
      rating: 5
    },
    {
      id: '4',
      name: 'denim_lover',
      avatar: 'D',
      lastMessage: 'Pouvez-vous m\'envoyer plus de photos ?',
      timestamp: 'Hier',
      unread: 1,
      online: false,
      rating: 4
    }
  ];

  const messages: Record<string, Message[]> = {
    '1': [
      {
        id: '1',
        sender: 'other',
        content: 'Bonjour ! Je suis intéressé par vos Nike Air Max.',
        timestamp: '14:20',
        type: 'text'
      },
      {
        id: '2',
        sender: 'me',
        content: 'Bonjour ! Elles sont encore disponibles. Souhaitez-vous plus d\'informations ?',
        timestamp: '14:22',
        type: 'text'
      },
      {
        id: '3',
        sender: 'other',
        content: 'Oui, quelle est la taille exacte et l\'état ?',
        timestamp: '14:25',
        type: 'text'
      },
      {
        id: '4',
        sender: 'me',
        content: 'Taille 42, état neuf sans étiquette. Portées 2-3 fois maximum.',
        timestamp: '14:27',
        type: 'text'
      },
      {
        id: '5',
        sender: 'other',
        content: 'Parfait, je vous envoie le colis demain !',
        timestamp: '14:30',
        type: 'text'
      }
    ],
    '2': [
      {
        id: '1',
        sender: 'other',
        content: 'Bonjour, l\'article est-il toujours disponible ?',
        timestamp: '12:45',
        type: 'text'
      }
    ]
  };

  const currentConversation = conversations.find(c => c.id === selectedConversation);
  const currentMessages = messages[selectedConversation] || [];

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Ici on ajouterait la logique pour envoyer le message
      setMessageInput('');
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-120px)] flex bg-black">
      {/* Conversations List */}
      <div className="w-80 bg-[#101014] border-r border-gray-800 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-white font-semibold text-lg mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher une conversation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#181820] border border-gray-700 rounded-lg pl-9 pr-3 py-2 text-white placeholder-gray-400 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
              className={`w-full p-4 border-b border-gray-800 hover:bg-[#181820]/50 transition-colors text-left ${
                selectedConversation === conversation.id ? 'bg-[#181820]' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">{conversation.avatar}</span>
                  </div>
                  {conversation.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-gray-900 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium truncate">{conversation.name}</span>
                      {conversation.rating && (
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-yellow-400 text-xs ml-1">{conversation.rating}</span>
                        </div>
                      )}
                    </div>
                    <span className="text-gray-400 text-xs">{conversation.timestamp}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400 text-sm truncate">{conversation.lastMessage}</p>
                    {conversation.unread > 0 && (
                      <div className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-2">
                        {conversation.unread}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {currentConversation ? (
          <>
            {/* Chat Header */}
            <div className="bg-[#101014] border-b border-gray-800 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">{currentConversation.avatar}</span>
                    </div>
                    {currentConversation.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium">{currentConversation.name}</span>
                      {currentConversation.rating && (
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-yellow-400 text-sm">{currentConversation.rating}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 text-gray-400 text-sm">
                      <Circle className={`w-2 h-2 ${currentConversation.online ? 'text-green-500 fill-current' : 'text-gray-500'}`} />
                      <span>{currentConversation.online ? 'En ligne' : 'Hors ligne'}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-gray-400 hover:text-white p-2 hover:bg-[#181820] rounded-lg transition-colors">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="text-gray-400 hover:text-white p-2 hover:bg-[#181820] rounded-lg transition-colors">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="text-gray-400 hover:text-white p-2 hover:bg-[#181820] rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === 'me'
                        ? 'bg-red-500 text-white'
                        : 'bg-[#181820] text-white'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'me' ? 'text-red-100' : 'text-gray-400'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="bg-[#101014] border-t border-gray-800 p-4">
              <div className="flex items-center space-x-3">
                <button className="text-gray-400 hover:text-white p-2 hover:bg-[#181820] rounded-lg transition-colors">
                  <Paperclip className="w-5 h-5" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Tapez votre message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="w-full bg-[#181820] border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                  className="bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-gray-400 text-lg mb-2">Sélectionnez une conversation</div>
              <div className="text-gray-500 text-sm">Choisissez une conversation pour commencer à discuter</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagingPage;