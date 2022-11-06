import { game,ctx } from "./script.js";

export class Enemy {
  constructor(index) {
    this.name = "";
    this.battleStart = 2;
    this.health = 100;
    this.position = { x: Math.random() * (600 - 300 + 300), y: 275 };
    this.height;
    this.width;
    this.index = index;
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
  draw() {
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
  update() {
    this.checkHealth();
    ctx.fillStyle = "red";
    ctx.font = "15px bold Arial";
    ctx.fillText(`${this.health}`, this.position.x, this.position.y);
    //walk into battle
    if (this.battleStart == 1 && this.position.x > game.player.position.x + game.player.width/3) {
        //if the battle started and you aren't close to the player get closer
        this.currentState = this.states[1];
        this.position.x--;
    // } else if (this.battleStart == 1 && this.position.x < game.player.position.x) {
    //     //if battle started and you are behind the player get in front
    //   this.currentState = this.states[1];
    //   this.position.x+=2;
     } else if (this.position.x <= game.player.position.x + game.player.width/3) {
        //if you are within attacking range then attack
      this.attack();
    }
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
    if (
      game.player.position.x < this.position.x + this.width &&
      game.player.position.x + game.player.width / 2 > this.position.x
    ) {
      game.player.health -= 0.2;
    }
  }
  checkHealth() {
    //check enemy health
    if (this.health <= 0) {
      this.currentState = this.states[3];
      this.image.classList.add("hide");
      this.position.y++;
      game.player.enemies.splice(this.index, 1);
    }
  }
}

export class Skeleton extends Enemy {
  constructor() {
    super();
    this.name = "Skeleton";
    this.width = 902 / 6;
    this.height = 608 / 4;
    this.health = 200;
    this.image.src = "../images/enemies/skeleton.png";
    //spawn at a random location within the range of 700 to 500 feet
    this.position = {
      x: Math.floor(Math.random() * (700 - 500) + 500),
      y: 260,
    };
  }
}
