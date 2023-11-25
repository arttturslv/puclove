import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

//CRIANDO A ROUTER (ROTAS)
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
//IMPORTANDO PAGINAS
import Home from './pages/home'
import Login from './pages/login'
import Cadastro from './pages/cadastro'
import CadastroPerfil from './pages/cadastroPerfil'
import PoliticaPrivacidade from './pages/politicasPrivacidade'
import Matches from './pages/matches'
import NotFound from './pages/notFound'
import Configuracao from "./pages/config";
import Carregamento from './pages/carregamento'

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
    path: "/cadastro/perfil",
    element: <CadastroPerfil/>
  },
  {
    path: "/politica-privacidade",
    element: <PoliticaPrivacidade/>
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
    <RouterProvider router={router} />
  </React.StrictMode>,
)

/* 
  <Route path="/login" Component={Login}/>
  <Route path="/cadastro" Component={Cadastro}/>
  <Route path="/matches" Component={Matches}/>
  <Route path="/matches/user/212321" Component={Matches}/>
  <Route path="/configuracoes" Component={Settings}/>
*/