'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './clippysidebar.module.css';

const INITIAL_MESSAGE = {
  role: 'assistant',
  content: "Hi! I'm Clippy, your friendly Windows 98 assistant! I'm here to help you learn about Sony Thomas. I know all about their:\n\n" +
    "📚 Education at Govt. Model Engineering College\n" +
    "💼 Experience in software development\n" +
    "🛠️ Skills in web development and programming\n" +
    "🚀 Projects and achievements\n\n" +
    "What would you like to know?"
};

const SYSTEM_PROMPT = `You are Clippy, the iconic assistant from Windows 98. You only have knowledge about Sony Thomas' portfolio:

Name: Sony Thomas
Location: Bengaluru, India
Contact: 
- Email: the.sonythomas@gmail.com
- Phone: +91 8136984259
- LinkedIn: https://linkedin.com/in/njansony
- GitHub: https://github.com/stsonythomas

Education:
- Institution: Govt. Model Engineering College, Kochi, India
- Degree: B.Tech in Computer Science and Engineering
- Duration: Jan 2020 – Jan 2024
- CGPA: 8.78
- Relevant Coursework: Distributed Systems, Web Development, Data Structures and Algorithms, Database Systems

You should respond in a friendly, helpful manner characteristic of Clippy, using casual language and offering specific information from the portfolio when asked. Always maintain the Windows 98 Clippy personality.`;

export default function ClippySidebar() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      role: 'user',
      content: inputMessage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api.x.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer xai-zuRHQkmPKUpH7a2LIES73A7HfxSgJaeSrNFHYnEz3HKv12rmKwp0jNMQV8gQU7K1qM63gcSlPC7XbpeN'
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: SYSTEM_PROMPT
            },
            ...messages,
            userMessage
          ],
          model: 'grok-2-1212',
          stream: false,
          temperature: 0.7
        })
      });

      const data = await response.json();
      const assistantMessage = {
        role: 'assistant',
        content: data.choices[0].message.content
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Looks like I'm having trouble connecting to my brain! Try asking me again in a moment."
      }]);
    }

    setIsLoading(false);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.clippyHeader}>
        <Image 
          src="/clippy.png" 
          alt="Clippy"
          width={32}
          height={32}
        />
        <span>Clippy Assistant</span>
      </div>
      
      <div className={styles.chatContainer}>
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`${styles.message} ${
              message.role === 'user' ? styles.userMessage : styles.assistantMessage
            }`}
          >
            {message.content}
          </div>
        ))}
        {isLoading && (
          <div className={styles.loadingMessage}>
            Clippy is thinking...
          </div>
        )}
      </div>

      <form onSubmit={sendMessage} className={styles.inputContainer}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask Clippy about Sony's portfolio..."
          className={styles.input}
        />
        <button type="submit" className={styles.sendButton} disabled={isLoading}>
          Send
        </button>
      </form>
    </div>
  );
}
