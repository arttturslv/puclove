import React from 'react';
import { useNavigate } from "react-router-dom";

function Modal ( { closeModal, text1, text2, txtBtn1, link1 } ){
    const navigate = useNavigate();

    return (
        <div className='flex justify-center items-center overlay top-0 w-[100%] h-screen fixed z-[999] bg-[#0003] bg-opacity-90'>
            <div className='text-white shadow-md translate-y-1/4 max-w- md:w-[50%] w-[80%] z-[10000] rounded-xl border-solid border-4 p-7 border-amareloOcre bg-cinzaBlack '>
                <div>
                    {text1}
                    {text2}
                </div>
                <div className='font-normal text-black flex w-full pt-3 justify-evenly		 '>
                    <button onClick={() =>  navigate(link1)}  className='px-5 py-1 hover:scale-110 bg-amareloOcre rounded-xl '>{txtBtn1}</button>
                </div>
            </div>
        </div>
    )
};

export default Modal;

/*
    importe o componente modal e o import {useState} from "react";

    Para usar crie uma  const [openModal, setOpenModal] = useState(true) tipo assim:
    
    const Home = () => {
        const [openModal, setOpenModal] = useState(true);

    return (...
    
    e use   {openModal && <Modal closeModal={() => setOpenModal(false)}/>}
    para verificar se o modal ta aberto e então, passar false como props para fechar

    caso for usar com muitas props

        {openModal && <Modal closeModal={() => setOpenModal(false)} 
                text1={<h4 className='font-normal' >Você deseja <font color="red">bloquear</font> o usuário {"Guilherme Braga"}?</h4>}
                text2="Não é possível reverter."
                emoji="😲"
        />}

*/