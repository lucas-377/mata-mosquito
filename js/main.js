// Inicializacao das variaveis
var altura = 0;
var largura = 0;
var vidas = 1;
var tempo = 10;
var nivel = window.location.search;
nivel = nivel.replace('?', ''); // Remove o ? da URI
var tempoMosquito = 1500;

// Aplica dificuldade de acordo com nivel selecionado
if(nivel === 'facil') {
    tempoMosquito = 1500;
} else if(nivel === 'medio'){
    tempoMosquito = 1000;
} else {
    tempoMosquito = 750;
}

// Pega o tamanho da tela do usuario
function ajustaTamanhoDaTela() {
    var altura = window.innerHeight;
    var largura = window.innerWidth;

    // Cronometro inicializado
    document.querySelector('#jogo-tempo').innerHTML = tempo;

    // Inicia loop do jogo
    var iniciaJogo = setInterval(function () {
        posicaoRandom(altura, largura);
    }, tempoMosquito);

    // Cronometro de tempo
    var cronometro = setInterval(function () {

        tempo -= 1;

        if (tempo == 0) {
            clearInterval(cronometro);
            clearInterval(iniciaJogo);
            window.location.href = 'vitoria.html';
        }

        document.querySelector('#jogo-tempo').innerHTML = tempo;
    }, 1000);
} ajustaTamanhoDaTela();

// Gerador de posicoes aleatorias
function posicaoRandom(altura, largura) {
    var posicaoX = Math.abs(Math.floor(Math.random() * largura - 90));
    var posicaoY = Math.abs(Math.floor(Math.random() * altura - 90));

    mosquitoRandomico(posicaoX, posicaoY);
}

// Cria o mosquito
function mosquitoRandomico(posicaoX, posicaoY) {
    // Remove o mosquito criado anteriormente se existir
    if (document.querySelector('#mosquito')) {
        document.querySelector('#mosquito').remove();

        // Remove vida se não clicado no mosquito antes do tempo
        if (vidas > 3) {
            window.location.href = 'game-over.html';
        }

        document.querySelector('#vida' + vidas).src = './imagens/coracao_vazio.png';
        vidas++;
    }

    var mosquito = document.createElement('img');

    mosquito.src = 'imagens/mosquito.png';
    mosquito.className = tamanhoMosquitoRandom() + ' ' + trocaLado();

    mosquito.style.position = 'absolute';
    mosquito.style.left = posicaoX + 'px';
    mosquito.style.top = posicaoY + 'px';

    mosquito.id = 'mosquito';

    mosquito.onclick = function () {
        this.remove();
    }

    document.body.appendChild(mosquito);
}

// Tamanho dinamico do mosquito
function tamanhoMosquitoRandom() {
    var classeMosquito = Math.floor(Math.random() * 3);

    switch (classeMosquito) {
        case 0:
            return 'mosquito-pequeno';
        case 1:
            return 'mosquito-medio';
        case 2:
            return 'mosquito-grande';
    }
}

// Alterna lados dos mosquitos
function trocaLado() {
    var ladoMosquito = Math.floor(Math.random() * 2);

    switch (ladoMosquito) {
        case 0:
            return 'lado-esq';
        case 1:
            return 'lado-dir';
    }
}