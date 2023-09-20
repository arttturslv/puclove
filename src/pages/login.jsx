import React from "react";
import logo from "../assets/logo redonda-svg.svg";
import "../styles.css";
import { orange } from "@mui/material/colors";

const Login = () => (
  <div className="container">
    <div className="container-login">
      <div className="wrap-login">
        <form className="login-form">
          <span className="login-form-title">
            <img src={logo} alt="PucLove" />
          </span>
          <span className="login-form-title text-9xl">
            Venha encontrar o seu parceiro!
          </span>

          <h6>Digite seu email</h6>  
          <div className="wrap-input">
            <input className="input" type="email" placeholder=" meuemail@sga.pucminas.br" />
          </div>

          <h6>Digite sua senha</h6>  
          <div className="wrap-input">
            <input className="input" type="password" placeholder=" Digite sua senha" />
            <span className="forgot-password">Esqueci minha senha</span>
          </div>

          <div className="container-login-form-btn">
            <button className="login-form-btn">Logar</button>
          </div>

          <div className="text-center">
            <span className="txt1">Não possui uma conta?</span>

            <a className="txt2" href="#">
              Criar conta
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default Login;
