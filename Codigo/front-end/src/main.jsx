import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

//CRIANDO A ROUTER (ROTAS)
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
//IMPORTANDO PAGINAS
import Home from './pages/Home/Index'
import Login from './pages/Login/Index'
import Cadastro from './pages/Cadastro/Index'
import PrivacyPolicy from './pages/Misc/PrivacyPolicy'
import Matches from './pages/Matches/Index'

import NotFound from './pages/Misc/NotFound'
import { AnimatePresence } from 'framer-motion'

//CRIANDO ARRAY DE ROTAS
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/cadastro",
    element: <Cadastro/>
  },
  {
    path: "/privacidade",
    element: <PrivacyPolicy/>
  },
  {
    path: "/matches",
    element: <Matches/>
  },
  {
    path: "*",
    element: <NotFound/>
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AnimatePresence mode='wait'>
      <RouterProvider router={router} />
    </AnimatePresence>
  </React.StrictMode>,
)
