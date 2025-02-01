import React, { useState } from 'react';
import './WhatsappChatInterfece.css';

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
    { text: "Hey, are you free this weekend?", sender: 'John Doe', timestamp: '10:15 AM' },
    { text: "Sure, what's the plan?", sender: 'you', timestamp: '10:16 AM' },
    { text: "Thinking about hiking. Want to join?", sender: 'John Doe', timestamp: '10:17 AM' },
    { text: "Sounds good! Where to?", sender: 'you', timestamp: '10:18 AM' },
    { text: "Maybe Blue Mountain. It’s beautiful this time of year.", sender: 'John Doe', timestamp: '10:19 AM' },
    { text: "Perfect! Let me check with Emma if she wants to join.", sender: 'you', timestamp: '10:20 AM' },
    { text: "Great! Let me know. I’ll book a spot.", sender: 'John Doe', timestamp: '10:21 AM' },
    { text: "Emma’s in. Let’s plan for 9 AM Saturday.", sender: 'you', timestamp: '10:25 AM' },
    { text: "Cool, I’ll bring snacks.", sender: 'John Doe', timestamp: '10:26 AM' },
    { text: "Awesome. See you then!", sender: 'you', timestamp: '10:30 AM' }
  ]);

  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { 
        text: inputMessage, 
        sender: 'you', 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setInputMessage('');
    }
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <img src="https://via.placeholder.com/100" alt="Your Avatar" />
          <h2>WhatsApp</h2>
        </div>
        <div className="search-box">
          <input type="text" placeholder="Search or start new chat" />
        </div>
        <div className="contact-list">
          {contacts.map((contact) => (
            <div 
              key={contact.id} 
              className="contact" 
              onClick={() => setSelectedContact(contact)}
            >
              <img src={contact.avatar} alt={contact.name} />
              <div className="contact-details">
                <div className="contact-name">{contact.name}</div>
                <div className="contact-last-message">{contact.lastMessage}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="chat">
        <div className="chat-header">
          <div className="contact-info">
            <img src={selectedContact.avatar} alt={selectedContact.name} />
            <div>
              <div className="contact-name">{selectedContact.name}</div>
              <div className="contact-last-message">
                {selectedContact.online ? 'Online' : 'Offline'}
              </div>
            </div>
          </div>
        </div>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`message ${msg.sender === 'you' ? 'you' : 'other'}`}
            >
              <div className="text">{msg.text}</div>
              <div className="timestamp">{msg.timestamp}</div>
            </div>
          ))}
        </div>
        <div className="message-input">
          <input 
            type="text" 
            value={inputMessage} 
            onChange={(e) => setInputMessage(e.target.value)} 
            placeholder="Type a message"
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppChatInterface;
