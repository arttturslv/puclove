import { useState, useEffect } from 'react';
import close from '../assets/Icons/close.svg'
export default function ErrorNotification ({displayNotification, errorType, timer}) {

    var message;
    const [progressTimer, setProgressTimer] = useState(0);

    if(errorType == "server") {
        message = "Não estamos conseguindo entrar em contato com o servidor, tente mais tarde.";
    } else if (errorType == "cadastro") {
        message = "Erro durante o cadastro, tente novamente.";
    } else {
        message = "Erro inesperado! Por favor espere um momento e tente novamente."
    }

    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setCounter((prevCounter) => prevCounter + 1);
        }, timer);

        // Limpa o timeout quando o contador atingir ou exceder 100
        if (counter >= 100) {
            clearTimeout(timeoutId);
            displayNotification(false);

        }

        // Limpa o timeout quando o componente é desmontado
        return () => clearTimeout(timeoutId);
    }, [counter]);
 

   return (
    <div className="absolute rounded-lg bottom-[2vw] max-sm:right-0 right-4 max-w-[700px] max-sm:w-full w-[60vw] py-4 bg-[#AD5E5E] opacity-95 block drop-shadow-lg z-10">
        <div className='gap-4 flex p-2 '>
            <div className="flex items-center">
                <img className='w-14' src={close} alt="icone da notificacao"/>
            </div>
            <div className="flex flex-col flex-wrap justify-center text-[#fff]">
                <h5 className='font-extrabold max-sm:text-md text-lg'>Erro!</h5>
                <p className='font-extralight max-sm:text-sm'>{message}</p>
            </div>
        </div>
        
        <div class="w-full absolute bottom-0 h-1 bg-[#E2C09B] ">
            <div class="bg-[#573434] h-1" style={{ width: `${counter}%`}}></div>
        </div>
    </div>
   )
}