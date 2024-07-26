import React from 'react'
import { useState, useEffect } from 'react'
import { Link as LinkExternal } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

import upArrow from '../assets/Icons/up_arrow.svg'
import menu from '../assets/Icons/menu.svg'
import logo from '../assets/favicon.svg'


export default function Navbar() {
    const navigate = useNavigate();
    const [showLogoutMessage, setShowLogoutMessage] = useState(false);
    const [userLogged, setUserLogged] = useState(!!localStorage.getItem('currentUser'));
    const [showMenu, setShowMenu] = useState(false)

    function logout () {
        localStorage.removeItem("currentUser");
        setShowLogoutMessage(true);

        setTimeout(()=> {
            setShowLogoutMessage(false);
            setUserLogged(false);
            navigate("/");
        }, 2000);
    };

    return (
        <div className='w-full m-0 my-auto mx-auto bg-vermelhoSanguino md:bg-transparent z-20'>
            {showLogoutMessage && 
                <Modal 
                    text1={<h4 className='font-normal' >Deslogando do Puc<strong><font color="#AD5E5E">LOVE</font></strong>! </h4>}
                    text2={<p  className='font-thin'>Nem saiu, mas já estou com saúdadess😥...</p>}
                    txtBtn1="Tchau PucLove🖐"
                />
            }

            <div className=' m-0 my-auto mx-auto max-w-7xl md:flex items-center justify-start py-4 md:px-10 px-7'>
                <div  onClick={() => navigate("/")} className='z-80 text-2x1 cursor-pointer flex m-0 items-center gap-2 text-amareloOcre'>
                    <img className=' m-0 w-7 h-7 ' src={logo} alt="Uma logo formada por duas mãos formando um coração" />
                    <span className=' m-0   hover:text-white transition-all duration-500  font-extrabold'>PucLove</span>
                </div>

                <div onClick={() => setShowMenu(!showMenu)} className="w-7 h-7 absolute right-8 top-4 cursor-pointer md:hidden ">
                    {showMenu ?
                        <img className='w-7 h-7 ' src={upArrow} alt="Icone de menu navbar aberto" />
                        :
                        <img className='w-7 h-7 ' src={menu} alt="Icone de menu navbar fechado" />
                    }
                </div>

                <ul className={`z-1  bg-vermelhoSanguino md:pl-8 text-amareloOcre md:bg-transparent md:flex md:items-center md:pb-0 absolute md:static md:z-auto pb-6 left-0 w-full mt-4 md:mt-0 pl-9 transition-all duration-500 ease-in-out ${showMenu ? 'top-10' : 'top-[-490px]'} `}>
                    <li className='pb-2 md:pb-0 hover:text-white cursor-pointer md:px-5 font-semibold transition-all duration-500 hover:text-primary' 
                        onClick={() => navigate("/#sobre")}>Sobre</li>

                    <li className='pb-2 md:pb-0 hover:text-white cursor-pointer md:px-5 font-semibold transition-all duration-500 hover:text-primary' 
                        onClick={() => navigate("/#regras")}>Regras</li>

                    <li className='pb-2 md:pb-0 hover:text-white cursor-pointer md:px-5 font-semibold transition-all duration-500 hover:text-primary' 
                        onClick={()=> navigate("/privacidade")}>Politica</li>
                    <li className='md:grow'></li>

                    <div className=' text-amareloOcre md:text-black ml-0'>
                        { userLogged == false ? 
                            <div>
                                <button onClick={() => navigate("/login")} className='btn font-semibold transition-all duration-500 hover:md:text-amareloOcre hover:text-black bg-amareloOcre hover:bg-vermelhoSanguino text-vermelhoSanguino md:text-black md:bg-white rounded-full px-3 py-1 md:static '> Login</button>
                                <button onClick={() => navigate("/cadastro")} className='btn font-semibold transition-all duration-500 hover:text-white rounded-full px-3  md:static '>Cadastrar</button>
                            </div>
                            :
                            <div>
                                <button onClick={() => navigate("/matches")} className='btn font-semibold transition-all duration-500 hover:md:text-amareloOcre hover:text-black bg-amareloOcre hover:bg-vermelhoSanguino text-vermelhoSanguino md:text-vermelhoSanguino md:bg-white rounded-full px-3 py-1 md:static '>Match</button>
                                <button onClick={logout} className='btn font-semibold hover:text-white rounded-full px-3 transition-all duration-500  md:static '>Logout</button>
                            </div>
                        }
                    </div>
                </ul>
            </div>
        </div>
    );
}