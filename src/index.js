import './i18n';
import React from 'react';
import {
  BrowserRouter as Router,
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";import ReactDOM from 'react-dom';
import './index.css';
import Tcplayer from './router/tcplayer';
import TcplayerLite from './router/tcplayerLite.tsx';
import Experience from './router/experience.tsx';

if (window.VConsole) {
  new window.VConsole();
}

/* eslint-disable no-undef */
window.lang = LANGUAGE;

ReactDOM.render(
  <React.StrictMode>
    {
      window.lang === 'en' ? 
      <HashRouter>
        <Routes>
          <Route path="/" element={<Tcplayer />} />
          <Route path="tcplayerlite" element={<TcplayerLite />} />
          <Route path="experience" element={<Experience />} />
        </Routes>
      </HashRouter> :
      <HashRouter>
        <Routes>
          <Route path="/" element={<Tcplayer />} />
          <Route path="tcplayerlite" element={<TcplayerLite />} />
          <Route path="experience" element={<Experience />} />
        </Routes>
      </HashRouter>
    }
        
  </React.StrictMode>,
  document.getElementById('root')
);
