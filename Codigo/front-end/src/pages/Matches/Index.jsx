import { useEffect, useState, useReducer } from "react"
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';

import { useMatchData } from "../../hooks/useMatchData";
import { decideEmoji, getInterests } from "../../hooks/useCustom";

import ErrorNotification from '../../components/ErrorNotification';

import Slider from "./components/Slider";
import Song from "../../components/Song";
import WrapperDiv from "./components/WrapperDiv";

import ShowInteresses from "./components/ShowInteresses";
import Tab from "./components/Tab";
import UserBasicInfo from "./components/UserBasicInfo";
import ButtonMatchOptions from "./components/ButtonMatchOptions";

import Chat from "../Chat/Chat";
import Configuration from "../Configuração/Configuration";
import MatchesSkeleton from "./Skeleton";

import audioInteraction from '../../assets/sounds/pickupCoin.wav'
import audioSwipe from '../../assets/sounds/swipe.mp3'

export default function MatchesNew() {
    const match = new Audio(audioInteraction)
    const swipe = new Audio(audioSwipe)

    /** Error handling */
    const [error, setError] = useState(null);

    /** Current user data */
    const [user, _user] = useState(JSON.parse(localStorage.getItem("currentUser")).user);
    const [accessToken, _accessToken] = useState(JSON.parse(localStorage.getItem("currentUser")).token);
    const [currentUserInterests, _setInterests] = useState(getInterests());

    /** Possible compatible users data */
    const [compatibleUsers, setCompatibleUsers] = useState(JSON.parse(null));

    /** States */
    const [interactionType, setInteractionType] = useState(null);
    const [isSettingsShowing, setIsSettingsShowing] = useState(false)
    const [isChatShowing, setIsChatShowing] = useState(false)

    /** TEMPORARY STATES - songs comes from user state */
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

    /** Animations */
    const userInteraction = useAnimationControls()
    const swiping = useAnimationControls()
    const handsControl = useAnimationControls()
    const itsMatchTextControl = useAnimationControls()
    const itsMatch = useAnimationControls()

    /** 
     * Animate an element (💗 || ❌) with scale & opacity */
    async function animationUserInteraction(animationType) {
        userInteraction.stop();
        await userInteraction.start(
            {
                opacity: [0, 100, 0],
                scale: [1.2, 0.2, 0.8],
                transition: { duration: 0.6 }
            })
        animationType();
    }

    async function animationItsMatch() {
        await itsMatch.start(
            {
                zIndex: [-100,100],
                width: [1000,100]
            }
        )

        await handsControl.start(
            {
                width: [9000, 400],
                transition: { duration: 1 },
                opacity: [0, 100],
                transition: { duration: 0.6 },
            }
        )
        itsMatchTextControl.start({
            opacity: [0, 1],
            scale: [50,2.5],
            transition: {duration: 0.3}
        })

    }

    /**
    * Animate the Slide component in three directions (left, right, up).
    * @param {String} direction 
    */
    function animationSwipping(direction) {
        swipe.play()

        switch (direction) {
            case "left":
                swiping.stop();
                swiping.start(
                    {
                        rotate: [0, -15, 0],
                        x: [0, -800, 0],
                        y: [0, 300, 0],
                        opacity: [1, 0, 1],
                        transition: { duration: 0.8 }
                    }
                )
                break;
            case "right":
                swiping.stop();
                swiping.start(
                    {
                        rotate: [0, 15, 0],
                        x: [0, 800, 0],
                        y: [0, -300, 0],
                        opacity: [1, 0, 1],
                        transition: { duration: 0.8 }
                    }
                )
                break;
            case "up":
                swiping.stop();
                swiping.start(
                    {
                        rotate: [-15, 0],
                        x: [-800, 0],
                        y: [300, 0],
                        opacity: [0, 1],
                        transition: { duration: 0.4 }
                    }
                )
                break;
            default:
                break;
        }
    }
    const [compatibles, dispatch] = useReducer(reducer, { index: 0 });

    function reducer(state, action) {
        let compatiblesLength = compatibleUsers.length;
        let val = 0;
        switch (action.type) {
            case "LIKE":
                val = (state.index + 1) % compatiblesLength;
                console.log(val);
                return { index: val };
            case "DISLIKE":
                val = (state.index + 1) % compatiblesLength;
                console.log(val);
                return { index: val };
            case "GOBACK":
                val = state.index - 1;
                if(val<0) 
                    return {index: 0}
                return {index: val}
            default:
                return state;
        }
      }

console.log("comp index" ,compatibles.index)
    /** Users interactions */
    async function liking() {
        //Curte a pessoa usando o linkingUser  e verifica match
        //passa pra proxima pessoa (ciclico)
        //Caso match - animacao match - tira essa pessoa do localstorage e adiciona nos "matches"
        //Caso like - animacao like
        setInteractionType("Like");
        match.play()

        await animationUserInteraction(() => animationSwipping("right"));

        dispatch({type: "LIKE"})
    }

    async function disliking() {
        setInteractionType("Dislike")
        match.play()

        await animationUserInteraction(() => animationSwipping("left"));

        dispatch({type: "DISLIKE"})
    }

    async function goingBack() {
        setInteractionType("Goback")
        match.play()

        await animationItsMatch();

        dispatch({type: "GOBACK"})
        //animationSwipping("up")

    }



    useEffect(() => {

        /*      //ao iniciar, verifica matches || mensagens.
            Antes verificava no localStorage (undefined), mas faltava verificações como length
            (ao retirar do localStorage) e principalmente não atualizava as informações.
        */
        console.log("Buscando por usuários compativeis.")
        const fetchCompatibleUsers = async () => {
            try {
                const response = await useMatchData(accessToken);
                localStorage.setItem("compatibleUsers", JSON.stringify(response.data));
                setCompatibleUsers(response.data);
            } catch (error) {
                setError(error)
                console.log("Deu erro: ", error)
                /* Só ta assim pq deu erro na requisicao  */
                setCompatibleUsers(JSON.parse(localStorage.getItem("compatibleUsers")))
            }
        };
        fetchCompatibleUsers();
    }, []);

    function showRandonFacts() {
        const random = Math.floor(Math.random() * 5);
        switch (random) {
            case 0:
                return (
                    <WrapperDiv title={"Meus gostos:"}>
                        <div className="p-2">
                            <ShowInteresses interests={compatibleUsers[compatibles.index]?.interests} interestsList={currentUserInterests}></ShowInteresses>
                        </div>
                    </WrapperDiv>
                )
            case 1:
                return (
                    <WrapperDiv title={"Estou buscando:"}>
                        <div className="p-2">
                            <h4 className=" text-lg text-amareloOcre font-bold">{decideEmoji(compatibleUsers[compatibles.index]?.intention)}</h4>
                        </div>
                    </WrapperDiv >
                )
            case 2:
                return (
                    <WrapperDiv title={"Minha música favorita:"}>
                        <Song musica={musica}></Song>
                    </WrapperDiv>
                )
            default:
                break;
        }
    }

    return (
        <motion.div
            id="pagMatch" className="w-full overflow-x-hidden flex flex-col h-screen bg-gradient-to-b from-amareloOcre to-vermelhoSanguino ">

            {error != null &&
                <ErrorNotification
                    error={error}
                    setError={setError}
                    timer={40}
                />
            }

            {
                compatibleUsers == null ?
                    <MatchesSkeleton /> :

                    <motion.div layout
                        transition={{
                            layout: { duration: 0.3 }
                        }}
                        className="nobar overflow justify-center flex flex-row">

                        <div className="nobar md:px-28 h-screen">
                            <div className="flex justify-center items-center flex-col transition-all duration-200">
                                <Tab setIsSettingsShowing={setIsSettingsShowing} setIsChatShowing={setIsChatShowing} />

                                <main id="main" className="sm:w-[400px] w-full relative md:m-0 mb-8 transition-all duration-200">
                                    {/* Fotos e informações básicas */}
                                    <div className="h-[750px] relative flex justify-center ">
                                        <Slider handsControl={handsControl} itsMatchTextControl={itsMatchTextControl} swiping={swiping} images={compatibleUsers[compatibles.index]?.image} userInteraction={userInteraction} interactionType={interactionType} />

                                        <motion.div animate={swiping} className="absolute bottom-2 space-y-2 text-white w-[380px] px-3">
                                            <UserBasicInfo compatibleUser={compatibleUsers[compatibles.index]} />

                                            {showRandonFacts()}

                                            <ButtonMatchOptions liking={liking} disliking={disliking} goingBack={goingBack} />
                                        </motion.div>
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
                                            <div className="p-2">
                                                <ShowInteresses interests={compatibleUsers[compatibles.index]?.interests} interestsList={currentUserInterests}></ShowInteresses>
                                            </div>
                                        </WrapperDiv>

                                        <WrapperDiv title={"Minhas redes sociais:"}>
                                            <div className="p-2 text-white flex gap-2  flex-col">
                                                <div className="flex gap-2 items-center cursor-pointer hover:text-vermelhoSanguino ">
                                                    <img className="w-4 h-4" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png" alt="icone instagram" />
                                                    <p className="text-sm "><strong>@artur.pine</strong>{compatibleUsers[compatibles.index]?.instagram}</p>
                                                </div>
                                            </div>
                                        </WrapperDiv>

                                        <WrapperDiv title={"Estou buscando:"}>
                                            <div className="p-2">
                                                <h4 className=" text-lg text-amareloOcre font-bold">{decideEmoji(compatibleUsers[compatibles.index]?.intention)}</h4>
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
                        </div>

                        <AnimatePresence>
                            {
                                isSettingsShowing &&
                                <motion.div
                                    className="w-full max-md:absolute"
                                    key="config"
                                    initial={{ x: "+100%", scale: "0" }}
                                    transition={{ type: "just" }}
                                    animate={{ x: "-0%", scale: "100%" }}
                                    exit={{ x: "+100%", scale: "0" }}
                                >
                                    <Configuration user={user} setIsSettingsShowing={setIsSettingsShowing} />
                                </motion.div>
                            }
                        </AnimatePresence>

                        <AnimatePresence>
                            {
                                isChatShowing &&
                                <motion.div
                                    className="w-full max-md:absolute"
                                    key="config"
                                    transition={{ type: "just" }}
                                    initial={{ x: "+100%", scale: "0" }}
                                    animate={{ x: "-0%", scale: "100%" }}
                                    exit={{ x: "+100%", scale: "0" }}
                                >
                                    <Chat setIsChatShowing={setIsChatShowing} />
                                </motion.div>
                            }
                        </AnimatePresence>
                    </motion.div>
            }
        </motion.div>
    )
}