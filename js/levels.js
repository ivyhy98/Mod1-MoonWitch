import { Skeleton, stranger, Wizard} from "./characters.js";
import { game } from "./script.js";
const text = document.querySelector(".text");
const canvas1 = document.querySelector("#canvas1");
const tbc = document.querySelector('.tbc')
const startOver = document.querySelector('#start-over-end');
export const level1 = {
  start(ctx){
    game.currentLevel = game.levels[0];
    let background = new Image();
    background.src = '/css/images/backgrounds/firstBackground.png' 
    this.drawText(ctx);
    function animate(){
      if(game.currentLevel == level1){
        ctx.clearRect(0,0,canvas1.width, canvas1.height);
        ctx.drawImage(background,0,0);
        if(game.player.position.x >=450){
          game.changeLevel(0,ctx);
        }
        game.player.draw(ctx);
        game.player.update();
        ctx.fillText("Arrow Keys to move left and right", 0, 0);
        requestAnimationFrame(animate);
      }
    }
    animate()
  },
  drawText(){
    text.textContent = "It's finally time to leave this forsaken place";
    setTimeout(() => {
      text.textContent = 'They say no one ever makes it out of this town';
    },3000);
    setTimeout(()=>{
      text.textContent = `Well why not I, ${game.player.name}`;
    },7000);
    setTimeout(()=>{
      text.textContent = "to be the first ...";
      game.updates.textContent = "Please Proceed ==> ";
    },9000)
  },
} 


// ======LEVEL 2 =====

export const level2 = {
  background: "../images/backgrounds/secondBackground.png",
  battleEnded: false,
  start: function (ctx) {
    const image = new Image();
    image.src = this.background;
    game.updates.textContent = "";
    game.player.position.x = -65;
    const enemies = this.spawnEnemy(5);
    this.setText(enemies);
    console.log(enemies);
    game.player.enemies = enemies;
    function animate() {
      if(game.currentLevel == level2){
        ctx.clearRect(0, 0, 800, 400);
        ctx.drawImage(image, 0, 0);
        enemies.forEach((enemy)=>{
          enemy.draw(ctx);
          enemy.update(ctx);
        })
        game.player.draw(ctx);
        game.player.update();
        level2.checkBattleEnd(ctx);
        ctx.fillText("Use A to attack", 0, 0);

        requestAnimationFrame(animate);
      }
      
    }
    animate();
  },
  setText: function (enemies) {
    text.textContent = "I feel like I've been walking for hours";
    setTimeout(() => {
      text.textContent = "These woods are unlike anything ive seen";
    }, 2000);
    setTimeout(() => {
      text.textContent = "Skeleton: Arghhhh";
      game.player.inBattle = true;

    }, 4000);
    setTimeout(() => {
      text.textContent = "What the hell is that";
      enemies.forEach((enemy)=>{
        enemy.battleStart = 0;
      })
    }, 5000);
    setTimeout(() => {
      text.textContent = "Skeleton: These are our woods intruder";
      enemies.forEach((enemy) => {
        enemy.battleStart = 1;
      });
      game.updates.textContent = "Defeat the Skeletons";
    }, 10000);
    

  },
  spawnEnemy: function (num) {
    const enemies = [];
    for (let i = 0; i < num; i++) {
      enemies.push(new Skeleton(i));
    }
    return enemies;
  },
  checkBattleEnd: function (ctx) {
    if (game.player.enemies.length == 0 && game.player.position.x >= 450) {
      game.changeLevel(1, ctx);
    } else if (game.player.enemies.length === 0) {
      text.textContent = "Well that wasn't normal.. what was that?";
      game.updates.textContent = "Please Proceed ==>";

    }else {
      return;
    }
  },
};

// ======LEVEL 3 =====

