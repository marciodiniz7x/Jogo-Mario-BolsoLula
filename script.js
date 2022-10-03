///////////////////////////////////
// |||||||||| INICIO |||||||||| //

let mario = document.querySelector('.mario');
let pipe = document.querySelector('.pipe');
let ciro = document.querySelector('.ciro');
let ferido = document.querySelector('.ferido');
let life = document.querySelector('.life');
let bomb = document.querySelector('.bomb');
let mensagemFinal = document.querySelector('.mensagemFinal')
let gameboard = document.querySelector('#gameboard')

const tela = document.querySelector('.tela');
const telavida = document.querySelector('.telavida')
const nuvens = document.querySelector('.nuvens');
const lowlife = document.querySelector('.lowlife')

const game = document.querySelector('.game');
const reiniciar = document.querySelector('.reiniciar');

const vida = document.querySelector('.vida');
const loader = document.querySelector('.loader');

const explosion = document.querySelector('.explosion')


const menosVida = document.querySelector('.menosVida');
const maisVida = document.querySelector('.maisVida') 


const inicio = document.querySelector('.inicio');

function iniciar() {

    pipe.style.animation = 'none';
    pipe.style.right = '-220px';

    ciro.style.animation = 'none';
    ciro.style.right = '-440px';

    gameboard.style.background.src = 'images/fundo2.jgp'    

}



///////////////////////////////////
// ||||| CLICANDO EM JOGAR ||||| //

let contador = 0;

function jogar() {
    
    mensagemFinal.style.animation = 'none'
    menosVida.style.animation = 'none';
    maisVida.style.animation = 'none';

    bomb.style.animation = 'none'
    pipe.style.animation = '';
    ciro.style.animation = '';
    game.classList.remove('sumir');
    vida.classList.remove('sumir');
    inicio.classList.add('sumir');

    // Criei um timeout para que a animação acelere (e aumente a dificuldade do jogo) a cada 10 saltos //
    setTimeout(() => { // Timeout 1 //

        // Antes de acelerar a animação, eu precisei cancelar ela e reiniciar (após 100ms) para que o pipe não acelerasse no meio da tela, pois ele bugava e teleportava //
        pipe.style.animation = 'none';
        setTimeout(() => {
            pipe.style.animation = '';
            pipe.style.animationDuration = "2s";
        }, 100);

            setTimeout(() => {  // // Timeout 2 // //
                pipe.style.animation = 'none';
                setTimeout(() => {
                    pipe.style.animation = '';
                    pipe.style.animationDuration = "1.5s";
                }, 100);

                    setTimeout(() => { // // // Timeout 3 // // // 
                        pipe.style.animation = 'none';
                        setTimeout(() => {
                            pipe.style.animation = '';
                            pipe.style.animationDuration = "1s";    
                        }, 100);

                            setTimeout(() => {
                                
                                    setTimeout(() => {
                                        // Criei um if no contador para evitar que as animações do timeout aconteçam depois que o jogo acabou (contador = 500)
                                        if (contador < 500) {
                                            pipe.style.animation = 'none';
                                            mensagemFinal.style.animation = '';
                                            mensagemFinal.classList.remove('sumir');
                                            setTimeout(() => {
                                                pipe.style.animation = '';
                                                pipe.style.animationDuration = '800ms'
                                                bomb.style.animation = '';
                                                bomb.classList.remove('sumir');
                                            }, 7500);

                                        }
                                        
                                    }, 100);


                            }, 10000);
                
                        
                    }, 15000); // // // Timeout 3 // // // 
        
                
            }, 20000);  // // Tineout 2 // //

        
    }, 25000); // Timeout 1 //
}

function jogarNovamente() {
    document.location.reload();
}


/////////// Gameplay / PULAR ///////////
///////////////////////////////////////

let pulou = false;

document.addEventListener('keydown', function() {
    if (pulou === false) {
        pulou = true;
        mario.classList.add('jump');
        ferido.classList.add('jumpferido');
        setTimeout(() => {
            pulou = false;
            mario.classList.remove('jump');
            ferido.classList.remove('jumpferido');
            
        }, 550);
    }
});


// COLISÃO PIPE //
//////////////////

const loop = setInterval(() => {

    const pipePosition = +window.getComputedStyle(pipe).left.replace('px', '');
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    console.log(contador)

    if (pipePosition <= 60 && pipePosition > -40 && marioPosition < 170 && contador < 500) {

        tela.classList.remove('sumir');
        menosVida.classList.remove('sumir');
        menosVida.style.animation = '';
        
        setTimeout(() => {
            tela.classList.add('sumir');
        }, 70);

        mario.classList.remove('mario');

        mario.classList.remove('jump');
        setTimeout(() => {
            mario.classList.add('mario')
            menosVida.classList.add('sumir')
            menosVida.style.animation = 'none';
        }, 600);

        contador += 100;

    }

    switch (contador) {
        case 0:
            loader.style.width = '500px';
            loader.classList.replace('loaderColor', 'loader');
            break;
        
        case 100:
            loader.classList.replace('loader', 'loaderColor');
            loader.style.width = '400px';
            break;
    
        case 200:
            loader.style.width = '300px';
            loader.style.background = 'yellow';
            break;
    
        case 300:
            loader.style.width = '200px';
            loader.style.background = 'orange';
            lowlife.classList.add('sumir');
            break;
    
        case 400:
            loader.style.width = '100px';
            loader.style.background = 'red';
            lowlife.classList.remove('sumir');

            break;
    
        case 500:
            loader.style.width = '0px';
    
            mario.classList.add('mario');
    
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;
    
            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;
    
            mario.src = "images/game-over.png";
            mario.style.width = '75px';
            mario.style.marginLeft = '50px';

            life.style.left = '-2000px';
            life.style.animation = 'none';
            
            bomb.classList.add('sumir')
            tela.classList.remove('sumir');
            tela.style.opacity = '30%';
            lowlife.classList.add('sumir')

            gameboard.style.background = 'url(images/fundoParado.jpg)';
            gameboard.style.height = '500px';
            gameboard.style.backgroundSize = '100% 100%'
    
            reiniciar.classList.remove('sumir');
            loader.classList.replace('loaderColor','morto')
    
            ferido.style.visibility = 'hidden';
    
            break;
    
        default:
            break;
    }
    
}, 10);


// COLISÃO LIFE //
//////////////////

const vidaLoop = setInterval(() => {

    const lifePosition = window.getComputedStyle(life).left.replace('px','');
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (lifePosition <= 100 && lifePosition > 0 && marioPosition > 100 && contador >= 100) {

        telavida.classList.remove('sumir');
        maisVida.classList.remove('sumir');
        maisVida.style.animation = '';
    
        setTimeout(() => {
            telavida.classList.add('sumir');
        }, 70);

        life.classList.remove('life');
        contador -= 100;

        setTimeout(() => {
            life.classList.add('life')
            maisVida.classList.add('sumir');
            maisVida.style.animation = 'none';
        }, 600);
    }

    
    
}, 10);

// COLISÃO BOMBA //
//////////////////

const bombLoop = setInterval(() => {

    const bombPosition = +window.getComputedStyle(bomb).left.replace('px','');
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (bombPosition <= 100 && bombPosition > 0 && marioPosition > 80) {

        bomb.classList.add('sumir');
        explosion.classList.remove('sumir');
        explosion.style.left = `${bombPosition}`;
        bomb.style.animation = 'none';;
        

        setTimeout(() => {
            explosion.classList.add('sumir');
        }, 600);

        contador = 500;
    }

    
    
}, 10);