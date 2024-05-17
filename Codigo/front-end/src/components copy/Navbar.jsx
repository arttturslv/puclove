import React from 'react'
import { useState, useEffect } from 'react'
import { Link as LinkExternal } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

import menuOpen from '../assets/Icons/up_arrow.svg'
import menuClose from '../assets/Icons/close.svg'
import logo from '../assets/favicon.svg'


const Navbar = () => {
    const token = sessionStorage.getItem("authToken");
    const navigate = useNavigate();

    let [isOpen, setisOpen] = useState(false)
    const [counter, setCounter] = useState(3);
    const [statusLogout, setstatusLogout] = useState(false);


    const logout = () => {
        setstatusLogout(true);
      };
    
      useEffect(() => {

        if (statusLogout && counter > 0) {
            sessionStorage.removeItem("authToken");
            sessionStorage.removeItem("userData");
            sessionStorage.removeItem("matches");
          const interval = setInterval(() => {
            setCounter((prevCounter) => prevCounter - 1);
            console.log(counter);
          }, 1000);
          return () => clearInterval(interval);
        } else if (statusLogout && counter <= 0) {
            setstatusLogout(false);
            navigate("/")
        }
      }, [statusLogout, counter]);
    

    return (
        <div className='w-full m-0 my-auto mx-auto bg-vermelhoSanguino md:bg-transparent z-20'>
        
        {statusLogout && <Modal 
        
        text1={<h4 className='font-normal' >Deslogando do Puc<strong><font color="#AD5E5E">LOVE</font></strong>! </h4>}
        text2={<p  className='font-thin'>Nem saiu, mas já estou com saúdadess😥... Deslogando em {counter}</p>}
        txtBtn1="Tchau PucLove🖐"
        />}
            <div className=' m-0 my-auto mx-auto max-w-7xl md:flex items-center justify-start py-4 md:px-10 px-7'>

                <div  onClick={() => navigate("/")} className='z-20 text-2x1 cursor-pointer flex m-0 items-center gap-2 text-amareloOcre'>
                    <img className=' m-0 w-7 h-7 ' src={logo} alt="Uma logo formada por duas mãos formando um coração;" />
                    <span className=' m-0   hover:text-white transition-all duration-500  font-extrabold'>PucLove</span>
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
                        <LinkExternal to={"/privacidade"} 
                             className='  hover:text-white cursor-pointer md:px-5 font-semibold transition-all duration-500  hover:text-primary  '
                        >Politica
                        </LinkExternal>
                    </li>
                    
                    <li className='md:grow'>
                    </li>


                    <div className=' text-amareloOcre md:text-black ml-0'>
                        { token==null ? 
                            <div>
                            <button onClick={() => navigate("/login")} className='btn font-semibold transition-all duration-500   hover:md:text-amareloOcre hover:text-black bg-amareloOcre   hover:bg-vermelhoSanguino text-vermelhoSanguino md:text-black md:bg-white rounded-full px-3 py-1 md:static '> Login</button>
                            <button onClick={() => navigate("/cadastro")} className='btn font-semibold transition-all duration-500  hover:text-white rounded-full px-3  md:static '>Cadastrar</button>
                            </div>
                            :
                            <div>
                            <button onClick={() => navigate("/carregamento")} className='btn font-semibold transition-all duration-500  hover:md:text-amareloOcre hover:text-black bg-amareloOcre  hover:bg-vermelhoSanguino text-vermelhoSanguino md:text-vermelhoSanguino md:bg-white rounded-full px-3 py-1 md:static '>Match</button>
                            <button onClick={logout} className='btn font-semibold  hover:text-white rounded-full px-3 transition-all duration-500  md:static '>Logout</button>
                            </div>
                            }
                    </div>

                </ul>

            </div>
        </div>
    );
}

export default Navbar;

