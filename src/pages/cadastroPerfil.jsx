import React from 'react';
import "../StyleCadastro.css";
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";
import Interesses from '../components/Interesses';
import api from '../api/axiosConfig';

const cadastroPerfil = ( {user, setMostrarComponente}) => { 

  /* Isso aqui é o metodo post para usar quando receber todas as informações dos formularios
  const json = JSON.stringify(user);
  function createPost() {
     api.post('/users', json, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  }
  */

  const navigate = useNavigate(); //usado no botão continuar para ir para a home

  const [clicado, setClicado] = useState(false);

  const handleClick = (e) => { //verifica se clicaram para voltar no formulario anterior, se sim, atualiza o "clicado"
    setClicado(true);
  }
  useEffect(() => { //caso o clicado seja atualizado, ele atualiza o valor do componente que esconde esse formulario e mostra o anterior.
    setMostrarComponente(true) 
  }, [clicado]);
  

  const [opcoes, setOpcoes] = useState();   // state para armazenar os interesses pegados da api na variavel opções
  useEffect(() => { //useEffect faz apenas um get 
    api
      .get("/interests")
      .then((response) => setOpcoes(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  const [placeholder, setPlaceholder] = useState('Clique aqui para escolher'); //usado para armazenar os valores selecionados no modal de interesse
  const [openModal, setOpenModal] = useState(false); //usado para abrir o modal de interesses.


  return (
  
    <div className="container-cadastro">
      
      {openModal && <Interesses closeModal={() => setOpenModal(!openModal)} setPlaceholder={setPlaceholder} opcoes={opcoes} />}

    <div className="container-cadastro">
      <div className="wrap-cadastro">
        <form className="cadastro-form">
          
          <span className="cadastro-form-title">
          Conte Sobre Você
          </span>

          <div className="wrap-input">
            <h4>Qual seu curso</h4>
            <input className="input" type="text" placeholder="Digite seu curso" />
          </div>

          <div className="wrap-input">
            <h4>Qual seu campos</h4>
            <select className="input" id="cursos" >
              <option value="" >Clique aqui para escolher</option>
              <option value="1">São Gabriel</option>
              <option value="2">Praça da Liberdade</option>
              <option value="3">Coração Eucarístico</option>
            </select>
          </div>

          <div className="wrap-input">
            <h4>Quais seus interesses</h4>
            <input className="input  placeholder-white hover:placeholder-cinzaBlack" type="text" placeholder={placeholder} onClick={()=> setOpenModal(true)} />
          </div>
          <div className="wrap-input">
            <h4>Qual seu instagram</h4>
            <input className="input after:text-black" type="" placeholder="@" />
          </div>
          <div className="wrap-input">
            <h4>O que você busca?</h4>
            <select className="input" id="intencao">
              <option value="3">Amizade</option>
              <option value="4">Um romance</option>
              <option value="5">Amigos para curtir uma festa</option>
              <option value="6">Pessoas bonitas</option>
            </select>
          </div>
          <div className="container-cadastro-form-btn">
          <button onClick={handleClick} className="cadastro-form-btn" >Voltar</button>
            <button onClick={() => navigate("/")} className="cadastro-form-btn" >Cadastrar</button>
          </div>
        </form>
      </div>
    </div>

  </div>


)}

export default cadastroPerfil;