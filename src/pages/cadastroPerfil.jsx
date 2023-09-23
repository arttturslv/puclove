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
        Conte sobre você
        </span>

        <div className="wrap-input">
          <h4>Qual seu curso?</h4>
          <input className="input" type="text" placeholder="Digite seu curso" />
        </div>

        <div className="wrap-input">
          <h4>Qual seu campus</h4>
          <input className="input" type="text" placeholder="meuemail@sga.pucminas.br" />
        </div>
        
        <div className="wrap-input">
          <h4>Selecione seus interesses</h4>
          <input className="input" type="text" placeholder="" />
        </div>
        <div className="wrap-input">
          <h4>Qual seu instagram</h4>
          <input className="input" type="text" placeholder="@" />
        </div>
        <div className="wrap-input">
          <h4>Oque você busca</h4>
          <input className="input datepickerbg" type="text" placeholder="" />
        </div>
        <div className="container-cadastro-form-btn">
          <button onClick={() => navigate("/cadastro")} className="cadastro-form-btn" >Voltar</button>
          <button onClick={() => navigate("/")} className="cadastro-form-btn">Continuar</button>
        </div>
        
      </form>
    </div>
  </div>
</div>

)}

export default cadastroPerfil;