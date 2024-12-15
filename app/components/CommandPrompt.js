import React, { useState, useRef, useEffect } from 'react';
import styles from './commandprompt.module.css';

const CommandPrompt = ({ onClose, isActive, onActivate }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState(['Microsoft Windows 98 [Version 4.10.1998]\nCopyright 1981-1998 Microsoft Corp.\n\nC:\\>']);
  const [chatMode, setChatMode] = useState(''); // '', 'general', or 'resume'
  const inputRef = useRef(null);
  const outputRef = useRef(null);

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const processClippyResponse = async (userInput, mode) => {
    try {
      const messages = [
        {
          role: "system",
          content: mode === 'resume' 
            ? "You are Clippy, Microsoft's helpful assistant. You are currently helping with reviewing Sony Thomas's resume. Be friendly and helpful while maintaining the classic Clippy personality."
            : "You are Clippy, Microsoft's helpful assistant. Be friendly and helpful while maintaining the classic Clippy personality."
        },
        {
          role: "user",
          content: userInput
        }
      ];

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages })
      });

      const data = await response.json();
      return `Clippy: ${data.choices[0].message.content}`;
    } catch (error) {
      console.error('Error:', error);
      return "Clippy: It looks like I'm having trouble connecting to my brain. Would you mind trying again?";
    }
  };

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const userInput = input.trim();
      const command = userInput.toLowerCase();
      let response = '';

      // Add user input to output with appropriate prompt
      const prompt = chatMode ? 'Chat>' : 'C:\\>';
      const newOutput = [...output, `${prompt}${userInput}`];

      if (!chatMode) {
        // Not in chat mode, process commands
        if (command === 'clippy') {
          setChatMode('general');
          response = "Clippy: Hi! I'm Clippy, your AI assistant. How can I help you today?\nType 'exit' to end the chat session.";
        } else if (command === 'clippy resume') {
          setChatMode('resume');
          response = "Clippy: I'm here to help you with the resume! Ask me anything about Sony Thomas's experience and qualifications.\nType 'exit' to end the chat session.";
        } else if (command === 'cls') {
          setOutput(['Microsoft Windows 98 [Version 4.10.1998]\nCopyright 1981-1998 Microsoft Corp.\n\nC:\\>']);
          setInput('');
          return;
        } else if (command === 'help') {
          response = `Available commands:
  clippy       - Start a general chat with Clippy
  clippy resume - Discuss the resume with Clippy
  cls         - Clear the screen
  help        - Show this help message
  exit        - Close the command prompt`;
        } else if (command === 'exit') {
          onClose();
          return;
        } else if (command !== '') {
          response = `'${input}' is not recognized as an internal or external command, operable program or batch file.`;
        }
      } else {
        // In chat mode
        if (command === 'exit') {
          response = 'Clippy: Goodbye! Returning to command prompt.';
          setChatMode('');
        } else {
          // Process chat input through AI
          response = await processClippyResponse(userInput, chatMode);
        }
      }

      setOutput([...newOutput, response]);
      setInput('');
    }
  };

  const handleClick = () => {
    onActivate();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div 
      className={`${styles.commandPrompt} ${isActive ? styles.active : ''}`}
      onClick={handleClick}
    >
      <div className={styles.titleBar}>
        <span>{chatMode ? `Command Prompt - Clippy ${chatMode === 'resume' ? 'Resume' : ''} Chat` : 'Command Prompt'}</span>
        <button className={styles.closeButton} onClick={onClose}>×</button>
      </div>
      <div className={styles.content} ref={outputRef}>
        <div className={styles.output}>
          {output.map((line, index) => (
            <div key={index} className={styles.line}>{line}</div>
          ))}
        </div>
        <div className={styles.inputLine}>
          <span className={styles.prompt}>{chatMode ? 'Chat>' : 'C:\\>'}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className={styles.input}
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
};

export default CommandPrompt;