export const level3 = {
  background: "../images/backgrounds/secondBackground.png",
  strangerStart: false,
  enemy: {},
  start: function(ctx) {
    const image = new Image();
    game.updates.textContent = '';
    image.src = this.background;
    game.player.position.x= -65;
    console.log(`${stranger.position.x}`)
    stranger.getImage(1);
    console.log('level 3 start');
     this.enemy = new Wizard();
     const enemy = this.enemy;
    this.setText(enemy);
   
    function animate() {
      if (game.currentLevel == level3) {
        ctx.clearRect(0, 0, 800, 400);
        ctx.drawImage(image, 0, 0);
        game.player.update();
        game.player.draw(ctx);
        enemy.draw(ctx);
        enemy.update(ctx);
        stranger.draw(ctx);
        stranger.update();
        level3.checkBattleEnd(ctx);
        requestAnimationFrame(animate);
      };
    };
    animate();

  },
  setText: function(){
    text.textContent = 'I need some answers';
    const conversation = [
      "Stranger: Mavara? is that you?",
      "Who's there... how do you know my mothers name!",
      "Stranger: Mother... Your energy is just like hers...",
      "Stranger: I didn't know she had a kid, thought I was gettin crazier",
      "You know my mother? Do you know where she might be?",
      "Stranger: I haven't seen her in years come with me i'll tell you about her",
      "Stranger: These are dangerous woods",
      "Deathwalker: Dario you cannot escape me",
      "Dario: Help me out of this and I'll help you find Mavara I'm too wounded to fight",
      "What me?!?!?",
      "Deathwalker: where's my gold Dario!",
      "Stay Away ",
    ];
    let i = 0;
    conversation.forEach((sentence, index)=>{
      setTimeout(()=>{
        text.textContent = sentence;
        if (index == 7) {
          this.startBattle(i);
          console.log('phase 1 l3')
        } else if (index == 10) {
          this.startBattle(i);
          console.log('phase2 l3')
        }
        i++;
      },(index)*3000);
    });

  },
  startBattle: function(i){
    if(i===7){
      game.player.enemies.push(this.enemy),
      this.enemy.battleStart = 0;
    }else if(i===10){
      stranger.exit = true;
      game.player.inBattle = true;
      this.enemy.battleStart = 1;
      game.updates.textContent = "Defeat the Wizard";
    }
  },
  checkBattleEnd: function(ctx){
    if (game.player.enemies.length === 0 && game.player.position.x >= 450) {
      game.changeLevel(2, ctx);
    } else if (game.player.enemies.length === 0 && stranger.exit === true) {
      game.player.inBattle = false;
      text.textContent = "Is anything normal outside of Moon village...?";
      game.updates.textContent = "Follow the Stranger/Dario ==>";

    }else {
      return;
    }
  },
};

// ======LEVEL 4 =====
export const level4 = {
  background: "../images/backgrounds/thirdBackground.jpg",
  strangerStart: false,
  start: function (ctx) {
    const image = new Image();
    image.src = this.background;
    game.player.position.x = 300;
    game.player.currentState = game.player.states[0];;
    stranger.currentState = stranger.states[0];
    stranger.position.x = 450;
    stranger.getImage(1);
    console.log("level 4 start");
    this.setText();
    game.updates.textContent='Find out who you are';
    function animate() {
      if (game.currentLevel == level4) {
        ctx.clearRect(0, 0, 800, 400);
        ctx.drawImage(image, 0, 0);
        game.player.draw(ctx);
        stranger.draw(ctx);
        requestAnimationFrame(animate);
      }
    }
    animate();
  },
  setText: function () {
    const conversation = [
      "Dario: so what's your name kid",
      `I am ${game.player.name} of Witch Line`,
      "Dario: HAA!! Who told you that",
      "I know who I am",
      "Dario: Your mother was well known, How have you never known what you are",
      "What are you trying to say",
      "Dario: Do you not realize the power within you or is it locked away",
      "What Power?! I am a witch I know the power I have",
      `Dario: No ${game.player.name} youre mother was a Moonwitch and that would make you one as well`
    ];
    let i = 0;

    conversation.forEach((sentence, index) => {
      setTimeout(() => {
        text.textContent = sentence;
        if (index == 8) {
          this.startOver();
        } 
        i++;
      }, index * 3000);
    });

  },
  startOver(){
    tbc.classList.remove('hide');
    gameBoard.classList.add('hide');
  }
};

startOver.addEventListener('click', ()=>{
  homeScreen.classList.remove("hide");
  gameBoard.classList.add("hide");
  deathScreen.classList.add("hide");
  ctx = null;
  game.player = {};
})