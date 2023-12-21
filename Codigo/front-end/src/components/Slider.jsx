import React from 'react';
import { useState } from 'react';

function Slider(props) {
    const slides = props.image;

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const ifFirstSlide = currentIndex === 0;
        const newIndex = ifFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }
    const nextSlide = () => {
        const ifLastSlide = currentIndex === slides.length - 1;
        const newIndex = ifLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);

    }

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    }
    
    function formataURL() {
        if(currentIndex>=slides.length) {
            setCurrentIndex(0);
        } else {
            let url = slides[currentIndex].imagePath;
            let newURL = url.split('images');
            newURL = "src/assets/images\\"+newURL[1];
            return (newURL)
        }
    }

    return (
        <div 
        className='h-[750px] w-full m-auto py-1 relative group'>
            <div  style={{backgroundImage: `url(${formataURL()})`}}  className='w-full h-full justify-center flex rounded-2xl bg-center bg-cover '>
                {/*dots index*/}
                <div className='flex justify-center py-3 w-[90%]'>
                    {slides.map((slide, slideIndex) => (
                        <div 
                        key={slideIndex} 
                        onClick={() => goToSlide(slideIndex)} 
                        className='cursor-pointer pl-[10%] pr-[10%]'
                        >
                            <div className={`w-[3em] id=${slideIndex} p h-[4px] rounded-sm bg-amareloPalido shadow-lg`}></div>
                        </div>
                    ))}
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
        </div>
    )
};

export default Slider;
