import React from 'react';
import "../StyleCadastro.css";
import {useState} from 'react'
import CadastroPerfil from "../pages/cadastroPerfil";


const Cadastro = () => {
    
  //cria um obj user pra armazenar as respostas dos formularios.
  const [newUser, setNewUser] = useState({
    name: "",
    email: "", //@sga.pucminas.br
    password: "",
    birthDate: "", //2021-02-21" ano, mes, dia -------- fim da primeira pagina
    course: "",
    campus: "", //São Gabriel, Praça da Liberdade, Coração Eucaristico.
    interestsIds: [""], //é o id do interesse -> 650f6763affad354ee338325
    instagram: "",
    intention: "", //FRIENDSHIP, SOMETHING_CASUAL, SERIOUS_RELATIONSHIP
  });

const [mostrarComponente, setMostrarComponente] = useState(false); //mostrar o CadastroPerfil

const handleClick = (e) => { //se clicar para continuar, ele mostra o cadastroPerfil e esconde o cadastro atual.
  e.preventDefault()
  setMostrarComponente(true);
}


  //Ao passar pro cadastroPerfil, ele manda o JSON de user e o state para mostrar/esconder componente.
    return (
    <div className="container-cadastro">
    {mostrarComponente && <CadastroPerfil  user={newUser} setMostrarComponente={setMostrarComponente} />} 
    {!mostrarComponente && ( 
    <div className="container-cadastro ">
      <div className="wrap-cadastro">
        <form className="cadastro-form">
          
          <span className="cadastro-form-title">
          Cadastre e conheça seu amor
          </span>

          <div className="wrap-input">
            <h4>Qual seu nome?</h4>
            <input className="input" type="name" placeholder="Digite seu nome" name="name"  />
          </div>

          <div className="wrap-input">
            <h4>Digite o e-mail</h4>
            <input className="input" type="email" placeholder="meuemail@sga.pucminas.br"  name="email" />
          </div>
          
          <div className="wrap-input">
            <h4>Digite sua senha</h4>
            <input className="input" type="password" placeholder="********"  name="password" />
          </div>
          <div className="wrap-input">
            <h4>Confirme a senha</h4>
            <input className="input" type="password" placeholder="********" />
          </div>
          <div className="wrap-input">
            <h4>Quando você nasceu</h4>
            <input className="input datepickerbg" type="date" placeholder="01/01/1900"  name="birthdate"/>
          </div>
          <div className="container-cadastro-form-btn">
            <button type='submit' onClick={handleClick} className="cadastro-form-btn" >Continuar</button>

          </div>
          
        </form>
      </div>
    </div>
    )}
  </div>

)};

export default Cadastro;