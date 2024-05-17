import React from 'react';
import { Link as LinkExternal } from 'react-router-dom'
import {motion} from 'framer-motion';

import goBack from "../assets/Icons/revert.svg";


const PrivacyPolicy = () => {

    return (
        <motion.div 
            initial = {{opacity:0 }}
            transition={{duration:1}}
            animate = {{opacity:1 }}
            exit={{opacity:0}}
            className="w-screen h-screen flex justify-center overflow-hidden text-white bg-cover bg-[url('../src\assets\Background\bg_people.svg')]">
            <div className='w-[90%] max-h-[90%] rounded-xl relative top-[5%] bg-cinzaBlack py-6 pb-24 px-5 md:px-12'>
                <div className='flex pb-2 md:pb-6 '>
                    <LinkExternal className='w-100% m-0 relative left-[80%] md:left-[90%]' to="/">
                        <div className='flex  hover:text-vermelhoSanguino items-center gap-1 left font-thin text-sm'>
                            <img className='w-7' src={goBack} alt="icone de voltar" />
                            voltar
                        </div>
                    </LinkExternal>
                </div>
                <div className='w-[100%] max-h-[100%] overflow-y-scroll'>
                    <h1 className='font-bold text-2xl'>Politica de privacidade</h1>
                    <ul className='list-decimal pr-1 md:px-12 py-2'>
                        <li className='py-2 font-medium'>Introdução
                            <p className='font-light'>A sua privacidade é importante para nós. É política do Ilove respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site Ilove, e outros sites que possuímos e operamos.
                                Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
                                Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.</p>
                        </li>
                        <li className='py-2 font-medium'>Segurança do site
                            <p className='font-light'>O site é confiável e seguro para o usuário conforme informado pelo Site Check. A página verifica informações do site para identificar possíveis problemas de segurança.</p>
                        </li>
                        <li className='py-2 font-medium'>Cookies
                            <p className='font-light'>Utilizamos cookies por vários motivos, detalhados abaixo. Infelizmente, na maioria dos casos, não existem opções padrão do setor para desativar os cookies sem desativar completamente a funcionalidade e os recursos que eles adicionam a este site. É recomendável que você deixe todos os cookies se não tiver certeza se precisa ou não deles, caso sejam usados ​​para fornecer um serviço que você usa.</p>
                        </li>
                        <li className='py-2 font-medium'>Cookies que definimos
                            <ul className='list-disc px-5'>
                                <li className='py-1 font-light'>
                                    Cookies relacionados à conta. Se você criar uma conta conosco, usaremos cookies para o gerenciamento do processo de inscrição e administração geral. Esses cookies geralmente serão excluídos quando você sair do sistema, porém, em alguns casos, eles poderão permanecer posteriormente para lembrar as preferências do seu site ao sair.
                                </li>
                                <li className='py-1 font-light'>
                                    Cookies de Preferências. Esses cookies são usados para lembrar as preferências do usuário, como idioma, região e configurações de privacidade. Isso garante que sua experiência no site seja personalizada de acordo com suas escolhas.
                                </li>
                                <li className='py-1 font-light'>
                                    Cookies de Funcionalidade. Esses cookies são usados para melhorar a funcionalidade do site, como lembrar itens em um carrinho de compras, personalizar a interface do usuário e habilitar recursos específicos, como chat ao vivo.
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>

            </div>

            </motion.div>

    )
};


export default PrivacyPolicy;