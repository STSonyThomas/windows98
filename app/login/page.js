'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './login.module.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [datetime, setDatetime] = useState('');
  const router = useRouter();

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      const dateString = now.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
      setDatetime({ time: timeString, date: dateString });
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      router.push('/desktop');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.windowsLogo}>
        <Image
          src="/windows98.png"
          alt="Windows 98 Logo"
          width={30}
          height={30}
        />
        Microsoft Windows 98
      </div>
      <div className={styles.datetime}>
        <div>{datetime.time}</div>
        <div className={styles.date}>{datetime.date}</div>
      </div>
      <h1 className={styles.welcome}>Welcome</h1>
      <p className={styles.subtitle}>To begin, type in your user name and password.</p>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <Image
            src="/key-icon.png"
            alt="Key icon"
            width={16}
            height={16}
            className={styles.headerIcon}
          />
          Type a user name and password to log on to Windows
        </div>
        <div className={styles.modalContent}>
          <Image
            src="/login-icon.png"
            alt="Login icon"
            width={32}
            height={32}
            className={styles.icon}
          />
          <form onSubmit={handleLogin} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="username" className={styles.label}>User name:</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>Password:</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
              />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <div className={styles.hint}>
              <p>Hint: Use these credentials to log in:</p>
              <p>Username: admin</p>
              <p>Password: admin</p>
            </div>
            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.button}>
                OK
              </button>
              <button type="button" className={styles.button} onClick={() => router.push('/')}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
