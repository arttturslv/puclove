import React from 'react';

function Personagens ({nome, perfilURL, imgURL, gifURL, funcao, funcao1 }){
    return (
        <div onClick={()=> window.open(perfilURL)} className="cursor-zoom-in flex-col text-center">
        <div className='relative'>
            <img src={imgURL} alt={nome+", um estudante"} className='relative z-[90] transition-opacity md:hover:opacity-0'/>
            <img src={gifURL} alt={nome+", um estudante"} className='absolute z-[0] top-0'/>
        </div>
        <h5 className='font-semibold text-lg'>{nome}</h5>
        <p>{funcao}</p>
        <p>{funcao1}</p>

     </div>
    )
};

export default Personagens;

