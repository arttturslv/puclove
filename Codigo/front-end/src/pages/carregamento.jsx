import { useMatchData } from "../hooks/useMatchData";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {motion} from 'framer-motion';

import cupidBlack from '../assets/Background/cupid_black.webp'

const Carregamento = () => {
    const navigate = useNavigate();

    const cantadas = [
        "Você é uma estrela? Porque sempre que eu te vejo, o meu mundo fica mais iluminado.",
        "Você acredita em amor à primeira vista ou devo passar por aqui novamente?",
        "Se beleza fosse tempo, você seria a eternidade.",
        "Seu nome é Google? Porque você tem tudo o que eu tenho procurado.",
        "Você é uma camera? Sempre que te vejo, sorrio.",
        "Gata, voce é o CSS para o meu HTML.",
        "Posso te chamar de constante? Porque desde que te conheci, meu amor por você nunca muda.",
        "Você é a bússola que estava faltando na minha vida, porque sempre aponta para o norte, e o norte é você.",
        "Você não é uma variável, mas você certamente é o fator constante na equação do meu coração.",
        "Posso te chamar de GPS? Porque me perdi no brilho do seu olhar.",
        "Se beleza fosse código, você seria open source para que todos pudessem apreciar.",
        "Posso te chamar de playlist? Porque a cada música que toca, meu coração bate mais forte.",
        "Você é como um algoritmo eficiente, sempre otimizando meu dia.",
        "Você é JavaScript do meu projeto. Sem você ele não funciona.",
        "Seu nome é cocaina? Porque estou viciado no seu cheiro.",
        "Você é desenvolvedor né? Vamos lá em casa, quero te ensinar Xanascript, Peython e C#",
        "Se sua beleza fosse um número, seria π, pois é impossível mensurar.",
        "Já viu aquele filme? O curioso caso do beijaminha boca.",
        "Troquei de operadora, agora meu plano é você.",
        "Oi, queria saber quantas bocas você vai beijar até saber que a minha é a certa.",
        "Não sou de rezar, mas fico de joelhos por você.",
        "Que voz linda você tem... fala mais perto da minha boca, por favor.",
        "Me chama de Estados Unidos e me USA.",
        "Não sou médico, mas se fosse pra te examinar, seu diagnostico seria = amor da minha vida.",
        "Me passa seu Instagram? Meu pai disse que eu devo seguir meu sonho.",
      ];
      let tam = cantadas.length;
      let random = Math.floor(Math.random() * tam);
      let frase = cantadas[random];

      let i = 0;
      var pronto = false;
      const data = sessionStorage.getItem("matches");
      

      function typing(){
        if (i < frase.length){
            document.getElementById('txt').innerHTML += frase.charAt(i);
            i++;
            setTimeout(typing, 100);
        } else if (i==999) {
            navigate("/matches");
        } 
    }

    const token = sessionStorage.getItem("authToken");

    useEffect(() => {
        if(data==undefined) {
        console.log("Data inexistente, fazendo requisição e digitando...")
        typing();
        console.log("Fazendo requisicao")
        const fetchData = async () => {
          const response = await useMatchData(token);
          i=999;
          typing();
          sessionStorage.setItem("matches",  JSON.stringify(response.data));
        };
        fetchData(); // Chame a função fetchData
    } else {
        console.log("Data existente, mudando de pagina.")
        navigate("/matches");
    }
    }, []);

    return (
        <motion.div 
        initial = {{opacity:0 }}
        transition={{duration:2}}
        animate = {{opacity:1 }}
        exit={{opacity:0}} 
        id='as' className='w-full h-[100vh] p-20 bg-vermelhoSanguino' >
            <div>
                <img width="400px" className='absolute right-0 bottom-0' src={cupidBlack} alt="" />
                <p id="txt" className='text-center text-5xl font-extrabold 	'></p>
            </div>

        </motion.div>
    );
}

export default Carregamento;

