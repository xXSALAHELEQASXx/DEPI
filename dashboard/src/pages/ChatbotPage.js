import React, { useState } from "react";

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello User", sender: "bot" },
    { id: 2, text: "Hello Dashboard bot", sender: "user" },
    { id: 3, text: "Can i help you?.", sender: "bot" },
    { id: 4, text: "NO, Thanks.", sender: "user" },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      const userMessage = { id: Date.now(), text: newMessage, sender: "user" };
      setMessages([...messages, userMessage]);

      // Respond based on user input
      let botResponse = { id: Date.now() + 1, text: "", sender: "bot" };
      if (newMessage.toLowerCase().includes("hello")) {
        botResponse.text = "Hi there! How can I assist you today?";
      } else if (newMessage.toLowerCase().includes("help")) {
        botResponse.text = "Sure, I'm here to help! What do you need assistance with?";
      } else {
        botResponse.text = "I'm sorry, I don't understand that. Can you please rephrase?";
      }

      setMessages([...messages, userMessage, botResponse]);
      setNewMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="bot-info">
          <div className="avatar"></div>
          <div>
            <h3>Dashboard BOT</h3>
            <p>online</p>
          </div>
        </div>
        <div className="chat-options">...</div>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message-bubble ${message.sender}`}
          >
            {message.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
};

export default ChatbotPage;

// CSS styles (to include in your CSS file or as inline styles)
const styles = `
.chat-container {
  background: linear-gradient(to bottom, #d1f2eb, #ffffff);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 10px;
}

.bot-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 40px;
  height: 40px;
  background-color: #9575cd;
  border-radius: 50%;
}

.chat-messages {
  flex: 1;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
}

.message-bubble {
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 15px;
  font-size: 14px;
  line-height: 1.5;
}

.message-bubble.bot {
  background-color: #ffab91;
  align-self: flex-start;
  color: #2c2c2c;
}

.message-bubble.user {
  background-color: #9575cd;
  align-self: flex-end;
  color: white;
}

.chat-input {
  display: flex;
  gap: 10px;
}

.chat-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
}

.chat-input button {
  background-color: #9575cd;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.chat-input button:hover {
  background-color: #6a1b9a;
}

.chat-options {
  font-size: 24px;
  cursor: pointer;
}
`;

// Inject styles into the DOM
document.head.insertAdjacentHTML(
  "beforeend",
  `<style>${styles}</style>`
);
