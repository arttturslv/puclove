import React from 'react';
import "../StyleCadastro.css";
import { useNavigate } from "react-router-dom";

const Cadastro = () => {
    
  const navigate = useNavigate();

    return (
    <div className="container-cadastro">
    <div className="container-cadastro">
      <div className="wrap-cadastro">
        <form className="cadastro-form">
          
          <span className="cadastro-form-title">
          Cadastre e conheça seu amor
          </span>

          <div className="wrap-input">
            <h4>Qual seu nome?</h4>
            <input className="input" type="name" placeholder="Digite seu nome" />
          </div>

          <div className="wrap-input">
            <h4>Digite o e-mail</h4>
            <input className="input" type="email" placeholder="meuemail@sga.pucminas.br" />
          </div>
          
          <div className="wrap-input">
            <h4>Digite sua senha</h4>
            <input className="input" type="password" placeholder="********" />
          </div>
          <div className="wrap-input">
            <h4>Confirme a senha</h4>
            <input className="input" type="password" placeholder="********" />
          </div>
          <div className="wrap-input">
            <h4>Quando você nasceu</h4>
            <input className="input datepickerbg" type="date" placeholder="01/01/1900" />
          </div>
          <div className="container-cadastro-form-btn">
            <button onClick={() => navigate("/cadastro/perfil")} className="cadastro-form-btn" >Continuar</button>
          </div>
          
        </form>
      </div>
    </div>
  </div>

)};

export default Cadastro;