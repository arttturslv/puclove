import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import ErrorNotification from "../components/ErrorNotification";

import API from "../api/axiosConfig";
import CadastroUm from '../components/Cadastro/CadastroUm'
import CadastroDois from '../components/Cadastro/CadastroDois'

import Navbar from "../components/Navbar";
import Modal from "../components/Modal";




export default function Cadastro (){
  
  
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();


  const [signProgress, setSignProgress] = useState("first"); // usado para verificar o processo de cadastro (0 = primeira parte | 1, segunda parte | 2 cadastro completo)
  const [arrayInteresses, setArrayInteresses] = useState(null);
  const [placeholder, setPlaceholder] = useState(""); //usado para armazenar os valores selecionados no modal de interesse
  const [displayNotification , setDisplayNotification ] = useState(false); //usado para controlar a visibilidade da mensagem de cadastro concluido.

  const navigate = useNavigate();
 
  useEffect(() => {
    console.log(placeholder)
  }, [placeholder])

  useEffect(() => {
    getInterests();
  }, []);

  async function getInterests() {
    try {
      const response = await API.interests;      
      var data = response.data;
      setArrayInteresses(data);
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmit = async (data) => {

    if(signProgress=="first") {
      setSignProgress("second");
      console.log("preencher outra pagina")
      return;
    }

     let arrayInterests = placeholder.split(", ");
     data.interests = arrayInterests;    
    
     try {
      const response = await API.register(data);
      console.log("Registration successful", response.data);

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error("Registration failed", error);
      setDisplayNotification(true);
    }

  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{ duration: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className=" bg-cover w-full h-full bg-[url('../src\assets\Background\bg_lines.svg')]"
    >
      <Navbar />
      
      {
        displayNotification==true?
        <ErrorNotification displayNotification={setDisplayNotification} timer={25}/>:""
      }

      <div className="flex-col flex gap-2 justify-center items-center w-[100vw] h-[93vh]">

          <div className="w-[500px] max-sm:w-full max-sm:h-full bg-[#333333] shadow-4xl overflow-hidden max-sm:rounded-none rounded-xl pt-10 flex flex-col justify-center items-center">
            <form className="w-[80%] flex flex-col gap-1" onSubmit={handleSubmit(onSubmit)}>
        
              {
              signProgress=="first"
                ?
                  <CadastroUm setSignProgress={setSignProgress} register={register} watch={watch} errors={errors} ></CadastroUm>
                : //placeholder, arrayInteresses, setPlaceholder, setSignProgress, register, errors
                  <CadastroDois placeholder={placeholder} setPlaceholder={setPlaceholder} arrayInteresses={arrayInteresses} setSignProgress={setSignProgress} register={register} errors={errors}></CadastroDois>
              }
  
            </form>
          </div>
          <div className="flex gap-3 pb-2">
              {
              signProgress=="first"
              ?
                <>
                  <figure className="rounded-full bg-[#AD5E5E] w-2 h-2" ></figure>
                  <figure className="rounded-full bg-[#3B3B3B] w-2 h-2" ></figure> 
                </>
              :
                <>
                  <figure className="rounded-full bg-[#3B3B3B] w-2 h-2" ></figure>
                  <figure className="rounded-full bg-[#AD5E5E] w-2 h-2" ></figure> 
                </>          
              }
          </div>
          
      </div>
    </motion.div>
  );
};