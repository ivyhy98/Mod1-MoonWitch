//DOM Queries
const homeScreen = document.querySelector('#home-screen');
const form = document.querySelector('form');
const canvas1 = document.querySelector('canvas');
const submitButton = document.querySelector('button');

let playerName;
let playerCharacter;

const game ={
    player: {},
    level: [],
    start: function(name, character){
        homeScreen.classList.add("hide");
        canvas1.classList.remove("hide");
        canvas1.style.backgroundImage = "url('./images/backgrounds/firstBackground.gif')";
        this.player.name = name;
        this.player.character = character;
        console.log(this.player)
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
