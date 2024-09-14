import React, { useState, useEffect } from 'react';
import { predictTheme } from './utils';
import './App.css';

const App = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const getTheme = async () => {
      const currentTime = new Date().getHours();
      const screenWidth = window.innerWidth;
      const newTheme = await predictTheme(currentTime, screenWidth);
      setTheme(newTheme);
    };

    getTheme();

    window.addEventListener('resize', getTheme);

    return () => window.removeEventListener('resize', getTheme);
  }, []);

  return (
    <div className={`app ${theme}`}>
      <div className="content">
        <h1>AI Adaptive Design</h1>
        <p>This web app adapts its theme based on the time of day and screen size.</p>
        <p>Now it's {theme === 'light' ? 'Day' : 'Night'} mode</p>
      </div>
      <footer>Erez Carmel, Sep 2024.</footer>
    </div>
  );
};

export default App;