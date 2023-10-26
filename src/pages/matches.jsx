import { } from "react-router-dom";
import Slider from "../components/Slider";
import { useMatchData } from "../hooks/useMatchData";

const matches = () => {
     /*
     const {data} = useMatchData();
        //vou ter que pegar o array de pessoas e pegar as posições e exibir
        quando clicar pra mudar, eu aumento a posição, se chegar no maximo, avisa q não tem mais gente e bloqueia.
        sm:w-[80%] md:w-[60%] lg:w-[45%] xl:w-[40%] 2xl:w-[33%]w-[100%]


        w-[100%] sm:w-[80%] md:w-[60%] lg:w-[45%] xl:w-[40%] 2xl:w-[33%]w-[100%] bottom-[5%] px-7 left-[50%] -translate-x-[50%] translate-y-0 -- SlideProfile
    */

    return (
        <div className="w-full bg-amareloOcre">
        <div id='central' className=" pb-10 w-[500px] bg-cinzaBlack">
            
            <div id='btnHeader' className=" flex justify-center m-0">
                <img src="../src/assets/Icones/chat.svg" alt="icone de chat" className='w-[10%] xl:w-[8%] m-3 ' />
                <img src="../src/assets/Icones/icon configuracoes.svg" alt="icone de configurações" className='w-[10%] xl:w-[8%] m-3' />
                <img src="../src/assets/Icones/minhasCurtidas.svg" alt="icone de minhas curtidas" className='w-[10%] xl:w-[8%] m-3' />
            </div>

            <div id='matchProfile'>
                <Slider/>
                <div id='SlideProfile' className="text-white absolute translate-y-[-180px] ">
                    <h3 className="text-2xl font-semibold pl-4">Giovana Mello, 20</h3>
                    <h4 className="text-sm font-medium pl-4">PUC Minas - SG</h4>
                    <h4 className="text-sm font-medium pl-4">Karma is a bitch!</h4>
                </div>
                <div id='btnProfile' className="flex justify-center absolute -translate-x-[-20%] translate-y-[-100px]">
                        <img src="../src/assets/Icones/icon resetar.svg" alt="icone de voltar" className='w-[12%] m-5'/>
                        <img src="../src/assets/Icones/icon not_match.svg" alt="icone de negar" className='w-[12%] m-5'/>
                        <img src="../src/assets/Icones/icon match.svg" alt="icone de curtir" className='w-[12%] m-5'/>
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
