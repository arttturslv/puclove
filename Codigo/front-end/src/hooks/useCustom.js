export function calculaIdade(dataNasc) {
    if(dataNasc!=null) {
        let nascimento = dataNasc.split('-');

        const dataAtual = new Date();
        const anoAtual = dataAtual.getFullYear();
        const mesAtual = dataAtual.getMonth();

        let mes = parseInt(nascimento[0]);
        let ano = parseInt(nascimento[0]);

        if (mes < mesAtual) {
            return (anoAtual - ano) - 1;
        } else {
            return anoAtual - ano;
        }
    }
}

export function decideEmoji(intent) {
if (intent == "FRIENDSHIP") {
    return " amizades 😁"
} else if (intent == "SERIOUS_RELATIONSHIP") {
    return " um relacionamento sério 🥰"
} else {
    return " algo casual 🥰"
}
}