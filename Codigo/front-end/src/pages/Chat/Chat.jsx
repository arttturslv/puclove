import React, { useEffect, useRef, useState } from "react";

import WrapperDiv from "../Matches/components/WrapperDiv";
import voltarIcon from "../../assets/Icons/revert.svg";
import MatchPreview from "./MatchPreview";
import Bin from '../../assets/Icons/Bin.svg'
import Block from '../../assets/Icons/Block.svg'
import Send from '../../assets/Icons/Send.svg'

export default function Chat({ user, setIsChatShowing }) {
    const [chatPage, setChatPage] = useState("1"); // usado para verificar o processo de cadastro (0 = primeira parte | 1, segunda parte | 2 cadastro completo)

    if (chatPage == "1") {
        return (

            <section id="config" className="nobar overflow-y-scroll h-screen overflow-x-hidden relative md:m-0 mb-8 p-4 bg-cinzaBlack text-amareloOcre">
                <span className="flex justify-between">
                    <h3 className=" text-lg font-semibold" >Matches</h3>
                    <span onClick={() => setIsChatShowing((prev) => !prev)} className="flex gap-2 cursor-pointer justify-center items-center">
                        <img className="w-6" src={voltarIcon} alt="" />
                        <h3 className=" text-md " >Voltar</h3>
                    </span>
                </span>
                <WrapperDiv title="Novas pessoas:">
                    <div onClick={()=>setChatPage("2")} className="p-2 flex flex-wrap gap-4 justify-center">
                        <MatchPreview name={"Anna"} notificationQnt={4} image={"https://s2.glbimg.com/SBS8ODB8QCqQMCajdIq1zl4iaoU=/e.glbimg.com/og/ed/f/original/2017/03/27/emma.jpg"} />
                        <MatchPreview name={"Anna"} image={"https://segredosdomundo.r7.com/wp-content/uploads/2022/02/as-pessoas-mais-famosas-do-mundo-de-hoje-e-da-historia-5.jpg"} />
                        <MatchPreview name={"Anna"} image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYCgCVKaz_m2Npc6t0Dj2uKO-7LWDAEcW1eLRl_nJ7ayphW5a5gI528IkQLl1_Cknc4AY&usqp=CAU"} />
                        <MatchPreview name={"Anna"} notificationQnt={4} />
                        <MatchPreview name={"Anna"} />
                    </div>
                </WrapperDiv>
                <WrapperDiv title="Quem você já conversou:">
                    <div className="p-2 flex flex-wrap gap-4 justify-center">
                        <MatchPreview name={"Anna"} notificationQnt={4} />
                        <MatchPreview name={"Anna"} />
                    </div>
                </WrapperDiv>
            </section>
        )
    } else {
        return (

            <section id="config" className="nobar overflow-y-scroll h-screen overflow-x-hidden relative md:m-0 mb-8 p-4 bg-cinzaBlack text-amareloOcre">
                <span className="flex justify-between">
                    <h3 className=" text-lg font-semibold" >Artur Marcos</h3>
                    <span onClick={()=>setChatPage("1")} className="flex gap-2 cursor-pointer justify-center items-center">
                        <img className="w-6" src={voltarIcon} alt="" />
                        <h3 className=" text-md " >Voltar</h3>
                    </span>
                </span>
                <WrapperDiv title="Novas pessoas:">
                    <div className="py-2 px-4 h-[500px] flex flex-col gap-4 justify-center w-full">
                        <div className="flex w-full h-16  border-b py-2 border-cinzaBlack justify-around items-center">
                            <div className="flex gap-4 items-center">
                                <img className="rounded-full w-10" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYCgCVKaz_m2Npc6t0Dj2uKO-7LWDAEcW1eLRl_nJ7ayphW5a5gI528IkQLl1_Cknc4AY&usqp=CAU" alt="" />
                                <h4 className="font-bold">Artur Marcos</h4>
                            </div>
                            <div className="flex gap-2">
                                <img className="w-10" src={Block} alt="icone de bloquear" />
                                <img className="w-10" src={Bin} alt="icone de lixeira" />
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col gap-4 text-black">
                            <span className="bg-amareloOcre py-1 pl-6 px-4 rounded-e-2xl self-start rounded-ss-3xl max-w-[85%]">
                                <p className="break-all">Eae novinha, suave?</p>
                            </span>
                            <span className="bg-vermelhoSanguino py-1 px-4 rounded-s-2xl self-end pr-6 rounded-se-3xl max-w-[85%]">
                                <p className="break-all">
                                    Eae novinha, suave?
                                </p>
                            </span>

                        </div>
                        <div className="h-10 rounded-xl shadow-2inner p-2 w-full items-center flex text-amareloOcre ">
                            <input className="flex-1 bg-gray h-full text-left pl-2" type="submit" value="as" />
                            <button className="w-6">
                                <img src={Send} alt="" />
                            </button>
                        </div>
                    </div>
                </WrapperDiv>
            </section>
        )
    }

}