let quantidadeTentativasMax = 10;
exibirMensagemInicial();
let tentativas = 1;
let listaTentativas = [];
let numeroSecreto = gerarNumeroAleatorio();
function exibirMensagemInicial(){
    exibirTextNaTela('h1', 'Jogo do Número Secreto');
    exibirTextNaTela('p', 'Escolha um número entre 1 e 10');
}

function exibirTextNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function verificarChute(){
    let chute = document.querySelector('input').value;
    if(chute == numeroSecreto){
        exibirTextNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let msgTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextNaTela('p', msgTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('chute').setAttribute('disabled', true);
    }else{
        if(chute > numeroSecreto){
            exibirTextNaTela('p', 'O número secreto é menor');
        }else{
            exibirTextNaTela('p', 'O número secreto é maior');
        }
    }
    tentativas++;
    limparCampo();
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function gerarNumeroAleatorio() {
    let numeroSorteado = parseInt(Math.random() * quantidadeTentativasMax + 1);
    if(listaTentativas.length == quantidadeTentativasMax){
        listaTentativas = [];
    }

    if(listaTentativas.includes(numeroSorteado)){  
        numeroSorteado = gerarNumeroAleatorio();
        return numeroSorteado;
    }else{
        listaTentativas.push(numeroSorteado);
        return numeroSorteado;
    }
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.getElementById('chute').removeAttribute('disabled');
}