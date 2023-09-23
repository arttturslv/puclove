import React from 'react';
import { Link as LinkExternal } from 'react-router-dom'

const Home = () => {

    return (
        <div className="w-screen h-screen flex justify-center overflow-hidden text-white bg-cover bg-[url('../src/assets/Background-svg.svg')]">
                
                <div className='w-[90%] max-h-[90%] rounded-xl relative top-[5%] bg-cinzaBlack py-6 pb-24 px-12 '>
                    <div className='flex relative pb-6 left-64'>
                        <LinkExternal to="/">
                        <div className='flex hover:text-vermelhoSanguino items-center gap-1 left font-thin text-sm'> 
                            <img className='w-7' src="src\assets\Icones\icon voltar.svg" alt="icone de voltar" />
                            voltar
                        </div>
                        </LinkExternal>
                    </div>
                    <div className='w-[100%]  max-h-[100%] overflow-y-scroll '>
                        <h1 className='font-bold text-2xl'>Politica de privacidade</h1>
                        <ul className='list-decimal px-12 py-2'>
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
                                        Cookies relacionados à conta. Se você criar uma conta conosco, usaremos cookies para o gerenciamento do processo de inscrição e administração geral. Esses cookies geralmente serão excluídos quando você sair do sistema, porém, em alguns casos, eles poderão permanecer posteriormente para lembrar as preferências do seu site ao sair.
                                    </li>
                                    <li className='py-1 font-light'>
                                        Cookies relacionados à conta. Se você criar uma conta conosco, usaremos cookies para o gerenciamento do processo de inscrição e administração geral. Esses cookies geralmente serão excluídos quando você sair do sistema, porém, em alguns casos, eles poderão permanecer posteriormente para lembrar as preferências do seu site ao sair.
                                    </li>
                                    <li className='py-1 font-light'>
                                        Cookies relacionados à conta. Se você criar uma conta conosco, usaremos cookies para o gerenciamento do processo de inscrição e administração geral. Esses cookies geralmente serão excluídos quando você sair do sistema, porém, em alguns casos, eles poderão permanecer posteriormente para lembrar as preferências do seu site ao sair.
                                    </li>
                                    <li className='py-1 font-light'>
                                        Cookies relacionados à conta. Se você criar uma conta conosco, usaremos cookies para o gerenciamento do processo de inscrição e administração geral. Esses cookies geralmente serão excluídos quando você sair do sistema, porém, em alguns casos, eles poderão permanecer posteriormente para lembrar as preferências do seu site ao sair.
                                    </li>
                                    <li className='py-1 font-light'>
                                        Cookies relacionados à conta. Se você criar uma conta conosco, usaremos cookies para o gerenciamento do processo de inscrição e administração geral. Esses cookies geralmente serão excluídos quando você sair do sistema, porém, em alguns casos, eles poderão permanecer posteriormente para lembrar as preferências do seu site ao sair.
                                    </li>
                                    <li className='py-1 font-light'>
                                        Cookies relacionados à conta. Se você criar uma conta conosco, usaremos cookies para o gerenciamento do processo de inscrição e administração geral. Esses cookies geralmente serão excluídos quando você sair do sistema, porém, em alguns casos, eles poderão permanecer posteriormente para lembrar as preferências do seu site ao sair.
                                    </li>
                                    <li className='py-1 font-light'>
                                        Cookies relacionados à conta. Se você criar uma conta conosco, usaremos cookies para o gerenciamento do processo de inscrição e administração geral. Esses cookies geralmente serão excluídos quando você sair do sistema, porém, em alguns casos, eles poderão permanecer posteriormente para lembrar as preferências do seu site ao sair.
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>

            </div>

        </div>

    )
};


export default Home;