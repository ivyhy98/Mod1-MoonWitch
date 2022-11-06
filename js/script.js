import { Player } from "./player.js";
import { InputHandler } from "./inputs.js";
import { level1, level2, level3 } from "./levels.js";

export  let ctx= {};
let ctx2;
//DOM Queries
const homeScreen = document.querySelector('#home-screen');
const form = document.querySelector('form');
const canvas1 = document.querySelector('#canvas1');
const canvasText = document.querySelector('#canvas-text');
const submitButton = document.querySelector('button');
//const loadScreen = document.querySelector('.load-screen');
const text = document.querySelector('.text');
const startOver = document.querySelector("#start-over");
const restart = document.querySelector("#restart");
const deathScreen = document.querySelector(".death-screen");
const gameBoard = document.querySelector('.game-board');

let playerName;
let playerCharacter;
// window.addEventListener('load',()=>{
//     loadScreen.classList.add('hide');
// })
let x = 0;
export const game ={
    player: {},
    levels: [level1,level2,level3],
    currentLevel: {},
    inputs: new InputHandler(),
    headerText: ["It's finally time to escape this hellish life...", "They say no one ever leaves the Purple's Reign...","Not until today"],
    start: function(name, character){
        ctx = canvas1.getContext("2d");
        //hide Homescreen and show our canvas
        homeScreen.classList.add("hide");
        canvasText.classList.remove('hide');
        gameBoard.classList.remove('hide');
        canvas1.classList.remove('hide')
        //set width and height proportionate to sprites
        canvas1.width = 600;
        canvas1.height = 400;
        //set this player to player created
         const player = new Player(name, character);
         this.player = player;
        level1.start(ctx);
    },
    changeLevel(current,ctx){
        this.currentLevel = this.levels[current + 1];
        ctx = null;
        ctx = canvas1.getContext('2d');
        this.currentLevel.start(ctx);
    }
}

//Validate hero inputs from home page
submitButton.addEventListener("click",validateHero);
function validateHero(){
    if(form.elements['hero-name'].value == '' || form.elements['hero-player'].value == ''){
        form.elements['hero-name'].style.backgroundColor = 'red';

    } else{
        game.start(form.elements['hero-name'].value , form.elements['hero-player'].value);
    }
}

startOver.addEventListener('click',()=>{
    homeScreen.classList.remove('hide');
    canvas1.classList.add('hide');
    deathScreen.classList.add('hide');
    canvasText.classList.add('hide');
    ctx = null;
    game.player = {};
})

restart.addEventListener('click',()=>{
    deathScreen.classList.add("hide");
    game.currentLevel.start(ctx);
})