import React from 'react';

function Modal ( { closeModal, matches, data} ){
    console.log("-------------------------")


    matches = Array.from(new Set(matches.map(JSON.stringify))).map(JSON.parse);

    function getNome(id) {
        for(let i=0; i<data.length; i++) {
            if(data[i].id == id) {
                return data[i].name;
            }
        };
    }

    function getNumber(id) {
        for(let i=0; i<data.length; i++) {
            if(data[i].id == id) {
                if(data[i].phoneNumber != null) {
                    return data[i].phoneNumber;
                } else {
                    return " Sem número cadastrado."
                }
            }
        };
    }
    

    return (
        <div className='flex justify-center items-center overlay top-0 w-[100%] h-screen fixed z-[999] bg-[#0003] bg-opacity-90'>
            <div className='text-white shadow-md translate-y-1/4 max-w- md:w-[50%] w-[80%] z-[10000] rounded-xl border-solid border-4 p-7 border-amareloOcre bg-cinzaBlack '>
                {matches.map(u => (
                        <div key={u.otherUserId} onClick={()=> window.open(`https://api.whatsapp.com/send?phone=${(getNumber(u.otherUserId))}}`)} className='py-5 bg-amareloOcre text-black text-center rounded-xl'>
                            {(getNome(u.otherUserId))} -   

                             { ( getNumber( u.otherUserId ))}
                        </div>
                ))
                    }
                <div className='font-normal text-black flex w-full pt-3 justify-evenly		 '>
                    <button onClick={() =>  closeModal()}  className='px-5 py-1 hover:scale-110 bg-cinzaWhite text-white hover:scale-1 rounded-xl '>voltar</button>
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