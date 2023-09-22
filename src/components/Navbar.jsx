import React from 'react'
import menuOpen from '../assets/Icones/icon menuClose.svg'
import menuClose from '../assets/Icones/icon menuOpen.svg'
import { useState } from 'react'
import { Link, ScrollLink } from 'react-scroll'
const Navbar = () => {

    let [isOpen, setisOpen] = useState(false)

    let Links = [
        { name: "Sobre", link: "sobre" },
        { name: "Regras", link: "regras" },
        { name: "Privacidade", link: "privacidade" },

    ]

    return (
        <div className='w-full bg-vermelhoSanguino md:bg-transparent z-20'>
            <div className=' max-w-7xl md:flex items-center justify-start py-4 md:px-10 px-7'>

                <div className='z-20 text-2x1 cursor-pointer flex m-0 items-center gap-2 text-amareloOcre'>
                    <img className=' m-0 w-7 h-7 ' src="../src/assets/logo redonda-svg.svg" alt="Uma logo formada por duas mãos formando um coração;" />
                    <span className=' m-0   font-extrabold'>PucLove</span>
                </div>

                <div onClick={() => setisOpen(!isOpen)} className="w-7 h-7 absolute right-8 top-4 cursor-pointer md:hidden ">
                    {
                        isOpen ?
                            <img className='w-7 h-7 ' src={menuOpen} alt="Uma logo formada por duas mãos formando um coração;" />
                            :
                            <img className='w-7 h-7 ' src={menuClose} alt="Uma logo formada por duas mãos formando um coração;" />
                    }
                </div>

                <ul className={`z-1  bg-vermelhoSanguino md:pl-8 text-amareloOcre md:bg-transparent md:flex md:items-center md:pb-0 absolute md:static md:z-auto  pb-6 left-0 w-full  mt-4 md:mt-0 pl-9 transition-all duration-500 ease-in-out ${isOpen ? 'top-10' : 'top-[-490px]'} `}>
   
                    <li className='pb-2 md:pb-0'>
                        <Link to={"sobre"} activeClass='active' smooth={true}
                            spy={true} className=' hover:text-white cursor-pointer md:px-5 font-semibold transition-all duration-500  hover:text-primary  '
                        >Sobre
                        </Link>
                    </li>
                    <li className='pb-2 md:pb-0'>
                        <Link to={"regras"} activeClass='active' smooth={true}
                            spy={true} className='  hover:text-white cursor-pointer md:px-5 font-semibold transition-all duration-500  hover:text-primary  '
                        >Regras
                        </Link>
                    </li>
                    <li className='pb-2 md:pb-0'>
                        <Link to={"politica"} activeClass='active' smooth={true}
                            spy={true} className='  hover:text-white cursor-pointer md:px-5 font-semibold transition-all duration-500  hover:text-primary  '
                        >Politica
                        </Link>
                    </li>
                    
                    <li className='md:grow'>
                    </li>


                    <div className=' text-amareloOcre md:text-black ml-0'>
                        <button className='btn font-semibold  hover:md:text-amareloOcre hover:text-black bg-amareloOcre text-vermelhoSanguino md:text-black md:bg-white rounded-full px-3 py-1 md:static '>Login</button>
                        <button className='btn font-semibold  hover:text-white rounded-full px-3  md:static '>Cadastrar</button>
                    </div>

                </ul>

            </div>
        </div>
    );
}

export default Navbar;


/*

                 {
                        Links.map(link => <li className=' pb-2 md:pb-0' key={link.name}>
                            <Link
                                to={link.link}
                                activeClass='active'
                                smooth={true}
                                spy={true}
                                className=' text-yellow hover:text-white cursor-pointer md:px-5 font-semibold transition-all duration-500  hover:text-primary  '
                            >{link.name}</Link>
                        </li>)
                    }





        <div className='shadow-md w-full fixed top-0 left-0'>
            <div className='md:px-10 py-4 px-7 md:flex justify-end items-center bg-gray'>

                <div className='flex md:w-1/6 text-xl cursor-pointer  gap-2 text-yellow z-10'>
                    <img className='w-7 h-7 ' src="../src/assets/logo redonda-svg.svg" alt="Uma logo formada por duas mãos formando um coração;" />
                    <span className='font-extrabold'>PucLove</span>
                </div>

                <div onClick={() => setisOpen(!isOpen)} className="w-7 h-7 absolute right-8 top-4 cursor-pointer md:hidden ">
                    {
                        isOpen ?
                            <img className='w-7 h-7 ' src={menuOpen} alt="Uma logo formada por duas mãos formando um coração;" />
                            :
                            <img className='w-7 h-7 ' src={menuClose} alt="Uma logo formada por duas mãos formando um coração;" />
                    }
                </div>
                    
                <ul className={`md:w-5/6 md:flex  md:static md:pl-0 md:pb-0 md:z-auto pb-12 pl-9 absolute z-[-1] left-0 w-full transition-all bg-gray duration-500 ease-in ${isOpen ? 'top-12' : 'top-[-490px]'} `}>
                    {
                        Links.map(link => <li key={link.name}>
                            <Link 
                            to={link.link}
                            activeClass='active'
                            smooth={true}
                            spy={true}
                            className=' text-yellow font-semibold transition-all duration-500 hover:text-primary'
                            >{link.name}</Link>
                        </li>)
                    }

                    <div className='md:flex md:self-end'>
                        <button className='btn font-semibold bg-white rounded-full px-3  md:static '>Login</button>
                        <button className='btn font-semibold text-black px-3  md:static '>Cadastrar</button>
                    </div>
                    
                </ul>

            </div>
        </div>
*/