import React from 'react'
import menuOpen from '../assets/Icones/icon menuClose.svg'
import menuClose from '../assets/Icones/icon menuOpen.svg'
import { useState } from 'react'
import { Link as LinkExternal } from 'react-router-dom'
import { Link } from 'react-scroll'
import { useNavigate } from "react-router-dom";


const Navbar = () => {
    const token = localStorage.getItem("authToken");

    let [isOpen, setisOpen] = useState(false)



    console.log(token);

    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem("authToken");
        alert("Saindo da conta.")
        location.reload();
    }

    return (
        <div className='w-full m-0 my-auto mx-auto bg-vermelhoSanguino md:bg-transparent z-20'>
            <div className=' m-0 my-auto mx-auto max-w-7xl md:flex items-center justify-start py-4 md:px-10 px-7'>

                <div  onClick={() => navigate("/")} className='z-20 text-2x1 cursor-pointer flex m-0 items-center gap-2 text-amareloOcre'>
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
   
                    <li className='pb-2 md:pb-0 hover:text-white cursor-pointer md:px-5 font-semibold transition-all duration-500  hover:text-primary  '   onClick={() => navigate("/#sobre")}>
                    Sobre
                    </li>
                    <li className='pb-2 md:pb-0 hover:text-white cursor-pointer md:px-5 font-semibold transition-all duration-500  hover:text-primary  '    onClick={() => navigate("/#regras")}>
                    Regras
                    </li>
                    <li className='pb-2 md:pb-0'>
                        <LinkExternal to={"/politica-privacidade"} 
                             className='  hover:text-white cursor-pointer md:px-5 font-semibold transition-all duration-500  hover:text-primary  '
                        >Politica
                        </LinkExternal>
                    </li>
                    
                    <li className='md:grow'>
                    </li>


                    <div className=' text-amareloOcre md:text-black ml-0'>
                        { token==null ? 
                            <div>
                            <button onClick={() => navigate("/login")} className='btn font-semibold  hover:md:text-amareloOcre hover:text-black bg-amareloOcre text-vermelhoSanguino md:text-black md:bg-white rounded-full px-3 py-1 md:static '>Login</button>
                            <button onClick={() => navigate("/cadastro")} className='btn font-semibold  hover:text-white rounded-full px-3  md:static '>Cadastrar</button>
                            </div>
                            :
                            <div>
                            <button onClick={() => navigate("/matches")} className='btn font-semibold  hover:md:text-amareloOcre hover:text-black bg-amareloOcre text-vermelhoSanguino md:text-vermelhoSanguino md:bg-white rounded-full px-3 py-1 md:static '>Match</button>
                            <button onClick={logout} className='btn font-semibold  hover:text-white rounded-full px-3  md:static '>Logout</button>
                            </div>
                            }
                    </div>

                </ul>

            </div>
        </div>
    );
}

export default Navbar;

