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

          <div className="wrap-input">
            <input className="input" type="email" />
            <span className="focus-input" data-placeholder="Email"></span>
          </div>

          <div className="wrap-input">
            <input className="input" type="password" />
            <span className="focus-input" data-placeholder="Password"></span>
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
