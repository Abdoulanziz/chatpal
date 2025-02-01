import React, { useState } from 'react';
import { 
  MessageCircle, Paperclip, Smile, 
  Mic, Phone, Video, MoreVertical 
} from 'lucide-react';

const WhatsAppChatInterface = () => {
  const contacts = [
    { 
      id: 1, 
      name: 'John Doe', 
      lastMessage: 'Thinking about hiking...', 
      online: true,
      avatar: `https://api.dicebear.com/6.x/pixel-art/svg?seed=John%20Doe`
    },
    { 
      id: 2, 
      name: 'Emma Smith', 
      lastMessage: 'Call me later', 
      online: false,
      avatar: `https://api.dicebear.com/6.x/pixel-art/svg?seed=Emma%20Smith`
    },
    { 
      id: 3, 
      name: 'Alex Johnson', 
      lastMessage: 'Let’s meet at 5 PM.', 
      online: true,
      avatar: `https://api.dicebear.com/6.x/pixel-art/svg?seed=Alex%20Johnson`
    },
    { 
      id: 4, 
      name: 'Sophia Williams', 
      lastMessage: 'Great idea! Let’s plan it.', 
      online: false,
      avatar: `https://api.dicebear.com/6.x/pixel-art/svg?seed=Sophia%20Williams`
    }
  ];

  const [selectedContact, setSelectedContact] = useState(contacts[0]);

  const [messages, setMessages] = useState([
    { 
      text: "Hey, are you free this weekend?", 
      sender: 'John Doe', 
      timestamp: '10:15 AM', 
      status: 'read' 
    },
    { 
      text: "Sure, what's the plan?", 
      sender: 'you', 
      timestamp: '10:16 AM', 
      status: 'sent' 
    },
    { 
      text: "Thinking about hiking. Want to join?", 
      sender: 'John Doe', 
      timestamp: '10:17 AM', 
      status: 'read' 
    },
    { 
      text: "Sounds good! Where to?", 
      sender: 'you', 
      timestamp: '10:18 AM', 
      status: 'sent' 
    },
    { 
      text: "Maybe Blue Mountain. It’s beautiful this time of year.", 
      sender: 'John Doe', 
      timestamp: '10:19 AM', 
      status: 'read' 
    },
    { 
      text: "Perfect! Let me check with Emma if she wants to join.", 
      sender: 'you', 
      timestamp: '10:20 AM', 
      status: 'sent' 
    },
    { 
      text: "Great! Let me know. I’ll book a spot.", 
      sender: 'John Doe', 
      timestamp: '10:21 AM', 
      status: 'read' 
    },
    { 
      text: "Emma’s in. Let’s plan for 9 AM Saturday.", 
      sender: 'you', 
      timestamp: '10:25 AM', 
      status: 'sent' 
    },
    { 
      text: "Cool, I’ll bring snacks.", 
      sender: 'John Doe', 
      timestamp: '10:26 AM', 
      status: 'read' 
    },
    { 
      text: "Awesome. See you then!", 
      sender: 'you', 
      timestamp: '10:30 AM', 
      status: 'sent' 
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { 
        text: inputMessage, 
        sender: 'you', 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent'
      }]);
      setInputMessage('');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Contacts Sidebar */}
      <div className="w-1/4 bg-white border-r">
        <div className="bg-gray-100 p-4 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="https://via.placeholder.com/100" 
              alt="Your Avatar" 
              className="w-10 h-10 rounded-full mr-3"
            />
            <h2 className="text-xl font-semibold">WhatsApp</h2>
          </div>
          <div className="flex space-x-4 text-gray-600">
            <MessageCircle />
            <MoreVertical />
          </div>
        </div>
        <div className="p-2">
          <input 
            type="text" 
            placeholder="Search or start new chat" 
            className="w-full p-2 bg-gray-100 rounded-lg"
          />
        </div>
        {contacts.map((contact) => (
          <div 
            key={contact.id}
            onClick={() => setSelectedContact(contact)}
            className={`p-3 flex items-center hover:bg-gray-100 cursor-pointer ${
              selectedContact.id === contact.id ? 'bg-gray-200' : ''
            }`}
          >
            <img 
              src={contact.avatar} 
              alt={contact.name} 
              className="w-12 h-12 rounded-full mr-3"
            />
            <div className="flex-1">
              <div className="font-semibold">{contact.name}</div>
              <div className="text-sm text-gray-500">{contact.lastMessage}</div>
            </div>
            <div className="text-xs text-gray-500">10:17 AM</div>
          </div>
        ))}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white p-4 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src={selectedContact.avatar} 
              alt={selectedContact.name} 
              className="w-12 h-12 rounded-full mr-3"
            />
            <div>
              <div className="font-semibold">{selectedContact.name}</div>
              <div className="text-sm text-green-500">
                {selectedContact.online ? 'Online' : 'Offline'}
              </div>
            </div>
          </div>
          <div className="flex space-x-4 text-gray-600">
            <Video />
            <Phone />
            <MoreVertical />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-200">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`mb-2 flex ${
                msg.sender === 'you' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div 
                className={`max-w-md p-2 rounded-lg ${
                  msg.sender === 'you' 
                    ? 'bg-green-100' 
                    : 'bg-white'
                }`}
              >
                <div>{msg.text}</div>
                <div className="text-xs text-gray-500 flex justify-end items-center">
                  {msg.timestamp}
                  {msg.sender === 'you' && (
                    <span className="ml-1">
                      {msg.status === 'read' ? '✔️✔️' : '✔️'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="bg-white p-4 flex items-center space-x-2">
          <Smile className="text-gray-600" />
          <Paperclip className="text-gray-600" />
          <input 
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message"
            className="flex-1 p-2 bg-gray-100 rounded-lg"
          />
          {inputMessage ? (
            <button 
              onClick={sendMessage}
              className="bg-green-500 text-white p-2 rounded-full"
            >
              Send
            </button>
          ) : (
            <Mic className="text-gray-600" />
          )}
        </div>
      </div>
    </div>
  );
};

export default WhatsAppChatInterface;
