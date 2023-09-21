import React from 'react';

const Home = () => (
    <div className="container-home bg-cover w-full h-full bg-[url('../src\assets\background-linhas.svg')]">

        <div className="logo-nome py-72 h-full grid grid-cols-1 content-center">
            <img className='w-4/5 md:w-3/5 lg:w-3/6' src="../src/assets/Logo frase-svg.svg" alt="PUCLOVE - Conectando corações, impulsionando comunidades" />
  
        </div>

        <div className="texto space-y-2.5 w-4/5">
            <h3 className='sm:text-2xl	 md:text-3xl	 lg:text-4xl font-semibold	'>Sobre</h3>
            <p className='sm:text-base md:text-base lg:text-lg ' >Bem-vindo ao PucLove, o seu novo destino para conexões significativas entre estudantes da PUC (Pontifícia Universidade Católica)! Aqui, criamos um espaço virtual onde os alunos podem se encontrar, compartilhar interesses, e estabelecer relacionamentos que vão além das salas de aula. O PucLove é mais do que apenas um site de relacionamento; é uma comunidade que promove a amizade, o networking e, claro, o amor entre os estudantes da PUC.</p>
            <p className='sm:text-base md:text-base lg:text-lg '>O PucLove é um projeto apaixonante criado por um time dedicado de desenvolvedores que acredita que as conexões entre estudantes podem ser transformadoras. Com a visão de proporcionar uma experiência interativa excepcional, utilizamos as tecnologias de ponta do React e Java SpringBoot para criar uma plataforma intuitiva e dinâmica.</p>
            <p className='sm:text-base md:text-base lg:text-lg '>No PucLove, nosso objetivo é criar uma comunidade onde estudantes da PUC possam se conectar, compartilhar ideias, interesses e, quem sabe, encontrar o amor. Estamos comprometidos em proporcionar uma plataforma segura, inclusiva e divertida para que você possa construir relacionamentos significativos durante seus anos acadêmicos.</p>
            <p className='sm:text-base md:text-base lg:text-lg '>Junte-se a nós hoje mesmo e faça parte da comunidade PucLove. Conecte-se, compartilhe e, quem sabe, encontre o amor entre as salas de aula e os corredores da PUC!</p>
        </div>

        <div className="caricaturas py-10 flex justify-between w-5/6 flex-wrap">
            <div className="alex flex-col text-center">
                <img src="../src/assets/Caricaturas/alexy.svg" alt="Alex, um estudante" />
                <h5 className='font-semibold text-lg'>Alex Gonçalves</h5>
                <p>Dev. front-end<br/>Scrum Master</p>
            </div>
            <div className="anna flex-col text-center">
                <img src="../src/assets/Caricaturas/ano.svg" alt="Anna, uma estudante" />
                <h5  className='font-semibold text-lg'>Anna Carla</h5>
                <p>UX-UI<br/>Dev. front-end</p>
            </div>
            <div className="artur flex-col text-center">
                <img src="../src/assets/Caricaturas/arturo.svg" alt="Artur, um estudante" />
                <h5  className='font-semibold text-lg'>Artur Marcos</h5>
                <p>UX-UI<br/>Dev. front-end</p>
            </div>
            <div className="davi flex-col text-center">
                <img src="../src/assets/Caricaturas/david.svg" alt="Davi, um estudante" />
                <h5  className='font-semibold text-lg'>Davi Ribeiro</h5>
                <p>Dev. back-end<br/>Product Owner</p>
            </div>
            <div className="tulio flex-col text-center">
                <img src="../src/assets/Caricaturas/tuio.svg" alt="Tulio, um estudante" />
                <h5  className='font-semibold text-lg'>Tulio Barros</h5>
                <p>Dev. back-end<br/>Dev. Head Master</p>
            </div>
        </div>

        <div className="footer w-full py-5 px-10  bg-cinzaBlack flex justify-center items-center" >
            <ul className=' list-disc'>
                <li className='text-white font-light text-sm'>O site é apenas para estudantes da PUC, não é possível cadastrar um e-mail diferente do educacional (@sga.pucminas.br)</li>
                <li className='text-white font-light text-sm'>Não toleramos na plataforma racismo, bullying, assédios, intolerância religiosa, violência ou qualquer tipo de ato criminoso.</li>
                <li className='text-white font-light text-sm'>Não aceitamos perfis fakes, de menores de idade, com apelo sexual etc.</li>
            </ul>
        </div>
        
    </div>

);


export default Home;