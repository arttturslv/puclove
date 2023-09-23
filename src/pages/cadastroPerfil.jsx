import React from 'react';
import "../StyleCadastro.css";
import { useNavigate } from "react-router-dom";

const cadastroPerfil = () => { 
  const navigate = useNavigate();

  return (
  
    <div className="container-cadastro">
    <div className="container-cadastro">
      <div className="wrap-cadastro">
        <form className="cadastro-form">
          
          <span className="cadastro-form-title">
          Conte Sobre Você
          </span>

          <div className="wrap-input">
            <h4>Qual seu curso</h4>
            <input className="input" type="text" placeholder="Digite seu curso" />
          </div>

          <div className="wrap-input">
            <h4>Qual seu campos</h4>
            <select className="input" id="cursos">
              <option value=""></option>
              <option value="0">São Gabriel</option>
              <option value="1">Praça da Liberdade</option>
              <option value="2">Coração Eucarístico</option>
            </select>
          </div>
          
          <div className="wrap-input">
            <h4>Quais seus interesses</h4>
            <input className="input" type="text" placeholder="Gatos, Jogos, Beber" />
          </div>
          <div className="wrap-input">
            <h4>Qual seu instagram</h4>
            <input className="input" type="" placeholder="@" />
          </div>
          <div className="wrap-input">
            <h4>O que você busca?</h4>
            <select className="input" id="interesse">
              <option value="3">Sexo selvagem</option>
              <option value="4">Um romance</option>
              <option value="5">Amigos para curtir uma festa</option>
              <option value="6">Pessoas bonitas</option>
            </select>
          </div>
          <div className="container-cadastro-form-btn">
          <button onClick={() => navigate("/cadastro")} className="cadastro-form-btn" >Voltar</button>
            <button onClick={() => navigate("/")} className="cadastro-form-btn" >Continuar</button>
          </div>
          
        </form>
      </div>
    </div>
  </div>


)}

export default cadastroPerfil;