import { game } from "./script.js";
const instructions = document.querySelector('.instructions');

export class Enemy {
  constructor() {
    this.name = "";
    this.battleStart = 2;
    this.health;
    this.position = { x: Math.random() * (600 - 300 + 300), y: 275 };
    this.height;
    this.width;
    this.image = new Image();
    this.image.src = "";
    this.frameY = 1;
    this.frameX = 0;
    this.states = [
      { frameY: 0, frameNum: 3 }, //idle 0
      { frameY: 1, frameNum: 3 }, //walk
      { frameY: 2, frameNum: 5 }, //attack
      { frameY: 3, frameNum: 3 }, //death
    ];
    this.currentState = this.states[0];
    this.gameFrame = 0;
    this.staggerFrames = 5;
  }
  draw(ctx) {
    ctx.save();
    ctx.drawImage(
      this.image,
      this.frameX * this.width,
      this.currentState.frameY * this.height,
      this.width,
      this.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    if (this.gameFrame % this.staggerFrames == 0) {
      if (this.frameX < this.currentState.frameNum) this.frameX++;
      else this.frameX = 0;
    }
    this.gameFrame++;
    ctx.restore();
  }
  update(ctx) {
    this.checkHealth();
    ctx.fillStyle = "red";
    ctx.font = "15px bold Arial";
    ctx.fillText(`${this.health}`, this.position.x, this.position.y);
    this.changePosition();
    //update based on player input
    switch (game.inputs.pressed[0]) {
      case "a":
        //check collision
        if (
          game.player.position.x < this.position.x + this.width &&
          game.player.position.x + game.player.width / 2 > this.position.x
        ) {
          this.health -= 0.5;
          this.position.x += 1;

        }
      case "s":
        //check collisiom with super attack
        if (
          game.player.position.x < this.position.x + this.width &&
          game.player.position.x + game.player.width / 2 > this.position.x
        ) {
          this.health -= 5;
        }
    }
  }

  attack() {
    this.currentState = this.states[2];
    //check collision of attack on player
    if(this.health>0){
      if (
      game.player.position.x < this.position.x + this.width &&
      game.player.position.x + game.player.width / 2 > this.position.x
    ) {
      game.player.health -= 0.2;
    }
  }
  }
  checkHealth() {
    if (this.health <= 0) {
      this.currentState = this.states[3];
      this.position.y ++;
      game.player.enemies.pop();
    }
  }
}

export class Skeleton extends Enemy {
  constructor(index) {
    super();
    this.name = "Skeleton";
    this.width = 902 / 6;
    this.height = 608 / 4;
    this.health = 300;
    this.index = index;
    this.image.src = "./images/enemies/skeleton.png";
    //spawn at a random location within the range of 700 to 500 feet
    this.position = {
      x: Math.floor(Math.random() * (700 - 500) + 500),
      y: 260,
    };
  }
  changePosition() {
    if (
      this.battleStart == 1 &&
      this.position.x > game.player.position.x + game.player.width / 3
    ) {
      //if the battle started and you aren't close to the player get closer
      this.currentState = this.states[1];
      this.position.x--;
    } else if (
      this.position.x <=
      game.player.position.x + game.player.width / 2
    ) {
      //if you are within attacking range then attack
      this.attack();
    }
  }
}

export class Wizard extends Enemy {
  constructor() {
    super();
    this.name = "Wizard";
    this.health = 1000;
    this.position = { x: 600, y: 260 };
    this.height = 608 / 4;
    this.width = 1202 / 8;
    this.image = new Image();
    this.image.src = "./images/Enemies/Wizard.png";
    this.frameY = 1;
    this.frameX = 0;
    this.states = [
      { frameY: 0, frameNum: 3 }, //idle 0
      { frameY: 1, frameNum: 3 }, //walk
      { frameY: 2, frameNum: 5 }, //attack
      { frameY: 3, frameNum: 3 }, //death
    ];
    this.currentState = this.states[0];
    this.gameFrame = 0;
    this.staggerFrames = 5;
  }
  changePosition() {
    if (this.battleStart == 0) {
      this.position.x = 500;
    } else if (
      this.battleStart == 1 &&
      this.position.x > game.player.position.x + game.player.width/3 
    ) {
      this.position.x-=2;
    } else if (
      this.battleStart == 1 &&
      this.position.x <= game.player.position.x + game.player.width/3 &&
      this.position.x >= game.player.position.x
    ) {
      this.attack();
    } else if(this.battleStart == 1 && this.position.x < game.player.position.x){
      while (this.position.x > game.player.position.x + game.player.width) {
        this.position.x+=2;
      }
    }
  }
}

export const stranger = {
  height: 808 / 4,
  width: 1602 / 8,
  position: { x: 500, y: 235 },
  image: new Image(),
  frameX: 0,
  states: [
    { frameY: 0, frameNum: 7 }, //idle 0
    { frameY: 1, frameNum: 7 }, //walk
    { frameY: 2, frameNum: 5 }, //attack
    { frameY: 3, frameNum: 5 }, //death
  ],
  gameFrame: 0,
  staggerFrames: 5,
  currentState: { frameY: 0, frameNum: 7 },
  start: false,
  exit: false,
  draw(context) {
    context.save();
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.currentState.frameY * this.height,
      this.width,
      this.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    if (this.gameFrame % this.staggerFrames == 0) {
      if (this.frameX < this.currentState.frameNum) this.frameX++;
      else this.frameX = 0;
    }
    this.gameFrame++;
    context.restore();
  },
  update() {

    if (this.exit == false && (this.position.x >= game.player.position.x + game.player.width)) {
      this.position.x--;
      this.currentState = this.states[1];
    } else if(this.exit == false && game.player.inBattle == false){
        this.currentState = this.states[0];
    }
    if (this.exit == true && this.position.x >= game.player.position.x) {
      this.currentState = this.states[1];
      this.position.x--;
    } else if (this.exit == true && game.player.inBattle == false) {
      this.currentState = this.states[1];
      this.position.x+=2;
    }

    if (this.position.x < game.player.position.x) {
      this.getImage(0);
    } else {
      this.getImage(1);
    }
    
    // if(game.player.inBattle == true && game.player.enemies[0]) {
    //   this.currentState = this.states[0];
    //   this.position.x = -100;
    // }
  },
  getImage(num) {
    if (!num) {
      this.image.src = "./images/ninjaR.png";
    } else {
      this.image.src = "./images/ninjaL.png";
    }
  },
};
