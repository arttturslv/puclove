import React from 'react';
import { useState } from 'react';

function Interesses({closeModal, setPlaceholder, opcoes }) {

    const [interesses, setInteresses ] = useState('');

    function handleCheckboxChange(event) {
        const interesseSelecionado = event.target.value;
    
        // Função para atualizar o estado de interesses
        const updateInteresses = (prevInteresses) => {
            if (event.target.checked) {
                // Se marcada, adicione o interesse à string de interesses
                return prevInteresses + (prevInteresses ? ', ' : '') + interesseSelecionado;
            } else {
                // Se desmarcada, remova o interesse da string de interesses
                return prevInteresses
                    .split(', ')
                    .filter((interesse) => interesse !== interesseSelecionado)
                    .join(', ');
            }
        };
    
        // Atualize o estado de interesses usando a função updateInteresses
        setInteresses((prevInteresses) => updateInteresses(prevInteresses));
    
        // Agora, você pode atualizar o placeholder após o estado ser atualizado
        // Usando o valor atualizado de interesses diretamente
        setPlaceholder(updateInteresses(interesses));
    }

    return (
        <div className='flex justify-center items-center overlay top-0 w-[100%] h-screen fixed z-[999] bg-[#0003] bg-opacity-90'>
            <div className='text-white shadow-md w-[95%] md:w-[50%] z-[1000] h-auto md:h-fit	 rounded-xl border-solid border-4 py-7 grid border-amareloOcre bg-cinzaBlack '>
                <div>
                    <h4 className='font-bold text-xl text-center'>Interesses</h4>
                    <p className='font-thin text-center'>Marque quantas opções quiser.</p>
                </div>
                <div className='font-normal columns-auto	 text-white flex w-[95%] pt-3 justify-evenly flex-wrap'>

                    {opcoes.map(({ interest, id }, index) => {
                        return (
                            <li className="list-none pl-5 py-[1%]" key={index}>
                                    <input
                                        type="checkbox"
                                        id={`custom-checkbox-${id}`}
                                        name={interest}
                                        value={interest}
                                        onChange={handleCheckboxChange}
                                    />
                                    <label className='pl-1' htmlFor={`custom-checkbox-${index}`}>{interest}</label>
                            </li>
                        );
                    })}
                </div>
                <button onClick={() => closeModal()} className='hover:text-amareloOcre font-bold pt-5 flex justify-self-center'>
                    Voltar
                </button>
            </div>
        </div>
    )
};

export default Interesses;
