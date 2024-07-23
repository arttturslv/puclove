import chat from '../../../assets/Icons/chat.svg';
import settings from '../../../assets/Icons/settings.svg';
import myLikes from '../../../assets/Icons/my_likes.svg';

export default function Tab() {
    return (
        <>
            <div className="justify-center items-center h-20 py-4 md:flex hidden">
                <div className="grid grid-cols-3 items-center justify-items-center">
                    <img src={chat} alt="chat" className='w-[65%] hover:w-[70%] active:w-[62%] transition ease-in-out drop-shadow-2xl cursor-pointer' />
                    <img src={settings} alt="configurações" className='w-[65%] hover:w-[70%] active:w-[62%] transition ease-in-out drop-shadow-2xl cursor-pointer' />
                    <img src={myLikes} alt="minhas curtidas" className='w-[65%] animate-none hover:w-[70%] active:w-[62%] transition ease-in-out drop-shadow-2xl cursor-pointer' />
                </div>
            </div>
            <div id="footer" className="fixed bottom-0 h-8 z-40  md:hidden block bg-vermelhoSanguino w-screen">
                <div className="grid grid-cols-3 items-center justify-items-center">
                    <img src={chat} alt="chat" className='w-8 transition ease-in-out drop-shadow-2xl cursor-pointer' />
                    <img src={chat} alt="chat" className='w-8 transition ease-in-out drop-shadow-2xl cursor-pointer' />
                    <img src={chat} alt="chat" className='w-8 transition ease-in-out drop-shadow-2xl cursor-pointer' />
                </div>
            </div>
        </>
    )
}