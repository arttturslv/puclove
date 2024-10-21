import { duration } from "@mui/material";
import Song from "../../components/Song"
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';

import { useState, useEffect } from "react";
export default function SearchSong({ profileSong, setProfileSong }) {

    const [musicaPesquisada, setMusicaPesquisada] = useState(profileSong?.songTitle || 'Pesquisar músicas');
    const [spotifyToken, setSpotifyToken] = useState();
    const [listaPesquisada, setListaPesquisada] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [wannaChange, setWannaChange] = useState(false);
    console.log("0")


    // Retorna um token para as requisições do SPOTIFY
    useEffect(() => {
        console.log("1")
        var authParams = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body:
                "grant_type=client_credentials&client_id=" +
                "6e405048be884c30afdb08703ad691a5" +
                "&client_secret=" +
                "c8aff7e35fc9480485a820872499ebeb",
        };
        fetch("https://accounts.spotify.com/api/token", authParams)
            .then((result) => result.json())
            .then((data) => setSpotifyToken(data.access_token));
    }, []);



    const digitacao = debounce(procurarMusica, 1000);
    function debounce(fn, delay) {
        let timer = null;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn(...args)
            }, delay);
        }
    }
    function esperarDigitacao(inputValue) {
        digitacao(inputValue);
    }

    async function procurarMusica(valor) {
        console.log("2")

        console.log("Procurando por " + valor);
        setIsLoading(true);

        var params = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${spotifyToken}`,
            },
        };

        fetch(
            "https://api.spotify.com/v1/search?q=" + valor + "&type=track",
            params
        )
            .then((response) => response.json())
            .then((data) => {
                setListaPesquisada(data.tracks.items.slice(0, 12))
                setIsLoading(false)
            });
    }

    function salvarMusica(item) {
        setProfileSong(item);
        setWannaChange(false);     
        setListaPesquisada(null)   
    }


    return (
        <div className="">
            <h4 className=" font-semibold text-amareloOcre text-[15px]">Música favorita</h4>
            {
                wannaChange ?
                    <div className="space-y-1 mt-1 ">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder={profileSong?.name + " - " + profileSong?.album?.name} 
                                onInput={e => esperarDigitacao(e.target.value)}
                                className="text-[14px] text-white/60 w-[100%] h-[45px] py-[7px] px-[15px] rounded-lg bg-[#434343] relative"
                            />

                            {
                                isLoading &&
                                <div className="h-4 w-4 absolute top-4 right-4 rounded-full border-b-[2px] animate-spin border-vermelhoSanguino"></div>
                            }

                        </div>
                    </div>
                    :
                    <div  onClick={() => setWannaChange(prev => !prev)}>
                        <Song musica={profileSong}></Song>
                    </div>
            }

                {listaPesquisada&& (
                    <motion.div layout
                    transition={{
                        layout: { duration: 0.3 }
                    }}
                    
                    className="space-y-1 w-full max-h-72 w-[45vw] overflow-y-scroll">
                        {listaPesquisada.map((item, index) => (
                            <motion.div 
                            animate={{ y: [800,0], opacity: [0,100], transition:{duration: (index/5)}}}
                            > 
                                <Song
                                    musica={item}
                                    salvar={() => salvarMusica(item)}
                                    actionText={"Escolher música"}
                                    key={item.id} 
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )
                }
        </div>
    )
}