import './i18n';
import React from 'react';
// 部署在域名下面，要用 BrowserRouter 只有通过tcplayer.vcube.tencent.coml访问走这个
// 部署在html路径页面下面，用 HashRouter 
import {
  // BrowserRouter as Router,
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";import ReactDOM from 'react-dom';
import './index.css';
import Tcplayer from './router/tcplayer';
import TcplayerLite from './router/tcplayerLite.tsx';
import Experience from './router/experience.tsx';


// if (window.VConsole) {
//   new window.VConsole();
// }

/* eslint-disable no-undef */
window.lang = LANGUAGE;

ReactDOM.render(
  <React.StrictMode>
    {
      window.lang === 'en' ? 
      <Router>
        <Routes>
          <Route path="/" element={<Tcplayer />} />
          <Route path="tcplayerlite" element={<TcplayerLite />} />
          <Route path="experience" element={<Experience />} />
        </Routes>
      </Router> :
      <Router>
        <Routes>
          <Route path="/" element={<Tcplayer />} />
          <Route path="tcplayerlite" element={<TcplayerLite />} />
          <Route path="experience" element={<Experience />} />
        </Routes>
      </Router>
    }
        
  </React.StrictMode>,
  document.getElementById('root')
);
