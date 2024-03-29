import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

//CRIANDO A ROUTER (ROTAS)
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
//IMPORTANDO PAGINAS
import Home from './pages/home'
import Login from './pages/login'
import LoginTail from './pages/loginTail'
import Cadastro from './pages/cadastro'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Matches from './pages/matches'
import NotFound from './pages/NotFound'
import Configuracao from "./pages/config";
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
    path: "/loginTail",
    element: <LoginTail/>
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
  {
    path: "/config",
    element: <Configuracao />,
  },
  {
    path: "/carregamento",
    element: <Carregamento />,
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AnimatePresence mode='wait'>
      <RouterProvider router={router} />
    </AnimatePresence>
  </React.StrictMode>,
)
