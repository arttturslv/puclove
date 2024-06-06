import { useEffect, useState } from "react"
import { motion } from 'framer-motion';

import { useMatchData } from "../hooks/useMatchData";
import {calculaIdade, decideEmoji} from "../hooks/useCustom";
import MatchesSkeleton from "./MatchesSkeleton";
import Slider from "../components/Slider";
import Song from "../components/Song";

import chat from '../assets/Icons/chat.svg';
import settings from '../assets/Icons/settings.svg';
import myLikes from '../assets/Icons/my_likes.svg';
import liked from '../assets/Icons/liked.svg';
import reload from '../assets/Icons/reload.svg';
import close from '../assets/Icons/close.svg';
import defaultSong from '../assets/Icons/default_song.svg';


export default function MatchesNew() {

    const [compatibleUsers, setCompatibleUsers] = useState(JSON.parse(localStorage.getItem("compatibleUsers")));
    const [user, _] = useState(JSON.parse(localStorage.getItem("currentUser")).user);
    const [accessToken, setAccessToken] = useState(JSON.parse(localStorage.getItem("currentUser")).token);
    
    useEffect(() => {
        if(compatibleUsers==undefined) {
            console.log("Não há usuarios compativeis salvos. \nFazendo requisição!")
            const fetchCompatibleUsers= async () => {
                try {
                    const response = await useMatchData(accessToken);
                    localStorage.setItem("compatibleUsers",  JSON.stringify(response.data));
                    setCompatibleUsers(response.data);
                } catch (error) {
                    console.log("Deu erro: ", error)
                }
            };
            fetchCompatibleUsers();
        } 
    }, []);


    const musica = {
        name: "Nightmarea",
        album: {
          name: "Nightmare",
          images: [
            { url: "URL da imagem 1" },
            { url: "URL da imagem 2" },
            { url: "https://i.discogs.com/pfxmSXEviiT35ebkHmFpAGDYnwaHroukXDKVGSTvHzs/rs:fit/g:sm/q:90/h:597/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQ0OTk4/OTgtMTQ5MzQxMzcy/Mi04ODg2LmpwZWc.jpeg" }
          ]
        },
        artists: [
          { name: "Avenged Sevenfold" }
        ],
        external_urls: {
          spotify: "https://www.youtube.com/watch?v=94bGzWyHbu0&ab_channel=AvengedSevenfold"
        }
      };


    const ID = 0;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            id="pagMatch" className="w-full h-screen bg-amareloOcre overflow-hidden">
            
            {
                compatibleUsers==null?
                <MatchesSkeleton/>:
                

                <div id='central' className=" m-0 my-auto mx-auto w-[100%]  sm:w-[500px] h-[100%] overflow-y-scroll overflow-x-hidden">
                
                    <div className="flex justify-center items-center bg-amareloOcre">
                        <div className="fixed z-[99999] grid grid-cols-3 items-center justify-items-center">
                            <img src={chat} alt="chat" className='w-[65%] hover:w-[70%] active:w-[62%] transition ease-in-out drop-shadow-2xl	' />
                            <img src={settings} alt="configurações" className='w-[65%] hover:w-[70%] active:w-[62%] transition ease-in-out drop-shadow-2xl' />
                            <img  src={myLikes} alt="minhas curtidas" className='w-[65%] animate-none hover:w-[70%] active:w-[62%] transition ease-in-out drop-shadow-2xl' />
                        </div>
                        <span className="h-[120px]"></span>
                    </div>

                <div className="h-[760px]">
                    <Slider images={compatibleUsers[ID].image} />
                    
                    <div id='Introducao' className="text-white translate-y-[-180px] ">
                        <h3 className="text-2xl font-semibold pl-4">{compatibleUsers[ID]?.name} - {calculaIdade(compatibleUsers[ID]?.birthDate)}</h3>
                        <h4 className="text-sm font-medium pl-4">{compatibleUsers[ID]?.course}</h4>
                        <h4 className="text-sm font-light pl-4">{compatibleUsers[ID]?.campus}</h4>
                    </div>

                    <div id='Choices' className="translate-y-[-180px] flex justify-center">
                        <div className="grid grid-cols-3 items-center justify-items-center">
                            <img  src={reload} alt="voltar" className='w-[75%] hover:saturate-[1.2] cursor-pointer transition ease-in-out active:w-[70%]' />
                            <img  src={close} alt="negar" className='w-[75%] hover:saturate-[1.2] cursor-pointer transition ease-in-out active:w-[70%]' />
                            <img  src={liked} alt="curtir" className='w-[75%] hover:saturate-[1.2] cursor-pointer transition ease-in-out active:w-[70%]' />
                        </div>
                    </div>

                    <div id="gradient" className="  translate-y-[-182px]  relative bottom-0 h-[80px] z-20 "/>
                </div>


                <div id="musicaProfile" className="relative cursor-pointer flex sm:p-5 p-2 pt-5 justify-evenly bg-cinzaBlack">
                    <Song musica={musica}></Song>
                </div>


                <div className="sm:px-10 px-5 py-5 text-white m-0 flex  justify-evenly text-justify	 bg-cinzaBlack ">
                    <p>{compatibleUsers[ID]?.aboutUser != null ? compatibleUsers[ID]?.aboutUser.description : ''}</p>
                </div>

                <div className="sm:px-10 px-5 text-white m-0 flex bg-cinzaBlack">
                    <p>
                    {compatibleUsers[ID]?.interests.map(item => ` #${item.name}`).join('  ')}
                    </p>
                </div>

                <div className="sm:px-10 px-5 py-5 text-white m-0 flex  bg-cinzaBlack	 ">
                    <p><strong>Instagram: </strong>{compatibleUsers[ID]?.instagram}</p>
                </div>

                <div className="sm:px-10 px-5 pt-0 py-5 text-white m-0 flex  bg-cinzaBlack	 ">
                    <p><strong>Procurando por: </strong>{decideEmoji(compatibleUsers[ID]?.intention)}</p>
                </div>
            </div>



            }

        </motion.div>

    )
}