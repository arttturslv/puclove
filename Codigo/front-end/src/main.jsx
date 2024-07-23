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
import Matches from './pages/Matches/matches'
import Matches1 from './pages/Matches/MatchesNew'
import Skeleton from './pages/Matches/Skeleton'

import NotFound from './pages/Misc/NotFound'
import Configuracao from "./pages/Configuração/Index";
import Carregamento from './pages/carregamento'
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
    path: "/skeleton",
    element: <Skeleton/>
  },
  {
    path: "*",
    element: <NotFound/>
  },
  {
    path: "/config",
    element: <Configuracao />,
  },
  {
    path: "/carregamento",
    element: <Carregamento />,
  },
  {
    path: "/matches1",
    element: <Matches1 />,
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AnimatePresence mode='wait'>
      <RouterProvider router={router} />
    </AnimatePresence>
  </React.StrictMode>,
)
