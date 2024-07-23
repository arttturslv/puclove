import { useEffect, useState } from "react"
import { motion } from 'framer-motion';

import { useMatchData } from "../../hooks/useMatchData";
import { decideEmoji, getInterests } from "../../hooks/useCustom";
import MatchesSkeleton from "./Skeleton";
import Slider from "./components/Slider";
import Song from "../../components/Song";


import WrapperDiv from "./components/WrapperDiv";

import ShowInteresses from "./components/ShowInteresses";
import Tab from "./components/Tab";
import UserBasicInfo from "./components/UserBasicInfo";
import ButtonMatchOptions from "./components/ButtonMatchOptions";

export default function MatchesNew() {

    const [currentUserInterests, _setInterests] = useState(getInterests());

    const [compatibleUsers, setCompatibleUsers] = useState(JSON.parse(localStorage.getItem("compatibleUsers")));
    const [user, _] = useState(JSON.parse(localStorage.getItem("currentUser")).user);
    const [accessToken, setAccessToken] = useState(JSON.parse(localStorage.getItem("currentUser")).token);

    useEffect(() => {
        if (compatibleUsers == undefined) {
            console.log("Não há usuarios compativeis salvos. \nFazendo requisição!")
            const fetchCompatibleUsers = async () => {
                try {
                    const response = await useMatchData(accessToken);
                    localStorage.setItem("compatibleUsers", JSON.stringify(response.data));
                    setCompatibleUsers(response.data);
                } catch (error) {
                    console.log("Deu erro: ", error)
                }
            };
            fetchCompatibleUsers();
        }
    }, []);


    const musica = {
        name: "Nightmare",
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
            id="pagMatch" className="w-full h-screen bg-gradient-to-b from-amareloOcre to-vermelhoSanguino overflow-hidden">

            {
                compatibleUsers == null ?
                    <MatchesSkeleton /> :

                    <div id='central' className="md:w-[400px] sm:w-full h-[100%] m-auto overflow-y-scroll overflow-x-hidden">
                        <Tab></Tab>
                        <main id="main" className="md:w-[400px] sm:w-full relative md:m-0 mb-8 ">
                            {/* Fotos e informações básicas */}
                            <div className="h-[750px] relative">
                                <Slider images={compatibleUsers[ID].image} />

                                <div className="absolute w-full bottom-2 space-y-2 text-white pl-6">
                                    <UserBasicInfo compatibleUser={compatibleUsers[ID]} />

                                    {
                                        //  <ShowInteresses interests={compatibleUsers[ID]?.interests} interestsList={currentUserInterests}></ShowInteresses>
                                        //  <div className="pl-1 py-1 rounded-lg">
                                        //      <h6 className="font-medium text-amareloOcre">Procurando por:</h6>
                                        //      <h4 className=" text-lg text-amareloOcre font-bold">{decideEmoji(compatibleUsers[ID]?.intention)}</h4>
                                        //  </div>
                                    }

                                    <ButtonMatchOptions />
                                </div>
                            </div>

                            {/* Informações detalhadas */}
                            <div className="bg-gradient-to-b from-black to-cinzaBlack px-4 space-y-4">
                                <WrapperDiv title={"Minha música favorita:"}>
                                    <Song musica={musica}></Song>
                                </WrapperDiv>

                                <WrapperDiv title={"Sobre mim:"}>
                                    <p className="p-2 text-sm text-amareloOcre">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                    </p>
                                </WrapperDiv>

                                <WrapperDiv title={"Meus gostos:"}>
                                    <ShowInteresses interests={compatibleUsers[ID]?.interests} interestsList={currentUserInterests}></ShowInteresses>
                                </WrapperDiv>

                                <WrapperDiv title={"Minhas redes sociais:"}>
                                    <div className="p-2 text-white flex gap-2  flex-col">
                                        <div className="flex gap-2 items-center">
                                            <img className="w-4 h-4" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png" alt="icone instagram" />
                                            <p className="text-sm"><strong>@artur.pine</strong>{compatibleUsers[ID]?.instagram}</p>
                                        </div>
                                    </div>
                                </WrapperDiv>

                                <WrapperDiv title={"Estou buscando:"}>
                                    <div className="p-2">
                                        <h4 className=" text-lg text-amareloOcre font-bold">{decideEmoji(compatibleUsers[ID]?.intention)}</h4>
                                    </div>
                                </WrapperDiv >
                            </div>
                            
                            {/* Ações permanentes */}
                            <div className="bg-cinzaBlack text-white/80 text-xs">
                                <button className="flex flex-col w-full justify-center items-center py-6 cursor-pointer hover:text-amareloPalido transition-all border-y-2 border-cinzaWhite">
                                    <h5>Bloquear usúario</h5>
                                    <p>Você não vera mais esse usúario</p>
                                </button>
                            </div>
                        </main>
                    </div>
            }
        </motion.div>
    )
}