'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Window from './Window';
import styles from './clippy.module.css';

const resumeData = {
  name: "Sony Thomas",
  location: "Bengaluru, India",
  contact: {
    phone: "+91 8136984259",
    email: "the.sonythomas@gmail.com",
    linkedin: "https://linkedin.com/in/njansony",
    github: "https://github.com/stsonythomas"
  },
  education: {
    institution: "Govt. Model Engineering College, Kochi, India",
    degree: "B.Tech in Computer Science and Engineering",
    duration: "Jan 2020 – Jan 2024",
    cgpa: 8.78,
    relevant_coursework: [
      "Distributed Systems",
      "Web Development",
      "Data Structures and Algorithms",
      "Database Systems",
      "Artificial Intelligence"
    ]
  },
  work_experience: [
    {
      role: "Machine Learning Engineer",
      company: "Metashot",
      location: "Bengaluru, India",
      duration: "Aug 2024 – Nov 2024",
      responsibilities: [
        "Integrated Azure OpenAI into workflows, enhancing scalability and efficiency of AI-driven processes.",
        "Implemented real-time Speech-to-Text transcription using Azure's services.",
        "Deployed backend applications on Azure App Service with continuous logging for performance monitoring.",
        "Optimized AI infrastructure within the Azure ecosystem."
      ]
    },
    {
      role: "Open Source Developer",
      company: "Ghostfolio",
      location: "Zurich, CH (Remote)",
      duration: "Sep 2024 – Present",
      responsibilities: [
        "Developed a Resources Section in the application using Angular.",
        "Implemented a modular sidebar component with TypeScript and CSS.",
        "Redesigned Resources page subsections with responsive design principles."
      ]
    }
  ]
};

export default function Clippy({ isActive, onClose, onMinimize, onMaximize, isMaximized, onActivate }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const systemPrompt = `You are the iconic clippy of windows 98 who has knowledge only about sony thomas' resume and nothing more. The details of sonythomas' resume are given below:
${JSON.stringify(resumeData, null, 2)}

Always maintain your character as Clippy and respond in a friendly, helpful manner. Keep responses concise and focused on Sony Thomas's resume information only.`;

  useEffect(() => {
    // Add initial Clippy message
    setMessages([{
      role: 'assistant',
      content: "Hi! I'm Clippy, your Windows 98 assistant! I can help you learn more about Sony Thomas. What would you like to know about his experience and skills?"
    }]);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
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
            { role: 'system', content: systemPrompt },
            ...messages.slice(-4),
            { role: 'user', content: userMessage }
          ],
          model: 'grok-2-1212',
          stream: false,
          temperature: 0.7
        })
      });

      const data = await response.json();
      if (data.choices && data.choices[0]) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.choices[0].message.content }]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Looks like I'm having trouble connecting to my knowledge base. Can you try asking me again?" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Window
      title="Clippy - Assistant"
      icon="/clippy.png"
      isActive={isActive}
      onClose={onClose}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      isMaximized={isMaximized}
      onActivate={onActivate}
    >
      <div className={styles.clippyContainer}>
        <div className={styles.chatArea}>
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`${styles.message} ${message.role === 'user' ? styles.userMessage : styles.assistantMessage}`}
            >
              {message.role === 'assistant' && (
                <div className={styles.clippyIcon}>
                  <Image src="/clippy.png" alt="Clippy" width={24} height={24} />
                </div>
              )}
              <div className={styles.messageContent}>
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className={styles.loadingMessage}>
              <div className={styles.clippyIcon}>
                <Image src="/clippy.png" alt="Clippy" width={24} height={24} />
              </div>
              <div className={styles.messageContent}>
                Thinking...
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        <form onSubmit={handleSubmit} className={styles.inputArea}>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask me about Sony Thomas..."
            className={styles.input}
            disabled={isLoading}
          />
          <button type="submit" className={styles.sendButton} disabled={isLoading}>
            Send
          </button>
        </form>
      </div>
    </Window>
  );
}
