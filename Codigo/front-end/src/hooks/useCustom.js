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
    return "Novas amizades!"
} else if (intent == "SERIOUS_RELATIONSHIP") {
    return "Um relacionamento sério!"
} else {
    return "Algo casual."
}
}

export function getInterests() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const interests = currentUser.user.interests;
    return interests;
}