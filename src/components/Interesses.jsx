import React from 'react';
import { useState } from 'react';

function Interesses({closeModal, setPlaceholder }) {

    const exemplos = [
        { name: "Series e filmes" },
        { name: "Musculação" },
        { name: "Pintura" },
        { name: "Moda" },
        { name: "Atividades ao ar livre" },
        { name: "Volei" },
        { name: "Meditação" },
        { name: "Culinária" },
        { name: "Arte e cultura" },
        { name: "Basquete" },
        { name: "Museus" },
        { name: "Artes Marciais" },
        { name: "Musica nacional" },
        { name: "Futebol" },
        { name: "Teatro" },
        { name: "Leitura" },
        { name: "Viagens e aventuras" },
        { name: "Literatura" },
        { name: "Politica" },
        { name: "Urbanismo" },
        { name: "Estudos" },
        { name: "Festas e baladas" },
        { name: "Stand-up" },
        { name: "Veganismo" },
        { name: "Hobbies" },
        { name: "Tecnologia" },
        { name: "Astrologia e signos" },
        { name: "Vegetarianismo" },
        { name: "Animais de estimação" },
        { name: "Esportes" },
        { name: "Botânica" },
        { name: "Trabalho voluntário" },
        { name: "Astronomia" },
        { name: "Astrologia" },
        { name: "Vinho" },
        { name: "Alcool" },
        { name: "Programação" },
        { name: "Espiritualidade" },
        { name: "Música" },
        { name: "Drogas" }
    ];


    const [interesses, setInteresses] = useState('');


    function handleCheckboxChange(event) {
        const interesseSelecionado = event.target.value;

        // Verifique se a checkbox foi marcada ou desmarcada
        if (event.target.checked) {
            // Se marcada, adicione o interesse à string de interesses
            setInteresses((prevInteresses) =>
                prevInteresses + (prevInteresses ? ', ' : '') + interesseSelecionado
            );
        } else {
            // Se desmarcada, remova o interesse da string de interesses
            setInteresses((prevInteresses) =>
                prevInteresses
                    .split(', ')
                    .filter((interesse) => interesse !== interesseSelecionado)
                    .join(', ')
            );
        }
        setPlaceholder(interesses);
    }

    return (
        <div className='flex justify-center items-center overlay top-0 w-[100%] h-screen fixed z-[999] bg-[#0003] bg-opacity-90'>
            <div className='text-white shadow-md w-[50%] z-[1000] rounded-xl border-solid border-4 py-7 grid border-amareloOcre bg-cinzaBlack '>
                <div>
                    <h4 className='font-bold text-xl text-center'>Interesses</h4>
                    <p className='font-thin text-center'>Marque quantas opções quiser.</p>
                </div>
                <div className='font-normal text-white flex w-4/5 pt-3 justify-evenly flex-wrap'>
                    {exemplos.map(({ name }, index) => {
                        return (
                            <li className="list-none pl-5" key={index}>
                                    <input
                                        type="checkbox"
                                        id={`custom-checkbox-${index}`}
                                        name={name}
                                        value={name}
                                        onChange={handleCheckboxChange}
                                    />
                                    <label className='pl-1' htmlFor={`custom-checkbox-${index}`}>{name}</label>
                            </li>
                        );
                    })}
                </div>
                <button onClick={() => closeModal()} className='font-bold pt-5 flex justify-self-center'>
                    Voltar
                </button>
            </div>
        </div>
    )
};

export default Interesses;
