import chat from '../../../assets/Icons/chat.svg';
import settings from '../../../assets/Icons/settings.svg';
import myLikes from '../../../assets/Icons/my_likes.svg';

export default function Tab({setIsSettingsShowing, setIsChatShowing}) {

    function abrirChat() {
        setIsSettingsShowing(false);
        setIsChatShowing((prev)=> !prev)
    }

    function abrirConfig() {
        setIsChatShowing(false);
        setIsSettingsShowing((prev)=> !prev)
    }

    return (
        <>
            <div className="h-20 py-4 md:flex hidden">
                <div className="grid grid-cols-3 items-center justify-items-center">
                    <img src={chat} alt="chat" className='w-[65%] hover:scale-105 hover:saturate-[1.4] active:w-[62%] duration-200 transition ease-in-out drop-shadow-2xl cursor-pointer' />
                    <img onClick={abrirConfig} src={settings} alt="configurações" className='w-[65%] hover:scale-105 hover:saturate-[1.4] active:w-[62%] duration-200 transition ease-in-out drop-shadow-2xl cursor-pointer' />
                    <img onClick={abrirChat} src={chat} alt="chat" className='w-[65%] hover:scale-105 hover:saturate-[1.4] active:w-[62%] duration-200 transition ease-in-out drop-shadow-2xl cursor-pointer' />
                </div>
            </div>
            <div id="footer" className="fixed bottom-0 h-14 flex justify-center items-center z-40  md:hidden shadow-2xl bg-vermelhoSanguino w-screen">
                <div className="flex justify-around w-full">
                    <img src={chat} alt="chat" className='w-8 duration-200 hover:scale-105 hover:saturate-[1.4] transition ease-in-out drop-shadow-2xl cursor-pointer' />
                    <img onClick={abrirConfig} src={settings} alt="configurações" className='w-8 hover:scale-105 hover:saturate-[1.4] duration-200 transition ease-in-out drop-shadow-2xl cursor-pointer' />
                    <img onClick={abrirChat}  src={chat} alt="chat" className='w-8 hover:scale-105 hover:saturate-[1.4] duration-200 transition ease-in-out drop-shadow-2xl cursor-pointer' />
                </div>
            </div>
        </>
    )
}