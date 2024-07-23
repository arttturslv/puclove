import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {motion} from 'framer-motion';
import { useForm } from "react-hook-form";

import Navbar from "../../components/Navbar";
import API from '../../api/axiosConfig'
import Input from "../../components/Input";
import ErrorNotification from '../../components/ErrorNotification'

import logo from "../../assets/favicon.svg";

export default function Login () {

  const navigate = useNavigate();
  const [requisitionError, setRequisitionError] = useState(false);
  const [userLogged, setUserLogged] = useState(!!localStorage.getItem('currentUser'));
  const {register, handleSubmit, formState : {errors}} = useForm();
  const [displayNotification , setDisplayNotification ] = useState(false); //usado para controlar a visibilidade da mensagem de cadastro concluido.

  if(userLogged) { //evitar de entrar na pagina de login, com usuario logado
    navigate("/");
  }

  useEffect(() => {
    setTimeout(() => {
      setRequisitionError(false)
    }, 1000)
  },[requisitionError])

  async function handleLogin(data) {
    var login = data.email;
    var password = data.password;

    const loginInfo = {
      login,
      password
    }

    try {
      const response = await API.login(loginInfo);      
      var data = response.data;

      localStorage.setItem('currentUser', JSON.stringify(data));
      navigate("/");
    } catch (error) {
      console.log(error);
      setDisplayNotification(true);

    }
  }

  return (
    <motion.div 
      initial = {{opacity:0 }}
      transition={{duration:1}}
      animate = {{opacity:1 }}
      exit={{opacity:0}} 
      className=" bg-cover w-full h-full  bg-[url('../src\assets\Background\bg_lines.svg')]">

      <Navbar/>

      {
        displayNotification==true?
        <ErrorNotification displayNotification={setDisplayNotification} timer={25}/>:""
      }

      <div className="w-[100%] h-[93vh] flex justify-center items-center p-[10px] ">
        <div className="w-[400px] h-[430px] bg-[#333333] rounded-xl shadow-4xl overflow-hidden py-[60px] px-[20px] flex flex-col justify-center items-center">
          
          <form className="w-[90%] space-y-1" onSubmit={handleSubmit(handleLogin)}>

            <span id='logo'><img className="w-[50px] m-auto" src={logo} alt="PucLove"/></span>
            <span className=" font-semibold text-[#fff] text-[20px] text-center mb-[10px]">Venha encontrar seu parceiro!</span>

            <div>
              <h4 className=" font-semibold text-[#fff] my-[3px] text-[15px]">Digite o e-mail</h4>
              <Input
                type="email"
                name="email"
                placeholder="email@sga.pucminas.br"
                errors={errors}
                register={register}
                validationSchema={{
                  required: "Preencha o campo de email*",
                  validate: value => value.includes("@sga.pucminas.br") || "O email deve conter: @sga.pucminas.br"
              }}
              required
            />
            </div>

            <div>
              <h4 className=" font-semibold text-[#fff] my-[3px] text-[15px]">Digite a senha</h4>
              <Input
                showPass={true}
                type="password"
                name="password"
                placeholder="**********"
                errors={errors}
                register={register}
                validationSchema={{
                required: "Preencha o campo de senha*",
                minLength: {
                  value: 7,
                  message: "A senha está menor que o tamanho mínimo*"
                }
              }}
              required
              />
            </div>

            <div className="text-right">
              <span className=" text-[12px] font-light hover:text-[#e2c09b] cursor-pointer text-[#fff] pr-[4px]">Esqueci a senha</span>
            </div>

            {requisitionError && <p className="text-center text-[12px] text-vermelhoSanguino">A senha ou o email estão incorretos*</p>}

            <div className="justify-center flex">
              <button className=" font-extrabold hover:text-[#e2c09b] hover:bg-[#1c1c1c] uppercase text-[18px] rounded-xl bg-[#e2c09b] w-[180px] h-[45px] mt-[10px] text-center" type="submit">Logar</button>
            </div>

            <div className="text-center flex justify-center items-center mt-[5px]" onClick={() => navigate("/cadastro")}>
              <a className=" hover:text-[#e2c09b] text-[14px] font-light text-[#fff] decoration-0 cursor-pointer ">Criar uma conta</a>
            </div>
            
          </form>
        </div>
      </div>
    </motion.div>
  );
};