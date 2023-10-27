import React, { useState } from "react";
import logo from "../assets/logo redonda-svg.svg";
import { useNavigate } from "react-router-dom";

import "../styles.css";

const Login = () => {

  if(localStorage.getItem("authToken")) { //evitar de entrar na pagina de login, com usuarios logados
    setTimeout(() => {
      navigate("/matches");
    }, 0);
  }

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const data = {
        login: email,
        password,
      };
  
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
 
        const userData = await response.json();
        
        console.log("Token armazenado.")
        localStorage.setItem("authToken", userData.token);

        setUser(userData);
        window.alert("Login autenticado");

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        console.error("Falha no login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container-login">
      <div className="wrap-login">
        <form className="login-form" onSubmit={handleLogin}>
          <span className="login-form-title">
            <img src={logo} alt="PucLove" />
          </span>
          <span className="login-form-title">Venha encontrar seu parceiro!</span>

          <div className="wrap-input">
            <h4>Digite o e-mail</h4>
            <input
              className="input"
              type="email"
              placeholder="meuemail@sga.pucminas.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="wrap-input">
            <h4>Digite a senha</h4>
            <input
              className="input"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="forgot-password">
            <span className="forgot-password">Esqueci a senha</span>
          </div>

          <div className="container-login-form-btn">
            <button className="login-form-btn" type="submit">
              Logar
            </button>
          </div>

          <div className="text-center " onClick={() => navigate("/cadastro")}>
            <a className="txt1" href="#">
              Criar uma conta
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
