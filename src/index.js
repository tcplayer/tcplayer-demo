import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";import ReactDOM from 'react-dom';
import './index.css';
import Tcplayer from './router/tcplayer';
import TcplayerLite from './router/tcplayerLite.tsx';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Tcplayer />} />
        <Route path="tcplayerlite" element={<TcplayerLite />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
