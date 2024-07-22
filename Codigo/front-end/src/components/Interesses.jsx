import React, { useEffect } from 'react';
import { useState } from 'react';

function Interesses({closeModalInteresses, setPlaceholder, opcoes }) {


    const [newInteresses, setNewInteresses ] = useState('');

    function updateInteresses (event, prev, interesseSelecionado) {
        if (event && event.target && typeof event.target.checked !== 'undefined') {
            if (event.target.checked) {
                const ret = prev + (prev ? ', ' : '') + interesseSelecionado;
                return ret;
            } else {
                const ret = prev
                    .split(', ')
                    .filter((interesse) => interesse !== interesseSelecionado)
                    .join(', ');
                return ret;

            }
        }
    };

    function handleChanges(event) {
        if(event) {
            const interesseSelecionado = event.target.value;
            setNewInteresses((prev) => updateInteresses(event, prev, interesseSelecionado));
        }
    }
    
    useEffect(() => {
        setPlaceholder(newInteresses);
    }, [newInteresses])

    return (
        <div className='flex justify-center items-center overlay left-0 top-0 w-[100%] h-screen fixed z-[999] bg-[#0003] bg-opacity-90'>
            <div className='text-white shadow-md w-[95%] md:w-[50%] z-[1000] h-auto md:h-fit	 rounded-xl border-solid border-4 py-7 grid border-amareloOcre bg-cinzaBlack '>
                <div>
                    <h4 className='font-bold text-xl text-center'>Interesses</h4>
                    <p className='font-thin text-center'>Marque quantas opções quiser.</p>
                </div>
                <ul className='font-normal text-white w-full h-[250px] pt-3 gap-1 flex flex-wrap flex-col content-around align-center'>

                {opcoes.map(({ interest, id }, index) => {
                    return (
                        <li className="list-none pl-5 py-[1%]" key={index}>
                            <input
                                type="checkbox"
                                id={`custom-checkbox-${id}`}
                                name={interest}
                                value={interest}
                                onChange={handleChanges}
                            />
                            <label className='pl-1' htmlFor={`custom-checkbox-${index}`}>{interest}</label>
                        </li>
                    );
                })}
                </ul>
                <button disabled={newInteresses>0?true:false} className={[newInteresses.length>0?'hover:bg-amareloOcre hover:text-cinzaBlack font-bold mt-3 flex justify-self-center border border-white/60 py-2 px-6 rounded-lg': 'font-bold mt-3 text-white/60 flex justify-self-center border border-white/60 py-2 px-6 rounded-lg']}
                    onClick={() => closeModalInteresses()}> Voltar
                </button>
            </div>
        </div>
    )
};

export default Interesses;
