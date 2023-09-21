import React from "react";
import logo from "../assets/logo redonda-svg.svg";
import "../styles.css";

const Login = () => (
  <div className="container-l">
    <div className="container-login">
      <div className="wrap-login">
        <form className="login-form">
          <span className="login-form-title">
            <img src={logo} alt="PucLove" />
          </span>
          <span className="login-form-title">
            Venha encontrar seu parceiro!
          </span>

          <div className="wrap-input">
            <h4>Digite o e-mail</h4>
            <input className="input" type="email" placeholder="meuemail@sga.pucminas.br" />
          </div>

          <div className="wrap-input">
            <h4>Digite a senha</h4>
            <input className="input" type="password" placeholder="Digite sua senha" />

          </div>

          <div className="forgot-password">
          <span className="forgot-password">Esqueci a senha</span>
          </div>

          <div className="container-login-form-btn">
            <button className="login-form-btn">Logar</button>
          </div>

          <div className="text-center">
            <a className="txt1" href="#">
              Criar uma conta
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default Login;
