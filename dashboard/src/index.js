import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

// Pages
import AutoLogin from './pages/autologin';
import Home from './pages/home';

import Panel from './pages/panel';
import PanelServers from './pages/panel/servers';
import PanelManage from './pages/panel/manage';

import NotFound from './pages/notfound';


import reportWebVitals from './reportWebVitals';
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
\t<ColorModeScript />
\t<Router>
\t  <Routes>
\t\t<Route path="/" element={<AutoLogin />} status={200} />
\t\t<Route path="/home" element={<Home />} status={200} />

\t\t<Route path="/panel" element={<Panel />} status={200} />
\t\t<Route path="/panel/servers" element={<PanelServers />} status={200} />
\t\t<Route path="/panel/manage" element={<PanelManage />} status={200} />


\t\t<Route path="*" element={<NotFound />} status={404} />
\t  </Routes>
\t</Router>
  </StrictMode>
);

serviceWorker.unregister();
reportWebVitals();