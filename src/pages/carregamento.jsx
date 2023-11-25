import React from 'react'

const Carregamento = () => {
    const cantadas = [
        "Você é uma estrela? Porque sempre que eu te vejo, o meu mundo fica mais iluminado.",
        "Você acredita em amor à primeira vista ou devo passar por aqui novamente?",
        "Se beleza fosse tempo, você seria a eternidade.",
        "Seu nome é Google? Porque você tem tudo o que eu tenho procurado.",
        "Você é uma camera? Sempre que te vejo, sorrio.",
        "Gata, voce e o CSS para o meu HTML.",
        "Posso te chamar de constante? Porque desde que te conheci, meu amor por você nunca muda.",
        "Você é a bússola que estava faltando na minha vida, porque sempre aponta para o norte, e o norte é você.",
        "Você não é uma variável, mas você certamente é o fator constante na equação do meu coração.",
        "Posso te chamar de GPS? Porque me perdi no brilho do seu olhar.",
        "Se beleza fosse código, você seria open source para que todos pudessem apreciar.",
        "Posso te chamar de playlist? Porque a cada música que toca, meu coração bate mais forte.",
        "Você é como um algoritmo eficiente, sempre otimizando meu dia.",
        "Você é o CSS para o meu HTML, juntos formamos uma combinação perfeita.",
        "Você não é uma variável booleana, mas a resposta para todas as minhas perguntas.",
        "Posso te chamar de arquivo ZIP? Porque quero te descompactar na minha vida.",
        "Você é JavaScript do meu projeto. Sem você ele não funciona",
        "Seu nome é cocaina? Porque estou viciado no seu cheiro",
        "Você é desenvolvedor né? Vamo lá em casa, quero te ensinar Xanascript, Peython e C#",
        "Se sua beleza fosse um número, seria PI, pois é impossivel de mensurar",
        "Já viu aquele filme, o curioso caso do beijaminha boca",
        "Troquei de operadora, agora meu plano é você",
        "Oi, queria saber quantas bocas você vai beijar até saber que a minha é a certa",
        "Não sou de rezar, mas fico de joelhos por você",
        "Que voz linda você tem... fala mais perto da minha boca, por favor",
        "Me chama de Estados Unidos e me USA",
        "Não sou médico, mas se fosse pra te examinar, seu diagnostico seria = amor da minha vida ",
        "Me passa seu Insta? Meu pai disse que eu devo seguir meu sonho",
      ];
      let tam = cantadas.length;
      let random = Math.floor(Math.random() * tam);
      let frase = cantadas[random];

      let i = 0;

      function typing(){
        if (i < frase.length){
            document.getElementById('txt').innerHTML += frase.charAt(i);
            i++;
            setTimeout(typing, 100);
        }
    }

    return (
        <div id='as' className='w-full h-[100vh] p-20 bg-amareloOcre' onLoad={typing} >
            <div>
                <img width="400px" className='absolute right-0 bottom-0' src="src\assets\cupido.webp" alt="" />
                <p id="txt" className='text-center text-5xl font-extrabold 	'></p>
            </div>

        </div>
    );
}

export default Carregamento;

