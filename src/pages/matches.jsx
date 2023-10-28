import { } from "react-router-dom";
import Slider from "../components/Slider";
import { useMatchData } from "../hooks/useMatchData";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const matches = () => {
     
    const navigate = useNavigate(); //usado no botão continuar para ir para a home


    const [id, setID] = useState(1);
    const [data, setData] = useState(undefined); // Estado para controlar o carregamento

    useEffect(() => {
        const fetchData = async () => {
          const response = await useMatchData();
          setData(response.data); // Atualize o estado com a resposta da API
        };
    
        fetchData(); // Chame a função fetchData
      }, []);
    
    const incrementar = () => {
        if(id+1!=data.length) {
            setID(id + 1);
        } else {
            alert("Já curtiu tudo.")
        }
    };
    const diminuir = () => {
        if(id!=0) {
            setID(id - 1);
        }
    };
    
    return data!=undefined && (
        
    <div className="w-full h-screen bg-amareloOcre">
    <div id='central' className=" pb-10 w-[500px] bg-cinzaBlack">
            <div id='btnHeader' className="h-[50px] py-1 w-[500px] flex justify-center">
                <div className="absolute grid grid-cols-3">
                    <img src="../src/assets/Icones/chat.svg" alt="icone de chat" className='w-[65%] hover:w-[70%] active:w-[62%] transition ease-in-out'/>
                    <img onClick={() => navigate("/sett")} src="../src/assets/Icones/icon configuracoes.svg" alt="icone de configurações" className='w-[65%] hover:w-[70%] active:w-[62%] transition ease-in-out'/>
                    <img src="../src/assets/Icones/minhasCurtidas.svg" alt="icone de minhas curtidas" className='w-[65%] hover:w-[70%] active:w-[62%] transition ease-in-out'/>
                </div>
            </div>

            <div id='matchProfile'>
                <Slider/>
                <div id='SlideProfile' className="text-white absolute translate-y-[-180px] ">
                    <h3 className="text-2xl font-semibold pl-4">{data[id].name}</h3>
                    <h4 className="text-sm font-medium pl-4">{data[id].course}</h4>
                    <h4 className="text-sm font-medium pl-4">{data[id].campus}</h4>
                </div>
                <div id='btnProfile' className="h-[20px] py-1 w-[500px] flex justify-center">
                    <div className=" absolute translate-y-[-100px] grid grid-cols-3">
                        <img onClick={diminuir} src="../src/assets/Icones/icon resetar.svg" alt="icone de voltar" className='w-[75%] hover:w-[80%] active:w-[70%] transition ease-in-out'/>
                        <img onClick={incrementar} src="../src/assets/Icones/icon not_match.svg" alt="icone de negar" className='w-[75%] hover:w-[80%] active:w-[70%] transition ease-in-out'/>
                        <img onClick={incrementar} src="../src/assets/Icones/icon match.svg" alt="icone de curtir" className='w-[75%] hover:w-[80%] active:w-[70%] transition ease-in-out'/>
                    </div>
                </div>
            </div>

            <div id="musicaProfile" className="flex p-5 justify-evenly">
                <div id="imgMusica" className="rounded sm:w-[100px] sm:h-[100px] w-[80px] h-[80px] bg-gray m-0">
                    <img className="rounded" src="../src/assets/song-icon.svg" alt="icone de musica" />
                </div>
                <div id="txtMusica" className="self-center text-white m-0 ">
                    <h4 className="text-lg sm:text-xl font-extrabold">Skyrim Theme Song</h4>
                    <h4>Lindsey Stirling & Peter Hollens</h4>
                </div>
            </div>

            <div className="px-10 text-white m-0 flex  justify-evenly ">
                <p>📚 Estudante apaixonada de Psicologia na PUC.<br></br>
                🎮 Adoro Skyrim, especialmente a trilha sonora que me faz viajar para outros mundos.<br></br>
                📖 Amo perder-me nas páginas de um bom livro - minhas estantes estão cheias de histórias.<br></br>
                🐾 Sou louca por animais - tenho um cachorro adorável e sonho em ter um gato também.<br></br>
                👊🏼 Fã de UFC e esportes em geral - adoro a emoção do octógono!<br></br>
                🍹 Uma noite perfeita inclui bons drinks e conversas envolventes.</p>
            </div>

        </div>

    </div>
    )
}

export default matches;
