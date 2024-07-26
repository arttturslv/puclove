import liked from '../../../assets/Icons/liked.svg';
import reload from '../../../assets/Icons/reload.svg';
import close from '../../../assets/Icons/close.svg';

export default function ButtonMatchOptions({liking, disliking, goingBack}) {
    return (
        <div id='Choices' className="h-20 z-0 w-full relative flex justify-center ">
            <div className="grid grid-cols-3">
                <img onClick={()=> goingBack()} src={reload} alt="voltar" className='w-[80%] m-auto hover:scale-105 hover:saturate-[1.4] cursor-pointer transition ease-in-out active:w-[70%]' />
                <img onClick={()=> disliking()} src={close} alt="negar" className='w-[80%] m-auto hover:scale-105 hover:saturate-[1.4] cursor-pointer transition ease-in-out active:w-[70%]' />
                <img onClick={()=> liking()} src={liked} alt="curtir" className='w-[80%] m-auto hover:scale-105 hover:saturate-[1.4] cursor-pointer transition ease-in-out active:w-[70%]' />
            </div>
        </div>
    )
}