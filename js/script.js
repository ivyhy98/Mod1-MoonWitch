import { Player } from "./characters.js";
import { InputHandler } from "./inputs.js";
import { level1 } from "./levels.js";
export  let ctx= {};
//DOM Queries
const homeScreen = document.querySelector('#home-screen');
const form = document.querySelector('form');
const canvas1 = document.querySelector('#canvas1');
const submitButton = document.querySelector('button');
const loadScreen = document.querySelector('#load-screen');

let playerName;
let playerCharacter;
window.addEventListener('load',()=>{
    loadScreen.classList.add('hide');
    game.start();
})
let x = 0;
export const game ={
    player: {},
    currentLevel: {},
    inputs: new InputHandler(),
    start: function(name, character){
        ctx = canvas1.getContext("2d");
        homeScreen.classList.add("hide");
        canvas1.classList.remove("hide");
        canvas1.width = 600;
        canvas1.height = 400;
        let shop = new Image();
      
        const player = new Player(name, character);
        this.player = player;
        
        this.currentLevel = level1;
        let background = new Image();
        background.src = '../images/backgrounds/secondBackground.png'
        function animate(){
            ctx.clearRect(0,0,canvas1.width, canvas1.height);
            ctx.drawImage(background,0,0);
            ctx.drawImage(shop, 300,260);
            player.draw(ctx);
            player.update();
            requestAnimationFrame(animate);
        }
        animate();
    },
    
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