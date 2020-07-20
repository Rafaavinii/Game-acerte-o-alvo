//Pegar os valores de altura e largura
var altura = 0
var largura = 0
var lifes = 1
var tempo = 30
var pontuacao = 0
var velocidadeDeCriacao = 1500

var nivel = window.location.search
nivel = nivel.replace('?', '')

if(nivel === 'normal') {
    velocidadeDeCriacao = 1500
} else if(nivel === 'dificil'){
    velocidadeDeCriacao = 1000
} else if(nivel === 'god') {
    velocidadeDeCriacao = 750
}

function ajustaTelaDeJogo(){
    altura = window.innerHeight
    largura = window.innerWidth

    console.log(largura, altura)
}

ajustaTelaDeJogo()

//Tempo para a vitoria
var cronometro = setInterval(() => {
    tempo -= 1
    if(tempo < 0) {
        clearInterval(cronometro)
        clearInterval(criarAlvo)
        window.location.href = 'vitoria.html'
    } else{
        document.getElementById('cronometro').innerHTML = tempo < 10 ? '0' + tempo : tempo
    }
}, 1000)

//Gerar posições randômicas para o alvo
function posicaoRandomica() {

    //Remover alvo
    if(document.getElementById('alvo')) {
        document.getElementById('alvo').remove()

        if(lifes > 8) {
            window.location.href = 'fim-de-jogo.html'
        } else{
            document.getElementById('l' + lifes).src = '/img/coracao_vazio.png'
            lifes++
        }
    }
    //Posições randômicas
    var posicaoX = Math.floor(Math.random() * largura) - 90
    var posicaoY = Math.floor(Math.random() * altura) - 90

    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    //Criar o elemento html
    var alvo = document.createElement('img')
    alvo.src = '/img/pontaria.png'
    alvo.className = tamanhoAleatorio()
    alvo.style.left = posicaoX + 'px'
    alvo.style.top = posicaoY + 'px'
    alvo.style.position = 'absolute'
    alvo.id = 'alvo'
    alvo.onclick = function() {
        pontuacao++
        document.getElementById('pontuacao').innerHTML = pontuacao
        this.remove()
    }

    document.body.appendChild(alvo)
}

function tamanhoAleatorio() {
    var classe = Math.floor(Math.random() * 3)

    switch(classe){
        case 0:
            return 'alvo1'
        case 1:
            return 'alvo2'
        case 2:
            return 'alvo3'
    }
}