import React, { useEffect } from 'react';
import "../StyleCadastro.css";
import {useState} from 'react'
import {useForm} from "react-hook-form"; 
import axios from "axios";
import api from '../api/axiosConfig';
import Interesses from '../components/Interesses';
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import {motion} from 'framer-motion';

const RegistrationForm = () => {
  const {
	  register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues
  } = useForm();

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    birthDate: "",
    course: "",
    campus: "",
    interests: [], //array interests está mockado por enquanto
    instagram: "",
    intention: "",
    role: "USER"
  });

  //TODO: arrumar o hook que guarda o state do usuário, está sendo amazenado só depois que envia o form de submit, talvez separar o setNewUser do post

  const onSubmit = async (data) => {
    
    let arrayInterests = placeholder.split(', ');
    data.interests = arrayInterests;

    await setNewUser((prevUser) => ({ ...prevUser, ...data }));

    console.log(data.interests)
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/register",
        newUser
      );
      console.log("Registration successful", response.data);
      alert("registrado com sucesso")
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  const [clicado, setClicado] = useState(false);

  const handleClick = (e) => { //verifica se clicaram para voltar no formulario anterior, se sim, atualiza o "clicado"
    setClicado(true);
  }
  // useEffect(() => { //caso o clicado seja atualizado, ele atualiza o valor do componente que esconde esse formulario e mostra o anterior.
  //   setMostrarComponente(true) 
  // }, [clicado]);
  

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
  const navigate = useNavigate();

  return (
    <motion.div 
      initial = {{opacity:0 }}
      transition={{duration:1}}
      animate = {{opacity:1 }}
      exit={{opacity:0}}
    className=" bg-cover w-full h-full bg-[url('../src\assets\background-linhas.svg')]">
    <Navbar />
    <form className="cadastro-form">
    <div className="container-cadastro ">
      {openModal && <Interesses closeModal={() => setOpenModal(!openModal)} setPlaceholder={setPlaceholder} opcoes={opcoes} />}
      <div className="wrap-cadastro">
      
          
          <span className="cadastro-form-title">
          Cadastre e conheça seu amor
          </span>

          <div className="wrap-input">
            <h4>Qual seu nome?</h4>
            <input className="input" type="name" placeholder="Digite seu nome" name="name" {...register('name', {required:true})}/>
            {errors?.name?.type === 'required' && <p className=' text-vermelhoSanguino'>Nome invalido*</p>}
          </div>
          <div className="wrap-input">
            <h4>Digite o e-mail</h4>
            <input className="input" type="email" placeholder="meuemail@sga.pucminas.br"  name="email"  {...register('email', {required:true, validate: {
              maxLength: (v) =>
                v.length <= 50 || "O email tem tamanho maximo de 50 caracteres.",
              matchPattern: (v) =>
              /^\w+@sga\.pucminas\.br$/.test(v) ||
                "Digite um email valido.",
              }})}/>

            {errors?.email?.message && (
              <p className=' text-vermelhoSanguino'>{errors.email.message}</p>)}

          </div>
          {errors?.email?.type === 'required' && <p className=' text-vermelhoSanguino'>Email invalido*</p>}
          <div className="wrap-input">
            <h4>Digite sua senha</h4>
            <input className="input" type="password" placeholder="********"  name="password"  {...register('password', {required:true, minLength:7})}/>
            {errors?.password?.type === 'minLength' && <p className=' text-vermelhoSanguino'>A senha precisa de ter ao menos 7 caracteres*</p>}
            {errors?.password?.type === 'required' && <p className=' text-vermelhoSanguino'>Digite a senha*</p>}
          </div>
          <div className="wrap-input">
            <h4>Confirme a senha</h4>
            <input className="input" type="password" placeholder="********"  name="passwordConfirm"  {...register('passwordConfirm',  {required:true})}/>
            {watch("passwordConfirm") !== watch("password") && getValues("passwordConfirm") ? (<p className=' text-vermelhoSanguino'>password not match</p>) : null}
          </div>
          <div className="wrap-input">
            <h4>Quando você nasceu</h4>
            <input className="input datepickerbg" type="date" placeholder="01/01/1900" name="birthDate"  {...register('birthDate', {required:true})}/>
            {errors?.date?.type === 'valueAsDate' && <p className=' text-vermelhoSanguino'>Data invalida*</p>}
            </div>

            </div>
            </div>
            <div className="container-cadastro ">
            <div className="wrap-cadastro">
              
          
            <div className="wrap-input">
            <h4>Qual seu curso</h4>
            <input className="input" type="text" placeholder="Digite seu curso" name="course" {...register('course', {required:true})}/>
          </div>

          <div className="wrap-input">
            <h4>Qual seu campus</h4>
            <select className="input" id="cursos" name="campus" {...register('campus', {required:true})}>
              <option value="" >Clique aqui para escolher</option>
              <option value="São Gabriel">São Gabriel</option>
              <option value="Praça da Liberdade">Praça da Liberdade</option>
              <option value="Coração Eucarístico">Coração Eucarístico</option>
            </select>
          </div>

          <div className="wrap-input">
            <h4>Quais seus interesses</h4>
            <input className="input  placeholder-white hover:placeholder-cinzaBlack" name="interests" type="text" placeholder={placeholder} onClick={()=> setOpenModal(true)} />
          </div>
          <div className="wrap-input">
            <h4>Qual seu instagram</h4>
            <input className="input after:text-black" type="" placeholder="@" name="instagram" {...register('instagram', {required:true})}/>
          </div>
          <div className="wrap-input">
            <h4>O que você busca?</h4>
            <select className="input" id="intencao" name="intention" {...register('intention', {required:true})}>
              <option value="FRIENDSHIP">Amizade</option>
              <option value="SERIOUS_RELATIONSHIP">Um romance</option>
              <option value="SOMETHING_CASUAL">Amigos para curtir uma festa</option>
            </select>
          </div>  

          
          <div className="container-cadastro-form-btn">
            <button type='submit' onClick={(e) => handleSubmit(onSubmit)(e)} className="cadastro-form-btn" >Continuar</button>
          </div>
       

      </div>
    </div>
    </form>
    </motion.div>

    )};

export default RegistrationForm;
