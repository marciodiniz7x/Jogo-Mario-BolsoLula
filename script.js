///////////////////////////////////
// |||||||||| INICIO |||||||||| //

let mario = document.querySelector('.mario');
let pipe = document.querySelector('.pipe');
let ciro = document.querySelector('.ciro');
let ferido = document.querySelector('.ferido');
let life = document.querySelector('.life');

let gameboard = document.querySelector('#gameboard')

const tela = document.querySelector('.tela');
const telavida = document.querySelector('.telavida')
const nuvens = document.querySelector('.nuvens');
const lowlife = document.querySelector('.lowlife')

const game = document.querySelector('.game');
const reiniciar = document.querySelector('.reiniciar');

const vida = document.querySelector('.vida');
const loader = document.querySelector('.loader');

const inicio = document.querySelector('.inicio');

function iniciar() {
    game.classList.add('sumir');
    reiniciar.classList.add('sumir');
    vida.classList.add('sumir');

    pipe.style.animation = 'none';
    pipe.style.right = '-220px';

    ciro.style.animation = 'none';
    ciro.style.right = '-440px';

    gameboard.style.background.src = '/images/fundo2.jgp'



}



///////////////////////////////////
// |||||||||| BOTÕES |||||||||| //

function jogar() {
    pipe.style.animation = '';
    ciro.style.animation = '';
    game.classList.remove('sumir');
    vida.classList.remove('sumir')
    inicio.classList.add('sumir');


}

function jogarNovamente() {
    document.location.reload();
}


/////////////// EM JOGO ///////////////
///////////////////////////////////////

function jump() {
    mario.classList.add('jump');
    ferido.classList.add('jumpferido');
    setTimeout(() => {
        mario.classList.remove('jump');
        ferido.classList.remove('jumpferido');
        
    }, 600);
}

let contador = 0;


// COLISÃO PIPE //
//////////////////

const loop = setInterval(() => {

    const pipePosition = +window.getComputedStyle(pipe).left.replace('px', '');
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    console.log(contador)

    if (pipePosition <= 60 && pipePosition > -40 && marioPosition < 170 && contador < 500) {

        tela.classList.remove('sumir');
        
        setTimeout(() => {
            tela.classList.add('sumir');
        }, 70);

        mario.classList.remove('mario');

        mario.classList.remove('jump');
        setTimeout(() => {
            mario.classList.add('mario')
        }, 600);

        contador += 100;

    }

    switch (contador) {
        case 0:
            loader.style.width = '500px';
            break;
        
        case 100:
            loader.style.width = '400px';
            break;
    
        case 200:
            loader.style.width = '300px';
            break;
    
        case 300:
            loader.style.width = '200px';
            lowlife.classList.add('sumir')
            break;
    
        case 400:
            loader.style.width = '100px';
            lowlife.classList.remove('sumir')

            break;
    
        case 500:
            loader.style.width = '0px';
    
            mario.classList.add('mario');
    
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;
    
            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;
    
            mario.src = "/images/game-over.png";
            mario.style.width = '75px';
            mario.style.marginLeft = '50px';

            life.style.left = '-2000px';
            life.style.animation = 'none';
        
            tela.classList.remove('sumir');
            tela.style.opacity = '30%';
            lowlife.classList.add('sumir')

            gameboard.style.background = 'url(/images/fundoParado.jpg)';
            gameboard.style.height = '500px';
            gameboard.style.backgroundSize = '100% 100%'
    
            reiniciar.classList.remove('sumir');
            loader.classList.replace('loader','morto')
    
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
    
        setTimeout(() => {
            telavida.classList.add('sumir');
        }, 70);

        life.classList.remove('life');
        contador -= 100;

        setTimeout(() => {
            life.classList.add('life')
        }, 600);
    }

    
    
}, 10);

document.addEventListener('keydown', jump);