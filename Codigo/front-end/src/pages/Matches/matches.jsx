import { } from "react-router-dom";
import Slider from "../../components/Slider";
import Modal from "../../components/Modal";
import ModalMatch from "../../components/ModalMatch";
import { useMatchResponse } from "../../hooks/isMatch";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import { motion } from 'framer-motion';

import chat from '../../assets/Icons/chat.svg';
import settings from '../../assets/Icons/settings.svg';
import myLikes from '../../assets/Icons/my_likes.svg';
import liked from '../../assets/Icons/my_likes.svg';
import reload from '../../assets/Icons/my_likes.svg';
import close from '../../assets/Icons/my_likes.svg';

const matches = () => {

    const navigate = useNavigate(); //usado no botão continuar para ir para a home


    const [ID, setID] = useState(0);
    const [data, setData] = useState(); // Estado para controlar o carregamento
    const [token, setToken] = useState(); // Estado para controlar o carregamento
    const [matchesDados, setmatchesDados] = useState(); // Estado para controlar o carregamento

    const [statusPhoneNotification, setstatusPhoneNotification] = useState("");
    const [statusMatches, setstatusMatches] = useState("");
    const [counter, setCounter] = useState(3);


    useEffect(() => {
        console.log("Data armazenada.")
        const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
        setData(currentUser.user);
        console.log("Token armazenado.")
        setToken(currentUser.token);
        console.log("Matches dados armazenado.")
        setmatchesDados((JSON.parse(sessionStorage.getItem("CompatibleUsers")).matches));
        console.log(matchesDados)
        
    }, []);

    function verifica() {
        // setstatusPhoneNotification(JSON.parse(sessionStorage.getItem("userData")));
        // setstatusPhoneNotification(statusPhoneNotification.phoneNumber == null ? true :false );
    }

    var imgParaNovo = [{
        "id": "0005",
        "imagePath": "C:\\Users\\Study\\Desktop\\PUCLOVE\\Codigo\\front-end\\src\\assets\\images\\not_found.svg"
    },]

    const [its, setIts] = useState(false);
    const [as, setAs] = useState(0);
    useEffect(() => {
        if (as >= 1) {
            console.log("LIKEZZAo")
            setStatusAnim(true);
        }
    }, [its])

    var response = '';
    function incrementar() {
            const useMatchRes = async () => {
                response = await useMatchResponse(token, data[ID].id);

                if(ID+1 != data.length) {
                    setID(ID+1);
                   } else {
                    alert("Você está no fim")
                }

                if (response.message == "It's a match!") {
                    setIts(!its);
                    setAs(as + 1)

                    let userDataInfo = JSON.parse(sessionStorage.getItem("userData")) || []; //peguei todos os dados do user logado
                    let userDataMatchs = JSON.parse(sessionStorage.getItem("userData")).matches || []; //peguei apenas o matches do user logado
                    
                    let newMatch = {
                        "id": response.match.id,
                        "userId": response.match.userId,
                        "otherUserId": response.match.otherUserId,
                    }
                    userDataMatchs.push(newMatch);
                    userDataInfo.matches = userDataMatchs;
                    sessionStorage.setItem("userData", JSON.stringify(userDataInfo));
                    setmatchesDados((JSON.parse(sessionStorage.getItem("userData")).matches));
                } else if (response.message == "Liked!") {
                    setAs(as + 1)
                }
            };
            useMatchRes(); 
    };

    function pular() {
           if(ID+1 != data.length) {
            setID(ID+1);
           } else {
            alert("Você está no fim")
           }
    }

    function diminuir() {
        if (ID != 0) {
            setID(ID - 1);
        } else {
            alert("Você está no inicio")
        }
    };

    function calculaIdade(dataNasc) {
            if(dataNasc!=null) {
                let nascimento = dataNasc.split('-');

                const dataAtual = new Date();
                const anoAtual = dataAtual.getFullYear();
                const mesAtual = dataAtual.getMonth();
    
                let mes = parseInt(nascimento[0]);
                let ano = parseInt(nascimento[0]);
    
                if (mes < mesAtual) {
                    return (anoAtual - ano) - 1;
                } else {
                    return anoAtual - ano;
                }
            }
    }

    function decideEmoji(intent) {
        if (intent == "FRIENDSHIP") {
            return " amizades 😁"
        } else if (intent == "SERIOUS_RELATIONSHIP") {
            return " um relacionamento sério 🥰"
        } else {
            return " algo casual 🥰"
        }
    }


    const [statusAnim, setStatusAnim] = useState(false);

    useEffect(() => {
        if (statusAnim && counter > 0) {
            const interval = setInterval(() => {
                setCounter((prevCounter) => prevCounter - 1);
                console.log(counter);
            }, 1000);

            return () => clearInterval(interval);
        } else if (statusAnim && counter <= 0) {
            setStatusAnim(false)
            setCounter(2)
        }
    }, [statusAnim, counter]);



    function animaIcon() {
        let heart = document.getElementById("heart");
        heart.style.margin = "0";
        heart.style.top = "400px";
        heart.style.scale = "8";


        let its = document.getElementById("its");
        its.style.position = "absolute";
        its.style.top = "200px";
        its.style.left = "50%";
        its.style.translate = "-50%";
        its.style.textShadow = "5px 5px 1px  #000";
        its.style.color = "#9F1F37";


        let match = document.getElementById("match");
        match.style.top = "500px";
        match.style.left = "50%";
        match.style.translate = "-50%";
        match.style.textShadow = "5px 5px 1px  #000";
        match.style.color = "#9F1F37";

        let minhas = document.getElementById("minhasCurtidas");
        minhas.style.animation = "mynewmove 4s 2"

    }

    function onMatches () {
        console.log(statusMatches)
        setstatusMatches(true)
        
    }

    return data != undefined && data.length!=0 ? (
        
        <motion.div
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            id="pagMatch" className="w-full h-screen bg-amareloOcre overflow-hidden">

            {statusPhoneNotification && <Modal
                closeModal={() => setstatusPhoneNotification(false)}
                text1={<h4 className='font-normal' >Olá! Que bom que você está utilizando o Puc<strong><font color="#AD5E5E">LOVE</font></strong>! </h4>}
                text2={<p className='font-thin'>Nosso espaço é um lugar de conhecer novas pessoas e a gente notou que você ainda <strong>não tem um número cadastrado!</strong>📲<br></br>Coloca umas fotos bem maneiras, descreve seu perfil e coloca seu número! Imagina <strong>perder o amor da sua vida</strong> só porque deixou de descrever um pouquinho? Triste né😢? Enfim, mexe lá nas configurações e depois você volta pra usar aqui!🌟</p>}
                txtBtn1="Vamos lá editar meu perfil!"
                link1="/config"
            />}

            {statusMatches && matchesDados != null && <ModalMatch
                closeModal={() => setstatusMatches(false)}
                matches={matchesDados}
                data={data}
            />}

            {statusAnim && (
                <div id="anim" onLoad={animaIcon} className="absolute z-[99999] h-screen w-screen">
                    <div className="grid h-screen w-screen justify-content align-center">
                        <h1 id="its" className=" text-[6vw] font-black absolute  duration-[1s] text-black   top-[-100vh] left-[80%] ">It's a </h1>
                        <h1 id="match" className="z-[99999] text-[6vw] font-black absolute delay-50 text-black  duration-[1s] top-[-100vh] left-[80%] "> match!</h1>
                        <img id="heart" className="w-5 absolute ml-[120px] top-[730px] justify-self-center drop-shadow-2xl scale-[0.8] delay-100 duration-[1s] " src={liked} alt="" />
                    </div>
                </div>)
            } 
            <div id='central' onLoad={() => setTimeout(verifica, 2000)} className=" m-0 my-auto mx-auto w-[100%]  sm:w-[500px] h-[100%] overflow-y-scroll overflow-x-hidden">
                <div id='btnHeader' className="h-[70px] p-4 flex justify-center bg-amareloOcre">
                    <div className="absolute grid grid-cols-3">
                        <img onClick={() => setStatusAnim(true)} src={chat} alt="icone de chat" className='w-[65%] hover:w-[70%] active:w-[62%] transition ease-in-out' />
                        <img onClick={() => navigate("/config")} src={settings} alt="icone de configurações" className='w-[65%] hover:w-[70%] active:w-[62%] transition ease-in-out' />
                        <img id="minhasCurtidas" onClick={onMatches} src={myLikes} alt="icone de minhas curtidas" className='w-[65%] animate-none hover:w-[70%] active:w-[62%] transition ease-in-out' />
                    </div>
                </div>

                <div id='matchProfile' className="h-[760px]">
                    <Slider
                        image={
                            data[ID]?.image != null ? data[ID].image : imgParaNovo

                        } cIndex={0} />
                    <div id='SlideProfile' className="text-white  translate-y-[-180px] ">
                        <h3 className="text-2xl font-semibold pl-4">{data[ID]?.name} - {calculaIdade(data[ID]?.birthDate)}</h3>
                        <h4 className="text-sm font-medium pl-4">{data[ID]?.course}</h4>
                        <h4 className="text-sm font-medium pl-4">{data[ID]?.campus}</h4>
                    </div>
                    <div id='btnProfile' className="  translate-y-[-180px]  flex justify-center">
                        <div className="grid grid-cols-3">
                            <img onClick={diminuir} src={reload} alt="icone de voltar" className='w-[75%] hover:w-[80%] active:w-[70%] transition ease-in-out' />
                            <img onClick={pular} src={close} alt="icone de negar" className='w-[75%] hover:w-[80%] active:w-[70%] transition ease-in-out' />
                            <img onClick={incrementar} src={liked} alt="icone de curtir" className='w-[75%] hover:w-[80%] active:w-[70%] transition ease-in-out' />
                        </div>

                    </div>
                    <div id="transicao" className="  translate-y-[-182px]  relative bottom-0 h-[80px] z-20 ">

                    </div>


                </div>

                <div onClick={()=> window.open(data[ID]?.aboutUser != null ? data[ID]?.aboutUser.profileSong.songUrl : 'https://open.spotify.com/intl-pt/track/2gaZJDgE71VL9PzzUUlpMg?si=3305e1c59d574eb5')} id="musicaProfile" className="relative cursor-pointer flex sm:p-5 p-2 pt-5 justify-evenly bg-cinzaBlack">
                    <div id="imgMusica" className="rounded sm:w-[100px] sm:h-[100px] w-[80px] h-[80px]">
                        <img className="rounded" src={data[ID]?.aboutUser != null ? data[ID]?.aboutUser.profileSong.songImgUrl : '../src/assets/song-icon.svg'} alt="icone de musica" />
                    </div>
                    <div id="txtMusica" className="self-center text-left  text-white m-0 ">
                        <h4 className="text-lg sm:text-xl font-extrabold text-center ">{data[ID]?.aboutUser != null ? data[ID]?.aboutUser.profileSong.songTitle : 'Dragonborn'}</h4>
                        <h4 className=" text-center">{data[ID]?.aboutUser != null ? data[ID]?.aboutUser.profileSong.author : 'Jeremy Soule'}</h4>
                    </div>
                </div>


                <div className="sm:px-10 px-5 py-5 text-white m-0 flex  justify-evenly text-justify	 bg-cinzaBlack ">
                    <p>{data[ID]?.aboutUser != null ? data[ID]?.aboutUser.description : ''}</p>
                </div>

                <div className="sm:px-10 px-5 text-white m-0 flex bg-cinzaBlack">
                    <p>
                    {data[ID]?.interests.map(item => ` #${item.name}`).join('  ')}
                    </p>
                </div>

                <div className="sm:px-10 px-5 py-5 text-white m-0 flex  bg-cinzaBlack	 ">
                    <p><strong>Instagram: </strong>{data[ID]?.instagram}</p>
                </div>

                <div className="sm:px-10 px-5 pt-0 py-5 text-white m-0 flex  bg-cinzaBlack	 ">
                    <p><strong>Procurando por: </strong>{decideEmoji(data[ID]?.intention)}</p>
                </div>
            </div>

        </motion.div>
    ) : (<div className="flex flex-wrap flex-col justify-center items-center h-screen bg-gray-100">
        <div className=" animate-spin">
            <svg className="stroke-blue-50 stroke-4 stroke-dash-150 stroke-dashoffset-150 animate-dash" xmlns="http://www.w3.org/2000/svg" width="93" height="93" viewBox="0 0 93 93" fill="none">
                <path d="M10.0537 56.4674C11.2664 64.3042 12.2476 71.5012 16.4399 76.2338C20.6589 80.9965 26.9995 84.9703 33.0582 86.9132C40.714 89.3682 51.9029 89.2036 59.1898 86.382C61.4907 85.4911 63.8461 84.5947 65.9701 83.339C74.4457 78.3287 80.6829 62.7025 80.6829 56.4675" stroke="#AD5E5E" strokeWidth="8" strokeLinecap="round" />
                <path d="M64.5391 64.5394C67.5348 64.2585 72.1773 59.1908 75.6242 56.8151C76.845 55.9737 78.2002 55.3083 79.6071 54.8406C81.522 54.2041 84.215 53.9653 85.0175 57.1837C86.3159 62.3904 87.4176 67.7159 89 72.6113" stroke="#AD5E5E" strokeWidth="8" strokeLinecap="round" />
                <path d="M82.9482 36.1675C81.7355 28.3306 80.7544 21.1337 76.562 16.4011C72.3431 11.6384 66.0024 7.6646 59.9437 5.72171C52.288 3.26668 41.0991 3.43126 33.8121 6.25285C31.5112 7.14379 29.1558 8.04023 27.0318 9.29584C18.5563 14.3062 12.319 29.9324 12.319 36.1674" stroke="#AD5E5E" strokeWidth="8" strokeLinecap="round" />
                <path d="M28.4629 28.0955C25.4671 28.3764 20.8246 33.4441 17.3777 35.8198C16.157 36.6612 14.8018 37.3266 13.3949 37.7943C11.4799 38.4308 8.78699 38.6696 7.98444 35.4511C6.68608 30.2444 5.58436 24.919 4.00193 20.0236" stroke="#AD5E5E" strokeWidth="8" strokeLinecap="round" />
            </svg>
        </div>
        <div className="py-5">
           <h4>Algum erro aconteceu...</h4> 
        </div>
    </div>)
}

export default matches;
