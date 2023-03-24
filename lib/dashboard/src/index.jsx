import { ColorModeScript, ChakraProvider, theme } from '@chakra-ui/react'
import React, { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { NavBar } from '/src/NavBar'

// Pages
import Home from '/src/pages/home'

import AuthDiscord from '/src/pages/auth/discord'

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
      <ChakraProvider theme={theme}>
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} status={200} />

          <Route path="/auth/discord" element={<AuthDiscord />} status={200} />

          <Route path="/transactions" element={<Transactions />} status={200} />

          <Route path="/panel" element={<Panel />} status={200} />
          <Route path="/panel/servers" element={<PanelServers />} status={200} />
          <Route path="/panel/manage" element={<PanelManage />} status={200} />


          <Route path="*" element={<NotFound />} status={404} />
        </Routes>
      </ChakraProvider>
    </Router>
  </StrictMode>
)

serviceWorker.unregister()
reportWebVitals()