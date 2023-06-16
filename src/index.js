
import React from 'react';
// 导入依赖
import { i18n } from '@tencent/tea-app';
// 导入词条
import { zh, en } from './i18n/translation';
import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";import ReactDOM from 'react-dom';
import './index.css';
import Tcplayer from './router/tcplayer';
import TcplayerLite from './router/tcplayerLite.tsx';


const DEFAULTCONFIGS = {
  lang: 'zh',
  mode: 'independent',
  route: 'history',
}

/* eslint-disable no-undef */
console.log('CONFIGS', CONFIGS);
const globalConfigs = Object.assign({}, DEFAULTCONFIGS, CONFIGS);



console.log('globalConfigs', globalConfigs);
window["LANGUAGE"] = globalConfigs.lang;


// 初始化国际化词条
/* eslint-disable no-undef */
if (CONFIGS.lang === 'en') {
  i18n.init({ translation: en });
} else {
  i18n.init({ translation: zh });
}

// if (window.VConsole) {
//   new window.VConsole();
// }

/* eslint-disable no-undef */


ReactDOM.render(
  <React.StrictMode>
    {
      window.lang === 'en' ? 
      // <HashRouter>
      //   <Routes>
      //     <Route path="/" element={<Tcplayer />} />
      //     <Route path="tcplayerlite" element={<TcplayerLite />} />
      //     <Route path="experience" element={<Experience />} />
      //   </Routes>
      // </HashRouter> :
      // <HashRouter>
      //   <Routes>
      //     <Route path="/" element={<Tcplayer />} />
      //     <Route path="tcplayerlite" element={<TcplayerLite />} />
      //     <Route path="experience" element={<Experience />} />
      //   </Routes>
      // </HashRouter>



      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Tcplayer />} />
        <Route path="tcplayerlite" element={<TcplayerLite />} />
      </Routes>
      </BrowserRouter> :
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Tcplayer />} />
        <Route path="tcplayerlite" element={<TcplayerLite />} />
      </Routes>
      </BrowserRouter>
    }
        
  </React.StrictMode>,
  document.getElementById('root')
);
