import { } from "react-router-dom";
import Slider from "../components/Slider";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const matches = () => {
     
    const navigate = useNavigate(); //usado no botão continuar para ir para a home


    const [id, setID] = useState(1);
    const [data, setData] = useState(undefined); // Estado para controlar o carregamento


    useEffect(() => {
        console.log("Data armazenada.")
        setData(JSON.parse(sessionStorage.getItem("matches")));
      }, []);


    const incrementar = () => {
        if(id+1!=data.length) {
            setID(id + 1);
        } else {
            alert("Já curtiu tudo.")
        }
        console.log(data);

    };
    const diminuir = () => {
        if(id!=0) {
            setID(id - 1);
        }
        console.log(data[id].image)
    };

    return data!=undefined ? (
    <div id="pagMatch" className="w-full h-screen  bg-amareloOcre overflow-hidden">
        <div id='central' className=" m-0 my-auto mx-auto w-[100%]  sm:w-[500px] h-[100%] overflow-y-scroll overflow-x-hidden">
            <div id='btnHeader' className="h-[70px] p-4 flex justify-center bg-amareloOcre">
                <div className="absolute grid grid-cols-3">
                    <img src="../src/assets/Icones/chat.svg" alt="icone de chat" className='w-[65%] hover:w-[70%] active:w-[62%] transition ease-in-out'/>
                    <img onClick={() => navigate("/config")} src="../src/assets/Icones/icon configuracoes.svg" alt="icone de configurações" className='w-[65%] hover:w-[70%] active:w-[62%] transition ease-in-out'/>
                    <img src="../src/assets/Icones/minhasCurtidas.svg" alt="icone de minhas curtidas" className='w-[65%] hover:w-[70%] active:w-[62%] transition ease-in-out'/>
                </div>
            </div>

            <div id='matchProfile' className="h-[760px]">
                <Slider image={data[id].image}/>
                <div id='SlideProfile' className="text-white  translate-y-[-180px] ">
                    <h3 className="text-2xl font-semibold pl-4">{data[id].name}</h3>
                    <h4 className="text-sm font-medium pl-4">{data[id].course}</h4>
                    <h4 className="text-sm font-medium pl-4">{data[id].campus}</h4>
                </div>
                <div id='btnProfile' className="  translate-y-[-180px]  flex justify-center">
                    <div className="grid grid-cols-3">
                        <img onClick={diminuir} src="../src/assets/Icones/icon resetar.svg" alt="icone de voltar" className='w-[75%] hover:w-[80%] active:w-[70%] transition ease-in-out'/>
                        <img onClick={incrementar} src="../src/assets/Icones/icon not_match.svg" alt="icone de negar" className='w-[75%] hover:w-[80%] active:w-[70%] transition ease-in-out'/>
                        <img onClick={incrementar} src="../src/assets/Icones/icon match.svg" alt="icone de curtir" className='w-[75%] hover:w-[80%] active:w-[70%] transition ease-in-out'/>
                    </div>

                </div>
                <div id="transicao" className="  translate-y-[-182px]  relative bottom-0 h-[80px] z-20 ">

            </div>
     

            </div>
        
            <div id="musicaProfile" className="relative flex sm:p-5 p-2 pt-5 justify-evenly bg-cinzaBlack">
                <div id="imgMusica" className="rounded sm:w-[100px] sm:h-[100px] w-[80px] h-[80px]">
                    <img className="rounded" src="../src/assets/song-icon.svg" alt="icone de musica" />
                </div>
                <div id="txtMusica" className="self-center text-left  text-white m-0 ">
                    <h4 className="text-lg sm:text-xl font-extrabold text-center ">Skyrim Theme Song</h4>
                    <h4 className=" text-center">Lindsey Stirling & Peter Hollens</h4>
                </div>
            </div>


            <div className="sm:px-10 px-5 py-5 text-white m-0 flex  justify-evenly text-justify	 bg-cinzaBlack ">
                <p>📚 Estudante apaixonada de Psicologia na PUC.<br/>
                    🎮 Adoro Skyrim, especialmente a trilha sonora <br/>
                    que me faz viajar para outros mundos.<br/>
                    📖 Amo perder-me nas páginas de um bom livro - minhas estantes estão cheias de histórias.<br/>
                    🐾 Sou louca por animais - tenho um cachorro adorável e sonho em ter um gato também.<br/>
                    👊🏼 Fã de UFC e esportes em geral - adoro a emoção do octógono!<br/>
                    🍹 Uma noite perfeita inclui bons drinks e conversas envolventes.</p>
            </div>

            <div className="sm:px-10 px-5 text-white m-0 flex bg-cinzaBlack">
                <p>
                {data[id].interests.map(item => ` #${item.name}`).join('  ')}
                </p>
            </div>

            <div className="sm:px-10 px-5 py-5 text-white m-0 flex  bg-cinzaBlack	 ">
             <p><strong>Instagram: </strong>{data[id].instagram}</p> 
            </div>
        </div>

    </div>
    ) : (     <div className="flex justify-center items-center h-screen bg-gray-100">
    <div className=" animate-spin">
        <svg className="stroke-blue-50 stroke-4 stroke-dash-150 stroke-dashoffset-150 animate-dash" xmlns="http://www.w3.org/2000/svg" width="93" height="93" viewBox="0 0 93 93" fill="none">
        <path d="M10.0537 56.4674C11.2664 64.3042 12.2476 71.5012 16.4399 76.2338C20.6589 80.9965 26.9995 84.9703 33.0582 86.9132C40.714 89.3682 51.9029 89.2036 59.1898 86.382C61.4907 85.4911 63.8461 84.5947 65.9701 83.339C74.4457 78.3287 80.6829 62.7025 80.6829 56.4675" stroke="#AD5E5E" strokeWidth="8" strokeLinecap="round"/>
        <path d="M64.5391 64.5394C67.5348 64.2585 72.1773 59.1908 75.6242 56.8151C76.845 55.9737 78.2002 55.3083 79.6071 54.8406C81.522 54.2041 84.215 53.9653 85.0175 57.1837C86.3159 62.3904 87.4176 67.7159 89 72.6113" stroke="#AD5E5E" strokeWidth="8" strokeLinecap="round"/>
        <path d="M82.9482 36.1675C81.7355 28.3306 80.7544 21.1337 76.562 16.4011C72.3431 11.6384 66.0024 7.6646 59.9437 5.72171C52.288 3.26668 41.0991 3.43126 33.8121 6.25285C31.5112 7.14379 29.1558 8.04023 27.0318 9.29584C18.5563 14.3062 12.319 29.9324 12.319 36.1674" stroke="#AD5E5E" strokeWidth="8" strokeLinecap="round"/>
        <path d="M28.4629 28.0955C25.4671 28.3764 20.8246 33.4441 17.3777 35.8198C16.157 36.6612 14.8018 37.3266 13.3949 37.7943C11.4799 38.4308 8.78699 38.6696 7.98444 35.4511C6.68608 30.2444 5.58436 24.919 4.00193 20.0236" stroke="#AD5E5E" strokeWidth="8" strokeLinecap="round"/>
        </svg>

    </div>
</div>)
}

export default matches;
