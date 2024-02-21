import React, { useState } from "react";
import logo from "../assets/logo redonda-svg.svg";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {motion} from 'framer-motion';

const LoginTail = () => {

  if(sessionStorage.getItem("authToken")) { //evitar de entrar na pagina de login, com usuarios logados
    setTimeout(() => {
      navigate("/carregamento");
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
  
      const response = await fetch(loginEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
 
        const userData = await response.json();
        
        console.log(userData);
        console.log("Token armazenado.")
        sessionStorage.setItem("authToken", userData.token);
        console.log("User data armazenado.")
        sessionStorage.setItem("userData", JSON.stringify(userData.user));

        setUser(userData);
        window.alert("Login autenticado");

        setTimeout(() => {
          navigate("/carregamento");
        }, 2000);
      } else {
        console.error("Falha no login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <motion.div 
      initial = {{opacity:0 }}
      transition={{duration:1}}
      animate = {{opacity:1 }}
      exit={{opacity:0}} 
    className=" bg-cover w-full h-full bg-[url('../src\assets\background-linhas.svg')]">
    <Navbar />
    <div className=" w-[100%] h-[93vh] flex justify-center items-center p-[10px] ">
      <div className="w-[400px] h-[430px] bg-[#333333] rounded-xl shadow-4xl overflow-hidden py-[60px] px-[20px] flex flex-col justify-center items-center">
        <form className=" w-[90%]" onSubmit={handleLogin}>
          <span className="">
            <img className="w-[50px]  m-auto" src={logo} alt="PucLove" />
          </span>
          <span className=" font-semibold text-[#fff] text-[20px] text-center mb-[10px]">Venha encontrar seu parceiro!</span>

          <div className="">
            <h4 className=" font-semibold text-[#fff] my-[3px] text-[15px]">Digite o e-mail</h4>
            <input
              className="text-[14px] text-[#fff] w-[100%] h-[45px] py-[7px] px-[15px] rounded-lg bg-[#434343]"
              type="email"
              placeholder="meuemail@sga.pucminas.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="">
            <h4 className=" font-semibold text-[#fff] my-[3px] text-[15px]">Digite a senha</h4>
            <input
              className="text-[14px] text-[#fff] w-[100%] h-[45px]  py-[7px] px-[15px] rounded-lg bg-[#434343]"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className=" text-right ">
            <span className=" text-[12px] font-light hover:text-[#e2c09b] cursor-pointer text-[#fff] pr-[4px]">Esqueci a senha</span>
          </div>

          <div className="justify-center flex">
            <button className=" font-extrabold hover:text-[#e2c09b] hover:bg-[#1c1c1c] uppercase text-[18px] rounded-xl bg-[#e2c09b] w-[180px] h-[45px] mt-[10px] text-center" type="submit">
              Logar
            </button>
          </div>

          <div className="text-center flex justify-center items-center mt-[5px]" onClick={() => navigate("/cadastro")}>
            <a className=" hover:text-[#e2c09b] text-[14px] font-light text-[#fff] decoration-0 " href="#">
              Criar uma conta
            </a>
          </div>
        </form>
      </div>
    </div>
    </motion.div>
  );
};

export default LoginTail;
