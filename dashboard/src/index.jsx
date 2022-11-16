import { ColorModeScript } from '@chakra-ui/react'
import React, { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'

// Pages
import AutoLogin from '/src/pages/autologin'
import Home from '/src/pages/home'

import Transactions from '/src/pages/transactions'

import Panel from '/src/pages/panel'
import PanelServers from '/src/pages/panel/servers'
import PanelManage from '/src/pages/panel/manage'

import NotFound from '/src/pages/notfound'


import reportWebVitals from '/src/reportWebVitals'
import * as serviceWorker from "/src/serviceWorker"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import '/src/index.css'
const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

root.render(
  <StrictMode>
  <ColorModeScript />
  <Router>
    <Routes>
    <Route path="/" element={<AutoLogin />} status={200} />
    <Route path="/home" element={<Home />} status={200} />

    <Route path="/transactions" element={<Transactions />} status={200} />

    <Route path="/panel" element={<Panel />} status={200} />
    <Route path="/panel/servers" element={<PanelServers />} status={200} />
    <Route path="/panel/manage" element={<PanelManage />} status={200} />


    <Route path="*" element={<NotFound />} status={404} />
    </Routes>
  </Router>
  </StrictMode>
)

serviceWorker.unregister()
reportWebVitals()