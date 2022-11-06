import { Skeleton } from "./enemies.js";
import { game } from "./script.js";
const text = document.querySelector(".text");
const canvas1 = document.querySelector("#canvas1");


export const level1 = {
  start(ctx){
    game.currentLevel = game.levels[0];
    let background = new Image();
    background.src = '../images/backgrounds/firstBackground.png' 
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
        requestAnimationFrame(animate);
      }
    }
    animate()
  },
  drawText(ctx){
    text.textContent = "It's finally time to leave this forsaken place";
    setTimeout(() => {
      text.textContent = 'They say no one ever makes it out of this town';
    },3000);
    setTimeout(()=>{
      text.textContent = `Well why not I, ${game.player.name}`;
    },7000);
    setTimeout(()=>{
      text.textContent = "to be the first ...";
    },9000)
  },
} 



export const level2 = {
  background: "../images/backgrounds/secondBackground.png",
  battleEnded: false,
  start: function (ctx) {
    const image = new Image();
    image.src = this.background;
    game.player.position.x = -65;
    const enemies = this.spawnEnemy(3);
    this.setText(enemies);
    console.log(enemies);
    game.player.enemies = enemies;
    function animate() {
      if(game.currentLevel == level2){
        ctx.clearRect(0, 0, 800, 400);
        ctx.drawImage(image, 0, 0);
        enemies.forEach((enemy)=>{
          enemy.draw();
          enemy.update();
        })
        game.player.draw(ctx);
        game.player.update();
        level2.checkBattleEnd(ctx);
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
      text.textContent = `Skeleton: Arghhhh `;
      game.player.inBattle = true;
    }, 4000);
    setTimeout(() => {
      text.textContent = "What the hell is that";
      enemies.forEach((enemy)=>{
        enemy.battleStart = 0;
      })
    }, 5000);
    setTimeout(() => {
      text.textContent = `Skeleton: These are our woods intruder`;
      enemies.forEach((enemy) => {
        enemy.battleStart = 1;
      });
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
    } else if (game.player.enemies === 0) {
      text.textContent = "Well that wasn't normal what was that?";
    }else {
      return;
    }
  },
};

export const level3 ={
  background: '',
  start(ctx){
    console.log(game.currentLevel);
    const image = new Image();
    image.src = this.background;
  }

}