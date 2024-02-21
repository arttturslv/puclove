import React from 'react';
import Navbar from '../components/Navbar';
import {motion} from 'framer-motion';
import Personagens from '../components/Personagens';

const Home = () => {
    return (
        <motion.div 
            initial = {{opacity:0 }}
            transition={{duration:1}}
            animate = {{opacity:1 }}
            exit={{opacity:0}}
         className="container-home m-0 bg-cover w-full h-full bg-[url('../src\assets\background-linhas.svg')]">

           <Navbar />

            <div className="max-w-7xl m-0 my-auto mx-auto  logo-nome py-72 h-full grid grid-cols-1 content-center">
                <img className='w-4/5 m-0 my-auto mx-auto md:w-3/5 lg:w-3/6' src="../src/assets/Logo frase-svg.svg" alt="PUCLOVE - Conectando corações, impulsionando comunidades" />

            </div>

            <div id="sobre" className="m-0 my-auto mx-auto  max-w-7xl texto space-y-2.5 w-4/5">
                <h3 className='sm:text-2xl	 md:text-3xl	 lg:text-4xl font-semibold	'>Sobre</h3>
                <p className='sm:text-base md:text-base lg:text-lg ' >Bem-vindo ao PucLove, o seu novo destino para conexões significativas entre estudantes da PUC (Pontifícia Universidade Católica)! Aqui, criamos um espaço virtual onde os alunos podem se encontrar, compartilhar interesses, e estabelecer relacionamentos que vão além das salas de aula. O PucLove é mais do que apenas um site de relacionamento; é uma comunidade que promove a amizade, o networking e, claro, o amor entre os estudantes da PUC.</p>
                <p className='sm:text-base md:text-base lg:text-lg '>O PucLove é um projeto apaixonante criado por um time dedicado de desenvolvedores que acredita que as conexões entre estudantes podem ser transformadoras. Com a visão de proporcionar uma experiência interativa excepcional, utilizamos as tecnologias de ponta do React e Java SpringBoot para criar uma plataforma intuitiva e dinâmica.</p>
                <p className='sm:text-base md:text-base lg:text-lg '>No PucLove, nosso objetivo é criar uma comunidade onde estudantes da PUC possam se conectar, compartilhar ideias, interesses e, quem sabe, encontrar o amor. Estamos comprometidos em proporcionar uma plataforma segura, inclusiva e divertida para que você possa construir relacionamentos significativos durante seus anos acadêmicos.</p>
                <p className='sm:text-base md:text-base lg:text-lg '>Junte-se a nós hoje mesmo e faça parte da comunidade PucLove. Conecte-se, compartilhe e, quem sabe, encontre o amor entre as salas de aula e os corredores da PUC!</p>
            </div>

            <div className="m-0 my-auto mx-auto max-w-7xl caricaturas py-10 flex items-start justify-between w-5/6 flex-wrap">

                <Personagens 
                    nome="Alex Gonçalves"
                    perfilUrl="https://github.com/ArexDiniz"
                    imgUrl="../src/assets/Caricaturas/estaticas/alexy.svg"
                    gifUrl="../src/assets/Caricaturas/animadas/alex-gif.gif"
                    funcao="Dev.front-end"
                />
                <Personagens 
                    nome="Anna Carla"
                    perfilUrl="https://github.com/Anna-Carla"
                    imgUrl="../src/assets/Caricaturas/estaticas/ano.svg"
                    gifUrl="../src/assets/Caricaturas/animadas/anna-gif.gif"
                    funcao="UX-UI"
                    funcao1="Dev.front-end"
                />
                <Personagens 
                    nome="Artur Marcos"
                    perfilUrl="https://github.com/arttturslv"
                    imgUrl="../src/assets/Caricaturas/estaticas/arturo.svg"
                    gifUrl="../src/assets/Caricaturas/animadas/artur-gif.gif"
                    funcao="UX-UI"
                    funcao1="Dev.front-end"
                />
                <Personagens 
                    nome="Davi Ribeiro"
                    perfilUrl="https://github.com/dxvinci"
                    imgUrl="../src/assets/Caricaturas/estaticas/david.svg"
                    gifUrl="../src/assets/Caricaturas/animadas/davi-gif.gif"
                    funcao="Dev.back-end"
                />
                <Personagens 
                    nome="Tulio Barros"
                    perfilUrl="https://github.com/micder1"
                    imgUrl="../src/assets/Caricaturas/estaticas/tuio.svg"
                    gifUrl="../src/assets/Caricaturas/animadas/tulio-gif.gif"
                    funcao="Dev.back-end"
                 />

            </div>

            <div id="regras" className="footer w-full py-5 px-10  bg-cinzaBlack flex justify-center items-center" >
                <ul className=' list-disc'>
                    <li className='text-white font-light text-sm'>O site é apenas para estudantes da PUC, não é possível cadastrar um e-mail diferente do educacional (@sga.pucminas.br)</li>
                    <li className='text-white font-light text-sm'>Não toleramos na plataforma racismo, bullying, assédios, intolerância religiosa, violência ou qualquer tipo de ato criminoso.</li>
                    <li className='text-white font-light text-sm'>Não aceitamos perfis fakes, de menores de idade, com apelo sexual etc.</li>
                </ul>
            </div>

        </motion.div>

    )
};


export default Home;