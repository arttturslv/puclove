import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';

import Like from '../../../assets/Icons/Liked.svg';
import Close from '../../../assets/Icons/Close.svg';
import rightHand from '../../../assets/rightHand.svg'

function Slider({ swiping, images, userInteraction, interactionType, handsControl, itsMatchTextControl }) {

    if (images == undefined) {
        images = [0];
    }

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const ifFirstSlide = currentIndex === 0;
        const newIndex = ifFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }
    const nextSlide = () => {
        const ifLastSlide = currentIndex === images.length - 1;
        const newIndex = ifLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);

    }

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    }

    function formataURL() {
        if (images[0] == 0) {
            return "https://i.pinimg.com/736x/97/88/6f/97886f375f819b1cf3f96ffbcec21c0e.jpg"
        }

        if (currentIndex >= images.length) {
            setCurrentIndex(0);
        } else {
            let url = images[currentIndex].imagePath;
            let newURL = url.split('images');
            newURL = "src/assets/images\\" + newURL[1];
            return (newURL)
        }
    }

    return (
        <motion.div
            animate={swiping}
            className='h-[750px] w-full m-auto py-1 group absolute'>
            <div style={{ backgroundImage: `url(${formataURL()})` }} className='w-full h-full justify-center flex md:rounded-2xl rounded-none  bg-center bg-cover'>
                {/*dots index*/}
                <div className='flex justify-center py-3 w-[90%]'>
                    {
                        images == undefined ?

                            <div
                                key={slideIndex}

                                className='cursor-pointer pl-[10%] pr-[10%]'
                            >
                                <div className={`w-[3em] id=${slideIndex} p h-[4px] rounded-sm bg-vermelhoSanguino shadow-lg`}></div>
                            </div>
                            :
                            images.map((slide, slideIndex) => (
                                <div
                                    key={slideIndex}
                                    onClick={() => goToSlide(slideIndex)}
                                    className='cursor-pointer pl-[10%] pr-[10%]'
                                >
                                    <div className={`w-[3em] id=${slideIndex} p h-[4px] rounded-sm bg-vermelhoSanguino shadow-lg `}></div>
                                </div>
                            ))}
                </div>
            </div>
            <div className='w-full h-[60%] flex justify-center absolute bottom-0 bg-gradient-to-t from-black'>
                <motion.div
                    animate={userInteraction}
                    className="w-[50%] opacity-0 z-50 absolute">
                    <img className="w-full" src={interactionType == "Like" ? Like : Close} alt="interaction icon" />
                </motion.div>
                <div className="absolute -top-64 flex justify-center items-center h-[600px] w-full">
                    <motion.div animate={handsControl} className="absolute w-[100vw] h-full opacity-0 flex ">
                        <div className="w-full">
                            <img className="w-full transform -scale-x-100" src={rightHand} alt="" />
                        </div>
                        <div className="w-full">
                            <img className="w-full " src={rightHand} alt="" />
                        </div>
                    </motion.div>
                    <motion.h5 animate={itsMatchTextControl} className="font-black opacity-0 text-amareloOcre absolute">
                        IT'S A MATCH
                    </motion.h5>
                </div>
            </div>

            {/*botao esquerda*/}
            <div onClick={prevSlide} className=' hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-8 text-2xl cursor-pointer py-32 pr-20'>
                <svg width="10" height="28" viewBox="0 0 25 70" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.815 2C18.4029 10.8242 11.4542 23.3676 3.27172 29.1434C-3.55809 33.9645 19.2355 62.0635 21.5935 67.9586" stroke="#FAEFEC" strokeWidth="4" strokeLinecap="round" /></svg>
            </div>
            {/*botao direita*/}
            <div onClick={nextSlide} className=' hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-8 text-2xl cursor-pointer py-32 pl-20'>
                <svg width="10" height="28" viewBox="0 0 25 70" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00043 2C6.41252 10.8242 13.3612 23.3676 21.5437 29.1434C28.3735 33.9645 5.57991 62.0635 3.22188 67.9586" stroke="#FAEFEC" strokeWidth="4" strokeLinecap="round" /></svg>
            </div>
        </motion.div>
    )
};

export default Slider;
